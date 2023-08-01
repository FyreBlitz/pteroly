/**
 *
 * @param {Number} page The page for the Servers
 */
interface databaseType {
    "object": "allocation";
    "attributes": {
        "id": number;
        "server": number;
        "host": number;
        "database": string;
        "username": string;
        "remote": string;
        "max_connections": number;
        "created_at": string;
        "updated_at": string;
    };
}
interface returnType {
    "object": "server";
    "attributes": {
        "id": number;
        "external_id": string;
        "uuid": string;
        "identifier": string;
        "name": string;
        "description": string;
        "suspended": boolean;
        "limits": {
            "memory": number;
            "swap": number;
            "disk": number;
            "io": number;
            "cpu": number;
            "threads": any | null;
        };
        "feature_limits": {
            "databases": number;
            "allocations": number;
            "backups": number;
        };
        "user": number;
        "node": number;
        "allocation": number;
        "nest": number;
        "egg": number;
        "pack": any | null;
        "container": {
            "startup_command": string;
            "image": string;
            "installed": boolean;
            "environment": {
                "SERVER_JARFILE": string;
                "VANILLA_VERSION": string;
                "STARTUP": string;
                "P_SERVER_LOCATION": string;
                "P_SERVER_UUID": string;
            };
        };
        "updated_at": string;
        "created_at": string;
        "relationships": {
            "databases": {
                "object": string;
                "data": databaseType[];
            };
        };
    };
}
/**
 *
 * @param page The page for the Servers
 * @param showExtra Whether or not to show extra meta data (not supported when depaginating)
 * @returns
 */
declare function listServers(page: number, showExtra: boolean): Promise<returnType[]>;
export default listServers;
