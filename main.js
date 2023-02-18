import { Engine } from "./engine.mjs";
import { Client } from "./WebRTCClient.mjs";
import { Parser } from "./parser.mjs";
import { Retargeter, VRMSkeleton } from "./retargeter.mjs";

import "playcanvas";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE_VRM from '@pixiv/three-vrm';

const WS_URL = "wss://webrtc.rplab.online/";

class App{
	constructor(canvas){
		this.engine = new Engine(canvas);
		//webrtc client
		this.client = new Client();

		//listen to webrtc message
		this.client.addEventListener("message", (e)=>{
			//parse and send the motion data to model
			let [type, data] = Parser.parse(e.data);
			this.vrm?.scene?.dispatchEvent({type: type, data: data});
		});
		this.initGUI();
	}
	initGUI(){
		this.gui = new GUI({autoplace: false, width:120});
		//room
		let room = this.gui.add({
			room: ""
		}, "room").listen();
		this.client.addEventListener("room", (e) => {
			room.object.room = e.data.toString();
		});
		room.$input.inputMode = "numeric";
		room.$input.placeholder = "input id";
		//connect
		{
			let button = this.gui.add({
				connect: () => {
					this.client.connect(WS_URL + room.object.room);
					button.property = "disconnect";
					button.name("connecting");
				},
				disconnect: () => {
					this.client.close();
					button.property = "connect";
					button.name("disconnected");
				}
			}, 'connect');
		}
	}
	async loadVRMTHREE(path){
		const loader = new GLTFLoader();
		// const helperRoot = new THREE.Group();// helperRoot is for debugging only
		// helperRoot.renderOrder = 10000;
		loader.register( parser => new THREE_VRM.VRMLoaderPlugin(parser, {
			// helperRoot: helperRoot
		}));

		// loading
		const gltf = await loader.loadAsync(path);
		THREE_VRM.VRMUtils.removeUnnecessaryVertices( gltf.scene );
		THREE_VRM.VRMUtils.removeUnnecessaryJoints( gltf.scene );
		const vrm = gltf.userData.vrm;
		const model = vrm.scene;
		// model.add(helperRoot);
		// THREE_VRM.VRMUtils.rotateVRM0( vrm );
		if (vrm.meta?.metaVersion === '0')//this is neccessary since old VRM spec is different
			vrm.humanoid.getNormalizedBoneNode("hips").rotation.y = Math.PI;

		// prepare retargeter
		const retargeter = new Retargeter();
		retargeter.scanBones(VRMSkeleton.getBones(vrm));

		// set morph
		model.addEventListener("morph", (e)=>{
			for(const [key, value] of Object.entries(VRMSkeleton.morph_map))
				vrm.expressionManager.setValue(key, e.data[value]);
		});
		// set motion data to retargeter
		model.addEventListener("rotations", (e)=>{
			retargeter.setRotations(e.data);
		});
		model.addEventListener("translations", (e)=>{
			retargeter.setTranslation(...e.data);
		});
		return [retargeter, vrm];
	}
	async loadVRM(path){
		//THREE_VRM part
		const [retargeter, vrm] = await this.loadVRMTHREE(path);
		this.retargeter = retargeter;
		this.vrm = vrm;
		//playcanvas part
		this.engine.app.assets.loadFromUrl(path, "container", (err, asset)=>{
			const entity = new pc.Entity();
			entity.addComponent("model", {asset: asset.resource.model});
			const script = pc.createScript("retargeter");
			script.extend({
				initialize: ()=>{
					//transform
					const pc_nodes = traverse(entity.model.model.graph);
					const three_nodes = (()=>{
						const nodes = [];
						vrm.scene.traverse((node)=>{nodes.push(node)});
						return nodes;
					})();
					const node_map = new DefaultMap(()=>[]);
					pc_nodes.forEach(node => node_map.get(node.name).push(node));
					three_nodes.forEach(node => node_map.get(node.name).push(node));
					node_map.forEach((value, key, map)=>{
						if(value.length!=2)
							map.delete(key);
					});
					this.node_map = node_map;

					//morph
					const pc_meshes = entity.model.model.meshInstances;
					const three_meshes = (()=>{
						const nodes = [];
						vrm.scene.traverse((node)=>{if(node.isMesh)nodes.push(node)});
						return nodes;
					})();
					const morph_map = new DefaultMap(()=>[]);
					pc_meshes.forEach((mesh, i) => morph_map.get(i).push(mesh));
					three_meshes.forEach((mesh, i) => morph_map.get(i).push(mesh));
					this.morph_map = morph_map;
				},
				update: (dt)=>{
					retargeter.update();
					vrm.update(dt);
					//copy transforms and blend shape
					this.node_map.forEach((value, key)=>{
						const [pc_node, three_node] = value;
						pc_node.setLocalRotation(...three_node.quaternion.toArray());
						pc_node.setLocalPosition(...three_node.position.toArray());
					});

					this.morph_map.forEach((value, key)=>{
						const [pc_mesh, three_mesh] = value;
						if(pc_mesh.morphInstance)
							for(let i=0; i<pc_mesh.morphInstance._weights.length; i++)
								pc_mesh.morphInstance.setWeight(i, three_mesh.morphTargetInfluences[i]);
					});
				}
			});
			entity.addComponent("script");
			entity.script.create("retargeter");

			this.engine.addObject(entity);
		});
	}
}

function traverse(node){
	const ret = [node];
	if(node.children.length != 0 )
		node.children.forEach((c)=>{ret.push(...traverse(c));});
	return ret;
}

class DefaultMap extends Map{
	constructor(init) {
		super();
		this.init = init;
	}
	get(key){
		if(!super.has(key))
			super.set(key, this.init())
		return super.get(key);
	}
}

(async()=>{
	window.app = new App(document.getElementById("canvas"));
	await app.loadVRM("./VRM1_Constraint_Twist_Sample.vrm");
})();