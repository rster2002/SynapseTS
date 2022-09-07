import { createCustomDecorator } from "../../src";

export const HttpAuthenticate = createCustomDecorator((route) => {
    route.getMetaObject().set("httpAuthenticate", "true");
});
