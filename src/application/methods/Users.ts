import Req from "../Request.js";

export default class Users {
  private req: Req;

  constructor(hostname: string, key: string) {
    this.req = new Req(hostname, key);
  }

  public create = (data: any): Promise<any> => this.req.postRequest(`/users`, data);

  public update = (ID: number, data: any): Promise<any> => this.req.patchRequest(`/users/${ID}`, data);
  
  public get = (ID: number): Promise<any> => this.req.getRequest(`/users/${ID}?include=servers`);
  public getExternal = (ExternalID: string): Promise<any> => this.req.getRequest(`/users/external/${ExternalID}?include=servers`);
  public list = (page: number = 1, filters: any, sortBy: any): Promise<any> => this.req.getRequest(`/users?page=${page || 1}&include=servers`);
  public delete = (ID: number): Promise<any> => this.req.deleteRequest(`/users/${ID}`);
}