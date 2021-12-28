/**
 * @param {String} serverName The name of your server
 * @param {String} description The description of your server
 * @param {Number} userId The ID of the pterodactyl user the server is assigned to
 * @param {Number} defaultAllocation The port the server is gonna get created on
 * @param {String} version The that the server is gonna use
 * @param {Number} eggId The ID of the egg you want to use
 * @param {String} startupCmd The CMD that is gonna get ran if you start the server
 * @param {String} dockerImage The docker image your server will use
 * @param {Number} cpu The amount of CPU in percentage the server is gonna get
 * @param {number} memory The amount of RAM in MB the server is gonna get
 * @param {Number} disk The amount of Disk in MB the server is gonna get
 * @param {Number} io The IO performance the server will get relative to the others
 * @param {Number} swap The amount of swap a server gets
 * @param {Number} databases The amount of databases a server get
 * @param {Number} allocations The amount of extra allocations the server is gonna get
 * @param {Number} backups The amount of backups an server is gonna get
 * @yields Object (refer to docs for schema);
*/
declare function createServer(serverName: string, description: string, nodeId: number, userId: number, defaultAllocation: number, version: string, eggId: number, startupCmd: string, dockerImage: string, cpu: number, memory: number, disk: number, io: number, swap: number, databases: number, allocations: number, backups: number): Promise<any>;
export default createServer;
