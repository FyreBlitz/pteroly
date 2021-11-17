const req = require('../../ApplicationRequest')
/**
 * @param {Integer} internalId Internal ID of the Server to create the Database
 * @param {String} name Name of the Database
 * @param {String} allowedIP IP allowed to connect, leave "%" if you dont want to restrict
 * @param {Integer} hostDBID ID of the Database Host
 */

function createDatabase(internalId, name, allowedIP, hostDBID) {
    const data = makeData(name, allowedIP, hostDBID)
    const Req = new req(process.env.APPLICATION_NODEACTYL_HOST, process.env.APPLICATION_NODEACTYL_KEY);
    return Req.postRequest('CreateDatabase', data, internalId)
}

function makeData(name, allowedIP, hostDBID) {
    return {
        "database": name,
        "remote": allowedIP,
        "host": hostDBID,
    }
}

module.exports = createDatabase;