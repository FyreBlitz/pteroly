export default class ServerDatabases {
    private req;
    constructor(hostname: string, key: string);
    create: (ServerID: number, data: any) => Promise<any>;
    resetPassword: (ServerID: number, ID: number, data: any) => Promise<any>;
    get: (ServerID: number, ID: number) => Promise<any>;
    list: (ServerID: number, page?: number) => Promise<any>;
    delete: (ServerID: number, ID: number) => Promise<any>;
}
