import req from "../../ApplicationRequest";

function deleteAllocation(nodeId: number, allocationId: number) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.deleteRequest('DeleteAllocation', nodeId, allocationId)
}

module.exports = deleteAllocation