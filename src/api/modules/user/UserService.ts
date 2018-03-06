"use strict";

import {CREATED, NO_UPDATE_DETAILS, PERMISSION_GRANTED, SOMETHING_WENT_WRONG, SUCCESS_STATUS_MESSAGE, UPDATED} from "configs/response-messages";
import {CREATED_CODE, NO_CONTENT_CODE, SUCCESS_CODE} from "configs/status-codes";
import UserDevicePermissions from "aditional-models/UserDevicePermission";
import {ValidationError as ObjectionValidation} from "objection";
import ServiceUnavailable from "errors/ServiceUnavailable";
import {NextFunction, Request, Response} from "express";
import ValidationError from "errors/ValidationError";
import BadRequest from "errors/BadRequest";
import User from "./User";

export async function assignDevice(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {id, device_id} = req.params;
    const {permissions} = req.body;

    const insertPromises: Promise<any>[] = [];

    permissions.forEach(permission_id => {
        insertPromises.push(
            UserDevicePermissions.query().insertAndFetch({
                permission_id,
                user_id: id,
                device_id
            })
        );
    });

    try {
        await Promise.all(insertPromises);
    } catch (error) {
        return next(new ServiceUnavailable({message: error.message}));
    }

    return res.status(SUCCESS_CODE).json({
        status: SUCCESS_STATUS_MESSAGE,
        message: PERMISSION_GRANTED,
        errors: null,
        data: null
    });
}

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {first_name, last_name, email, password} = req.body;

    let user: User | undefined;

    try {
        user = await User.query().insertAndFetch({
            first_name,
            last_name,
            password,
            email
        });
    } catch (error) {
        if (error instanceof ObjectionValidation) {
            return next(new ValidationError(error.data));
        }
        return next(new ServiceUnavailable({message: error.message}));
    }

    if (!user || !(user instanceof User)) {
        return next(new ServiceUnavailable(SOMETHING_WENT_WRONG));
    }

    return res.status(CREATED_CODE).json({
        status: SUCCESS_STATUS_MESSAGE,
        message: CREATED("User"),
        data: {user},
        errors: null
    });
}

export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {id} = req.params;

    let dataForUpdate: any = {};

    req.body.forEach((value: any, field: string) => {
        if (value && User.fields.includes(field)) {
            dataForUpdate[field] = value;
        }
    });

    if (Object.keys(dataForUpdate).length === 0) {
        return next(new BadRequest(NO_UPDATE_DETAILS));
    }

    let user: User;

    try {
        user = await User.query().patchAndFetchById(id, dataForUpdate);
    } catch (error) {
        if (error instanceof ObjectionValidation) {
            return next(new ValidationError(error.data));
        }
        return next(new ServiceUnavailable({message: error.message}));
    }

    return res.status(SUCCESS_CODE).json({
        status: SUCCESS_STATUS_MESSAGE,
        message: UPDATED("User"),
        data: {
            user: {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        },
        errors: null
    });
}

export async function deleteUser(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {id} = req.params;

    try {
        await User.query().deleteById(id);
    } catch (error) {
        return next(new ServiceUnavailable({message: error.message}));
    }

    return res.status(NO_CONTENT_CODE).json({});
}
