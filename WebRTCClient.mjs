import * as utils from "./utils.mjs";
import * as THREE from 'three'

// if(RTCPeerConnection.prototype.addTransceiver===undefined || window.chrome){
// 	RTCPeerConnection.prototype.addTransceiver = function(kind){
// 		if(this._offerOptions===undefined)
// 			this._offerOptions={};
// 		if(kind==='audio')
// 			this._offerOptions.offerToReceiveAudio=true;
// 		else if(kind==='video')
// 			this._offerOptions.offerToReceiveVideo=true;
// 	}
// 	RTCPeerConnection.prototype.origCreateOffer = RTCPeerConnection.prototype.createOffer;
// 	RTCPeerConnection.prototype.createOffer = function(){
// 		return this.origCreateOffer(this._offerOptions);
// 	}
// }

class SignalingClient extends THREE.EventDispatcher{
	constructor(){
		super();
		this.name;
		this.socket;

		this.addEventListener("login", (event)=>{
			if(this.name === undefined){
				let name = event.data;
				//console.log("Set name: ", name);
				this.name = name;
			}
			else
				console.log("Already has name: ", this.name, ", ", name);
			this.dispatchEvent({type: "logged", data: undefined});
		});
	}
	close(){
		this.socket.close();
		this.socket = undefined;
	}
	login(url){
		let apiversion = utils.get_param("apiversion");
		if(apiversion==2)
		{
			this.socket = new WebSocket(url, utils.has_param("host") ? ["WebSocket++", 	"apiversion_2"]: ["apiversion_2"]);
		}
		else
		{
			this.socket = new WebSocket(url, utils.has_param("host") ? ["WebSocket++"]: []);
		}
		this.socket.onmessage = (msg) => { 
			const request = JSON.parse(msg.data); 
			//const [req_type, data] = [request.req_type, request.data];
			request.type = request.req_type;
			//console.log("Recv: ", request); 

			this.dispatchEvent(request);
		}; 
		this.socket.onopen = (event) => { 
			console.log("Connected to the signaling server "+event);
		};
		this.socket.onerror = console.warn;
		this.socket.onclose = (event) =>{
			this.dispatchEvent({
				type: "close",
				data: event
			})
		};
	}
	signal(msg){
		//console.log("Send: ", msg.data);
		msg.s_name = this.name;
		this.socket.send(JSON.stringify(msg));
	}
}

function updateBandwidthRestriction(desc) {
	let sdp = desc.sdp;
	let ASstr = window.chrome ? 'AS:100000' : 'TIAS:100000000'
	if(!sdp.includes(ASstr))
		sdp = sdp.replace(new RegExp("(m=video.*\r\n.*)"), `$1\r\nb=${ASstr}`);
	try{
		let start_bitrate = new URL(window.location.href).searchParams.get("start");
		let min_bitrate = new URL(window.location.href).searchParams.get("min");
		let max_bitrate = new URL(window.location.href).searchParams.get("max");
		let setting = "";
		if(min_bitrate)
			setting += `;x-google-min-bitrate=${min_bitrate}`
		if(start_bitrate)
			setting += `;x-google-start-bitrate=${start_bitrate}`
		if(max_bitrate)
			setting += `;x-google-max-bitrate=${max_bitrate}`
		sdp = sdp.replaceAll(new RegExp("(a=fmtp:.*)", "g"), `$1${setting}`);
	}catch(e){
		console.log("set starting bitrate failed");
	}
	return {
		type: desc.type,
		sdp: sdp
	};
}

