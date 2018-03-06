"use strict";

import activateDeviceTypeModule from "./device-type";
import activatePermissionModule from "./permission";
import activateDeviceModule from "./device";
import activateAuthModule from "./auth";
import activateUserModule from "./user";
import {Router} from "express";

export default (router: Router): void => {
    activateDeviceTypeModule(router);
    activatePermissionModule(router);
    activateDeviceModule(router);
    activateAuthModule(router);
    activateUserModule(router);
};
