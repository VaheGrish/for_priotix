"use strict";

const database: any = {
    development: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "root",
            database: "priotix_dev",
            charset: "utf8"
        },
        seeds: {
            directory: "./src/database/seeders"
        },
        migrations: {
            tableName: "migrations",
            directory: "./src/database/migrations"
        }
    },
    production: {
        client: "mysql",
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "root",
            database: "priotix",
            charset: "utf8"
        },
        pool: {
            min: 2,
            max: 10
        },
        seeds: {
            directory: "./dist/database/production_seeders"
        },
        migrations: {
            tableName: "migrations",
            directory: "./dist/database/migrations"
        }
    }
};

export default database[process.env.NODE_ENV || "development"];
