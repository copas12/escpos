"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Adapter_1 = require("../Adapter");
class Console extends Adapter_1.default {
    constructor(logger = console.log, numbersPerLine = 16) {
        super();
        this.logger = logger;
        this.numbersPerLine = numbersPerLine;
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const regex = new RegExp(`(.{${this.numbersPerLine * 3}})`, "g");
            const dataString = this.toHexString(data);
            this.logger(dataString.replace(/(.{2})/g, "$1 ").replace(regex, "$1\n"));
            return;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return;
        });
    }
    toHexString(byteArray) {
        return Array.from(byteArray, (byte) => ("0" + byte.toString(16)).slice(-2)).join("");
    }
}
exports.default = Console;
