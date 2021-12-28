/**
 * @param {Number} nodeId The id of the nodes you want to add am allocation to
 * @param {String} ip The ip of the new allocation
 * @param {Array} ports The ports you want to add to the node
 * @yields Object (refer to docs for schema);
 */
declare function createAllocation(nodeId: number, ip: string, ports: string[]): Promise<any>;
export default createAllocation;
