const plugin = {
    name: '__ctx-strokeRoundRect__',
    mounted: ({ ctx }) => {
        ctx.strokeRoundRect = (x, y, w, h, r) => ctx.roundRect(x, y, w, h, r, false, true);
    }
};
export default () => plugin;
//# sourceMappingURL=index.js.map