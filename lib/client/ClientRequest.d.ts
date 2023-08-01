import { WebsocketClient } from "./Websocket";
declare class ClientRequest {
    host: string;
    key: string;
    constructor(host: any, key: any);
    depaginateRequest: (url: string) => Promise<any>;
    getRequest: (request: string, data: any, _data: any, page?: number) => Promise<any>;
    websocket: (request: string, data: any, _data: any) => Promise<WebsocketClient>;
    postRequest: (request: string, data: any, _data: any) => Promise<any>;
    deleteRequest: (request: string, data: string, _data: string) => Promise<any>;
    cPostRequest: (path: string, body: JSON) => Promise<any>;
    cPatchRequest: (path: string, body: JSON) => Promise<any>;
    cGetRequest: (path: string, page?: number) => Promise<any>;
    cDeleteRequest: (path: string) => Promise<any>;
    cPutRequest: (path: string, body: JSON) => Promise<any>;
}
export default ClientRequest;
