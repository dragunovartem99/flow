import fs from "fs";

export class Config {
	#path;

	constructor(path) {
		this.#path = path;
	}

	json() {
		return JSON.parse(fs.readFileSync(this.#path, "utf8"));
	}
}
