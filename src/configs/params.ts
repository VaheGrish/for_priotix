"use strict";

const params: any = {
    development: {
        blackListFile: "storage/devTokenBlackList.txt",
        _apiUrl: "http://localhost:3001/api/v1",
        apiUrl: "api.priotix.dev/api/v1",
        _appUrl: "http://localhost:3000",
        tokenSecret: "tasmanianDevil",
        refreshSecret: "refreshDevil",
        logFile: "storage/devLog.txt",
        appUrl: "http://priotix.dev",
        hostname: "priotix.dev",
        apiVersion: "v1",
        apiPort: 3001
    },
    production: {
        blackListFile: "storage/prodTokenBlackList.txt",
        _apiUrl: "http://localhost:3001/api/v1",
        apiUrl: "api.priotix.com/api/v1",
        _appUrl: "http://127.0.0.1:3000",
        logFile: "storage/prodLog.txt",
        tokenSecret: "tasmanianDevil",
        refreshSecret: "refreshDevil",
        appUrl: "http://priotix.com",
        hostname: "priotix.com",
        apiVersion: "v1",
        apiPort: 3001
    }
};

export default params[process.env.NODE_ENV || "development"];
