/// <reference types="qs" />
import type { Request as ExpressRequest } from "express";
export default class Request {
    private internalRequest;
    metaData: Map<string, unknown>;
    constructor(req: ExpressRequest);
    getPath(): string;
    getQuery(key: string): string | string[] | import("qs").ParsedQs | import("qs").ParsedQs[];
    getHeader(name: string): string;
    requireHeader(name: string): string;
    getSlug(name: string): string;
    requireQuery(key: string): string | string[] | import("qs").ParsedQs | import("qs").ParsedQs[];
    getRawBody(): any;
    requireBody<T extends object>(shape: T): T;
}
