const req = require('../ApplicationRequest.js');
/**
 * @param {String} shortName The short name of your location
 * @param {String} longName The long name of your location
 * @yields Object (refer to docs for schema);
 */
function createLocation(shortName, longName) {
	const data = makeData(shortName, longName)
	const Req  = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.postRequest('CreateLocation', data)
}

function makeData(shortName, longName) {
	return {
        "short": shortName,
        "long":  longName,
	}
}
module.exports = createLocation