import fs from "fs";

export class Config {
	#path;

	constructor(path) {
		this.#path = path;
	}

	parse() {
		return JSON.parse(fs.readFileSync(this.#path, "utf8"));
	}
}
