import Req from "../Request.js";

export default class Servers {
  private req: Req;

  constructor(hostname: string, key: string) {
    this.req = new Req(hostname, key);
  }

  public create = (data: any): Promise<any> => this.req.postRequest(`/servers`, data);

  public updateDetails = (ID: number, data: any): Promise<any> => this.req.patchRequest(`/servers/${ID}/details`, data);
  public updateBuild = (ID: number, data: any): Promise<any> => this.req.patchRequest(`/servers/${ID}/build`, data);
  public updateStartup = (ID: number, data: any): Promise<any> => this.req.patchRequest(`/servers/${ID}/startup`, data);
  
  public suspend = (ID: number): Promise<any> => this.req.postRequest(`/servers/${ID}/suspend`, {});
  public unsuspend = (ID: number): Promise<any> => this.req.postRequest(`/servers/${ID}/unsuspend`, {});
  public reinstall = (ID: number): Promise<any> => this.req.postRequest(`/servers/${ID}/reinstall`, {});
  
  public get = (ID: number): Promise<any> => this.req.getRequest(`/servers/${ID}?include=allocations,user,subusers,pack,nest,egg,variables,location,node,databases`);
  public getExternal = (ExternalID: string): Promise<any> => this.req.getRequest(`/servers/external/${ExternalID}?include=allocations,user,subusers,pack,nest,egg,variables,location,node,databases`);
  public list = (page: number = 1): Promise<any> => this.req.getRequest(`/servers?page=${page || 1}&include=allocations,user,subusers,pack,nest,egg,variables,location,node,databases`);

  public delete = (ID: number): Promise<any> => this.req.deleteRequest(`/servers/${ID}`);
  public forceDelete = (ID: number): Promise<any> => this.req.deleteRequest(`/servers/${ID}/force`);
}