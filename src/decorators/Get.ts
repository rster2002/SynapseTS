import HttpMethod from "../enums/HttpMethod";
import httpMethodDecoratorFactory from "./httpMethodDecoratorFactory";

export default function Get(path: string) {
    return httpMethodDecoratorFactory(path, HttpMethod.GET);
}
