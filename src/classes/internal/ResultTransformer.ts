import RouteResult from "../../types/RouteResult";
import SynapseResponse from "../SynapseResponse";
import HttpStatus from "../../enums/HttpStatus";
import SynapseRequest from "../SynapseRequest";
import ValidationError from "../error/ValidationError";
import { appSymbol } from "../../symbols";
import SynapseApp, { devMode } from "../SynapseApp";

export default class ResultTransformer {
    [appSymbol]: SynapseApp;

    constructor(app: SynapseApp) {
        this[appSymbol] = app;
    }

    transformResult(result: RouteResult): SynapseResponse {
        if (result instanceof SynapseResponse) {
            return result;
        }

        if (typeof result === "string") {
            return new SynapseResponse({
                status: HttpStatus.OK,
                body: result,
            });
        }

        if (typeof result === "number") {
            return new SynapseResponse({
                status: HttpStatus.OK,
                body: String(result),
            });
        }

        if (typeof result === "object") {
            return new SynapseResponse({
                status: HttpStatus.OK,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(result),
            });
        }

        return null;
    }

    transformError(request: SynapseRequest, error: RouteResult) {
        if (error instanceof ValidationError) {
            let accept = request.getHeader("Accept");

            if (accept === "application/json" || accept === "*/*") {
                return new SynapseResponse({
                    status: HttpStatus.BAD_REQUEST,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        error: error.message,
                    }),
                });
            }

            return new SynapseResponse({
                status: HttpStatus.BAD_REQUEST,
                body: error.message,
            });
        }

        if (error instanceof Error && this[appSymbol][devMode]) {
            return new SynapseResponse({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: error.name,
                    error: error.message,
                    cause: error.cause,
                    stack: error.stack,
                }),
            })
        }

        let formattedResponse = this.transformResult(error);

        if (formattedResponse !== null) {
            return formattedResponse;
        }

        return new SynapseResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
        });
    }
}
