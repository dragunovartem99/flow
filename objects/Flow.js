import { Session } from "./tmux/Session.js";
import { Window } from "./tmux/Window.js";

export class Flow {
	#config;

	constructor(config) {
		this.#config = config;
	}

	start() {
		const session = new Session(this.#config.session);
		this.#setWindows(session);
		session.start();
	}

	#setWindows(session) {
		for (const window of this.#config.windows) {
			session.addWindow(new Window(window.name, window.command));
		}
	}
}
