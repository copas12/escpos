import Adapter from "../Adapter";
export declare type Logger = (data: string) => void;
export default class Console extends Adapter {
    private logger;
    private numbersPerLine;
    constructor(logger?: Logger, numbersPerLine?: number);
    open(): Promise<void>;
    write(data: Uint8Array): Promise<void>;
    close(): Promise<void>;
    private toHexString;
}
