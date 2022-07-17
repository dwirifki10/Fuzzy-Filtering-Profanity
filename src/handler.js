const { fuzzyFilter } = require("./libraries/FilteringProfanity/lib/index.js");

const checkFilterProfanity = async (request, h) => {
	let { merge } = request.query;
	let { sentence, inclusion, exclusion } = request.payload;

	if (["true", "false"].includes(merge)) merge = Boolean(merge);

	if (inclusion !== undefined) {
		if (inclusion.includes("")) {
			return h
				.response({
					status: "failed",
					message: "undefined value '' of inclusion",
				})
				.code(422);
		}
		inclusion = inclusion.map((value) => {
			return value.toLowerCase();
		});
	}

	if (exclusion !== undefined) {
		exclusion = exclusion.map((value) => {
			return value.toLowerCase();
		});
	}

	const result = await fuzzyFilter(sentence, merge, inclusion, exclusion);

	if (result === false) {
		return h
			.response({
				status: "failed",
				message: "undefined value of sentence or parameter",
			})
			.code(400);
	}

	return h.response({ status: "success", data: result }).code(200);
};

module.exports = { checkFilterProfanity };
