"use strict";

const cors: any = {
    development: {
        origin: /priotix\.dev/,
        credentials: true,
        allowedHeaders: [
            "Content-Type", "Accept", "Authorization", "X-XSRF-Token"
        ]
    },
    production: {
        origin: /priotix\.com/,
        credentials: true,
        allowedHeaders: [
            "Content-Type", "Accept", "Authorization", "X-XSRF-Token"
        ]
    }
};

export default cors[process.env.NODE_ENV || "development"];
