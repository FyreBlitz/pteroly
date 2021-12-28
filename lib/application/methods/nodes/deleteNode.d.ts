/**
 *
 * @param {String} nodeId The node ID to delete
 */
declare function deleteNode(nodeId: number): Promise<void | {
    success: boolean;
    message: string;
}>;
export default deleteNode;
