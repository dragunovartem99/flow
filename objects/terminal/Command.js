import { execSync } from "child_process";

export class Command {
	#instruction;
	#arguments = [];
	#options = {};

	constructor(instruction) {
		this.#instruction = instruction;
	}

	with(...args) {
		this.#arguments.push(...args);
		return this;
	}

	options(options) {
		this.#options = { ...options };
		return this;
	}

	run() {
		execSync(["tmux", this.#instruction, this.#arguments.join(" ")].join(" "), this.#options);
		return this;
	}
}
