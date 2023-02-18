import * as THREE from 'three';
import * as THREE_VRM from '@pixiv/three-vrm';

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
		RightThumbDistal_End : -1,
		RightIndexProximal : 25,
		RightIndexIntermediate : 26,
		RightIndexDistal : 27,
		RightIndexDistal_End : -1,
		RightMiddleProximal : 28,
		RightMiddleIntermediate : 29,
		RightMiddleDistal : 30,
		RightMiddleDistal_End : -1,
		RightRingProximal : 31,
		RightRingIntermediate : 32,
		RightRingDistal : 33,
		RightRingDistal_End : -1,
		RightLittleProximal : 34,
		RightLittleIntermediate : 35,
		RightLittleDistal : 36,
		RightLittleDistal_End : -1,
		LeftThumbProximal : 37,
		LeftThumbIntermediate : 38,
		LeftThumbDistal : 39,
		LeftThumbDistal_End : -1,
		LeftIndexProximal : 40,
		LeftIndexIntermediate : 41,
		LeftIndexDistal : 42,
		LeftIndexDistal_End : -1,
		LeftMiddleProximal : 43,
		LeftMiddleIntermediate : 44,
		LeftMiddleDistal : 45,
		LeftMiddleDistal_End : -1,
		LeftRingProximal : 46,
		LeftRingIntermediate : 47,
		LeftRingDistal : 48,
		LeftRingDistal_End : -1,
		LeftLittleProximal : 49,
		LeftLittleIntermediate : 50,
		LeftLittleDistal : 51,
		LeftLittleDistal_End : -1
	};
	static positions = [
		[ 0.    ,  0.8   ,  0.    ,  1.    ],
		[-0.12  ,  0.    ,  0.    ,  1.    ],
		[ 0.    , -0.4   ,  0.    ,  1.    ],
		[ 0.    , -0.34  ,  0.    ,  1.    ],
		[ 0.12  ,  0.    ,  0.    ,  1.    ],
		[ 0.    , -0.4   ,  0.    ,  1.    ],
		[ 0.    , -0.34  ,  0.    ,  1.    ],
		[ 0.    ,  0.    ,  0.    ,  1.    ],
		[ 0.    ,  0.27  ,  0.    ,  1.    ],
		[ 0.    ,  0.27  ,  0.    ,  1.    ],
		[ 0.    ,  0.    ,  0.    ,  1.    ],
		[ 0.    ,  0.22  ,  0.    ,  1.    ],
		[ 0.    ,  0.    ,  0.    ,  1.    ],
		[ 0.17  ,  0.    ,  0.    ,  1.    ],
		[ 0.28  ,  0.    ,  0.    ,  1.    ],
		[ 0.25  ,  0.    ,  0.    ,  1.    ],
		[ 0.    ,  0.    ,  0.    ,  1.    ],
		[-0.17  ,  0.    ,  0.    ,  1.    ],
		[-0.28  ,  0.    ,  0.    ,  1.    ],
		[-0.25  ,  0.    ,  0.    ,  1.    ],
		[ 0.    ,  0.    ,  0.15  ,  1.    ],
		[ 0.    ,  0.    ,  0.15  ,  1.    ],

		[-0.7405, -0.3218,  0.59  ,  0.06  ],
		[-0.7746, -0.4472,  0.4472,  0.02  ],
		[-0.7746, -0.4472,  0.4472,  0.02  ],
		[-0.7746, -0.4472,  0.4472,  0.02  ],

		[-0.9662, -0.0392,  0.2548,  0.06  ],
		[-1.    , -0.    ,  0.    ,  0.02  ],
		[-1.    , -0.    ,  0.    ,  0.02  ],
		[-1.    , -0.    ,  0.    ,  0.02  ],

		[-1.    , -0.    ,  0.    ,  0.06  ],
		[-1.    , -0.    ,  0.    ,  0.02  ],
		[-1.    , -0.    ,  0.    ,  0.02  ],
		[-1.    , -0.    ,  0.    ,  0.02  ],

		[-0.9774, -0.0189, -0.2106,  0.06  ],
		[-1.    , -0.    ,  0.    ,  0.02  ],
		[-1.    , -0.    ,  0.    ,  0.02  ],
		[-1.    , -0.    ,  0.    ,  0.02  ],

		[-0.8965, -0.0368, -0.4415,  0.06  ],
		[-1.    , -0.    , -0.    ,  0.02  ],
		[-1.    , -0.    , -0.    ,  0.02  ],
		[-1.    , -0.    , -0.    ,  0.02  ],

		[ 0.7405, -0.3218,  0.59  ,  0.06  ],
		[ 0.7746, -0.4472,  0.4472,  0.02  ],
		[ 0.7746, -0.4472,  0.4472,  0.02  ],
		[ 0.7746, -0.4472,  0.4472,  0.02  ],

		[ 0.9662, -0.0392,  0.2548,  0.06  ],
		[ 1.    , -0.    ,  0.    ,  0.02  ],
		[ 1.    , -0.    ,  0.    ,  0.02  ],
		[ 1.    , -0.    ,  0.    ,  0.02  ],

		[ 1.    , -0.    ,  0.    ,  0.06  ],
		[ 1.    , -0.    ,  0.    ,  0.02  ],
		[ 1.    , -0.    ,  0.    ,  0.02  ],
		[ 1.    , -0.    ,  0.    ,  0.02  ],

		[ 0.9774, -0.0189, -0.2106,  0.06  ],
		[ 1.    , -0.    ,  0.    ,  0.02  ],
		[ 1.    , -0.    ,  0.    ,  0.02  ],
		[ 1.    , -0.    ,  0.    ,  0.02  ],

		[ 0.8965, -0.0368, -0.4415,  0.06  ],
		[ 1.    , -0.    , -0.    ,  0.02  ],
		[ 1.    , -0.    , -0.    ,  0.02  ],
		[ 1.    , -0.    , -0.    ,  0.02  ]
	];

	static getBones(){
		const positions = SourceSkeleton.positions.map(p=>new THREE.Vector3().fromArray(p).multiplyScalar(p[3]));
	
		const names = Object.keys(SourceSkeleton.bone_map);
		const bones = [];
		for(let i=0; i<positions.length; i++){
			const bone = new THREE.Bone();//quaternion = (0, 0, 0, 1)
			bone.name = names[i];
			bone.position.copy(positions[i]);
			bones.push(bone);
			if(SourceSkeleton.parents[i]!=-1)
				bones[SourceSkeleton.parents[i]].add(bone);
		}
		return bones;
	}
}

