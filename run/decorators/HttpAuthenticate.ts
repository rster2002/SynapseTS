import { createCustomDecorator } from "../../src";

export enum Role {
    ADMIN = "admin",
    GUEST = "guest",
}

export const HttpAuthenticate = createCustomDecorator((route, roles: Role[]) => {
    route.getMetaObject().set("httpAuthenticate", "true");
    route.getMetaObject().set("roles", roles);
});
