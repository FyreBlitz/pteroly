declare class ClientRequest {
    host: string;
    key: string;
    constructor(host: any, key: any);
    getRequest: (request: string, data: any, _data: any) => any;
    postRequest: (request: string, data: any, _data: any) => Promise<any>;
    deleteRequest: (request: string, data: string, _data: string) => Promise<any>;
    cPostRequest: (path: string, body: JSON) => Promise<any>;
    cGetRequest: (path: string) => Promise<any>;
    cDeleteRequest: (path: string) => Promise<any>;
    cPutRequest: (path: string, body: JSON) => Promise<any>;
}
export default ClientRequest;