class PeerConnection extends THREE.EventDispatcher{
	constructor(peer, socket, turn){
		super();
		this.peer = peer;
		this.socket = socket;

		let ICE_config= {
			"iceServers":[
				{
					urls: ["stun:stun.l.google.com:19302"]
				},
			],
			//"iceTransportPolicy": "relay"
		};
		if(turn!==undefined)
			ICE_config.iceServers = ICE_config.iceServers.concat(turn);
		//if(!utils.has_param("host"))

		let optional = {"optional": [{googCpuOveruseDetection: false}]};
		this.pc = new RTCPeerConnection(ICE_config, optional);
		this.pc.onnegotiationneeded = ()=>{console.log("onnegotiationneeded");};

		let isHost = utils.has_param("host");

		//remote track
		this.pc.addTransceiver("video", {
			direction: isHost ? "sendonly" : "recvonly",
			// sendEncodings: [
			// 	{maxBitrate: 100000000}
			// ]
		});
		this.pc.addTransceiver("audio", {
			direction: isHost? "sendonly" : "recvonly",
		});

		this.pc.ontrack = (event) => {
			try{
				let delay = utils.get_param("delay");
				if(delay)
					for(let receiver of this.pc.getReceivers())
						receiver.playoutDelayHint = delay;
			}catch(e){
				console.log("set playoutDelay failed");
			}
			this.dispatchEvent({type: "track", data: event});
		}

		this.pc.oniceconnectionstatechange = (event) => {
			if(this.pc.iceConnectionState == "disconnected"){
				console.log("Detect iceConnectionStateChange to disconnected " + event)
				//this.close();
			}
		}

		//candidate, on local icecandidate ready
		this.pc.onicecandidate = (event) => {
			if(event.candidate){
				this.socket.signal({
					req_type: "candidate",
					data: event.candidate,
					r_name: this.peer
				}); 
			}
		};
		
		//remote datachannel
		this.pc.ondatachannel = (event) => {
			//console.log(event);
			if(!isHost){
				this.dataChannel = event.channel;
				this.initChannel(this.dataChannel);
			}
		}

		//local datachannel
		if(isHost){
			this.dataChannel = this.pc.createDataChannel(this.socket.name);
			this.initChannel(this.dataChannel);
		}
	}
	close(){
		if(this.pc){
			if(this.dataChannel){
				this.closeChannel(this.dataChannel);
				this.dataChannel = undefined;
			}
			for(const name of Object.keys(this.pc))
				if(name.startsWith("on"))
					this.pc[name]=undefined;
			this.pc.close();
			this.pc = undefined;
		}else{
			console.warn("rtc is not initialized");
		}
		this.dispatchEvent({type:"close"});
	}

	//---------webrtc--------
	async offer() {//create sdp offer
		try{
			let offer = await this.pc.createOffer();
			offer = updateBandwidthRestriction(offer);
			await this.pc.setLocalDescription(offer);
			this.onSetLocalDescription();
		}catch(e){
			console.warn(e);
		}
	}
	async onOffer(offer) {
		try{
			offer = updateBandwidthRestriction(offer);
			await this.pc.setRemoteDescription(offer);
			let answer = await this.pc.createAnswer();
			answer = updateBandwidthRestriction(answer);
			await this.pc.setLocalDescription(answer);
			this.onSetLocalDescription();
		}catch(e){
			console.warn(e);
		}
	}
	async onAnswer(answer) {//receive answer
		try{
			answer = updateBandwidthRestriction(answer);
			await this.pc.setRemoteDescription(answer);
		}catch(e){
			console.warn(e);
		}
	}
	onSetLocalDescription(){//send description to peer
		this.socket.signal({
			req_type: this.pc.localDescription.type,
			data: this.pc.localDescription,
			r_name: this.peer
		});
	}
	onCandidate(candidate) {//on receive icecandidate
		this.pc.addIceCandidate(new RTCIceCandidate(candidate))
		.catch((error)=>{
			console.warn(error, "addIceCandidate failed", candidate);
		});
	}
	//---------webrtc--------

	//-------datachannel-------
	initChannel(channel){
		channel.binaryType = "arraybuffer";
		channel.onmessage = (event) => {
			this.dispatchEvent({type: "message", data: event.data});
		};
		channel.onerror = console.warn;
		channel.onclose = () => { 
			console.log("onclose: ", channel.label);
		};
		channel.onopen = () => {
			console.log("onopen: ", channel.label);
			this.dispatchEvent({type: "datachannel", data: undefined});
		};
	}
	closeChannel(channel){
		channel.close();
		channel.onmessage = undefined;
		channel.onerror = undefined;
		channel.onclose = undefined;
		channel.onopen = undefined;
	}
	send(data){//send through datachannel
		if(this.dataChannel && this.dataChannel.readyState==="open")
			this.dataChannel.send(data);
	}
	sendJSON(req_type, data){
		this.send(JSON.stringify({
			req_type: req_type,
			data: data
		}));
	}	
	//-------datachannel-------

	addStream(stream){
		this.stream = stream;
		this.stream.getTracks().forEach((track)=>{
			this.pc.addTrack(track);
		});
	}
}

