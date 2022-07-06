import { Get, SynapseApp, SynapseController, SynapseRequest } from "../src";

class TestController extends SynapseController {
    @Get("/test")
    test(request: SynapseRequest) {
        request.requireQuery("test", { type: "number" });

        return {
            test: this.getEnvKey("test", { type: "number" }),
        }
    }
}

let app = new SynapseApp({
    dev: true,
    controllers: [
        new TestController(),
    ]
});

app.start(5000);
