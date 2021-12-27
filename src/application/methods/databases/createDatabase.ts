import req from "../../ApplicationRequest";

/**
 * @param {Integer} internalId Internal ID of the Server to create the Database
 * @param {String} name Name of the Database
 * @param {String} allowedIP IP allowed to connect, leave "%" if you dont want to restrict
 * @param {Integer} hostDBID ID of the Database Host
 */

function createDatabase(internalId: number, name: string, allowedIP: string, hostDBID: number) {
    const data = makeData(name, allowedIP, hostDBID)
    const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.postRequest('CreateDatabase', data, internalId)
}

function makeData(name: string, allowedIP: string, hostDBID: number) {
    return {
        "database": name,
        "remote": allowedIP,
        "host": hostDBID,
    }
}

export default createDatabase;