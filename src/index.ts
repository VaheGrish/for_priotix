require("module-alias/register");

"use strict";

import params from "./configs/params";
import * as http from "http";
import Api from "./api";

const server: http.Server = http.createServer(Api);

server.listen(params.apiPort);

server.on("listening", () => {
    console.dir(`Server listening on port ${server.address().port}`);
});
