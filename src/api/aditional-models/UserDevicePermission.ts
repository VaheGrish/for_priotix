"use strict";

import {JsonSchema, Model, RelationMappings} from "objection";
import Permission from "modules/permission/Permission";
import Device from "modules/device/Device";
import User from "modules/user/User";

export default class UserDevicePermissions extends Model {
    readonly id: number;
    user_id: number;
    device_id: number;
    permission_id: number;

    user: User;
    device: Device;
    permission: Permission;

    static tableName: string = "user_device_permissions";

    static jsonSchema: JsonSchema = {
        type: "object",
        required: ["user_id", "device_id", "permission_id"],
        properties: {
            id: {type: "integer"},
            user_id: {type: "number"},
            device_id: {type: "number"},
            permission_id: {type: "number"}
        }
    };

    static relationMappings: RelationMappings = {
        user: {
            relation: Model.HasOneRelation,
            modelClass: __dirname + "/../modules/user/User",
            join: {
                from: "user_device_permissions.user_id",
                to: "users.id"
            }
        },
        device: {
            relation: Model.HasOneRelation,
            modelClass: __dirname + "/../modules/device/Device",
            join: {
                from: "user_device_permissions.device_id",
                to: "devices.id"
            }
        },
        permission: {
            relation: Model.HasOneRelation,
            modelClass: __dirname + "/../modules/permission/Permission",
            join: {
                from: "user_device_permissions.permission_id",
                to: "permissions.id"
            }
        }
    };
}