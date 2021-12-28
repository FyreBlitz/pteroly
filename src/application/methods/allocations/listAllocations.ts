import req from "../../ApplicationRequest";

interface returnType {
	object: "allocation",
	attributes: {
	  id: number,
	  ip: string,
	  alias: string | null,
	  port: number,
	  notes: string | null,
	  assigned: boolean
	}
}

function listAllocations(nodeId: number, page: number): Promise<returnType[]> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	if (page != null) return Req.getRequest('GetAllAllocations', nodeId, page);
	return Req.getRequest('GetAllAllocations', nodeId, null);
}

export default listAllocations