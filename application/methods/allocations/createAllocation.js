const req = require('../../ApplicationRequest.js')
/**
 * @param {Number} nodeId The id of the nodes you want to add am allocation to
 * @param {String} ip The ip of the new allocation
 * @param {Array} ports The ports you want to add to the node
 * @yields Object (refer to docs for schema);
 */
function createAllocation(nodeId, ip, ports) {
    const data = makeData(ip, ports)
	const Req  = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY)
	return Req.postRequest('CreateAllocation', data, nodeId)
}

function makeData(ip, ports) {
	return {
        "ip": ip,
        "ports": ports
	}
}

module.exports = createAllocation