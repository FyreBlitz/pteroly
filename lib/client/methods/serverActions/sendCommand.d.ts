/**
 * @param {String} serverId ID of the server to send a command to
 * @param {String} command Command to send
 */
declare function sendCommand(serverId: string, command: string): Promise<any>;
export default sendCommand;
