export default GBridge;
declare namespace GBridge {
    function callEnable(ref: any, configArray: any): any;
    function callEnableDebug(): void;
    function callEnableDisableCombo(): void;
    function callSetContextType(componentId: any, context_type: any): void;
    function callReset(id: any): void;
    function render(componentId: any): any;
    function render2d(componentId: any, commands: any, callback: any): void;
    function callExtendCallNative(componentId: any, cmdArgs: any): never;
    function flushNative(componentId: any): any;
    function callNative(componentId: any, cmdArgs: any, cache: any): any;
    function texImage2D(componentId: any, ...args: any[]): void;
    function texImage2D(componentId: any, ...args: any[]): void;
    function texSubImage2D(componentId: any, target: any, level: any, xoffset: any, yoffset: any, format: any, type: any, image: any, ...args: any[]): void;
    function texSubImage2D(componentId: any, target: any, level: any, xoffset: any, yoffset: any, format: any, type: any, image: any, ...args: any[]): void;
    function bindImageTexture(componentId: any, src: any, imageId: any): void;
    function bindImageTexture(componentId: any, src: any, imageId: any): void;
    function perloadImage([url, id]: [any, any], callback: any): void;
    function perloadImage([url, id]: [any, any], callback: any): void;
    function measureText(text: any, fontStyle: any, componentId: any): any;
    function measureText(text: any, fontStyle: any, componentId: any): any;
    function getImageData(componentId: any, x: any, y: any, w: any, h: any, callback: any): void;
    function getImageData(componentId: any, x: any, y: any, w: any, h: any, callback: any): void;
    function putImageData(componentId: any, data: any, x: any, y: any, w: any, h: any, callback: any): void;
    function putImageData(componentId: any, data: any, x: any, y: any, w: any, h: any, callback: any): void;
    function toTempFilePath(componentId: any, x: any, y: any, width: any, height: any, destWidth: any, destHeight: any, fileType: any, quality: any, callback: any): void;
    function toTempFilePath(componentId: any, x: any, y: any, width: any, height: any, destWidth: any, destHeight: any, fileType: any, quality: any, callback: any): void;
}
