import HttpMethod from "../enums/HttpMethod";
import httpMethodDecoratorFactory from "./httpMethodDecoratorFactory";

export default function Delete(path: string) {
    return httpMethodDecoratorFactory(path, HttpMethod.DELETE);
}
