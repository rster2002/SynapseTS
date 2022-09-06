import { Get, SynapseController } from "../../src";

export default class TestController extends SynapseController {
    @Get("/test")
    test() {
        return "Hi";
    }
}
