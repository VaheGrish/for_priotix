"use strict";

import {CREATED, SOMETHING_WENT_WRONG, SUCCESS_STATUS_MESSAGE, UPDATED} from "configs/response-messages";
import {CREATED_CODE, NO_CONTENT_CODE, SUCCESS_CODE} from "configs/status-codes";
import {ValidationError as ObjectionValidation} from "objection";
import ServiceUnavailable from "errors/ServiceUnavailable";
import {NextFunction, Request, Response} from "express";
import ValidationError from "errors/ValidationError";
import DeviceType from "./DeviceType";

export async function createDeviceType(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {name} = req.body;

    let deviceType: DeviceType | undefined;

    try {
        deviceType = await DeviceType.query().insertAndFetch({name});
    } catch (error) {
        if (error instanceof ObjectionValidation) {
            return next(new ValidationError(error.data));
        }
        return next(new ServiceUnavailable({message: error.message}));
    }

    if (!deviceType || !(deviceType instanceof DeviceType)) {
        return next(new ServiceUnavailable(SOMETHING_WENT_WRONG));
    }

    return res.status(CREATED_CODE).json({
        status: SUCCESS_STATUS_MESSAGE,
        message: CREATED("Device Type"),
        data: {deviceType},
        errors: null
    });
}

export async function updateDeviceType(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {id} = req.params;
    const {name} = req.body;

    let deviceType: DeviceType | undefined;

    try {
        deviceType = await DeviceType.query().patchAndFetchById(id, {name});
    } catch (error) {
        if (error instanceof ObjectionValidation) {
            return next(new ValidationError(error.data));
        }
        return next(new ServiceUnavailable({message: error.message}));
    }

    return res.status(SUCCESS_CODE).json({
        status: SUCCESS_STATUS_MESSAGE,
        message: UPDATED("Device Type"),
        data: {deviceType},
        errors: null
    });
}

export async function deleteDeviceType(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {id} = req.params;

    try {
        await DeviceType.query().deleteById(id);
    } catch (error) {
        return next(new ServiceUnavailable({message: error.message}));
    }

    return res.status(NO_CONTENT_CODE).json({});
}
