import { Command } from "../terminal/Command.js";

export class Session {
	#name;
	#windows = [];

	constructor({ session, windows }) {
		this.#name = session;
		this.#windows = windows;
	}

	get exactName() {
		return "=" + this.#name;
	}

	start() {
		try {
			new Command("has-session").with("-t", this.exactName).execute();
		} catch {
			this.#create();
		} finally {
			this.#attach();
		}
	}

	#create() {
		new Command("new-session")
			.with("-s", this.#name)
			.with("-n", this.#windows[0].name)
			.with("-d")
			.execute();
	}

	#attach() {
		new Command("attach-session")
			.with("-t", this.exactName)
			.options({ stdio: "inherit" })
			.execute();
	}
}
