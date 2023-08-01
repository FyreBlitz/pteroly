export default class Users {
    private req;
    constructor(hostname: string, key: string);
    create: (data: any) => Promise<any>;
    update: (ID: number, data: any) => Promise<any>;
    get: (ID: number) => Promise<any>;
    getExternal: (ExternalID: string) => Promise<any>;
    list: (page: number | undefined, filters: any, sortBy: any) => Promise<any>;
    delete: (ID: number) => Promise<any>;
}
