"use strict";

import {MUST_BE_NUMBER, ONLY_ALPHA_NUMERIC, REQUIRED} from "configs/validation-messages";
import {MIN_LENGTH} from "configs/constants";

export default {
    createDeviceType: {
        validation: {
            "name": {
                optional: true,
                in: "body",
                isAlphanumeric: {
                    errorMessage: ONLY_ALPHA_NUMERIC("Name")
                },
                notEmpty: {
                    errorMessage: REQUIRED("Name")
                }
            }
        },
        authentication: true,
        permissions: {
            admin: true
        }
    },
    updateDeviceType: {
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
            "name": {
                optional: true,
                in: "body",
                isAlphanumeric: {
                    errorMessage: ONLY_ALPHA_NUMERIC("Name")
                },
                notEmpty: {
                    errorMessage: REQUIRED("Name")
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
    deleteDeviceType: {
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
    }
};
