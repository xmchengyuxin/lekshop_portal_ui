import { DrawPosterPlugin } from '../../core/plugin';
declare module '../../core' {
    interface CanvasCtx {
        /** 绘制圆角图片
         *
         * 说明文档: https://tuimao233.gitee.io/mao-blog/my-extends/u-draw-poste
         */
        drawRoundImage(url: string, x: number, y: number, w: number, h: number, r?: number): Promise<boolean>;
    }
}
declare const _default: () => DrawPosterPlugin;
export default _default;
