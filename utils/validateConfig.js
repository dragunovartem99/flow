import { ConfigError } from "../objects/error/ConfigError.js";

import { isObject } from "./guards/isObject.js";
import { isArray } from "./guards/isArray.js";
import { isString } from "./guards/isString.js";

const isNonEmptyString = (str) => isString(str) && str.trim() !== "";
const isNonEmptyArray = (arr) => isArray(arr) && arr.length > 0;

const validate = (message, testFn) => {
	if (!testFn()) throw new ConfigError(message);
};

function checkConfigType(config) {
	validate("Config must be an object", () => isObject(config));
}

function checkSessionName({ session }) {
	validate('Config must have a "session" property', () => session);
	validate('"session" must be a non-empty string', () => isNonEmptyString(session));
}

function checkWindow({ name }, index) {
	validate(`Window ${index} must have "name" property`, () => name);
	validate(`Window ${index} "name" must be a non-empty string`, () => isNonEmptyString(name));
}

function checkWindows({ windows }) {
	validate('"windows" must be a non-empty array', () => isNonEmptyArray(windows));
	windows.forEach(checkWindow);
}

export function validateConfig(config) {
	checkConfigType(config);
	checkSessionName(config);
	checkWindows(config);
	return config;
}
