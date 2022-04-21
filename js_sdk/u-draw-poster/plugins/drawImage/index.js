import { downloadImgUrl } from './utils';
const plugin = {
    name: '__ctx-drawImage__',
    mounted: ({ ctx, $options, canvas }) => {
        ctx.drawImageProto = ctx.drawImage;
        ctx.drawImage = async (url, sx, sy, sh, sw, dx, dy, dh, dw) => {
            // 下载路径
            const path = await downloadImgUrl(url);
            // 标记当前绘画存在图片绘制
            let result = false;
            // 基本绘制方法, 如果是 fit 方式, 则传入所有参数, 不然则只传入四个参数
            const baseDrawImage = (imageResource) => {
                const isFit = typeof dx === 'number' && typeof dw === 'number';
                if (isFit) {
                    ctx.drawImageProto(imageResource, sx, sy, sh, sw, dx, dy, dh, dw);
                }
                else {
                    ctx.drawImageProto(imageResource, sx, sy, sh, sw);
                }
            };
            // 如果是 context 绘制方式, 则直接绘制
            if ($options.type === 'context') {
                baseDrawImage(path);
                result = true;
            }
            // 如果是 type2d 绘制方式, 则等待图片绘制完毕
            if ($options.type === '2d') {
                result = await new Promise((resolve) => {
                    const image = canvas.createImage();
                    image.src = path;
                    image.addEventListener('load', () => {
                        baseDrawImage(image);
                        resolve(true);
                    });
                    image.addEventListener('error', () => resolve(false));
                });
            }
            return result;
        };
    }
};
export default () => plugin;
//# sourceMappingURL=index.js.map