import { Command } from "../terminal/Command.js";

export class Window {
	#name;
	#keys;
	#session;

	constructor(name, keys) {
		this.#name = name;
		keys && (this.#keys = keys);
	}

	set session(session) {
		this.#session = session;
	}

	get name() {
		return this.#name;
	}

	get id() {
		return this.#session.id + ":" + this.#name;
	}

	sendKeys() {
		if (this.#keys) {
			new Command("send-keys")
				.with("-t", this.id)
				.with(`"${this.#keys}"`)
				.with("ENTER")
				.execute();
		}
		return this;
	}
}
