import req from "../../ApplicationRequest";

type pageType = number | -1;

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
};

function listAllocations(nodeId: number, page: pageType): Promise<returnType[]> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('ListAllocations', nodeId, page);
}

export default listAllocations;