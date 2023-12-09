/** @type {import("lint-staged").Config} */
module.exports = {
	"*.{js,cjs,ts,json}": "eslint --fix"
};
