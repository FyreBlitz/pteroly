/**
 * @param {String} serverId ID of the server to check owner value of
 */
declare function isOwner(serverId: string): Promise<boolean>;
export default isOwner;
