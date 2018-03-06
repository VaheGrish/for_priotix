"use strict";

import {NextFunction, Request, Response} from "express";

interface IObj {
    sanitizerFunction: string;
    functionOptions?: any;
    param: string;
    place: string;
}

export default (options: Array<IObj>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (Array.isArray(options)) {
            options.forEach((obj: IObj) => {
                if (req[obj.place.toLowerCase()][obj.param]) {
                    switch (obj.sanitizerFunction) {
                        case "escape":
                            req[`sanitize${obj.place}`](obj.param).escape();
                            break;
                        case "toInt":
                            req.sanitizeBody(obj.param).toInt();
                            break;
                        case "trim":
                            req.sanitizeBody(obj.param).trim(" ");
                            break;
                        case "toBoolean":
                            req.sanitizeBody(obj.param).toBoolean(obj.functionOptions);
                            break;
                        case "replace":
                            if (obj.functionOptions && obj.functionOptions.search && obj.functionOptions.replace) {
                                req.body[obj.param] = req.body[obj.param].replace(obj.functionOptions.search, obj.functionOptions.replace);
                            }
                            break;
                        default:
                            break;
                    }
                }
            });
        }
        next();
    };
};
