/// <reference types="@dcloudio/types" />
import { DrawPosterPlugin, DrawPosterUse } from './plugin';
export declare type NonNullableCustom<T, N> = T extends N ? never : T;
export declare type NonPick<T, K extends keyof T> = {
    [P in NonNullableCustom<keyof T, K>]: T[P];
};
export interface DrawPosterOptions {
    /** 查询字符串(必须), 注意不要写错对应canvas id */
    selector: string;
    /** 选取组件范围 */
    componentThis?: any;
    /** 绘制类型, 微信小程序自动切换为 '2d' */
    type?: '2d' | 'context' | 'webgl';
    /** 是否在绘制与创建时显示加载提示 */
    loading?: boolean | {
        /** 生成时加载文字 @default '绘制海报中...' */
        render?: string;
        /** 创建图片时加载文字 @default '生成图片中...' */
        create?: string;
    };
    /** 是否开启调试模式 */
    debug?: boolean;
    /** 是否启动gcanvas(nvue) */
    gcanvas?: boolean;
    /** 画布宽度 */
    width?: number;
    /** 画布高度 */
    height?: number;
    /** 绘制扩展 */
    plugins?: DrawPosterPlugin[];
}
export interface DrawPosterResult {
    /** 绘制标识 */
    readonly id: string;
    /** 当前绘画插件 */
    readonly plugins: DrawPosterPlugin[];
    /** 源数据 */
    readonly $options: DrawPosterOptions;
    /** 画布(仅 2d 生效) */
    readonly canvas: Canvas;
    /** 画笔 */
    readonly ctx: CanvasCtx;
    /**
     * 引入扩展
     * 建议: 在构建配置中传入 `plugins`, 该引入方式无法触发 beforeMount
     */
    readonly use: DrawPosterUse;
    /** 停止绘制(仅停止生成) */
    readonly stop: () => void;
    /** 创建一个绘制作用域 */
    readonly draw: (func: (ctx: CanvasCtx) => Promise<void> | void) => void;
    /** 将所有作用域渲染 */
    readonly render: () => Promise<boolean[]>;
    /** 生成图片地址 */
    readonly createImagePath: (options?: CreateImagePathOptions) => Promise<string>;
    /** 绘图原型(用于在 beforeMount 时自定义绘制原型) */
    $drawPrototype?: {
        canvas: Canvas;
        ctx: CanvasCtx;
    };
    [key: string]: any;
}
export interface CanvasCtx extends UniApp.CanvasContext {
    [key: string]: any;
    createImageData: () => ImageData;
    textAlign: CanvasTextDrawingStyles['textAlign'];
    textBaseline: CanvasTextDrawingStyles['textBaseline'];
    transform: CanvasTransform['transform'];
}
export interface Canvas {
    width: number;
    height: number;
    getContext<K extends '2d' | 'webgl'>(contextType: K): K extends '2d' ? CanvasCtx : WebGLRenderingContext;
    createImage(): {
        src: string;
        width: number;
        height: number;
        onload: () => void;
        onerror: () => void;
    };
    requestAnimationFrame(callback: Function): number;
    cancelAnimationFrame(requestID: number): void;
    createImageData(): ImageData;
    createPath2D(path: Path2D): Path2D;
    toDataURL(type: string, encoderOptions: number): string;
}
export declare type Stacks = Array<() => Promise<boolean>>;
export declare type CreateImagePathOptions = Partial<NonPick<UniApp.CanvasToTempFilePathOptions, 'canvasId' | 'complete' | 'success' | 'fail'>>;
declare function useDrawPoster(selector: string, options?: Partial<NonPick<DrawPosterOptions, 'selector'>>): Promise<DrawPosterResult>;
declare namespace useDrawPoster {
    var use: DrawPosterUse;
}
declare function useDrawPoster(options: DrawPosterOptions): Promise<DrawPosterResult>;
declare namespace useDrawPoster {
    var use: DrawPosterUse;
}
export { useDrawPoster, DrawPosterPlugin };
