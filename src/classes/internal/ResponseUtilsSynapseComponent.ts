import HttpStatus from "../../enums/HttpStatus";
import SynapseResponse from "../SynapseResponse";
import SynapseComponent from "../SynapseComponent";

export default abstract class ResponseUtilsSynapseComponent extends SynapseComponent {
    protected createResponseWithStatus(status: HttpStatus) {
        return new SynapseResponse({
            status,
            body: null,
        });
    }

    protected createValidationError(status: HttpStatus, message?: string) {
        return new SynapseResponse({
            status,
            body: JSON.stringify({
                error: message,
            }),
        })
    }
}
