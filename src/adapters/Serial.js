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
const SerialPort = require("serialport");
const Adapter_1 = require("../Adapter");
class Serial extends Adapter_1.default {
    constructor(path, options) {
        super();
        options.autoOpen = false;
        this.device = new SerialPort(path, options);
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.device.open(err => {
                    if (err) {
                        throw err;
                    }
                    resolve();
                });
            });
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.throwIfNeeded();
                this.device.write(new Buffer(data), (err, written) => {
                    if (err) {
                        throw new Error("Failed to write to serial device");
                    }
                    resolve();
                });
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.throwIfNeeded();
                this.device.drain(() => {
                    this.device.close();
                    resolve();
                });
            });
        });
    }
    throwIfNeeded(reason) {
        if (!this.device) {
            throw new Error(reason || "The serial device is not open");
        }
    }
}
exports.default = Serial;
