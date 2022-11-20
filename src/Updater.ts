import fetch from "node-fetch";

export default class Updater {
  private configPath: string;
  private npmUrl: string;
  
  constructor(configPath: string, npmUrl: string) {
    this.configPath = configPath;
    this.npmUrl = npmUrl;
  }

  async checkForUpdates(): Promise<any> {}

  private async getLatest(): Promise<any> {
    const npmjs: any = await fetch(this.npmUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
    .then(res => res.json())
    .catch(err => {});

    return npmjs["dist-tags"].latest;
  }
}