/**
 * @param {serverData} serverData The data of the server
 *
*/
declare type versionType = "latest" | string;
interface serverData {
    name: string;
    description: string;
    nodeId: number;
    userId: number;
    defaultAllocation: number;
    version: versionType;
    eggId: number;
    startup: string;
    docker_image: string;
    limits: {
        cpu: number;
        memory: number;
        disk: number;
        io: 500 | number;
        swap: 0 | number;
    };
    feature_limits: {
        databases: number;
        allocations: number;
        backups: number;
    };
    start_on_completion: true | boolean;
    skip_scripts: false | boolean;
    oom_disabled: true | boolean;
}
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
}
declare function createServer(serverData: serverData): Promise<returnType>;
export default createServer;
