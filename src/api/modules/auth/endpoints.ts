"use strict";

import {getCsrf, refreshToken, signIn, signOut} from "./AuthService";
import middlewares from "middlewares";
import schemas from "./schemas";

export default (router: any) => {

    router.put("/refresh-token", ...middlewares(schemas, "refreshToken"), refreshToken);

    router.post("/sign-out", ...middlewares(schemas, "signOut"), signOut);

    router.post("/sign-in", ...middlewares(schemas, "signIn"), signIn);

    router.get("/get-csrf", getCsrf);

};
