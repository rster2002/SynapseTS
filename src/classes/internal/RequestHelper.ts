import AppComponent from "./AppComponent";
import SynapseRequest, { execute } from "../SynapseRequest";
import SynapseResponse from "../SynapseResponse";
import ResultTransformer from "./ResultTransformer";
import { appSymbol } from "../../symbols";
import HttpStatus from "../../enums/HttpStatus";

export default class RequestHelper extends AppComponent {
    private readonly resultTransformer = new ResultTransformer(this[appSymbol]);

    async handleRequest(request: SynapseRequest): Promise<SynapseResponse> {
        let response: SynapseResponse;

        try {
            response = this.resultTransformer.transformResult(await request[execute]());

            if (response === null) {
                response = new SynapseResponse({
                    status: HttpStatus.NOT_IMPLEMENTED,
                });
            }
        } catch (e) {
            response = this.resultTransformer.transformError(request, e);
        }

        return response;
    }
}
