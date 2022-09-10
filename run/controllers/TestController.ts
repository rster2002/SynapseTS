import { Get, SynapseController, SynapseRequest, SynapseResponse } from "../../src";
import { HttpAuthenticate, Role } from "../decorators/HttpAuthenticate";

export default class TestController extends SynapseController {
    @Get("/test")
    @HttpAuthenticate([Role.ADMIN])
    test(request: SynapseRequest) {
        return "hi";
    }
}
