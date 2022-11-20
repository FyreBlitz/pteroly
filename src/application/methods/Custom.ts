import Req from "../Request.js";

export default class Custom {
  private req: Req;

  constructor(hostname: string, key: string) {
    this.req = new Req(hostname, key);
  }

  public get = (path: string): Promise<any> => this.req.getRequest(path);
  public post = (path: string, body: any): Promise<any> => this.req.postRequest(path, body);
  public put = (path: string, body: any): Promise<any> => this.req.putRequest(path, body);
  public delete = (path: string): Promise<any> => this.req.deleteRequest(path);
}