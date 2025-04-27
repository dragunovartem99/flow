#!/usr/bin/env node

import path from "path";
import { Flow } from "./objects/Flow.js";
import { Config } from "./objects/config/Config.js";

let a;
const cwd = process.cwd();

try {
	const configPath = path.join(cwd, ".flow.json");
	new Flow(new Config(configPath).parse()).start();
} catch (error) {
	console.error(error.toString());
	process.exit(1);
}
