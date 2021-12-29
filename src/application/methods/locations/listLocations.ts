import req from "../../ApplicationRequest";

interface returnType {
	object: "location",
	attributes: {
		id: number,
		short: string,
		long: string,
		updated_at: string,
		created_at: string,
	},
	meta: {
		resource: string,
	},
};

function listLocations(): Promise<returnType[]> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.getRequest('ListLocations', null, null);
}

export default listLocations;