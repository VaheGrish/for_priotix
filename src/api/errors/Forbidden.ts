"use strict";

import {PERMISSION_DENIED} from "configs/response-messages";
import {FORBIDDEN_CODE} from "configs/status-codes";

export default class Forbidden extends Error {

    public status: number = FORBIDDEN_CODE;
    public message: string = PERMISSION_DENIED;
    public errors: any;

    constructor(errors?: any) {
        super();
        this.errors = errors;
    }
}
