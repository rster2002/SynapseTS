import HttpMethod from "../../../enums/HttpMethod";
import httpMethodDecoratorFactory from "./httpMethodDecoratorFactory";

export default function Post(path: string) {
    return httpMethodDecoratorFactory(path, HttpMethod.POST);
}
