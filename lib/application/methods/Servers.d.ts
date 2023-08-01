export default class Servers {
    private req;
    constructor(hostname: string, key: string);
    create: (data: any) => Promise<any>;
    updateDetails: (ID: number, data: any) => Promise<any>;
    updateBuild: (ID: number, data: any) => Promise<any>;
    updateStartup: (ID: number, data: any) => Promise<any>;
    suspend: (ID: number) => Promise<any>;
    unsuspend: (ID: number) => Promise<any>;
    reinstall: (ID: number) => Promise<any>;
    get: (ID: number) => Promise<any>;
    getExternal: (ExternalID: string) => Promise<any>;
    list: (page?: number) => Promise<any>;
    delete: (ID: number) => Promise<any>;
    forceDelete: (ID: number) => Promise<any>;
}
