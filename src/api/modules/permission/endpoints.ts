"use strict";

import {createPermission, deletePermission, updatePermission} from "./PermissionService";
import middlewares from "middlewares";
import schemas from "./schemas";
import {Router} from "express";

export default (router: Router) => {

    router.delete("/:id", ...middlewares(schemas, "deletePermission"), deletePermission);

    router.patch("/", ...middlewares(schemas, "updatePermission"), updatePermission);

    router.post("/", ...middlewares(schemas, "createPermission"), createPermission);

};
