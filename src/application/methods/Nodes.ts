import Req from "../Request.js";

export default class Nodes {
  private req: Req;

  constructor(hostname: string, key: string) {
    this.req = new Req(hostname, key);
  }

  public create = (data: any): Promise<any> => this.req.postRequest(`/nodes`, data);
  public update = (ID: number, data: any): Promise<any> => this.req.patchRequest(`/nodes/${ID}`, data);
  
  public get = (ID: number): Promise<any> => this.req.getRequest(`/nodes/${ID}`);
  public getConfig = (ID: number): Promise<any> => this.req.getRequest(`/nodes/${ID}/configuration`);
  public list = (page: number = 1): Promise<any> => this.req.getRequest(`/nodes?page=${page || 0}`);
  public delete = (ID: number): Promise<any> => this.req.deleteRequest(`/nodes/${ID}`);
}