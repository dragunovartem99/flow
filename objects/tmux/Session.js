export class Session {
	#name;
	#windows = [];

	constructor({ session, windows }) {
		this.#name = session;
		this.#windows = windows;
	}

	start() {
		console.log(this.#name);
		console.log(this.#windows);
	}
}
