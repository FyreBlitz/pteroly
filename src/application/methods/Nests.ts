import Req from "../Request.js";

export default class Nests {
  private req: Req;

  constructor(hostname: string, key: string) {
    this.req = new Req(hostname, key);
  }

  public getNest = (ID: number): Promise<any> => this.req.getRequest(`/nests/${ID}`);
  public listNests = (page: number = 1): Promise<any> => this.req.getRequest(`/nests?page=${page || 0}`);

  public getEgg = (NestID: number, ID: number): Promise<any> => this.req.getRequest(`/nests/${NestID}/eggs/${ID}?include=nest,servers,config,script,variables`);
  public listEggs = (NestID: number, page: number = 1): Promise<any> => this.req.getRequest(`/nests/${NestID}/eggs?include=nest,servers,config,script,variables&page=${page || 0}`);
}