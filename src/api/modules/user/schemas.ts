"use strict";

import {INVALID_EMAIL, INVALID_PASSWORD, LENGTH_REQUIRED, MUST_BE_NUMBER, ONLY_ALPHA_NUMERIC, REQUIRED} from "configs/validation-messages";
import {EMAIL_MAX_LENGTH, MIN_LENGTH, NAME_MAX_LENGTH, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from "configs/constants";

export default {
    assignDevice: {
        validation: {
            "id": {
                in: "params",
                notEmpty: {
                    errorMessage: REQUIRED("ID")
                },
                isInt: {
                    options: [{min: MIN_LENGTH}],
                    errorMessage: MUST_BE_NUMBER("ID")
                }
            },
            "device_id": {
                in: "params",
                notEmpty: {
                    errorMessage: REQUIRED("Device ID")
                },
                isInt: {
                    options: [{min: MIN_LENGTH}],
                    errorMessage: MUST_BE_NUMBER("Device ID")
                }
            },
            "permissions": {
                in: "params",
                notEmpty: {
                    errorMessage: REQUIRED("Permissions")
                }
            }
        },
        sanitizer: [
            {
                sanitizerFunction: "toInt",
                param: "id",
                place: "Params"
            },
            {
                sanitizerFunction: "toInt",
                param: "device_id",
                place: "Params"
            }
        ],
        authentication: true,
        permissions: {
            admin: true
        }
    },
    updateUser: {
        validation: {
            "id": {},
            "first_name": {
                optional: true,
                in: "body",
                isAlphanumeric: {
                    errorMessage: ONLY_ALPHA_NUMERIC("First name")
                },
                isLength: {
                    options: [{min: MIN_LENGTH, max: NAME_MAX_LENGTH}],
                    errorMessage: LENGTH_REQUIRED("First name", {max: NAME_MAX_LENGTH})
                }
            },
            "last_name": {
                optional: true,
                in: "body",
                isAlphanumeric: {
                    errorMessage: ONLY_ALPHA_NUMERIC("Last name")
                },
                isLength: {
                    options: [{min: MIN_LENGTH, max: NAME_MAX_LENGTH}],
                    errorMessage: LENGTH_REQUIRED("Last name", {max: NAME_MAX_LENGTH})
                }
            },
            "email": {
                optional: true,
                in: "body",
                isEmail: {
                    errorMessage: INVALID_EMAIL
                },
                isLength: {
                    options: [{min: MIN_LENGTH, max: EMAIL_MAX_LENGTH}],
                    errorMessage: LENGTH_REQUIRED("Last name", {max: NAME_MAX_LENGTH})
                }
            },
            "password": {
                optional: true,
                in: "body",
                matches: {
                    options: [/^(?=.*?[a-zA-Z])(?=.*?[0-9])[\w@#$%^?~-]{0,128}$/],
                    errorMessage: INVALID_PASSWORD
                },
                isLength: {
                    options: [{min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH}],
                    errorMessage: LENGTH_REQUIRED("Password", {min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH})
                }
            }
        },
        authentication: true,
        permissions: {
            admin: true
        }
    },
    deleteUser: {
        validation: {
            "id": {
                in: "params",
                notEmpty: {
                    errorMessage: REQUIRED("ID")
                },
                isInt: {
                    options: [{min: MIN_LENGTH}],
                    errorMessage: MUST_BE_NUMBER("ID")
                }
            }
        },
        sanitizer: [
            {
                sanitizerFunction: "toInt",
                param: "id",
                place: "Params"
            }
        ],
        authentication: true,
        permissions: {
            admin: true
        }
    },
    createUser: {
        validation: {
            "first_name": {
                in: "body",
                notEmpty: {
                    errorMessage: REQUIRED("First name")
                },
                isAlphanumeric: {
                    errorMessage: ONLY_ALPHA_NUMERIC("First name")
                },
                isLength: {
                    options: [{min: MIN_LENGTH, max: NAME_MAX_LENGTH}],
                    errorMessage: LENGTH_REQUIRED("First name", {max: NAME_MAX_LENGTH})
                }
            },
            "last_name": {
                in: "body",
                notEmpty: {
                    errorMessage: REQUIRED("Last name")
                },
                isAlphanumeric: {
                    errorMessage: ONLY_ALPHA_NUMERIC("Last name")
                },
                isLength: {
                    options: [{min: MIN_LENGTH, max: NAME_MAX_LENGTH}],
                    errorMessage: LENGTH_REQUIRED("Last name", {max: NAME_MAX_LENGTH})
                }
            },
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
                    errorMessage: LENGTH_REQUIRED("Last name", {max: NAME_MAX_LENGTH})
                }
            },
            "password": {
                in: "body",
                notEmpty: {
                    errorMessage: REQUIRED("Password")
                },
                matches: {
                    options: [/^(?=.*?[a-zA-Z])(?=.*?[0-9])[\w@#$%^?~-]{0,128}$/],
                    errorMessage: INVALID_PASSWORD
                },
                isLength: {
                    options: [{min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH}],
                    errorMessage: LENGTH_REQUIRED("Password", {min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH})
                }
            }
        },
        authentication: true,
        permissions: {
            admin: true
        }
    }
};
