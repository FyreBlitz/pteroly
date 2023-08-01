export default class Request {
    host: string;
    key: string;
    constructor(host: string, key: string);
    getRequest: (path: string) => Promise<any>;
    deleteRequest: (path: string) => Promise<any>;
    postRequest: (path: string, body: any) => Promise<any>;
    patchRequest: (path: string, body: any) => Promise<any>;
    putRequest: (path: string, body: any) => Promise<any>;
}
