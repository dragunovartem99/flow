import { Command } from "../terminal/Command.js";
import { Window } from "./Window.js";

export class Session {
	#name;
	#windows = [];

	constructor({ session, windows }) {
		this.#name = session;
		this.#setWindows(windows);
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

	#setWindows(windows) {
		for (let i = 0; i < windows.length; i++) {
			const { name, command } = windows[i];
			const window = new Window(name, command);
			window.session = this;
			this.#windows.push(window);
		}
	}

	#create() {
		new Command("new-session").with("-s", this.#name).with("-d").run();

		for (let i = 0; i < this.#windows.length; i++) {
			const unnamedWindow = `${this.id}:${i}`;

			if (i >= 1) {
				new Command("new-window").with("-t", unnamedWindow).run();
			}

			new Command("rename-window").with("-t", unnamedWindow, this.#windows[i].name).run();
			this.#windows[i].sendKeys();
		}
	}

	#attach() {
		new Command("attach-session").with("-t", this.id).options({ stdio: "inherit" }).run();
	}
}
