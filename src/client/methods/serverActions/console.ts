import req from "../../ClientRequest";

export interface authDataType {
	token: string;
    socket: string;
}

/**
 * @param {String} serverId ID of the server to connect to the console
 */
function console(serverId: string) {
	const Req = new req(process.env.CLIENT_PTEROLY_HOST, process.env.CLIENT_PTEROLY_KEY);
	return Req.websocket('Console', serverId, null);
}

export default console;