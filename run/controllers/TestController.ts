import { Get, SynapseController, SynapseRequest } from "../../src";
import { HttpAuthenticate } from "../decorators/HttpAuthenticate";

export default class TestController extends SynapseController {
    @Get("/test")
    @HttpAuthenticate()
    test(request: SynapseRequest) {
        return "hi";
        // return request.requireQuery("a", "number");
    }
}
