import globals from "globals";
import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
	{
		files: ["**/*.js"],
		plugins: { js },
		extends: ["js/recommended"],
		rules: {},
		languageOptions: {
			globals: globals.node,
		},
	},
]);