export class VRMSkeleton{
	static morph_map = {
		"aa":0,
		"ee":1,
		"ih":2,
		"oh":3,
		"ou":4,
		"blink":12,
		"happy":13,
		"sad":14,
		"angry":15,
		"Suprise":16,
	};
	static bone_map = [
		THREE_VRM.VRMHumanBoneName.Hips                   ,
		THREE_VRM.VRMHumanBoneName.RightUpperLeg          ,
		THREE_VRM.VRMHumanBoneName.RightLowerLeg          ,
		THREE_VRM.VRMHumanBoneName.RightFoot              ,
		THREE_VRM.VRMHumanBoneName.LeftUpperLeg           ,
		THREE_VRM.VRMHumanBoneName.LeftLowerLeg           ,
		THREE_VRM.VRMHumanBoneName.LeftFoot               ,
		THREE_VRM.VRMHumanBoneName.Spine                  ,
		THREE_VRM.VRMHumanBoneName.Chest                  ,
		THREE_VRM.VRMHumanBoneName.UpperChest             ,
		THREE_VRM.VRMHumanBoneName.Neck                   ,
		THREE_VRM.VRMHumanBoneName.Head                   ,
		THREE_VRM.VRMHumanBoneName.LeftShoulder           ,
		THREE_VRM.VRMHumanBoneName.LeftUpperArm           ,
		THREE_VRM.VRMHumanBoneName.LeftLowerArm           ,
		THREE_VRM.VRMHumanBoneName.LeftHand               ,
		THREE_VRM.VRMHumanBoneName.RightShoulder          ,
		THREE_VRM.VRMHumanBoneName.RightUpperArm          ,
		THREE_VRM.VRMHumanBoneName.RightLowerArm          ,
		THREE_VRM.VRMHumanBoneName.RightHand              ,
		THREE_VRM.VRMHumanBoneName.RightToes              ,
		THREE_VRM.VRMHumanBoneName.LeftToes               ,
		THREE_VRM.VRMHumanBoneName.RightThumbProximal     ,
		THREE_VRM.VRMHumanBoneName.RightThumbMetacarpal   ,
		THREE_VRM.VRMHumanBoneName.RightThumbDistal       ,
		THREE_VRM.VRMHumanBoneName.RightIndexProximal     ,
		THREE_VRM.VRMHumanBoneName.RightIndexIntermediate ,
		THREE_VRM.VRMHumanBoneName.RightIndexDistal       ,
		THREE_VRM.VRMHumanBoneName.RightMiddleProximal    ,
		THREE_VRM.VRMHumanBoneName.RightMiddleIntermediate,
		THREE_VRM.VRMHumanBoneName.RightMiddleDistal      ,
		THREE_VRM.VRMHumanBoneName.RightRingProximal      ,
		THREE_VRM.VRMHumanBoneName.RightRingIntermediate  ,
		THREE_VRM.VRMHumanBoneName.RightRingDistal        ,
		THREE_VRM.VRMHumanBoneName.RightLittleProximal    ,
		THREE_VRM.VRMHumanBoneName.RightLittleIntermediate,
		THREE_VRM.VRMHumanBoneName.RightLittleDistal      ,
		THREE_VRM.VRMHumanBoneName.LeftThumbProximal      ,
		THREE_VRM.VRMHumanBoneName.LeftThumbMetacarpal    ,
		THREE_VRM.VRMHumanBoneName.LeftThumbDistal        ,
		THREE_VRM.VRMHumanBoneName.LeftIndexProximal      ,
		THREE_VRM.VRMHumanBoneName.LeftIndexIntermediate  ,
		THREE_VRM.VRMHumanBoneName.LeftIndexDistal        ,
		THREE_VRM.VRMHumanBoneName.LeftMiddleProximal     ,
		THREE_VRM.VRMHumanBoneName.LeftMiddleIntermediate ,
		THREE_VRM.VRMHumanBoneName.LeftMiddleDistal       ,
		THREE_VRM.VRMHumanBoneName.LeftRingProximal       ,
		THREE_VRM.VRMHumanBoneName.LeftRingIntermediate   ,
		THREE_VRM.VRMHumanBoneName.LeftRingDistal         ,
		THREE_VRM.VRMHumanBoneName.LeftLittleProximal     ,
		THREE_VRM.VRMHumanBoneName.LeftLittleIntermediate ,
		THREE_VRM.VRMHumanBoneName.LeftLittleDistal       
	];
	static getBones(vrm){
		return VRMSkeleton.bone_map.map(b => vrm.humanoid.getNormalizedBoneNode(b));
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
		const target_bones = Object.values(SourceSkeleton.bone_map).map( num=> (num!=-1 ? bones[num] : undefined) );

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
		const [Root, LeftUpperLeg, LeftLowerLeg, LeftFoot, RightUpperLeg] = 
			bones.slice(0, 5).map(b => b.getWorldPosition(new THREE.Vector3()));
		const HipMid = RightUpperLeg.clone().add(LeftUpperLeg).multiplyScalar(0.5);
		const foot = manual ? 0.065 : LeftFoot.y;
		return LeftUpperLeg.distanceTo(LeftLowerLeg) + LeftLowerLeg.distanceTo(LeftFoot) + HipMid.distanceTo(Root) + foot;
	}

	setRotations(rotations){
		rotations = rotations.map(r => new THREE.Quaternion().fromArray(r));
		rotations[3].multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-25*0.0174533,0,0)));
		rotations[6].multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(-25*0.0174533,0,0)));
		for(let i=0; i<rotations.length; i++)
			this.source_bones[i]?.quaternion.copy(rotations[i]);
	}
	setTranslation(translation, lengths){
		this.source_bones[0].position.fromArray(translation);
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