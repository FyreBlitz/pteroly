import { msg } from "../types/Custom.js";
import Req from "../Request.js";

export default class NodeAllocations {
  private req: Req;

  constructor(hostname: string, key: string) {
    this.req = new Req(hostname, key);
  }

  public create = (NodeID: number, data: any): Promise<any> => this.req.postRequest(`/nodes/${NodeID}/allocations`, data);
  public list = (NodeID: number, page: number = 1): Promise<any> => this.req.getRequest(`/nodes/${NodeID}/allocations?page=${page || 0}`);
  public delete = (NodeID: number, ID: number): Promise<msg> => this.req.deleteRequest(`/nodes/${NodeID}/allocations/${ID}`);
}