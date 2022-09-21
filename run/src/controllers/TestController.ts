import { Get, Scope, SynapseController, SynapseRequest } from "../../../src";

export default class TestController extends SynapseController {
    @Get("/test")
    test(request: SynapseRequest) {
        return request.requireQuery("name", "number");
    }

    @Get("/haha")
    haha() {
        return {
            hello: "world",
        };
    }
}
