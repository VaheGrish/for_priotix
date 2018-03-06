"use strict";

import {createUser, deleteUser, updateUser, assignDevice} from "./UserService";
import middlewares from "middlewares";
import schemas from "./schemas";
import {Router} from "express";

export default (router: Router) => {

    router.post("/:id/:device_id", ...middlewares(schemas, "assignDevice"), assignDevice);

    router.delete("/:id", ...middlewares(schemas, "deleteUser"), deleteUser);

    router.patch("/:id", ...middlewares(schemas, "updateUser"), updateUser);

    router.post("/", ...middlewares(schemas, "createUser"), createUser);

};
