import { msg } from "../types/Custom.js";
export default class NodeAllocations {
    private req;
    constructor(hostname: string, key: string);
    create: (NodeID: number, data: any) => Promise<any>;
    list: (NodeID: number, page?: number) => Promise<any>;
    delete: (NodeID: number, ID: number) => Promise<msg>;
}
