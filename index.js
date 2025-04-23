import { Flow } from "./objects/Flow.js";
import { Config } from "./objects/config/Config.js";

new Flow(new Config(".flow.json").parse()).start();
