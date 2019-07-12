import Adapter from "../Adapter";
export default class Usb extends Adapter {
    private static findDeviceOrThrow;
    private static getPrinterDevices;
    private device;
    private endpoint;
    private vid;
    private pid;
    constructor(vid?: number, pid?: number);
    open(): Promise<void>;
    write(data: Uint8Array): Promise<void>;
    close(): Promise<void>;
    private throwIfNeeded;
}
