import "playcanvas";
export class Engine
{
	constructor(canvas){
		this.canvas = canvas;
		window.addEventListener( "resize", ()=>{this.onWindowResize();}, false );
		this.onWindowResize();
		this.app = new pc.Application(canvas, {
			mouse: new pc.Mouse(canvas),
			touch: new pc.TouchDevice(canvas)
		});
		this.initFloor();
		this.initLight();
		this.initCamera();
		this.app.start();
	}

	initFloor(){
		const floor = new pc.Entity("floor");
		floor.setLocalScale(8, 1, 8);
		floor.addComponent("render", {type: "plane",});

		const material = new pc.Material();
		material.setShader(new pc.Shader(this.app.graphicsDevice, {
			attributes: {
				aPosition: pc.SEMANTIC_POSITION,
				texcoord: pc.SEMANTIC_TEXCOORD0
			},
			vshader: `
				attribute vec3 aPosition;
				attribute vec2 texcoord;
				
				uniform mat4 matrix_model;
				uniform mat4 matrix_viewProjection;
				
				varying vec2 otexcoord;
				
				void main(void)
				{
					otexcoord = texcoord;
					gl_Position = matrix_viewProjection * matrix_model * vec4(aPosition, 1.0);
				}
			`,
			fshader: `
				precision highp float;
				varying vec2 otexcoord;

				float checker(vec2 uv, float repeats) 
				{
					float cx = floor(repeats * uv.x);
					float cy = floor(repeats * uv.y); 
					float result = mod(cx + cy, 2.0);
					return sign(result);
				}

				void main(void)
				{
					float c = mix(1.0, 0.0, checker(otexcoord.xy, 8.0));
					gl_FragColor = vec4(c, c, c, 1.0); 
				}
			`
		}));
		floor.render.material = material;
		this.app.root.addChild(floor);
	}

	initLight(){
		// create directional light entity
		const light = new pc.Entity("light");
		light.addComponent("light");
		light.setEulerAngles(45, 0, 0);
		this.app.root.addChild(light);
	}
	initCamera(){
		// create camera entity
		const camera = new pc.Entity("camera");
		camera.addComponent("camera", {clearColor: new pc.Color().fromString("#111111")});

		import("playcanvas/scripts/camera/orbit-camera.js").then(()=>{
			camera.addComponent("script");
			const orbitCamera = camera.script.create("orbitCamera");
			orbitCamera.distance = 5;
			orbitCamera.pitch = -25;
			orbitCamera.pivotPoint = new pc.Vec3(0, 1, 0);
			camera.script.create("orbitCameraInputMouse");
			camera.script.create("orbitCameraInputTouch");
		});

		this.app.root.addChild(camera);
	}

	onWindowResize(){
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	}

	addObject(entity){
		this.app.root.addChild(entity);
	}
}