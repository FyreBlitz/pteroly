import req from "../../ApplicationRequest";

function deleteAllocation(nodeId: number, allocationId: number): Promise<any> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.deleteRequest('DeleteAllocation', nodeId, allocationId)
}

export default deleteAllocation