/**
 * @param {Number} serverId Internal ID of the Server to create the Database
 * @param {databaseData} dbData Information for the Database
 */
interface databaseData {
    name: string;
    remote: string;
    host: number;
}
interface returnType {
    id: number;
    server: number;
    host: number;
    database: string;
    username: string;
    remote: string;
    max_connections: null | any;
    created_at: string;
    updated_at: string;
}
declare function createDatabase(serverId: number, dbData: databaseData): Promise<returnType>;
export default createDatabase;
