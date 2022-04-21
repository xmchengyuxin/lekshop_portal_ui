import { isObject } from 'lodash';
import { queryFields, UNI_PLATFORM } from '../utils';
import { DebuggingLog } from './debugginglog';
import { Plugins, globalUse } from './plugin';
async function useDrawPoster(...args) {
    const $options = (() => {
        const _default = {
            selector: '',
            componentThis: undefined,
            type: UNI_PLATFORM === 'mp-weixin' ? '2d' : 'context',
            loading: false,
            debug: false,
            gcanvas: false
        };
        let _overrides;
        if (isObject(args[0])) {
            _overrides = args[0];
        }
        else if (isObject(args[1])) {
            _overrides = args[1];
            _overrides.selector = args[0];
        }
        else {
            _overrides = { selector: args[0] };
        }
        const options = { ..._default, ..._overrides };
        options.selector = options.selector.replace('#', '');
        if (options.type === '2d') {
            options.selector = `#${options.selector}`;
        }
        if (options.loading === true) {
            options.loading = { render: '绘制海报中...', create: '生成图片中...' };
        }
        if (isObject(options.loading)) {
            options.loading.render = options.loading?.render ?? '绘制海报中...';
            options.loading.create = options.loading?.create ?? '生成图片中...';
        }
        if (!UNI_PLATFORM) {
            console.warn('注意! draw-poster未开启uni条件编译! 当环境是微信小程序将不会动态切换为type=2d模式');
            console.warn(`请在vue.config.js中的'transpileDependencies'中添加 'u-draw-poster' `);
        }
        return options;
    })();
    const pages = getCurrentPages();
    const page = pages[pages.length - 1];
    const dp = { $options };
    const ps = new Plugins(dp);
    const consola = new DebuggingLog(dp);
    let stacks = [];
    let isStop = false;
    const build = async () => {
        if (dp.$drawPrototype)
            return dp.$drawPrototype;
        const _nodeInfo = await queryFields($options.selector, $options.componentThis, {
            node: true
        });
        const canvas = _nodeInfo?.node || {};
        const ctx = canvas.getContext?.('2d') ||
            uni.createCanvasContext($options.selector, $options.componentThis);
        if (!canvas || !ctx || !$options.selector) {
            throw new Error('DrawPoster Error: useDrawPoster to build drawPoster instance');
        }
        return { canvas, ctx };
    };
    const render = async () => {
        if ($options.loading)
            uni.showLoading({ title: $options.loading.render });
        consola.log('绘制海报中...');
        const tips = [];
        for (const next of stacks) {
            tips.push(await next());
        }
        stacks = [];
        consola.log('绘制状况: ', undefined, tips);
        if ($options.type === 'context') {
            await new Promise((resolve) => {
                dp.ctx.draw(true, resolve);
            });
        }
        if ($options.loading)
            uni.hideLoading();
        return tips;
    };
    const createImagePath = async (_options_ = {}) => {
        if (stacks.length > 0)
            await dp.render();
        if (isStop) {
            isStop = false;
            return Promise.reject();
        }
        if ($options.loading)
            uni.showLoading({ title: $options.loading.create });
        const options = _options_;
        if ($options.type === '2d') {
            ;
            options.canvas = dp.canvas;
        }
        if ($options.type === 'context') {
            ;
            options.canvasId = dp.id;
        }
        return new Promise((resolve, reject) => {
            options.success = (res) => {
                resolve(res.tempFilePath);
                $options.loading && uni.hideLoading();
                consola.success('绘制成功', res);
            };
            options.fail = (err) => {
                reject(err);
                $options.loading && uni.hideLoading();
                consola.success('绘制失败', err);
            };
            uni.canvasToTempFilePath(options);
        });
    };
    const draw = async (func) => {
        const length = stacks.length;
        stacks.push(async () => {
            try {
                dp.ctx.save();
                await func(dp.ctx);
                dp.ctx.restore();
                return true;
            }
            catch (error) {
                if (!error?.message?.includes?.(`'nodeId' of undefined`))
                    consola.error(`绘画栈(${length})，绘制错误：`, error);
                return false;
            }
        });
    };
    const stop = () => {
        stacks = [];
        isStop = true;
    };
    if (page[`__dp_${dp.id}`])
        return page[`__dp_${dp.id}`];
    Object.defineProperty(dp, 'id', { get: () => $options.selector });
    Object.defineProperty(dp, 'plugins', { get: () => ps.plugins });
    ps.run('beforeMount');
    const { canvas, ctx } = await build();
    Object.defineProperty(dp, 'canvas', { get: () => canvas });
    Object.defineProperty(dp, 'ctx', { get: () => ctx });
    Object.defineProperty(dp, 'render', { get: () => render });
    Object.defineProperty(dp, 'createImagePath', { get: () => createImagePath });
    Object.defineProperty(dp, 'draw', { get: () => draw });
    Object.defineProperty(dp, 'stop', { get: () => stop });
    Object.defineProperty(dp, 'use', { get: () => ps.use });
    dp.canvas.width = $options.width ?? 0;
    dp.canvas.height = $options.height ?? 0;
    ps.run('mounted');
    $options.debug && consola.success('构建成功!', dp);
    page[`__dp_${dp.id}`] = dp;
    const _onUnload = page.onUnload;
    page.onUnload = function () {
        ps.run('beforeUnmount');
        dp.stop();
        _onUnload();
        ps.run('unmounted');
    };
    return dp;
}
useDrawPoster.use = globalUse;
export { useDrawPoster };
//# sourceMappingURL=index.js.map