import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Engine{
	constructor(canvas){
		this.canvas = canvas;
		this.initRenderer();
		this.initUIScene();
		this.initScene();
		this.initCamera();
		this.initFloor();
		window.addEventListener( "resize", ()=>{this.onWindowResize();}, false );
		this.clock = new THREE.Clock();
		this.scripts = {};
	}

	initRenderer(){
		this.renderer = new THREE.WebGLRenderer( { canvas: this.canvas, antialias: true} );
		this.renderer.setSize( window.innerWidth, window.innerHeight, false);
		this.renderer.setPixelRatio( 1 );
		this.renderer.setAnimationLoop(this.update.bind(this));
	}

	initUIScene(){
		//  a separate scene for UI, e.g. floor, axis, ...
		this.ui_scene = new THREE.Scene();
	}

    initFloor() {
        const grid = new THREE.Group();

        const grid1 = new THREE.GridHelper( 30, 30 );
        grid1.material.color.setHex( 0x666666 );
        grid1.material.vertexColors = false;
        grid.add( grid1 );

        const grid2 = new THREE.GridHelper( 30, 6 );
        grid2.material.color.setHex( 0xc1c1c1 );
        grid2.material.depthFunc = THREE.AlwaysDepth;
        grid2.material.vertexColors = false;
        grid.add( grid2 );

        this.ui_scene.add( grid );
    }

	initScene(){
		// default scene with light
		this.scene = new THREE.Scene();
		let light = new THREE.DirectionalLight( 0xffffff);
		light.position.set( -1, 1, 10 );
		this.scene.add( light );
	}

	initCamera(){
		// camera is independent from the scene
		this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 1000 );
		this.controls = new OrbitControls( this.camera, this.canvas );
		this.camera.position.set(0, 5, 5);
	}

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight, false );
	}

	update(time){
		const delta = this.clock.getDelta();
		for(const key in this.scripts)
			for(const script of this.scripts[key])
				script(delta);
		
		if(this.ui_scene.visible){
			this.renderer.render( this.ui_scene, this.camera );
			this.renderer.autoClear = false;
			this.renderer.render( this.scene, this.camera );
			this.renderer.autoClear = true;
		}
		else
			this.renderer.render( this.scene, this.camera );

        this.controls.update();
	}

	addObject(object){
		this.scene.add(object);
	}

	addScript(object, script){
		if(this.scripts[object.uuid]===undefined)
			this.scripts[object.uuid] = [];
		this.scripts[object.uuid].push(script);
	}
}