import req from "../../ApplicationRequest";

/**
 * @param {Number} serverId Internal ID of the Server to create the Database
 * @param {databaseData} dbData Information for the Database
 */

interface databaseData {
    name: string,
    remote: string,
    host: number,
};

interface returnType {
    id: number,
    server: number,
    host: number,
    database: string,
    username: string,
    remote: string,
    max_connections: null | any,
    created_at: string,
    updated_at: string,
}

function createDatabase(serverId: number, dbData: databaseData): Promise<returnType> {
    const data = makeData(dbData)
    const Req = new req(process.env.APPLICATION_PTEROLY_HOST, process.env.APPLICATION_PTEROLY_KEY);
    return Req.postRequest('CreateDatabase', data, serverId)
}

function makeData(dbData: databaseData) {
    return {
        "database": dbData.name,
        "remote": dbData.remote,
        "host": dbData.host,
    }
}

export default createDatabase;