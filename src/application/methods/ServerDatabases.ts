import Req from "../Request.js";

export default class ServerDatabases {
  private req: Req;

  constructor(hostname: string, key: string) {
    this.req = new Req(hostname, key);
  }

  public create = (ServerID: number, data: any): Promise<any> => this.req.postRequest(`/servers/${ServerID}/databases`, data);
  public resetPassword = (ServerID: number, ID: number, data: any): Promise<any> => this.req.postRequest(`/servers/${ServerID}/databases/${ID}/reset-password`, data);
  
  public get = (ServerID: number, ID: number): Promise<any> => this.req.getRequest(`/servers/${ServerID}/databases/${ID}?include=password,host`);
  public list = (ServerID: number, page: number = 1): Promise<any> => this.req.getRequest(`/servers/${ServerID}/databases?include=password,host&page=${page || 1}`);
  public delete = (ServerID: number, ID: number): Promise<any> => this.req.deleteRequest(`/servers/${ServerID}/databases/${ID}`);
}