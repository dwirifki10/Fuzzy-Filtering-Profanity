const getDataJSON = (data, exceptData, inclusion = 0, exclusion = 0) => {
	data.splice(30, inclusion.length);
	exceptData.splice(4, exclusion.length);
};

module.exports = getDataJSON;
