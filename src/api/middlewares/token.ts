"use strict";

import {ALREADY_SIGNED_OUT, SOMETHING_WENT_WRONG} from "configs/response-messages";
import ServiceUnavailable from "errors/ServiceUnavailable";
import {NextFunction, Request, Response} from "express";
import AuthError from "errors/AuthError";
import params from "configs/params";
import File from "helpers/File";

export default () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authToken: string = req.header("authorization"),
            file: File = new File(params.blackListFile, "a+");

        let data: string, error: boolean = false;

        try {
            await file.open();
            data = await file.read();
        } catch (error) {
            return next(new ServiceUnavailable(SOMETHING_WENT_WRONG, {message: error.message}));
        }

        if (data) {
            const tokensWithDate: Array<string> = data.split("\n");
            tokensWithDate.forEach(tokenWithDate => {
                const token: string = tokenWithDate.split(" - ")[0];
                if (authToken === token) {
                    error = true;
                }
            });
        }

        if (error) {
            return next(new AuthError(ALREADY_SIGNED_OUT));
        }

        next();
    };
};
