import req from "../../ClientRequest";

/**
 * @param {String} serverId ID of the server to send a command to
 * @param {String} command Command to send
 */
function sendCommand(serverId: string, command: string) {
	const Req = new req(process.env.CLIENT_NODEACTYL_HOST, process.env.CLIENT_NODEACTYL_KEY);
	const data = { 'command': command };
	return Req.postRequest('SendCommand', data, serverId);
}

export default sendCommand;