"use strict";

import {MUST_BE_NUMBER, ONLY_ALPHA_NUMERIC, REQUIRED} from "configs/validation-messages";
import {MIN_LENGTH} from "configs/constants";

export default {
    createDevice: {
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
            },
            device_type_id: {
                in: "body",
                notEmpty: {
                    errorMessage: REQUIRED("Device Type ID")
                },
                isInt: {
                    options: [{min: MIN_LENGTH}],
                    errorMessage: MUST_BE_NUMBER("Device Type ID")
                }
            }
        },
        authentication: true,
        permissions: {
            device_type_exist: true,
            admin: true
        }
    },
    updateDevice: {
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
            },
            device_type_id: {
                optional: true,
                in: "body",
                isInt: {
                    options: [{min: MIN_LENGTH}],
                    errorMessage: MUST_BE_NUMBER("Device Type ID")
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
            device_type_exist: {
                id_name: "device_type_id",
                id_place: "body"
            },
            admin: true
        }
    },
    deleteDevice: {
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
    doAction: {
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
            "action": {
                optional: true,
                in: "body",
                isAlphanumeric: {
                    errorMessage: ONLY_ALPHA_NUMERIC("Action")
                },
                notEmpty: {
                    errorMessage: REQUIRED("Action")
                }
            },
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
            action_allowed: {
                action_variable: {
                    name: "action",
                    place: "body"
                },
                device_variable: {
                    name: "id",
                    place: "params"
                }
            }
        }
    }
};
