const { fuzzyFilter } = require("./libraries/modules/main.js");

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
		if (exclusion.includes("")) {
			return h
				.response({
					status: "failed",
					message: "undefined value '' of exclusion",
				})
				.code(422);
		}
		exclusion = exclusion.map((value) => {
			return value.toLowerCase();
		});
	}

	const result = fuzzyFilter(sentence, merge, inclusion, exclusion);

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
