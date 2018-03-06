"use strict";

import {ADMIN_ROLE, BASIC_ROLE, EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from "configs/constants";
import {JsonSchema, Model, RelationMappings, ValidationError} from "objection";
import UserDevicePermissions from "aditional-models/UserDevicePermission";
import * as bcrypt from "bcrypt-nodejs";
import Device from "../device/Device";

export default class User extends Model {

    readonly id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    created_at: string;
    updated_at: string;

    devicePermissions: UserDevicePermissions[];
    devices: Device[];

    static tableName: string = "users";

    static jsonSchema: JsonSchema = {
        type: "object",
        required: ["email", "password", "first_name", "last_name", "role"],
        properties: {
            id: {type: "integer"},
            first_name: {type: "string", maxLength: NAME_MAX_LENGTH},
            last_name: {type: "string", maxLength: NAME_MAX_LENGTH},
            email: {type: "string", maxLength: EMAIL_MAX_LENGTH},
            password: {type: "string", minLength: PASSWORD_MIN_LENGTH, maxLength: PASSWORD_MAX_LENGTH},
            role: {"enum": [BASIC_ROLE, ADMIN_ROLE]},
            created_at: {type: "date"},
            updated_at: {type: "date"}
        }
    };

    static fields: Array<string> = ["first_name", "last_name", "email", "password"];

    static relationMappings: RelationMappings = {
        devicePermissions: {
            relation: Model.HasManyRelation,
            modelClass: __dirname + "/../../aditional-models/UserDevicePermissions",
            join: {
                from: "users.id",
                to: "user_device_permissions.user_id"
            }
        },
        devices: {
            relation: Model.ManyToManyRelation,
            modelClass: __dirname + "/../device/Device",
            join: {
                from: "users.id",
                through: {
                    from: "user_device_permissions.user_id",
                    to: "user_device_permissions.device_id"
                },
                to: "devices.id"
            }
        }
    };

    hashPassword(): void {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
    }

    validatePassword(dbPass: string): boolean {
        return bcrypt.compareSync(dbPass, this.password);
    }

    $beforeInsert(): Promise<any> | void {
        this.hashPassword();

        return User.query().where("email", this.email).first()
            .then((dbUser: User) => {
                if (dbUser) {
                    throw new ValidationError({
                        type: "ModelValidation", message: "Email must be unique.", data: {
                            email: {
                                message: "Email must be unique.",
                                keyword: "unique"
                            }
                        }
                    });
                }
            });
    }

    $beforeUpdate(opt: any): Promise<any> | void {
        if (this.password && !bcrypt.compareSync(this.password, opt.old.password)) {
            this.hashPassword();
        }

        if (this.email && this.email !== opt.old.email) {
            return User.query().where("email", this.email).first().then(dbUser => {
                if (dbUser) {
                    throw new ValidationError({
                        type: "ModelValidation", message: "Email must be unique.", data: {
                            email: {
                                message: "Email must be unique.",
                                keyword: "unique"
                            }
                        }
                    });
                }
            });
        }
    }
}
