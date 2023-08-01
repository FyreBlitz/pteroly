export default class Locations {
    private req;
    constructor(hostname: string, key: string);
    create: (data: any) => Promise<any>;
    update: (ID: number, data: any) => Promise<any>;
    get: (ID: number) => Promise<any>;
    list: (page?: number) => Promise<any>;
    delete: (ID: number) => Promise<any>;
}
