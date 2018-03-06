"use strict";

import {JsonSchema, Model, ValidationError} from "objection";

export default class DeviceType extends Model {

    readonly id: number;
    name: string;
    created_at: string;
    updated_at: string;

    static tableName: string = "device_types";

    static jsonSchema: JsonSchema = {
        type: "object",
        required: ["name"],
        properties: {
            id: {type: "integer"},
            name: {type: "string"},
            created_at: {type: "date"},
            updated_at: {type: "date"}
        }
    };

    $beforeInsert(): Promise<any> | void {
        return DeviceType.query().where("name", this.name).first()
            .then((dbDeviceType: DeviceType) => {
                if (dbDeviceType) {
                    throw new ValidationError({
                        type: "ModelValidation", message: "Name must be unique.", data: {
                            name: {
                                message: "Name must be unique.",
                                keyword: "unique"
                            }
                        }
                    });
                }
            });
    }

    $beforeUpdate(opt: any): Promise<any> | void {
        if (this.name && this.name !== opt.old.name) {
            return DeviceType.query().where("name", this.name).first().then(dbDeviceType => {
                if (dbDeviceType) {
                    throw new ValidationError({
                        type: "ModelValidation", message: "Name must be unique.", data: {
                            name: {
                                message: "Name must be unique.",
                                keyword: "unique"
                            }
                        }
                    });
                }
            });
        }
    }
}
