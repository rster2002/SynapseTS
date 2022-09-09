import { Get, Post, SynapseApp, SynapseController, SynapseRequest } from "../src";
import { ControllerWrapper } from "../src/testing";

class TestController extends SynapseController {
    private a = { b: 10 }

    @Get("/test")
    test(request: SynapseRequest) {
        return {
            test: this.a.b,
        };
    }

    @Post("/test")
    create() {
        return "Hi";
    }
}

let wrapper = new ControllerWrapper(new TestController());
wrapper.fetch("/test");
