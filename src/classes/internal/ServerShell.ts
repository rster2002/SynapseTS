import SynapseApp from "../SynapseApp";
import readline from "readline";

export default class ServerShell {
    private readonly app: SynapseApp;
    private readonly readlineInterface: readline.Interface;

    constructor(app: SynapseApp) {
        this.app = app;

        this.readlineInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    async start() {
        while (true) {
            await this.prompt();
        }
    }

    private async prompt() {
        return new Promise<void>(resolve => {
            this.readlineInterface.question("> ", answer => {
                resolve();
            });
        });
    }
}
