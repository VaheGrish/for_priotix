"use strict";

import {EMAIL_MAX_LENGTH, MIN_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from "configs/constants";
import {INVALID_EMAIL, LENGTH_REQUIRED, MISSING, REQUIRED} from "configs/validation-messages";

export default {
    refreshToken: {
        additional: [{
            place: "Cookies",
            param: "refreshToken",
            message: MISSING("refresh token", "cookies"),
            validationFunction: "notEmpty"
        }]
    },
    signOut: {
        authentication: true
    },
    signIn: {
        validation: {
            "email": {
                in: "body",
                notEmpty: {
                    errorMessage: REQUIRED("Email")
                },
                isEmail: {
                    errorMessage: INVALID_EMAIL
                },
                isLength: {
                    options: [{min: MIN_LENGTH, max: EMAIL_MAX_LENGTH}],
                    errorMessage: LENGTH_REQUIRED("Email", {max: EMAIL_MAX_LENGTH})
                }
            },
            "password": {
                in: "body",
                notEmpty: {
                    errorMessage: REQUIRED("Password")
                },
                isLength: {
                    options: [{min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH}],
                    errorMessage: LENGTH_REQUIRED("Password", {min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH})
                }
            }
        },
        additional: [{
            place: "Headers",
            param: "Authorization",
            message: REQUIRED("Authorization header"),
            validationFunction: "notEmpty"
        }]
    }
};
