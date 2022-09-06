import { Get, SynapseApp, SynapseController, SynapseRequest } from "../src";

class TestController extends SynapseController {
    private a = { b: 10 };

    @Get("/test")
    test(request: SynapseRequest) {
        return request.requireQuery("a", "number");
    }
}

let app = new SynapseApp({
    dev: true,
    controllers: [
        new TestController(),
    ]
});

app.start(5000);
