/**
 * @param {Number} nestId The ID of the nest
 */
interface returnType {
    object: "egg";
    attributes: {
        "id": number;
        "uuid": string;
        "name": string;
        "nest": number;
        "author": string;
        "description": string;
        "docker_image": string;
        "config": {
            "files": {
                "config.yml": {
                    "parser": "yaml";
                    "find": {
                        "listeners[0].query_enabled": boolean;
                        "listeners[0].query_port": string;
                        "listeners[0].host": string;
                        "servers.*.address": {
                            "127.0.0.1": string;
                            "localhost": string;
                        };
                    };
                };
            };
            "startup": {
                "done": string;
                "userInteraction": [string];
            };
            "stop": string;
            "logs": {
                "custom": boolean;
                "location": string;
            };
            "extends": null | any;
        };
        "startup": string;
        "script": {
            "privileged": boolean;
            "install": string;
            "entry": string;
            "container": string;
            "extends": null | any;
        };
        "created_at": string;
        "updated_at": string;
    };
}
declare function listEggs(nestId: number, page: number): Promise<returnType[]>;
export default listEggs;
