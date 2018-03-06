"use strict";

import {JsonSchema, Model} from "objection";

export default class Device extends Model {

    readonly id: number;
    name: string;
    device_type_id: number;
    created_at: string;
    updated_at: string;

    static tableName: string = "devices";

    static jsonSchema: JsonSchema = {
        type: "object",
        required: ["name", "device_type_id"],
        properties: {
            id: {type: "integer"},
            name: {type: "string"},
            device_type_id: {type: "integer"},
            created_at: {type: "date"},
            updated_at: {type: "date"}
        }
    };

    static fields: string[] = ["name", "device_type_id"];
}
