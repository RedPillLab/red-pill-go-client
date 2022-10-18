import { Engine } from "./engine.mjs"
import { Client } from "./WebRTCClient.mjs";
import { Parser } from "./parser.mjs";
import { Retargeter, VRMSkeleton } from "./retargeter.mjs";

import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE_VRM from 'three-vrm';
import * as THREE from 'three';

const WS_URL = "wss://webrtc.rplab.online/";

class App{
	constructor(){
		this.engine = new Engine(document.getElementById("three"));
		this.client = new Client();

		this.client.addEventListener("message", (e)=>{
			let [type, data] = Parser.parse(e.data);
			this.model?.dispatchEvent({type: type, data: data});
		});
		this.initGUI();

		(async()=>{
			const [vrm, script] = await this.loadVRM('VRM1_Constraint_Twist_Sample.vrm');
			this.vrm = vrm;
			this.model = vrm.scene;
			this.engine.addObject(vrm.scene);
			this.engine.addScript(vrm.scene, script);
			return this;
		})();
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

	//VRM
	async loadVRM(path){
		const loader = new GLTFLoader();
		const helperRoot = new THREE.Group();
		helperRoot.renderOrder = 10000;
		loader.register( parser => new THREE_VRM.VRMLoaderPlugin(parser, {
			helperRoot: helperRoot,
			autoUpdateHumanBones: true
		}) );

		const gltf = await loader.loadAsync(path);
		THREE_VRM.VRMUtils.removeUnnecessaryVertices( gltf.scene );
		THREE_VRM.VRMUtils.removeUnnecessaryJoints( gltf.scene );
		const vrm = gltf.userData.vrm;
		// THREE_VRM.VRMUtils.rotateVRM0( vrm );
		if (vrm.meta?.metaVersion === '0') 
			vrm.humanoid.getRawBoneNode("hips").rotation.y = Math.PI;
		
		const model = vrm.scene;
		// model.add(helperRoot);
		const retargeter = new Retargeter();
		retargeter.scanBones(VRMSkeleton.getBones(vrm));

		model.addEventListener("morph", (e)=>{
			for(const [key, value] of Object.entries(VRMSkeleton.morph_map))
				vrm.expressionManager.setValue(key, e.data[value]);
		});
		model.addEventListener("rotations", (e)=>{
			retargeter.setRotations(e.data);
		});
		model.addEventListener("translations", (e)=>{
			retargeter.setTranslation(...e.data);
		});

		return [vrm, (time)=>{
			retargeter.update();
			vrm.update(time);
		}];
	}
}

(async()=>{
	let app = await new App();
	window.app = app;
})();