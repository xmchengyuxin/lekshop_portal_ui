const plugin = {
    name: '__dp-painter__',
    mounted: (dp) => {
        dp.painter = (option) => {
            dp.canvas.width = option.width;
            dp.canvas.height = option.height;
            dp.draw(async (ctx) => {
                for (let i = 0; i < option.contents.length; i++) {
                    const info = option.contents[i];
                    const left = info.left ?? 0;
                    const top = info.top ?? 0;
                    if (info.type === 'rect') {
                        const { background, width, height, radius } = info;
                        ctx.fillStyle = background || '#000000';
                        ctx.fillRoundRect(left, top, width, height, radius || 0);
                    }
                    if (info.type === 'image') {
                        await ctx.drawImageFit(info.src, {
                            objectFit: info.objectFit || 'cover',
                            intrinsicPosition: info.position || ['center', 'center'],
                            specifiedPosition: [left, top],
                            specifiedSize: {
                                width: info.width,
                                height: info.height
                            },
                            radius: info.radius
                        });
                    }
                    if (info.type === 'text') {
                        ctx.fillStyle = info.color || '#000000';
                        ctx.font = `\
            ${info.fontStyle || 'normal'} \
            ${info.fontWeight || 'normal'} \
            ${info.fontSize || 30} \
            ${info.fontFamily || 'serial'}\
            `;
                        ctx.fillText(info.content, left, top, info.width);
                    }
                    if (info.type === 'line-feed-text') {
                        ctx.fillStyle = info.color || '#000000';
                        ctx.font = `\
            ${info.fontStyle || 'normal'} \
            ${info.fontWeight || 'normal'} \
            ${info.fontSize || 30} \
            ${info.fontFamily || 'serial'}\
            `;
                        ctx.fillWarpText({
                            x: info.left,
                            y: info.top,
                            layer: info.lineClamp,
                            lineHeight: info.lineHeight,
                            maxWidth: info.width,
                            content: info.content
                        });
                    }
                    if (info.type === 'qr-code') {
                        if (typeof ctx.drawQrCode !== 'function') {
                            console.error('--- 当前未引入qr-code扩展, 将自动省略该二维码绘制 ---');
                            return;
                        }
                        ctx.drawQrCode({
                            x: left,
                            y: top,
                            size: info.size,
                            text: info.content,
                            margin: info.margin || 5,
                            backgroundColor: info.backgroundColor || '#ffffff',
                            foregroundColor: info.foregroundColor || '#000000'
                        });
                    }
                }
            });
        };
    }
};
export default () => plugin;
//# sourceMappingURL=index.js.map