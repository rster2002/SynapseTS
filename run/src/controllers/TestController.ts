import { Get, SynapseController, SynapseRequest } from "../../../src";

export default class TestController extends SynapseController {
    @Get("/test")
    test(request: SynapseRequest) {
        return request.requireQuery("name", "number");
    }

    abc = "dev";

    @Get("/haha")
    haha() {
        return this.abc;
    }
}
