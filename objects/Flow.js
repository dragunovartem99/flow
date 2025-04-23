import { Session } from "./tmux/Session.js";

export class Flow {
	#config;

	constructor(config) {
		this.#config = config;
	}

	start() {
		const session = new Session(this.#config);
		session.start();
	}
}
