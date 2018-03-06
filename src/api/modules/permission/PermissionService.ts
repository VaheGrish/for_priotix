"use strict";

import {CREATED, SOMETHING_WENT_WRONG, SUCCESS_STATUS_MESSAGE, UPDATED} from "configs/response-messages";
import {CREATED_CODE, NO_CONTENT_CODE, SUCCESS_CODE} from "configs/status-codes";
import {ValidationError as ObjectionValidation} from "objection";
import ServiceUnavailable from "errors/ServiceUnavailable";
import {NextFunction, Request, Response} from "express";
import ValidationError from "errors/ValidationError";
import Permission from "./Permission";

export async function createPermission(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {name} = req.body;

    let permission: Permission | undefined;

    try {
        permission = await Permission.query().insertAndFetch({name});
    } catch (error) {
        if (error instanceof ObjectionValidation) {
            return next(new ValidationError(error.data));
        }
        return next(new ServiceUnavailable({message: error.message}));
    }

    if (!permission || !(permission instanceof Permission)) {
        return next(new ServiceUnavailable(SOMETHING_WENT_WRONG));
    }

    return res.status(CREATED_CODE).json({
        status: SUCCESS_STATUS_MESSAGE,
        message: CREATED("Permission"),
        data: {permission},
        errors: null
    });
}

export async function updatePermission(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {id} = req.params;
    const {name} = req.body;

    let permission: Permission | undefined;

    try {
        permission = await Permission.query().patchAndFetchById(id, {name});
    } catch (error) {
        if (error instanceof ObjectionValidation) {
            return next(new ValidationError(error.data));
        }
        return next(new ServiceUnavailable({message: error.message}));
    }

    return res.status(SUCCESS_CODE).json({
        status: SUCCESS_STATUS_MESSAGE,
        message: UPDATED("Permission"),
        data: {permission},
        errors: null
    });
}

export async function deletePermission(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {id} = req.params;

    try {
        await Permission.query().deleteById(id);
    } catch (error) {
        return next(new ServiceUnavailable({message: error.message}));
    }

    return res.status(NO_CONTENT_CODE).json({});
}
