import HttpMethod from "../enums/HttpMethod";
import httpMethodDecoratorFactory from "./httpMethodDecoratorFactory";

export default function Options(path: string) {
    return httpMethodDecoratorFactory(path, HttpMethod.OPTIONS);
}
