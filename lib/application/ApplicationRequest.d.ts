declare class ApplicationRequest {
    host: string | undefined;
    key: string | undefined;
    constructor(host: string | undefined, key: string | undefined);
    depaginateRequest: (url: string) => Promise<any>;
    getRequest: (request: string, data: any, _data: any, page?: number) => Promise<any>;
    postRequest: (request: string, data: any, _data: any) => Promise<any>;
    patchRequest: (request: string, data: any, _data: any) => Promise<any>;
    deleteRequest: (request: string, data: any, _data: any) => Promise<any>;
    cPostRequest: (path: string, body: any) => Promise<any>;
    cPatchRequest: (path: string, body: any) => Promise<any>;
    cGetRequest: (path: string, page: number) => Promise<any>;
    cDeleteRequest: (path: string) => Promise<{
        success: boolean;
        message: string;
    }>;
    cPutRequest: (path: string, body: any) => Promise<any>;
}
export default ApplicationRequest;
