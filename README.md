# RedPillGo client example

- main.js contains the example of receiving motion from webrtc and retargeting it to VRM model.  
	brief description of the content:
	- pick a room id and connect WebRTCClient.Client to signaling server
		- make sure to connect RedPillGo to the same room
	- receive data from the message event of WebRTCClient.Client
	- use Parser.parse to parse data received from WebRTCClient.Client.
	- load VRM model using playcanvas
		- also load using three-vrm
	- register retarget skeleton with retargeter.scanBones(VRMSkeleton.getBones(vrm)).
	- set the motion data to retargeter using retargeter.setRotations and retargeter.setTranslation.
		- set morph data using vrm.expressionManager.setValue
	- call retargeter.update and vrm.update(delta) in render loop.
		- copy transforms and blendshape value from three-vrm model to playcanvas model

## run
- download [example VRM model](https://github.com/pixiv/three-vrm/blob/dev/packages/three-vrm/examples/models/VRM1_Constraint_Twist_Sample.vrm) and put it in this directory
- run http-server
- browse http://localhost:8080
- connect to RedPillGo by typing room id and clicking connect
