import { SynapseApp } from "../../src";

const app = new SynapseApp({
    auto: true,
    appDir: __dirname,
    dev: true,
});

app.start(5001);
