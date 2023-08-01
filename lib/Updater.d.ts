export default class Updater {
    private configPath;
    private npmUrl;
    constructor(configPath: string, npmUrl: string);
    checkForUpdates(): Promise<any>;
    private getLatest;
}
