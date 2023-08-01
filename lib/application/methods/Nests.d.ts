export default class Nests {
    private req;
    constructor(hostname: string, key: string);
    getNest: (ID: number) => Promise<any>;
    listNests: (page?: number) => Promise<any>;
    getEgg: (NestID: number, ID: number) => Promise<any>;
    listEggs: (NestID: number, page?: number) => Promise<any>;
}
