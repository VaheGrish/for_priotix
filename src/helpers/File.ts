"use strict";

import * as fs from "fs";

export default class File {

    fileName: string;
    mode: string;

    constructor(fileName: string, mode: string) {
        this.fileName = fileName;
        this.mode = mode;
    }

    public open(): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.open(this.fileName, this.mode, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }

    public read(): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.fileName, "utf8", (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }

    public replaceContent(data: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.fileName, data, error => {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }
}
