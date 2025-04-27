import { ConfigError } from "../objects/error/ConfigError.js";

import { isObject } from "./guards/isObject.js";
import { isArray } from "./guards/isArray.js";
import { isString } from "./guards/isString.js";

const isNonEmptyString = (str) => isString(str) && str.trim() !== "";
const isNonEmptyArray = (arr) => isArray(arr) && arr.length > 0;

const test = (message, fn) => {
	if (!fn()) throw new ConfigError(message);
};

function checkConfigType(config) {
	test("Config must be an object", () => isObject(config));
}

function checkSessionName({ session }) {
	test('Config must have a "session" property', () => session);
	test('"session" must be a non-empty string', () => isNonEmptyString(session));
}

function checkWindow({ name }, index) {
	test(`Window ${index} must have "name" property`, () => name);
	test(`Window ${index} "name" must be a non-empty string`, () => isNonEmptyString(name));
}

function checkWindows({ windows }) {
	test('"windows" must be a non-empty array', () => isNonEmptyArray(windows));
	windows.forEach(checkWindow);
}

export function validateConfig(config) {
	checkConfigType(config);
	checkSessionName(config);
	checkWindows(config);
	return config;
}
