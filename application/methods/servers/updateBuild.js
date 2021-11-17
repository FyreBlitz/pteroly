const req = require('../../ApplicationRequest.js');
/**
 * @param {Number} internalId The id of the server you want to update
 * @param {Number} allocation The primary allocation of the Server
 * @param {Number} cpu The amount of CPU in percent
 * @param {Number} memory The amount of RAM in MB
 * @param {Number} disk The amount of disk in MB
 * @param {Number} io The IO performance the server will get relative to the others
 * @param {Number} swap The amount of swap in MB
 * @param {Number} databases The amount of databases
 * @param {Number} allocations The amount of allocations
 * @param {Number} backups The amount of backups
 * @yields Object (refer to docs for schema);
 */
function updateBuild(internalId, allocation, cpu, memory, disk, io, swap, databases, allocations, backups) {
	const data = makeData(internalId, allocation, cpu, memory, disk, io, swap, databases, allocations, backups)
	const Req  = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.patchRequest('UpdateBuild', data, internalId)
}

function makeData(internalId, allocation, cpu, memory, disk, io, swap, databases, allocations, backups) {
	return {
		"id": internalId,
		"allocation": allocation,
		'memory': memory,
		'swap': swap,
		'disk': disk,
		'io': io,
		'cpu': cpu,
		"threads": null,
		'feature_limits': {
			'databases': databases,
			'allocations': allocations,
			"backups": backups
		}
	}
}
module.exports = updateBuild
