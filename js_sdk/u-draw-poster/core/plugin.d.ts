import { DrawPosterResult, NonPick } from '.';
export interface DrawPosterLifeCycle<I = DrawPosterResult, O = Record<string, any>> {
    (instance: I, options?: O): void;
}
export interface DrawPosterLifeCycles {
    /** 创建实例前 */
    beforeMount?: DrawPosterLifeCycle<Partial<DrawPosterResult>>;
    /** 创建实例后 */
    mounted?: DrawPosterLifeCycle;
    /** 卸载实例前 */
    beforeUnmount?: DrawPosterLifeCycle;
    /** 卸载实例后 */
    unmounted?: DrawPosterLifeCycle;
    /** 创建绘图前 */
    beforeCreate?: DrawPosterLifeCycle;
    /** 创建绘图后 */
    created?: DrawPosterLifeCycle;
}
export interface DrawPosterPlugin extends DrawPosterLifeCycles {
    /** 扩展名称 */
    name: string;
    [key: string]: any;
}
export interface DrawPosterUse {
    (name: string, lifeCycle: DrawPosterLifeCycle): void;
    (name: string, options: NonPick<DrawPosterPlugin, 'name'>): void;
    (options: DrawPosterPlugin): void;
}
export declare const globalUse: DrawPosterUse;
export declare class Plugins {
    dp: Partial<DrawPosterResult>;
    $plugins: DrawPosterPlugin[];
    get plugins(): DrawPosterPlugin[];
    constructor(dp: Partial<DrawPosterResult>);
    use: (...args: any[]) => void;
    run: (lifeCycleName: keyof DrawPosterLifeCycles) => void;
}
