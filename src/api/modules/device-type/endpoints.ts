"use strict";

import {createDeviceType, deleteDeviceType, updateDeviceType} from "./DeviceTypeService";
import middlewares from "middlewares";
import schemas from "./schemas";
import {Router} from "express";

export default (router: Router) => {

    router.delete("/:id", ...middlewares(schemas, "deleteDeviceType"), deleteDeviceType);

    router.patch("/", ...middlewares(schemas, "updateDeviceType"), updateDeviceType);

    router.post("/", ...middlewares(schemas, "createDeviceType"), createDeviceType);

};
