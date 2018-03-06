"use strict";

import {FAIL_STATUS_MESSAGE} from "configs/response-messages";
import configurePassport from "strategies/passport-jwt";
import {BAD_REQUEST_CODE} from "configs/status-codes";
import * as expressValidator from "express-validator";
import * as RateLimit from "express-rate-limit";
import * as cookieParser from "cookie-parser";
import enableModules from "./modules/index";
import database from "configs/database";
import corsConfigs from "configs/cors";
import csrfConfigs from "configs/csrf";
import limiter from "configs/limiter";
import * as passport from "passport";
import params from "configs/params";
import * as express from "express";
import * as logger from "morgan";
import {json} from "body-parser";
import * as helmet from "helmet";
import {Model} from "objection";
import * as csrf from "csurf";
import * as cors from "cors";
import * as Knex from "knex";

const rateLimiter: express.RequestHandler = new RateLimit(limiter);
const router: express.Router = express.Router();
const app: express.Application = express();

configurePassport(params.tokenSecret, passport);
Model.knex(Knex(database));

app.use(cors(corsConfigs))
    .use(json())
    .use(expressValidator())
    .use(cookieParser())
    .use(csrf(csrfConfigs))
    .use(rateLimiter)
    .use(helmet())
    .use(passport.initialize())
    .use(passport.session())
    .use(`/api/${params.apiVersion}`, router)
    .use((err, req, res, next) => res
        .status(err.status || BAD_REQUEST_CODE)
        .json({
            status: FAIL_STATUS_MESSAGE,
            data: null,
            message: err.message || "",
            errors: err.errors || null
        }))
    .set("json spaces", 4);

if (app.get("env") !== "production") {
    app.use(logger("dev"));
}

enableModules(router);

export default app;
