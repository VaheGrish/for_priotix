"use strict";

import {NO_CONTENT_CODE, SUCCESS_CODE} from "configs/status-codes";
import ServiceUnavailable from "errors/ServiceUnavailable";
import {NextFunction, Request, Response} from "express";
import * as messages from "configs/response-messages";
import {IPayload} from "strategies/passport-jwt";
import {ADMIN_ROLE} from "configs/constants";
import BadRequest from "errors/BadRequest";
import AuthError from "errors/AuthError";
import Forbidden from "errors/Forbidden";
import params from "configs/params";
import * as jwt from "jsonwebtoken";
import * as base64 from "base-64";
import * as moment from "moment";
import File from "helpers/File";
import User from "../user/User";

export async function refreshToken(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {refreshToken} = req.cookies;
    const token: string | undefined = req.header("authorization");
    let decoded: IPayload | any,
        data: string;

    try {
        decoded = jwt.verify(refreshToken, params.refreshSecret);
    } catch (error) {
        res.cookie("refreshToken", "");
        return next(new BadRequest(messages.INVALID_REFRESH_TOKEN, {message: error.message}));
    }

    let user: User | undefined;

    if (!decoded.id) {
        res.cookie("refreshToken", "");
        return next(new BadRequest(messages.INVALID_REFRESH_TOKEN));
    } else {
        user = await User.query().findById(decoded.id);
    }

    if (!user || !(user instanceof User)) {
        res.cookie("refreshToken", "");
        return next(new BadRequest(messages.USER_NOT_EXIST));
    }

    if (token) {
        const file: File = new File(params.blackListFile, "a+");

        try {
            await file.open();
            data = await file.read();
        } catch (error) {
            return next(new ServiceUnavailable({message: error.message}));
        }

        if (data) {
            data = `${data}\n${token} - ${moment().format("YYYY-MM-DD HH:mm:ss")}`;
        } else {
            data = `${token} - ${moment().format("YYYY-MM-DD HH:mm:ss")}`;
        }

        try {
            await file.replaceContent(data);
        } catch (error) {
            return next(new ServiceUnavailable({message: error.message}));
        }
    }

    const accessToken: string = jwt.sign({id: decoded.id, created_at: moment().toString()}, params.tokenSecret, {expiresIn: 900});

    return res.status(SUCCESS_CODE).json({
        status: messages.SUCCESS_STATUS_MESSAGE,
        message: messages.ACCESS_TOKEN_REFRESHED,
        data: {
            accessToken: accessToken,
            user: {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role
            }
        },
        errors: null
    });
}

export async function signOut(req: Request, res: Response, next: NextFunction): Promise<any> {

    let token: string | undefined = req.header("authorization");
    let data: string;

    const file: File = new File(params.blackListFile, "a+");

    try {
        await file.open();
        data = await file.read();
    } catch (error) {
        return next(new ServiceUnavailable({message: error.message}));
    }

    if (data) {
        data = `${data}\n${token} - ${moment().format("YYYY-MM-DD HH:mm:ss")}`;
    } else {
        data = `${token} - ${moment().format("YYYY-MM-DD HH:mm:ss")}`;
    }

    try {
        await file.replaceContent(data);
    } catch (error) {
        return next(new ServiceUnavailable({message: error.message}));
    }

    res.cookie("refreshToken", "");

    req.logout();

    return res.status(NO_CONTENT_CODE).json({});
}

export async function signIn(req: Request, res: Response, next: NextFunction): Promise<any> {

    const {email, password} = req.body;

    const authHeader: string | undefined = req.header("Authorization");

    if (!authHeader) {
        return;
    }

    if (!authHeader.includes(" ")) {
        return next(new AuthError(messages.INVALID_AUTHORIZATION_HEADER));
    }

    const baseToken: string = authHeader.split(" ")[1];

    let details: string = "";

    try {
        details = base64.decode(baseToken);
    } catch (error) {
        return next(new BadRequest(messages.INVALID_BASE64, {message: error.message}));
    }

    if (!details.includes(":")) {
        return next(new AuthError(messages.INVALID_AUTHORIZATION_HEADER));
    }

    const [headerEmail, headerPassword] = details.split(":");

    if (email !== headerEmail || password !== headerPassword) {
        return next(new AuthError(messages.CREDENTIALS_NOT_MATCHING));
    }

    let user: User | undefined;

    try {
        user = await User.query().where("email", email).first();
    } catch (error) {
        return next(new ServiceUnavailable({message: error.message}));
    }

    if (!user || !(user instanceof User) || !user.validatePassword(password)) {
        return next(new BadRequest(messages.USER_NOT_EXIST));
    }

    const payload: IPayload = {id: user.id, created_at: moment().toString()};
    const token: string = jwt.sign(payload, params.tokenSecret, {expiresIn: 900});
    const refreshToken: string = jwt.sign({...payload}, params.refreshSecret);

    res.cookie("refreshToken", refreshToken, {path: "/", httpOnly: true});

    const userData: any = {
        ...user,
        token: token
    };

    delete userData.password;
    delete userData.created_at;
    delete userData.updated_at;

    return res.status(SUCCESS_CODE).json({
        status: messages.SUCCESS_STATUS_MESSAGE,
        message: messages.SUCCESSFULLY_SIGNED_IN,
        data: {
            user: userData
        },
        errors: null
    });
}

export function getCsrf(req: Request, res: Response): Response {
    const csrf: string = req.csrfToken();
    return res.status(SUCCESS_CODE).json({"csrf": csrf});
}
