import Adapter from "../Adapter";
export default class Websocket extends Adapter {
    private address;
    private device;
    private connected;
    constructor(address: string);
    open(): Promise<void>;
    write(data: Uint8Array): Promise<void>;
    close(): Promise<void>;
    private throwIfNeeded;
}
