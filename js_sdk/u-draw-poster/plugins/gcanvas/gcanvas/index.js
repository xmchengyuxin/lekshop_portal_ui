import GCanvas from './env/canvas';
import GImage from './env/image';
import GWebGLRenderingContext from './context-webgl/RenderingContext';
import GContext2D from './context-2d/RenderingContext';
import GBridgeWeex from './bridge/bridge-weex';
export let Image = GImage;
export let WeexBridge = GBridgeWeex;
export function enable(el, { bridge, debug, disableAutoSwap, disableComboCommands } = {}) {
    const GBridge = GImage.GBridge = GCanvas.GBridge = GWebGLRenderingContext.GBridge = GContext2D.GBridge = bridge;
    GBridge.callEnable(el.ref, [
        0,
        -1,
        false,
        false,
        1,
        'white',
        false // sameLevel: newCanvasMode = true && true => GCanvasView and Webview is same level
    ]);
    if (debug === true) {
        GBridge.callEnableDebug();
    }
    if (disableComboCommands) {
        GBridge.callEnableDisableCombo();
    }
    var canvas = new GCanvas(el.ref, { disableAutoSwap });
    canvas.width = el.style.width;
    canvas.height = el.style.height;
    return canvas;
}
;
//# sourceMappingURL=index.js.map