"use strict";

import {JsonSchema, Model, ValidationError} from "objection";

export default class Permission extends Model {

    readonly id: number;
    name: string;
    created_at: string;
    updated_at: string;

    static tableName: string = "permissions";

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
        return Permission
            .query()
            .where("name", this.name)
            .first()
            .then((dbPermission: Permission) => {
                if (dbPermission) {
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
            return Permission
                .query()
                .where("name", this.name)
                .first()
                .then(dbPermission => {
                    if (dbPermission) {
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
