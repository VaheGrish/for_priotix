"use strict";

import {createDevice, deleteDevice, doAction, updateDevice} from "./DeviceService";
import middlewares from "middlewares";
import schemas from "./schemas";
import {Router} from "express";

export default (router: Router) => {

    router.delete("/:id", ...middlewares(schemas, "deleteDevice"), deleteDevice);

    router.patch("/", ...middlewares(schemas, "updateDevice"), updateDevice);

    router.post("/", ...middlewares(schemas, "createDevice"), createDevice);

    router.post("/:id", ...middlewares(schemas, "doAction"), doAction);

};
