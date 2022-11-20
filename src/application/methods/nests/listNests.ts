import req from "../../ApplicationRequest";

interface returnType {
	object: "nest",
	attributes: {
		id: number,
		uuid: string,
		author: string,
		name: string,
		description: string,
		created_at: string,
		updated_at: string,
	}
}

function listNests(): Promise<returnType[]> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.getRequest('ListNests', null, null);
}

export default listNests