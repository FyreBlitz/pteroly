import req from "../ApplicationRequest";

/**
 * @param {String} path The path of the request starting with "/"
 */
function del(path: string): Promise<any> {
	const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
	return Req.cDeleteRequest(path);
}

export default del;