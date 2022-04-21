export default GImage;
declare class GImage {
    static GBridge: any;
    _id: number;
    _width: number;
    _height: number;
    _src: any;
    _onload: () => void;
    _onerror: () => void;
    complete: boolean;
    set width(arg: number);
    get width(): number;
    set height(arg: number);
    get height(): number;
    set src(arg: any);
    get src(): any;
    addEventListener(name: any, listener: any): void;
    set onload(arg: () => void);
    get onload(): () => void;
    set onerror(arg: () => void);
    get onerror(): () => void;
    removeEventListener(name: any, listener: any): void;
}
