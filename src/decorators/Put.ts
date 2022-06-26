import HttpMethod from "../enums/HttpMethod";
import httpMethodDecoratorFactory from "./httpMethodDecoratorFactory";

export default function Put(path: string) {
    return httpMethodDecoratorFactory(path, HttpMethod.PUT);
}
