declare class ApplicationRequest {
    host: any;
    key: any;
    constructor(host: any, key: any);
    getRequest(request: string, data: any, _data: any): Promise<any>;
    postRequest(request: string, data: any, _data: any): Promise<any>;
    patchRequest(request: string, data: any, _data: any): Promise<any>;
    deleteRequest(request: string, data: any, _data: any): Promise<void | {
        success: boolean;
        message: string;
    }>;
    cPostRequest: (path: string, body: JSON) => Promise<any>;
    cGetRequest: (path: string) => Promise<any>;
    cDeleteRequest: (path: string) => Promise<any>;
    cPutRequest: (path: string, body: JSON) => Promise<any>;
}
export default ApplicationRequest;
