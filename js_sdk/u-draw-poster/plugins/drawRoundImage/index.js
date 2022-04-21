const plugin = {
    name: '__ctx-drawRoundImage__',
    mounted: ({ ctx }) => {
        ctx.drawRoundImage = async (url, x, y, w, h, r = 15) => {
            ctx.save();
            ctx.setFillStyle?.('transparent');
            ctx.fillStyle = 'transparent';
            ctx.fillRoundRect(x, y, w, h, r);
            ctx.clip();
            const result = await ctx.drawImage(url, x, y, w, h);
            ctx.restore();
            return result;
        };
    }
};
export default () => plugin;
//# sourceMappingURL=index.js.map