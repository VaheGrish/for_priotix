"use strict";

import permissions from "./permissions";
import validator from "./validator";
import sanitizer from "./sanitizer";
import passport from "./passport";
import token from "./token";

export default (schemas: any, actionName: string): Array<any> => {
    let middlewares: Array<any> = [];

    if (!schemas[actionName]) {
        return middlewares;
    }

    if (schemas[actionName].authentication) {
        middlewares.push(token());
        middlewares.push(passport);
    }

    if (schemas[actionName].validation) {
        middlewares.push(validator(schemas[actionName].validation, schemas[actionName].additional));
    } else if (schemas[actionName].additional) {
        middlewares.push(validator({}, schemas[actionName].additional));
    }

    if (schemas[actionName].sanitizer) {
        middlewares.push(sanitizer(schemas[actionName].sanitizer));
    }

    if (schemas[actionName].permissions) {
        middlewares.push(permissions(schemas[actionName].permissions));
    }

    return middlewares;
};
