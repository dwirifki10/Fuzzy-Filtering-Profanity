const { checkFilterProfanity } = require("./handler");

const routes = [
	{
		method: "POST",
		path: "/api/v1/filter",
		handler: checkFilterProfanity,
	},
];

module.exports = routes;
