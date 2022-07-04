# SynapseTS

Allows you to create an express app using classes and decorators.

## Installing

```bash
npm i synapse-ts
```

## Usage

### Parts of an app

A synapse app consists of a couple of components:

* **App**: This is where you link all the different components of your app together.
* **Controller**: This is where requests will be handled.
* **Middleware**: A middleware can hook into different parts of a request and can provide authentication or advanced processing of requests before they hit the controller.

### App

First create an app object:

```ts
import { SynapseApp } from "synapse-ts";

const app = new SynapseApp({
    dev: true,
    controllers: [],
});
```

We set `dev` to true as it then returns more information about errors in the response.

### Controller

```ts
import { SynapseController, SynapseRequest, Get } from "synapse-ts";

class TestController extends SynapseController {
    @Get("/test")
    test(request: SynapseRequest) {
        let name = request.requireQuery("name");
        let age = request.requireQuery("age", { type: "number" });
        
        return {
            name,
            age,
        };
    }
}
```
