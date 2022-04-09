import req from "../../ApplicationRequest";

/**
 * 
 * @param {Number} nestId The id of the Nest
 */

 interface returnType {
	id: number,
	uuid: string,
	author: string,
	name: string,
	description: string,
	created_at: string,
	updated_at: string,
}

function nestDetails(nestId: number): Promise<returnType> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY)
	return Req.getRequest('nestDetails', nestId, null);
}

export default nestDetails