import { SynapseApp } from "../src";

const app = new SynapseApp({
    auto: true,
    appDir: __dirname,
});

app.start();
