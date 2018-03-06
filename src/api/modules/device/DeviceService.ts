"use strict";

import {ACTION_SUCCESSFULLY_DONE, CREATED, NO_UPDATE_DETAILS, SOMETHING_WENT_WRONG, SUCCESS_STATUS_MESSAGE, UPDATED} from "configs/response-messages";
import {CREATED_CODE, NO_CONTENT_CODE, SUCCESS_CODE} from "configs/status-codes";
import {ValidationError as ObjectionValidation} from "objection";
import ServiceUnavailable from "errors/ServiceUnavailable";
import {NextFunction, Request, Response} from "express";
import ValidationError from "errors/ValidationError";
import Permission from "../permission/Permission";
import BadRequest from "errors/BadRequest";
import Device from "./Device";

export async function createDevice(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {name, device_type_id} = req.body;

    let device: Device | undefined;

    try {
        device = await Device.query().insertAndFetch({name, device_type_id});
    } catch (error) {
        if (error instanceof ObjectionValidation) {
            return next(new ValidationError(error.data));
        }
        return next(new ServiceUnavailable({message: error.message}));
    }

    if (!device || !(device instanceof Device)) {
        return next(new ServiceUnavailable(SOMETHING_WENT_WRONG));
    }

    return res.status(CREATED_CODE).json({
        status: SUCCESS_STATUS_MESSAGE,
        message: CREATED("Device"),
        data: {device},
        errors: null
    });
}

export async function updateDevice(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {id} = req.params;
    let device: Device | undefined;

    let dataForUpdate: any = {};

    req.body.forEach((value: any, field: string) => {
        if (value && Device.fields.includes(field)) {
            dataForUpdate[field] = value;
        }
    });

    if (Object.keys(dataForUpdate).length === 0) {
        return next(new BadRequest(NO_UPDATE_DETAILS));
    }

    try {
        device = await Device.query().patchAndFetchById(id, dataForUpdate);
    } catch (error) {
        if (error instanceof ObjectionValidation) {
            return next(new ValidationError(error.data));
        }
        return next(new ServiceUnavailable({message: error.message}));
    }

    return res.status(SUCCESS_CODE).json({
        status: SUCCESS_STATUS_MESSAGE,
        message: UPDATED("Device"),
        data: {device},
        errors: null
    });
}

export async function deleteDevice(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {id} = req.params;

    try {
        await Device.query().deleteById(id);
    } catch (error) {
        return next(new ServiceUnavailable({message: error.message}));
    }

    return res.status(NO_CONTENT_CODE).json({});
}

export async function doAction(req: Request, res: Response, next: NextFunction): Promise<any> {
    const {action} = req.body;
    const {id} = req.params;

    let permission: Permission;
    let device: Device;

    try {
        permission = await Permission.query().where("name", action).first();
        device = await Device.query().findById(id);
    } catch (error) {
        return next(new ServiceUnavailable({message: error.message}));
    }

    // do action

    return res.status(SUCCESS_CODE).json({
        status: SUCCESS_STATUS_MESSAGE,
        message: ACTION_SUCCESSFULLY_DONE,
        errors: null,
        data: null
    });
}
