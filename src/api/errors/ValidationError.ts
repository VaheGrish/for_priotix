"use strict";

import {VALIDATION_ERROR} from "configs/response-messages";
import {VALIDATION_ERROR_CODE} from "configs/status-codes";

export default class ValidationError extends Error {

    public status: number = VALIDATION_ERROR_CODE;
    public message: string = VALIDATION_ERROR;
    public errors: any;

    constructor(errors: any) {
        super();
        this.errors = errors;
    }
}
