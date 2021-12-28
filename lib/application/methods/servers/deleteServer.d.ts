/**
 *
 * @param {String} internalId Internal ID of the server to delete
 */
declare function deleteServer(internalId: number): Promise<void | {
    success: boolean;
    message: string;
}>;
export default deleteServer;
