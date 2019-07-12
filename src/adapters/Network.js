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
const net_1 = require("net");
const Adapter_1 = require("../Adapter");
class Network extends Adapter_1.default {
    constructor(address, port = 9100, retries = 0) {
        super();
        this.device = new net_1.Socket();
        this.retrying = false;
        this.retries = 0;
        this.options = {
            address,
            port
        };
        this.device.on("close", () => {
            this.connected = false;
            if (this.retrying && (retries === 0 || this.retries < retries)) {
                this.retries++;
                setTimeout(() => {
                    this.device.connect(this.options.port, this.options.address);
                }, 5000);
            }
            else {
                this.retrying = false;
            }
        });
        this.device.on("error", () => this.connected = false);
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.retrying = true;
                this.device.connect(this.options.port, this.options.address);
                this.device.on("connect", () => {
                    this.retrying = false;
                    this.connected = true;
                    resolve();
                });
            });
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.throwIfNeeded();
                this.device.write(new Buffer(data), resolve);
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.throwIfNeeded();
            this.retrying = false;
            this.connected = false;
            this.device.destroy();
        });
    }
    throwIfNeeded(reason) {
        if (!this.device || !this.connected) {
            throw new Error(reason || "The network socket is not open");
        }
    }
}
exports.default = Network;
