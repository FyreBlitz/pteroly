import req from "../ClientRequest";

/**
 * @param {String} path The path of the request
 * @param {String} body The body
 */
function patch(path: string, body: JSON): Promise<any> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.cPatchRequest(path, body);
}

export default patch;