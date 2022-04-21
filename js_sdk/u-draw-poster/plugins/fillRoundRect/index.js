const plugin = {
    name: '__ctx-fillRoundRect__',
    mounted: ({ ctx }) => {
        ctx.fillRoundRect = (x, y, w, h, r) => ctx.roundRect(x, y, w, h, r, true);
    }
};
export default () => plugin;
//# sourceMappingURL=index.js.map