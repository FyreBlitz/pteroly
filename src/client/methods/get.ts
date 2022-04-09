import req from "../ClientRequest";

/**
 * @param {String} path The path of the request
 */
function get(path: string): Promise<any> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.cGetRequest(path);
}

export default get;