import Req from "../Request.js";

export default class Locations {
  private req: Req;

  constructor(hostname: string, key: string) {
    this.req = new Req(hostname, key);
  }

  public create = (data: any): Promise<any> => this.req.postRequest(`/locations`, data);
  public update = (ID: number, data: any): Promise<any> => this.req.patchRequest(`/locations/${ID}`, data);

  public get = (ID: number): Promise<any> => this.req.getRequest(`/locations/${ID}`);
  public list = (page: number = 1): Promise<any> => this.req.getRequest(`/locations?page=${page}`);
  public delete = (ID: number): Promise<any> => this.req.deleteRequest(`/locations/${ID}`);
}