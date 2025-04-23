import fs from "fs";

export class Config {
	#path;

	constructor(path) {
		this.#path = path;
	}

	parse() {
		const content = this.#readContent(this.#path);
		const config = this.#parseJson(content);
		return config;
	}

	#readContent(path) {
		return fs.readFileSync(path, "utf8");
	}

	#parseJson(content) {
		return JSON.parse(content);
	}
}
