if(!("window" in globalThis))
	globalThis.window = globalThis;
window.sleep = (ms)=>{
	return new Promise(resolve => setTimeout(resolve, ms));
}
function getOS() {
	var userAgent = window.navigator.userAgent,
		platform = window.navigator.platform,
		macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
		windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
		iosPlatforms = ['iPhone', 'iPad', 'iPod'],
		os = null;
  
	if (macosPlatforms.indexOf(platform) !== -1) {
	  os = 'Mac OS';
	} else if (iosPlatforms.indexOf(platform) !== -1) {
	  os = 'iOS';
	} else if (windowsPlatforms.indexOf(platform) !== -1) {
	  os = 'Windows';
	} else if (/Android/.test(userAgent)) {
	  os = 'Android';
	} else if (!os && /Linux/.test(platform)) {
	  os = 'Linux';
	}
	return os;
}
window.os = getOS();
  

export function isFullscreen(){
	if(window.os=='Mac OS' || window.os=='iOS')
		return document.webkitCurrentFullScreenElement!==null
	else if(window.os=='Windows' || window.os=='Android')
		return document.fullscreenElement!==null;
	else
		return screen.width==window.innerWidth && screen.height==window.innerHeight;
}

export function withoutExtension(filename){
	return filename.split('.').slice(0, -1).join('.');
}	
export function getExtension(filename){
	return filename.split('.').pop();
}
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export class Animator{
	constructor(fps){
		if(fps !== undefined)
			this.at(fps);
		this.start = Date.now();
	}
	animate(func){
		requestAnimationFrame(()=>{this.animate(func);});
		if(this.mspf !== undefined){
			var now = Date.now();
			var elapsed = now - this.start;
			if(elapsed > this.mspf) {
				this.start = now - (elapsed % this.mspf);
				func();
			}
		}
		else{
			func();
		}
		return this;
	}
	at(fps){
		this.mspf = 1000/fps;
	}
}

export function Stopwatch(sec = true){
	var init;
	var start;
	var time_fn;
	time_fn = sec ? ()=>{return Date.now()/1000} : ()=>{return Date.now()};
	var self = {
		start: ()=>{
			init = time_fn();
			start = init;
			return self;
		},
		lap: ()=>{
			var now = time_fn();
			var delta = now-start;
			start = now;
			return delta;
		},
		time: ()=>{
			var now = time_fn();
			var delta = now-init;
			return delta;
		}
	}
	return self;
}
export function timeit(fn, number=10000){
	let start = Date.now();
	for(let i=0; i<number; i++)
		(()=>{fn();})();
	return (Date.now()-start)/1000/number;
}
//fill
Math.clamp = function(mid, min, max){
	return Math.min(Math.max(min,mid),max);
}
Math.lerp = function (a, b, p) {
	return a + (b - a) * p;
};
Math.random = (()=>{
	let random = Math.random;
	return function(min, max){
		if(max===undefined){
			if(min===undefined){
				return random();
			}
			else{
				max = min;//single argument, treat min as max
				return random()*max;
			}
		}
		else{
			return random()*(max-min)+min;
		}
	}
})();
Math.randomInt = function(min, max){
	return Math.floor(Math.random(min, max+1))|0;//+1 for including max
}
Object.defineProperty(Array.prototype, "last", {
	get: function last(){
		return this[this.length-1];
	}
});
Object.defineProperty(Array.prototype, "first", {
	get: function first(){
		return this[0];
	}
});

export function has_param(key){
	return new URL(window.location.href).searchParams.has(key);
}
export function get_param(key){
	return new URL(window.location.href).searchParams.get(key);
}

export function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

