const { fuzzyFilter } = require("../../lib/index.js");
const data = require("./data-test.js");

for (let i = 0; i <= data.data.length - 1; i++) {
	console.log(fuzzyFilter(data.data[i].test, true));
}
