/**
 * @param {Number} serverId Internal ID of the Server to create the Database
 * @param {Number} dbId The IP of the DB
 */
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
declare function databaseDetails(serverId: number, dbId: number): Promise<returnType>;
export default databaseDetails;
