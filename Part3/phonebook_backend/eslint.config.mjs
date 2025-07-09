import globals from "globals";
import { defineConfig,  globalIgnores  } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  { 
    files: ["**/*.js"], 
    languageOptions: { sourceType: "commonjs" }, 
    plugins: {
			js,
		},
		extends: ["js/recommended"],
  },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
  globalIgnores([
    "**/.dist/",
    "**/assets/"
  ]),
  {
		rules: {
			eqeqeq: "error"			
		},
	},
]);
