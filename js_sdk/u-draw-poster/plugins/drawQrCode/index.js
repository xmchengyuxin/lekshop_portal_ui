import uQRCode from './uQRCode';
const plugin = {
    name: '__ctx-drawQrCode__',
    mounted: ({ ctx, canvas }) => {
        ctx.drawQrCode = (options) => {
            uQRCode.make.call(uQRCode, canvas, ctx, options);
        };
    }
};
export const errorCorrectLevel = uQRCode.errorCorrectLevel;
export default () => plugin;
//# sourceMappingURL=index.js.map