"use strict";

import {ExtractJwt, Strategy, StrategyOptions} from "passport-jwt";
import ServiceUnavailable from "errors/ServiceUnavailable";
import {USER_NOT_EXIST} from "configs/response-messages";
import AuthError from "errors/AuthError";
import {PassportStatic} from "passport";
import User from "modules/user/User";

export interface IPayload {
    id: number;
    created_at: string;
}

export default (secret: string, passport: PassportStatic): void => {

    passport.serializeUser((user: User, done: (err: any, id: number) => void) => {
        done(null, user.id);
    });

    passport.deserializeUser((id: number, done: (err: any, user: User | null) => void) => {
        User.query().findById(id)
            .then((user: User) => {
                user ? done(null, user) : done(new AuthError(USER_NOT_EXIST), null);
            }).catch((err) => {
            done(err, null);
        });
    });

    let jwtOptions: StrategyOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("Bearer"),
        secretOrKey: secret
    };

    let strategy: Strategy = new Strategy(jwtOptions, (payload: IPayload, next) => {
        User.query().findById(payload.id)
            .then((dbUser: User) => {
                if (dbUser) {
                    next(null, dbUser);
                } else {
                    next(new AuthError(USER_NOT_EXIST), false);
                }
                return null;
            }).catch((err) => {
            next(new ServiceUnavailable({message: err.message}), false);
        });
    });

    passport.use(strategy);
};
