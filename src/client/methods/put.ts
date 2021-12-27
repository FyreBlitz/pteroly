import req from "../ClientRequest";

/**
 * @param {String} path The path of the request starting with "/"
 */
function post(path: string, body: JSON) {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.cPutRequest(path, body);
}

export default post;