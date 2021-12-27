import req from "../ApplicationRequest";

/**
 * @param {String} path The path of the request starting with "/"
 */
function get(path: string) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.cGetRequest(path);
}

export default get;