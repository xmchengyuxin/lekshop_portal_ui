export function enable(el: any, { bridge, debug, disableAutoSwap, disableComboCommands }?: {
    bridge: any;
    debug: any;
    disableAutoSwap: any;
    disableComboCommands: any;
}): GCanvas;
export let Image: typeof GImage;
export let WeexBridge: {
    callEnable: (ref: any, configArray: any) => any;
    callEnableDebug: () => void;
    callEnableDisableCombo: () => void;
    callSetContextType: (componentId: any, context_type: any) => void;
    callReset: (id: any) => void;
    render: (componentId: any) => any;
    render2d: (componentId: any, commands: any, callback: any) => void;
    callExtendCallNative: (componentId: any, cmdArgs: any) => never;
    flushNative: (componentId: any) => any;
    callNative: (componentId: any, cmdArgs: any, cache: any) => any;
    texImage2D(componentId: any, ...args: any[]): void;
    texSubImage2D(componentId: any, target: any, level: any, xoffset: any, yoffset: any, format: any, type: any, image: any, ...args: any[]): void;
    bindImageTexture(componentId: any, src: any, imageId: any): void;
    perloadImage([url, id]: [any, any], callback: any): void;
    measureText(text: any, fontStyle: any, componentId: any): any;
    getImageData(componentId: any, x: any, y: any, w: any, h: any, callback: any): void;
    putImageData(componentId: any, data: any, x: any, y: any, w: any, h: any, callback: any): void;
    toTempFilePath(componentId: any, x: any, y: any, width: any, height: any, destWidth: any, destHeight: any, fileType: any, quality: any, callback: any): void;
};
import GCanvas from "./env/canvas";
import GImage from "./env/image";
