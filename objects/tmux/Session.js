import { Command } from "../terminal/Command.js";

export class Session {
	#name;
	#windows = [];

	constructor(name) {
		this.#name = name;
	}

	get id() {
		return "=" + this.#name;
	}

	start() {
		try {
			new Command("has-session").with("-t", this.id).run();
		} catch {
			this.#create();
		} finally {
			this.#attach();
		}
	}

	addWindow(window) {
		window.session = this;
		this.#windows.push(window);
	}

	#create() {
		new Command("new-session").with("-s", this.#name).with("-d").run();

		for (const [index, window] of Object.entries(this.#windows)) {
			const anonWindow = `${this.id}:${index}`;

			if (index > 0) {
				new Command("new-window").with("-t", anonWindow).run();
			}

			new Command("rename-window").with("-t", anonWindow, window.name).run();
			window.sendKeys();
		}
	}

	#attach() {
		new Command("attach-session").with("-t", this.id).options({ stdio: "inherit" }).run();
	}
}
