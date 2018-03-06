"use strict";

import UserDevicePermissions from "aditional-models/UserDevicePermission";
import DeviceType from "modules/device-type/DeviceType";
import {NextFunction, Request, Response} from "express";
import Permission from "modules/permission/Permission";
import {NOT_ALLOWED} from "configs/response-messages";
import ForbiddenError from "errors/Forbidden";
import {ADMIN_ROLE} from "configs/constants";

export interface IPermissionsOptions {
    action_allowed?: {
        action_variable: {
            place: string;
            name: string;
        },
        device_variable: {
            place: string;
            name: string;
        }
    };
    device_type_exist?: {
        id_place: string;
        id_name: string;
    };
    admin?: boolean;
}

export default (permissions: IPermissionsOptions) => {
    return async (req: Request, res: Response, next: NextFunction) => {

        if (permissions.device_type_exist) {
            const deviceType: DeviceType = await DeviceType.query().findById(req[permissions.device_type_exist.id_place][permissions.device_type_exist.id_name]);
            if (!deviceType || !(deviceType instanceof DeviceType)) {
                return next(new ForbiddenError({message: NOT_ALLOWED}));
            }
        }

        if (permissions.admin) {
            if (req.user.role !== ADMIN_ROLE) {
                return next(new ForbiddenError({message: NOT_ALLOWED}));
            }
        }

        if (permissions.action_allowed) {
            const {name, place} = permissions.action_allowed.action_variable;
            const permission: Permission = await Permission.query().where("name", req[place][name]).first();

            if (!permission || !(permission instanceof Permission)) {
                return next(new ForbiddenError({message: NOT_ALLOWED}));
            }

            const {name: dName, place: dPlace} = permissions.action_allowed.device_variable;

            const userDevicePermission: UserDevicePermissions = await UserDevicePermissions
                .query()
                .where("user_id", req.user.id)
                .andWhere("permission_id", permission.id)
                .andWhere("device_id", req[dPlace][dName])
                .first();

            if (!userDevicePermission || !(userDevicePermission instanceof UserDevicePermissions)) {
                return next(new ForbiddenError({message: NOT_ALLOWED}));
            }
        }

        next();
    };
};
