import { execSync } from "child_process";

export class Command {
	#instruction;
	#arguments = [];
	#options = {};

	constructor(instruction) {
		this.#instruction = instruction;
	}

	with(argument) {
		this.#arguments.push(argument);
		return this;
	}

	options(options) {
		this.#options = { ...options };
	}

	execute() {
		execSync(["tmux", this.#instruction, this.#arguments.join(" ")].join(" "), this.#options);
		return this;
	}
}
