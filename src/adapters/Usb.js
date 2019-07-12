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
const usb_1 = require("usb");
const Adapter_1 = require("../Adapter");
const PRINTER_CLASS = 0x07;
class Usb extends Adapter_1.default {
    static findDeviceOrThrow(vid, pid) {
        if (vid && pid) {
            return usb_1.findByIds(vid, pid);
        }
        else {
            const devices = Usb.getPrinterDevices(vid);
            if (devices.length > 0) {
                return devices[0];
            }
        }
        throw new Error("No printer found");
    }
    static getPrinterDevices(vid) {
        return usb_1.getDeviceList()
            .filter(device => !vid || device.deviceDescriptor.idVendor === vid)
            .filter(device => {
            try {
                device.open();
                return device.interfaces.some(iface => iface.descriptor.bInterfaceClass === PRINTER_CLASS);
            }
            catch (err) {
                return false;
            }
            finally {
                device.close();
            }
        });
    }
    constructor(vid, pid) {
        super();
        this.vid = vid;
        this.pid = pid;
        usb_1.on("detatch", device => {
            if (device === this.device) {
                this.device.close();
            }
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.device = Usb.findDeviceOrThrow(this.vid, this.pid);
                this.device.open();
                this.device.interfaces.forEach(iface => {
                    iface.claim();
                    iface.endpoints.filter(endpoint => {
                        if (endpoint.direction === "out") {
                            this.endpoint = endpoint;
                            resolve();
                        }
                    });
                });
                this.throwIfNeeded("Cannot open printer");
            });
        });
    }
    write(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                this.throwIfNeeded();
                this.endpoint.transfer(new Buffer(data), err => {
                    if (err) {
                        throw new Error("Failed to write to USB device");
                    }
                    resolve();
                });
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.throwIfNeeded();
            this.device.close();
            this.device = null;
            this.endpoint = null;
        });
    }
    throwIfNeeded(reason) {
        if (!this.device || !this.endpoint) {
            throw new Error(reason || "The USB device is not open");
        }
    }
}
exports.default = Usb;
