"use strict";

import {SOMETHING_WENT_WRONG} from "configs/response-messages";
import {BAD_REQUEST_CODE} from "configs/status-codes";
import params from "configs/params";
import * as moment from "moment";
import File from "helpers/File";

export default class ServiceUnavailable extends Error {

    constructor(data: any, errors?: any) {
        super();

        if (errors) {
            this.message = data;
            this.errors = errors;
        } else {
            if (typeof data === "string") {
                this.message = data;
            } else {
                this.errors = data;
            }
        }

        const file: File = new File(params.logFile, "a+");

        file.open().then(() => {
            file.read().then(content => {
                const log: string =
                    `Date and Time: ${moment().format("YYYY-MM-DD HH:mm:ss")}\n` +
                    `Actual Status - ${this.errors ? this.errors.status : "no status"}\n` +
                    `Developer Message - ${this.message}\n` +
                    `Error Message - ${this.errors ? this.errors.message : ""}`;

                const newContent: string = content ? `${content}\n\n${log}` : log;
                file.replaceContent(newContent).then(() => {
                    console.dir("Log Saved", {colors: true, depth: 10});
                });
            });
        });
    }

    public status: number = BAD_REQUEST_CODE;
    public message: string = SOMETHING_WENT_WRONG;
    public errors: any;
}
