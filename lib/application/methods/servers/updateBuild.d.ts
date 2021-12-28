/**
 * @param {Number} internalId The id of the server you want to update
 * @param {Number} allocation The primary allocation of the Server
 * @param {Number} cpu The amount of CPU in percent
 * @param {Number} memory The amount of RAM in MB
 * @param {Number} disk The amount of disk in MB
 * @param {Number} io The IO performance the server will get relative to the others
 * @param {Number} swap The amount of swap in MB
 * @param {Number} databases The amount of databases
 * @param {Number} allocations The amount of allocations
 * @param {Number} backups The amount of backups
 * @yields Object (refer to docs for schema);
 */
declare function updateBuild(internalId: number, allocation: number, cpu: number, memory: number, disk: number, io: number, swap: number, databases: number, allocations: number, backups: number): Promise<any>;
export default updateBuild;
