import req from "../ClientRequest";

/**
 * @param {String} path The path of the request
 * @param {String} body The body
 */
function put(path: string, body: JSON): Promise<any> {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.cPutRequest(path, body);
}

export default put;