import { validateConfig } from "../utils/validateConfig.js";
import { Session } from "./tmux/Session.js";
import { Window } from "./tmux/Window.js";

export class Flow {
	#config;

	constructor(config) {
		this.#config = config;
	}

	start() {
		const validConfig = validateConfig(this.#config);
		const session = new Session(validConfig.session);

		this.#setWindows(session);
		session.start();
	}

	#setWindows(session) {
		for (const window of this.#config.windows) {
			session.addWindow(new Window(window.name, window.command));
		}
	}
}
