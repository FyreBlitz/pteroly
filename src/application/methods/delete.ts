import req from "../ApplicationRequest";

/**
 * @param {String} path The path of the request starting with "/"
 */
function post(path: string) {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.cDeleteRequest(path);
}

export default post;