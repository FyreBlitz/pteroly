export interface authDataType {
    token: string;
    socket: string;
}
/**
 * @param {String} serverId ID of the server to connect to the console
 */
declare function console(serverId: string): Promise<import("../../Websocket").WebsocketClient>;
export default console;
