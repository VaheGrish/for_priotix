"use strict";

import params from "../configs/params";
import File from "../helpers/File";
import * as moment from "moment";

const file: File = new File(params.blackListFile, "a+");
let newContent: string = "";

file.open().then(() => {
    file.read().then(content => {
        const tokensWithDate: Array<string> = content.split("\n");
        tokensWithDate.forEach(tokenWithDate => {
            if (tokenWithDate.indexOf(" - ") !== -1) {
                const date: string = tokenWithDate.split(" - ")[1];
                const diff: number = moment().diff(moment(date), "minutes");
                if (diff < 15) {
                    newContent += `${tokenWithDate}\n`;
                }
            }
        });
        file.replaceContent(newContent).then(() => {
            console.info("Token black list filtered!");
            process.exit();
        });
    });
});
