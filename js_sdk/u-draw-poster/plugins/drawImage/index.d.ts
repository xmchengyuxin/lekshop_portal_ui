/// <reference types="@dcloudio/types" />
import { DrawPosterPlugin } from '../../core/plugin';
declare module '../../core' {
    interface CanvasCtx {
        /** 等待绘制图片
         *
         * 说明文档: https://tuimao233.gitee.io/mao-blog/my-extends/u-draw-poste
         */
        drawImage(url: string, dx?: number | undefined, dy?: number | undefined, dWidth?: number | undefined, dHeigt?: number | undefined, sx?: number | undefined, sy?: number | undefined, sWidth?: number | undefined, sHeight?: number | undefined): Promise<boolean>;
        /**
         * 绘制图片原型
         */
        drawImageProto: UniApp.CanvasContext['drawImage'];
    }
}
declare const _default: () => DrawPosterPlugin;
export default _default;
