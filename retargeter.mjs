import * as THREE from 'three';
import * as THREE_VRM from 'three-vrm';

class SourceSkeleton{
	static parents = [
		-1,0,1,2,0,4,5,0,7,8,9,10,9,12,13,14,9,16,17,18,3,6,
		19,22,23,24,19,26,27,28,19,30,31,32,19,34,35,36,19,38,39,40,
		15,42,43,44,15,46,47,48,15,50,51,52,15,54,55,56,15,58,59,60 
	];
	static bone_map = {
		Hips : 0,
		RightUpperLeg : 1,
		RightLowerLeg : 2,
		RightFoot : 3,
		LeftUpperLeg : 4,
		LeftLowerLeg : 5,
		LeftFoot : 6,
		Spine : 7,
		Chest : 8,
		UpperChest : 9,
		Neck : 10,
		Head : 11,
		LeftShoulder : 12,
		LeftUpperArm : 13,
		LeftLowerArm : 14,
		LeftHand : 15,
		RightShoulder : 16,
		RightUpperArm : 17,
		RightLowerArm : 18,
		RightHand : 19,
		RightToes : 20,
		LeftToes : 21,
		RightThumbProximal : 22,
		RightThumbIntermediate : 23,
		RightThumbDistal : 24,
		RightIndexProximal : 25,
		RightIndexIntermediate : 26,
		RightIndexDistal : 27,
		RightMiddleProximal : 28,
		RightMiddleIntermediate : 29,
		RightMiddleDistal : 30,
		RightRingProximal : 31,
		RightRingIntermediate : 32,
		RightRingDistal : 33,
		RightLittleProximal : 34,
		RightLittleIntermediate : 35,
		RightLittleDistal : 36,
		LeftThumbProximal : 37,
		LeftThumbIntermediate : 38,
		LeftThumbDistal : 39,
		LeftIndexProximal : 40,
		LeftIndexIntermediate : 41,
		LeftIndexDistal : 42,
		LeftMiddleProximal : 43,
		LeftMiddleIntermediate : 44,
		LeftMiddleDistal : 45,
		LeftRingProximal : 46,
		LeftRingIntermediate : 47,
		LeftRingDistal : 48,
		LeftLittleProximal : 49,
		LeftLittleIntermediate : 50,
		LeftLittleDistal : 51,
	};
	static getBones(){
		const positions = [];
		positions.push(new THREE.Vector3(0,0.8,0));//0
		positions.push(new THREE.Vector3(-0.12,0,0));//1
		positions.push(new THREE.Vector3(-0,-0.4,0));//2
		positions.push(new THREE.Vector3(-0,-0.34,0));//3
		positions.push(new THREE.Vector3(0.12,0,0));//4
		positions.push(new THREE.Vector3(-0,-0.4,0));//5
		positions.push(new THREE.Vector3(-0,-0.34,0));//6
		positions.push(new THREE.Vector3(-0,0,0));//7
		positions.push(new THREE.Vector3(-0,0.27,0));//8
		positions.push(new THREE.Vector3(-0,0.27,0));//9
		positions.push(new THREE.Vector3(-0,0,0));//10
		positions.push(new THREE.Vector3(-0,0.22,0));//11
		positions.push(new THREE.Vector3(-0,0.0,0));//12
		positions.push(new THREE.Vector3(0.17,0,0));//13
		positions.push(new THREE.Vector3(0.28,0,0));//14
		positions.push(new THREE.Vector3(0.25,0,0));//15
		positions.push(new THREE.Vector3(-0,0,0));//16
		positions.push(new THREE.Vector3(-0.17,0,0));//17
		positions.push(new THREE.Vector3(-0.28,0,0));//18
		positions.push(new THREE.Vector3(-0.25,0,0));//19
		positions.push(new THREE.Vector3(-0,0,0.15));//20
		positions.push(new THREE.Vector3(-0,0,0.15));//21
	
		positions.push(new THREE.Vector3(-0.7405, -0.3218, 0.5900).multiplyScalar(0.06));
		positions.push(new THREE.Vector3(-0.7746, -0.4472, 0.4472).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(-0.7746, -0.4472, 0.4472).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(-0.7746, -0.4472, 0.4472).multiplyScalar(0.02));
	
		positions.push(new THREE.Vector3(-0.9662, -0.0392, 0.2548).multiplyScalar(0.06));
		positions.push(new THREE.Vector3(-1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(-1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(-1.000, -0.0000, 0.0000).multiplyScalar(0.02));
	
		positions.push(new THREE.Vector3(-1.0000, -0.0000, 0.0000).multiplyScalar(0.06));
		positions.push(new THREE.Vector3(-1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(-1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(-1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
	
		positions.push(new THREE.Vector3(-0.9774, -0.0189, -0.2106).multiplyScalar(0.06));
		positions.push(new THREE.Vector3(-1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(-1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(-1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
	
		positions.push(new THREE.Vector3(-0.8965, -0.0368, -0.4415).multiplyScalar(0.06));
		positions.push(new THREE.Vector3(-1.0000, -0.0000, -0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(-1.0000, -0.0000, -0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(-1.0000, -0.0000, -0.0000).multiplyScalar(0.02));
	
		positions.push(new THREE.Vector3(0.7405, -0.3218, 0.5900).multiplyScalar(0.06));
		positions.push(new THREE.Vector3(0.7746, -0.4472, 0.4472).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(0.7746, -0.4472, 0.4472).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(0.7746, -0.4472, 0.4472).multiplyScalar(0.02));
	
		positions.push(new THREE.Vector3(0.9662, -0.0392, 0.2548).multiplyScalar(0.06));
		positions.push(new THREE.Vector3(1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
	
		positions.push(new THREE.Vector3(1.0000, -0.0000, 0.0000).multiplyScalar(0.06));
		positions.push(new THREE.Vector3(1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
	
		positions.push(new THREE.Vector3(0.9774, -0.0189, -0.2106).multiplyScalar(0.06));
		positions.push(new THREE.Vector3(1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(1.0000, -0.0000, 0.0000).multiplyScalar(0.02));
	
		positions.push(new THREE.Vector3(0.8965, -0.0368, -0.4415).multiplyScalar(0.06));
		positions.push(new THREE.Vector3(1.0000, -0.0000, -0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(1.0000, -0.0000, -0.0000).multiplyScalar(0.02));
		positions.push(new THREE.Vector3(1.0000, -0.0000, -0.0000).multiplyScalar(0.02));
	
		// const names = Object.keys(SourceSkeleton.bone_map);
		const bones = [];
		for(let i=0; i<positions.length; i++){
			const bone = new THREE.Bone();//quaternion = (0, 0, 0, 1)

			bone.position.copy(positions[i]);
			bones.push(bone);
			if(SourceSkeleton.parents[i]!=-1)
				bones[SourceSkeleton.parents[i]].add(bone);
		}
		return bones;
	}
}

export class GeneralSkeleton{
	static bone_map = {
		Hips: "Hips",
		RightUpperLeg: "RightUpperLeg",
		RightLowerLeg: "RightLowerLeg",
		RightFoot: "RightFoot",
		LeftUpperLeg: "LeftUpperLeg",
		LeftLowerLeg: "LeftLowerLeg",
		LeftFoot: "LeftFoot",
		Spine: "Spine",
		Chest: "Spine1",
		UpperChest: "Spine3",
		Neck: "Neck",
		Head: "Head",
		LeftShoulder: "LeftShoulder",
		LeftUpperArm: "LeftUpperArm",
		LeftLowerArm: "LeftLowerArm",
		LeftHand: "LeftHand",
		RightShoulder: "RightShoulder",
		RightUpperArm: "RightUpperArm",
		RightLowerArm: "RightLowerArm",
		RightHand: "RightHand",
		RightToes: "RightToe",
		LeftToes: "LeftToe",
		RightThumbProximal: "RightThumb1",
		RightThumbIntermediate: "RightThumb2",
		RightThumbDistal: "RightThumb3",
		RightIndexProximal: "RightIndex1",
		RightIndexIntermediate: "RightIndex2",
		RightIndexDistal: "RightIndex3",
		RightMiddleProximal: "RightMiddle1",
		RightMiddleIntermediate: "RightMiddle2",
		RightMiddleDistal: "RightMiddle3",
		RightRingProximal: "RightRing1",
		RightRingIntermediate: "RightRing2",
		RightRingDistal: "RightRing3",
		RightLittleProximal: "RightPinky1",
		RightLittleIntermediate: "RightPinky2",
		RightLittleDistal: "RightPinky3",
		LeftThumbProximal: "LeftThumb1",
		LeftThumbIntermediate: "LeftThumb2",
		LeftThumbDistal: "LeftThumb3",
		LeftIndexProximal: "LeftIndex1",
		LeftIndexIntermediate: "LeftIndex2",
		LeftIndexDistal: "LeftIndex3",
		LeftMiddleProximal: "LeftMiddle1",
		LeftMiddleIntermediate: "LeftMiddle2",
		LeftMiddleDistal: "LeftMiddle3",
		LeftRingProximal: "LeftRing1",
		LeftRingIntermediate: "LeftRing2",
		LeftRingDistal: "LeftRing3",
		LeftLittleProximal: "LeftPinky1",
		LeftLittleIntermediate: "LeftPinky2",
		LeftLittleDistal: "LeftPinky3"
	};
	static getBonesForMap(object, jdata, map){
		let bones = [];
		for(let i=0; i<map.length; i++)
		{
			var found = jdata.SkeletonLink.filter(function(item) { return item.Label === map[i][1]; });

			let name = "";
			if(found.length>0)
				name = found[0].data;
			else//found.length==0
				name = map[i][1];
			if(name!="")
			{
				let child = object.getObjectByName( name );
				if(child!=undefined && found.length>0 && found[0].rotation!=undefined )
				{
					child.setRotationFromQuaternion(new THREE.Quaternion(found[0].rotation.x,-found[0].rotation.y,-found[0].rotation.z,found[0].rotation.w));
				}
				bones.push(child);
			}
			else
				bones.push(undefined);
		}
		return bones;
	}
	static getBones(object, jdata){
		return GeneralSkeleton.getBonesForMap(object, jdata, Object.entries(GeneralSkeleton.bone_map));
	}
}

export class Wolf3DSkeleton{
	static bone_map = {
		Hips: "Hips",
		RightUpperLeg: "RightUpperLeg",
		RightLowerLeg: "RightLowerLeg",
		RightFoot: "RightFoot",
		LeftUpperLeg: "LeftUpperLeg",
		LeftLowerLeg: "LeftLowerLeg",
		LeftFoot: "LeftFoot",
		Spine: "Spine",
		Chest: "Spine1",
		UpperChest: "Spine3",
		Neck: "Neck",
		Head: "Head",
		LeftShoulder: "LeftShoulder",
		LeftUpperArm: "LeftUpperArm",
		LeftLowerArm: "LeftLowerArm",
		LeftHand: "LeftHand",
		RightShoulder: "RightShoulder",
		RightUpperArm: "RightUpperArm",
		RightLowerArm: "RightLowerArm",
		RightHand: "RightHand",
		RightToes: "RightToe",
		LeftToes: "LeftToe",
		RightThumbProximal : 		"RightHandThumb1",
		RightThumbIntermediate : 	"RightHandThumb2",
		RightThumbDistal : 			"RightHandThumb3",
		RightIndexProximal : 		"RightHandIndex1",
		RightIndexIntermediate : 	"RightHandIndex2",
		RightIndexDistal : 			"RightHandIndex3",
		RightMiddleProximal : 		"RightHandMiddle1",
		RightMiddleIntermediate : 	"RightHandMiddle2",
		RightMiddleDistal : 		"RightHandMiddle3",
		RightRingProximal : 		"RightHandRing1",
		RightRingIntermediate : 	"RightHandRing2",
		RightRingDistal : 			"RightHandRing3",
		RightLittleProximal : 		"RightHandPinky1",
		RightLittleIntermediate : 	"RightHandPinky2",
		RightLittleDistal : 		"RightHandPinky3",
		LeftThumbProximal : 		"LeftHandThumb1",
		LeftThumbIntermediate : 	"LeftHandThumb2",
		LeftThumbDistal : 			"LeftHandThumb3",
		LeftIndexProximal : 		"LeftHandIndex1",
		LeftIndexIntermediate : 	"LeftHandIndex2",
		LeftIndexDistal : 			"LeftHandIndex3",
		LeftMiddleProximal : 		"LeftHandMiddle1",
		LeftMiddleIntermediate : 	"LeftHandMiddle2",
		LeftMiddleDistal : 			"LeftHandMiddle3",
		LeftRingProximal : 			"LeftHandRing1",
		LeftRingIntermediate : 		"LeftHandRing2",
		LeftRingDistal : 			"LeftHandRing3",
		LeftLittleProximal : 		"LeftHandPinky1",
		LeftLittleIntermediate : 	"LeftHandPinky2",
		LeftLittleDistal : 			"LeftHandPinky3"
	};
	static getBones(object, jdata){
		return GeneralSkeleton.getBonesForMap(object, jdata, Object.entries(Wolf3DSkeleton.bone_map));
	}
}

export class VRMSkeleton{
	static morph_map = {
		"aa":1,
		"ee":2,
		"ih":3,
		"oh":4,
		"ou":5,
		"blink":12,
		"happy":13,
		"sad":14,
		"angry":15,
		"Suprise":16,
	};
	static bone_map = {
		[THREE_VRM.VRMHumanBoneName.Hips                   ]: 0 ,
		[THREE_VRM.VRMHumanBoneName.RightUpperLeg          ]: 1 ,
		[THREE_VRM.VRMHumanBoneName.RightLowerLeg          ]: 2 ,
		[THREE_VRM.VRMHumanBoneName.RightFoot              ]: 3 ,
		[THREE_VRM.VRMHumanBoneName.LeftUpperLeg           ]: 4 ,
		[THREE_VRM.VRMHumanBoneName.LeftLowerLeg           ]: 5 ,
		[THREE_VRM.VRMHumanBoneName.LeftFoot               ]: 6 ,
		[THREE_VRM.VRMHumanBoneName.Spine                  ]: 7 ,
		[THREE_VRM.VRMHumanBoneName.Chest                  ]: 8 ,
		[THREE_VRM.VRMHumanBoneName.UpperChest             ]: 9 ,
		[THREE_VRM.VRMHumanBoneName.Neck                   ]: 10,
		[THREE_VRM.VRMHumanBoneName.Head                   ]: 11,
		[THREE_VRM.VRMHumanBoneName.LeftShoulder           ]: 12,
		[THREE_VRM.VRMHumanBoneName.LeftUpperArm           ]: 13,
		[THREE_VRM.VRMHumanBoneName.LeftLowerArm           ]: 14,
		[THREE_VRM.VRMHumanBoneName.LeftHand               ]: 15,
		[THREE_VRM.VRMHumanBoneName.RightShoulder          ]: 16,
		[THREE_VRM.VRMHumanBoneName.RightUpperArm          ]: 17,
		[THREE_VRM.VRMHumanBoneName.RightLowerArm          ]: 18,
		[THREE_VRM.VRMHumanBoneName.RightHand              ]: 19,
		[THREE_VRM.VRMHumanBoneName.RightToes              ]: 20,
		[THREE_VRM.VRMHumanBoneName.LeftToes               ]: 21,
		[THREE_VRM.VRMHumanBoneName.RightThumbProximal     ]: 22,
		[THREE_VRM.VRMHumanBoneName.RightThumbMetacarpal   ]: 23,
		[THREE_VRM.VRMHumanBoneName.RightThumbDistal       ]: 24,
		[THREE_VRM.VRMHumanBoneName.RightIndexProximal     ]: 25,
		[THREE_VRM.VRMHumanBoneName.RightIndexIntermediate ]: 26,
		[THREE_VRM.VRMHumanBoneName.RightIndexDistal       ]: 27,
		[THREE_VRM.VRMHumanBoneName.RightMiddleProximal    ]: 28,
		[THREE_VRM.VRMHumanBoneName.RightMiddleIntermediate]: 29,
		[THREE_VRM.VRMHumanBoneName.RightMiddleDistal      ]: 30,
		[THREE_VRM.VRMHumanBoneName.RightRingProximal      ]: 31,
		[THREE_VRM.VRMHumanBoneName.RightRingIntermediate  ]: 32,
		[THREE_VRM.VRMHumanBoneName.RightRingDistal        ]: 33,
		[THREE_VRM.VRMHumanBoneName.RightLittleProximal    ]: 34,
		[THREE_VRM.VRMHumanBoneName.RightLittleIntermediate]: 35,
		[THREE_VRM.VRMHumanBoneName.RightLittleDistal      ]: 36,
		[THREE_VRM.VRMHumanBoneName.LeftThumbProximal      ]: 37,
		[THREE_VRM.VRMHumanBoneName.LeftThumbMetacarpal    ]: 38,
		[THREE_VRM.VRMHumanBoneName.LeftThumbDistal        ]: 39,
		[THREE_VRM.VRMHumanBoneName.LeftIndexProximal      ]: 40,
		[THREE_VRM.VRMHumanBoneName.LeftIndexIntermediate  ]: 41,
		[THREE_VRM.VRMHumanBoneName.LeftIndexDistal        ]: 42,
		[THREE_VRM.VRMHumanBoneName.LeftMiddleProximal     ]: 43,
		[THREE_VRM.VRMHumanBoneName.LeftMiddleIntermediate ]: 44,
		[THREE_VRM.VRMHumanBoneName.LeftMiddleDistal       ]: 45,
		[THREE_VRM.VRMHumanBoneName.LeftRingProximal       ]: 46,
		[THREE_VRM.VRMHumanBoneName.LeftRingIntermediate   ]: 47,
		[THREE_VRM.VRMHumanBoneName.LeftRingDistal         ]: 48,
		[THREE_VRM.VRMHumanBoneName.LeftLittleProximal     ]: 49,
		[THREE_VRM.VRMHumanBoneName.LeftLittleIntermediate ]: 50,
		[THREE_VRM.VRMHumanBoneName.LeftLittleDistal       ]: 51
	};

	static getBones(vrm){
		const ret = []
		for(let [map, to] of Object.entries(VRMSkeleton.bone_map))
			ret[to] = vrm.humanoid.getNormalizedBoneNode(map);
		return ret;
	}
}

export class Retargeter{
	/*
	bones:
		array of bones from target character

	Maybe replace with a Skeleton class or something
	*/
	constructor(bones){
		this.source_bones = SourceSkeleton.getBones();
		if(bones!==undefined)
			this.scanBones(bones);
	}
	scanBones(bones){
		[
			this.target_root, 
			this.target_bones, 
			this.tpose_rotations, 
			this.target_hip_height
		] = this._scanBones(bones);
	}
	
	_scanBones(bones){
		const target_bones = [
			bones[SourceSkeleton.bone_map.Hips],
			bones[SourceSkeleton.bone_map.RightUpperLeg],
			bones[SourceSkeleton.bone_map.RightLowerLeg],
			bones[SourceSkeleton.bone_map.RightFoot],
			bones[SourceSkeleton.bone_map.LeftUpperLeg],
			bones[SourceSkeleton.bone_map.LeftLowerLeg],
			bones[SourceSkeleton.bone_map.LeftFoot],
			bones[SourceSkeleton.bone_map.Spine],
			bones[SourceSkeleton.bone_map.Chest],
			bones[SourceSkeleton.bone_map.UpperChest],
			bones[SourceSkeleton.bone_map.Neck],
			bones[SourceSkeleton.bone_map.Head],
			bones[SourceSkeleton.bone_map.LeftShoulder],
			bones[SourceSkeleton.bone_map.LeftUpperArm],
			bones[SourceSkeleton.bone_map.LeftLowerArm],
			bones[SourceSkeleton.bone_map.LeftHand],
			bones[SourceSkeleton.bone_map.RightShoulder],
			bones[SourceSkeleton.bone_map.RightUpperArm],
			bones[SourceSkeleton.bone_map.RightLowerArm],
			bones[SourceSkeleton.bone_map.RightHand],
			bones[SourceSkeleton.bone_map.RightToes],
			bones[SourceSkeleton.bone_map.LeftToes],
			bones[SourceSkeleton.bone_map.RightThumbProximal],
			bones[SourceSkeleton.bone_map.RightThumbIntermediate],
			bones[SourceSkeleton.bone_map.RightThumbDistal],
			undefined,
			bones[SourceSkeleton.bone_map.RightIndexProximal],
			bones[SourceSkeleton.bone_map.RightIndexIntermediate],
			bones[SourceSkeleton.bone_map.RightIndexDistal],
			undefined,
			bones[SourceSkeleton.bone_map.RightMiddleProximal],
			bones[SourceSkeleton.bone_map.RightMiddleIntermediate],
			bones[SourceSkeleton.bone_map.RightMiddleDistal],
			undefined,
			bones[SourceSkeleton.bone_map.RightRingProximal],
			bones[SourceSkeleton.bone_map.RightRingIntermediate],
			bones[SourceSkeleton.bone_map.RightRingDistal],
			undefined,
			bones[SourceSkeleton.bone_map.RightLittleProximal],
			bones[SourceSkeleton.bone_map.RightLittleIntermediate],
			bones[SourceSkeleton.bone_map.RightLittleDistal],
			undefined,
			bones[SourceSkeleton.bone_map.LeftThumbProximal],
			bones[SourceSkeleton.bone_map.LeftThumbIntermediate],
			bones[SourceSkeleton.bone_map.LeftThumbDistal],
			undefined,
			bones[SourceSkeleton.bone_map.LeftIndexProximal],
			bones[SourceSkeleton.bone_map.LeftIndexIntermediate],
			bones[SourceSkeleton.bone_map.LeftIndexDistal],
			undefined,
			bones[SourceSkeleton.bone_map.LeftMiddleProximal],
			bones[SourceSkeleton.bone_map.LeftMiddleIntermediate],
			bones[SourceSkeleton.bone_map.LeftMiddleDistal],
			undefined,
			bones[SourceSkeleton.bone_map.LeftRingProximal],
			bones[SourceSkeleton.bone_map.LeftRingIntermediate],
			bones[SourceSkeleton.bone_map.LeftRingDistal],
			undefined,
			bones[SourceSkeleton.bone_map.LeftLittleProximal],
			bones[SourceSkeleton.bone_map.LeftLittleIntermediate],
			bones[SourceSkeleton.bone_map.LeftLittleDistal],
			undefined,
		];

		let target_root = target_bones[0];
		while(target_root.parent && target_root.parent.type!="Scene")
			target_root=target_root.parent;

		const root_rotation_invert=target_root.getWorldQuaternion(new THREE.Quaternion()).clone().invert();
		const tpose_rotations = target_bones.map((bone)=>{
			return bone ? 
				root_rotation_invert.clone().multiply(bone.getWorldQuaternion(new THREE.Quaternion())) : 
				new THREE.Quaternion();
		});
		//const scale = target_root.getWorldScale(new THREE.Vector3());
		const target_hip_height = this.getHipHeight(target_bones, false);///scale.y/target_root.scale.y;
		return [target_root, target_bones, tpose_rotations, target_hip_height];
	}

	getHipHeight(bones, manual=true){
		const Root = bones[0].getWorldPosition(new THREE.Vector3());
		const LeftUpperLeg = bones[1].getWorldPosition(new THREE.Vector3());
		const LeftLowerLeg = bones[2].getWorldPosition(new THREE.Vector3());
		const LeftFoot = bones[3].getWorldPosition(new THREE.Vector3());
		const RightUpperLeg = bones[4].getWorldPosition(new THREE.Vector3());
		const HipMid = RightUpperLeg.clone().add(LeftUpperLeg).multiplyScalar(0.5);
		const foot = manual ? 0.10 : LeftFoot.y;
		return LeftUpperLeg.distanceTo(LeftLowerLeg) + LeftLowerLeg.distanceTo(LeftFoot) + HipMid.distanceTo(Root) + foot;
	}

	setRotations(rotations){
		for(let i=0; i<rotations.length; i++)
			this.source_bones[i]?.rotation.setFromQuaternion(rotations[i]);
	}
	setTranslation(translation, lengths){
		this.source_bones[0].position.copy(translation);
		for(let i=1; i<lengths.length; i++)
			this.source_bones[i].position.normalize().multiplyScalar(lengths[i-1]);
	}

	update(){
		if(this.target_bones === undefined || this.target_root === undefined)
			return;

		//root translation
		const hip_scale = this.target_hip_height/this.getHipHeight(this.source_bones);
		const target_root_scale = new THREE.Vector3().setFromMatrixScale(this.target_root.matrixWorld);
		const parent_transform_invert = this.target_bones[0].parent.matrixWorld.clone().invert();//cancel scale
		const pos = this.source_bones[0].position.clone()
			.multiplyScalar(hip_scale)//scale for foot contact
			.divide(target_root_scale)//without scale, 
			.applyMatrix4(this.target_root.matrixWorld)//apply root transform -> as children of root
			.applyMatrix4(parent_transform_invert)//set position local to parent
		;
		this.target_bones[0].position.copy(pos);
		// this.target_bones[0].position.copy(this.source_bones[0].position);

		//rotations
		const root_rotation_invert = this.target_root.getWorldQuaternion(new THREE.Quaternion()).invert();
		for(let i=0; i<this.source_bones.length; i++){
			if(!this.target_bones[i] || !this.target_bones[i].parent)
				continue;
			const parent_global_rotation=root_rotation_invert.clone().multiply(
				this.target_bones[i]?.parent?.getWorldQuaternion(new THREE.Quaternion())
			);
			
			const q = this.source_bones[i].getWorldQuaternion(new THREE.Quaternion()).multiply(this.tpose_rotations[i]);
			const q2 = parent_global_rotation.clone().invert().multiply(q);
			this.target_bones[i]?.rotation.setFromQuaternion(q2);
		}
	}
}