import { Get, SynapseController, SynapseRequest } from "../../../src";
import crypto from "crypto";

export default class AuthenticationController extends SynapseController {
    @Get("/login")
    login(request: SynapseRequest) {
        let username = request.requireQuery("username", "string");

        let header = btoa(JSON.stringify({
            alg: "HS256",
            typ: "JWT",
        }))

        let payload = btoa(JSON.stringify({
            username,
        }));

        let content = header + "." + payload;
        let hash = crypto.createHmac('sha256', "ieqjwfqwef").update(content).digest('base64');

        return content + "." + hash;
    }
}
