import {ADMIN_ROLE} from "../../configs/constants";
import * as bcrypt from "bcrypt-nodejs";

exports.seed = function (knex, Promise) {
    return knex('users').del()
        .then(function () {
            return knex('users').insert([
                {
                    id: 1,
                    first_name: "admin",
                    last_name: "user",
                    email: "admin@user.com",
                    password: bcrypt.hashSync("admin_pass", bcrypt.genSaltSync(8)),
                    role: ADMIN_ROLE
                },
                {
                    id: 2,
                    first_name: "basic",
                    last_name: "user",
                    email: "basic@user.com",
                    password: bcrypt.hashSync("basic_pass", bcrypt.genSaltSync(8)),
                    role: ADMIN_ROLE
                }
            ]);
        });
};
