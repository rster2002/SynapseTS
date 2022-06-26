import HttpMethod from "../enums/HttpMethod";
export default function httpMethodDecoratorFactory(path: any, httpMethod: HttpMethod): (target: any, fieldName: string) => void;
