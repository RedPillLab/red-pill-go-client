class BitsConsumer{
	constructor(buf){
		this.buf = new Uint8Array(buf);
		this.offset = 0;
	}
	// bits <= 31
	consume(bits, signed=true){
		let num=0;
		for (let i = 0; i < bits; i++)
			if(this.at(this.offset++))
				num |= (1 << i);
		if(signed)
			if(num & (1<<(bits-1)))//is MSB set?
				num -= 1<<bits;
		return num;
	}
	at(b){
		const offset = b >> 3; //b/8
		const shift = b & 0b111; //b%8, 0~7
		return (this.buf[offset] & (1<<shift)) ? 1 : 0;
	}
}

export class Parser{
	static parseTable = [
		()=>{},
		Parser.parseRotationFrame,
		Parser.parseTranslationFrame,
		Parser.parseMorphFrame
	];
	static typeTable = [
		undefined,
		"rotations",
		"translations",
		"morph",
	];
	static parse(buf){
		const id = new Uint8Array(buf)[0];
		return [Parser.typeTable[id], Parser.parseTable[id].bind(Parser)(buf.slice(1))];
	}

	static DeserializeQ(bits){
		const id = bits.consume(2, false);
		const x = bits.consume(14)/10000;
		const y = bits.consume(14)/10000;
		const z = bits.consume(14)/10000;
		const r = Math.sqrt(Math.abs(1.0 - (Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2))));
		switch(id){
			case 0:
				return [x, y, z, r];
			case 1:
				return [r, y, z, x];
			case 2:
				return [y, r, z, x];
			case 3:
				return [y, z, r, x];
			default:
				return [];
		}
	}

	static parseRotationFrame(buf)
	{
		const num_joints = new BigUint64Array(buf.slice(0, 8))[0];/* eslint-disable-line */
		const bits = new BitsConsumer(buf.slice(8));
		const rotations = [];
		for(let i=0; i<num_joints; i++)
			rotations.push(Parser.DeserializeQ(bits));
		return rotations;
	}

	static parseTranslationFrame(buf)
	{
		const root = [...(new Float32Array(buf.slice(8, 20)))];
		const lens = [...(new Uint16Array(buf.slice(20)))].map(e=>e/65535.0);
		return [root, lens];
	}

	static parseMorphFrame(buf)
	{
		return [...new Uint8Array(buf)].map((e)=>{return e/255.0;});
	}
}