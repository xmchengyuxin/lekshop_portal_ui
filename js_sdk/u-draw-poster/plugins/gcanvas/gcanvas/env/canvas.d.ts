export default class GCanvas {
    constructor(id: any, { disableAutoSwap }: {
        disableAutoSwap: any;
    });
    id: any;
    _needRender: boolean;
    _disableAutoSwap: any;
    _swapBuffers: (() => void) | undefined;
    getContext(type: any): GContext2D | GContextWebGL;
    reset(): void;
}
import GContext2D from "../context-2d/RenderingContext";
import GContextWebGL from "../context-webgl/RenderingContext";
