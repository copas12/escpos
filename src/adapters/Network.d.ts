import Adapter from "../Adapter";
export interface IEndpoint {
    address: string;
    port: number;
}
export default class Network extends Adapter {
    private retrying;
    private options;
    private device;
    private retries;
    private connected;
    constructor(address: string, port?: number, retries?: number);
    open(): Promise<void>;
    write(data: Uint8Array): Promise<void>;
    close(): Promise<void>;
    private throwIfNeeded;
}
