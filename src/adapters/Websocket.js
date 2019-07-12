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
const WebSocket = require("ws");
const Adapter_1 = require("../Adapter");
class Websocket extends Adapter_1.default {
    constructor(address) {
        super();
        this.address = address;
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.device = new WebSocket(this.address);
                this.device.on("open", () => {
                    this.connected = true;
                    resolve();
                });
                this.device.on("close", () => {
                    this.connected = false;
                });
                this.device.on("error", err => {
                    this.connected = false;
                    throw err;
                });
            });
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.throwIfNeeded();
                this.device.send(new Buffer(data), err => {
                    if (err) {
                        throw err;
                    }
                    resolve();
                });
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.throwIfNeeded();
            this.connected = false;
            this.device.close();
        });
    }
    throwIfNeeded(reason) {
        if (!this.device || !this.connected) {
            throw new Error(reason || "The websocket is not open");
        }
    }
}
exports.default = Websocket;