export class Client extends THREE.EventDispatcher{
	constructor(){
		super();
		//websocket signaling client
		this.socket;
		//rtc
		this.pcs = {};

		this.connected = false;

		// this.initStat();
	}
	getPC(peer, turn){
		if(this.pcs[peer]===undefined){
			this.pcs[peer] = new PeerConnection(peer, this.socket, turn===undefined ? this.turn: turn);
			if(this.stream){
				this.pcs[peer].pc.addStream(this.stream);
			}
			this.pcs[peer].addEventListener("datachannel", (e)=>{
				this.dispatchEvent(e);
			});
			this.pcs[peer].addEventListener("message", (e)=>{
				//e.data.type = e.data.req_type
				//this.dispatchEvent(e.data);
				this.dispatchEvent({type: "message", data: e.data});
			});
			this.pcs[peer].addEventListener("track", (e)=>{
				this.dispatchEvent(e);
			})
			this.pcs[peer].addEventListener("close", ()=>{
				delete this.pcs[peer];
			});
		}
		return this.pcs[peer];
	}
	isConnected(){
		return this.connected;
	}
	get pc(){
		return Object.values(this.pcs)[0];//the only pc for client.
	}
	connect(url){
		this.socket = new SignalingClient();
		this.socket.addEventListener("room", (e)=>{
			this.connected = true;
			this.dispatchEvent(e);
		});

		this.socket.addEventListener("logged", ()=>{
			this.socket.addEventListener("turn", (e)=>{
				this.turn = e.data;
			});
			//host side
			this.socket.addEventListener("user", (e)=>{
				let user = e.s_name;
				let turn = e.data;
				console.log("User: ", user);
				this.getPC(user, turn).offer();//send offer to the user
			});
			this.socket.addEventListener("answer", (e)=>{
				this.getPC(e.s_name).onAnswer(e.data);
			});
			//--------------

			this.socket.addEventListener("offer", (e)=>{
				this.getPC(e.s_name).onOffer(e.data);
			});
			this.socket.addEventListener("candidate", (e)=>{
				this.getPC(e.s_name).onCandidate(e.data);
			});
			this.socket.addEventListener("leave", (e)=>{
				this.getPC(e.s_name).close();
			});
		});

		this.socket.login(url);
	}

	close(){
		this.connected = false;
		//close everything!
		for(let [name, pc] of Object.entries(this.pcs)){
			name;
			pc.close();
		}
		this.pcs = {};

		if(this.socket){
			this.socket.close();
		}else{
			console.warn("socket is not initialized");
		}
	}
	send(data){
		if(this.pc)
			this.pc.send(data)
	}
	sendJSON(req_type, data){
		if(this.pc)
			this.pc.sendJSON(req_type, data);
	}
	addStream(stream){
		this.stream = stream;
		for(let [name, pc] of Object.entries(this.pcs)){
			name;
			if(pc.stream===undefined)
				pc.addStream(stream);
		}
	}
	// initStat(){
	// 	let stats = new Stats();
	// 	stats.domElement.id = "stats";
	// 	let brPanel = stats.addPanel(new Stats.Panel('kbps', '#0ff', '#002'));
	// 	stats.domElement.style.zIndex = 1000;
	// 	// stats.domElement.style.removeProperty("left");
	// 	// stats.domElement.style.setProperty("right", "0px");
	// 	// stats.domElement.style.setProperty("top", "0px");
	// 	stats.domElement.style.setProperty("position", "absolute");
	// 	document.body.appendChild(stats.domElement);
	//
	// 	stats.showPanel(2);
	// 	let lastResult;
	// 	setInterval(async()=>{
	// 		if(!this.pc)
	// 			return;
	// 		let receivers = this.pc.pc.getReceivers();
	// 		receivers.forEach(async (receiver)=>{
	// 			if(receiver.track.kind=="video" && !receiver.track.muted){
	// 				let stats = await receiver.getStats();
	// 				stats.forEach((report)=>{
	// 					if(report.type=="inbound-rtp"){
	// 						if(report.isRemote){
	// 							return;
	// 						}
	// 						const now = report.timestamp;
	// 						const bytes = report.bytesReceived;
	// 						//const headerbytes = report.headerBytesSent;
	// 						const packets = report.packetsReceived;
	// 						if(lastResult && lastResult.has(report.id)){
	// 							const bitrate = 8 * (bytes - lastResult.get(report.id).bytesReceived) / (now - lastResult.get(report.id).timestamp);
	// 							//const headerrate = 8 * (headerBytes - lastResult.get(report.id).headerBytesSent) / (now - lastResult.get(report.id).timestamp);
	// 							brPanel.update(bitrate);
	// 						}
	// 					}
	// 				});
	// 				lastResult = stats;
	// 			}
	// 		});
	//
	// 	},
	// 	1000);
	//
	// 	return stats;
	// }
}
