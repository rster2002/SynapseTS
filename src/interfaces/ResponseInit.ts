import type HttpStatus from "../enums/HttpStatus";

export default interface ResponseInit {
    status?: HttpStatus
    body?: string
    headers?: {
        [key: string]: string
    }
}
