import { isFunction, isObject, isString } from 'lodash';
/**
 * 对插件参数进行处理并引入
 * @param plugins 插件列表
 * @param args 参数
 */
const usePluginOptions = (plugins, ...args) => {
    if (!args[0]) {
        throw new Error('DrawPoster Error: plugins arguments required');
    }
    let _options = { name: '' };
    if (isString(args[0]) && isFunction(args[1])) {
        _options.name = args[0];
        _options.mounted = args[1];
    }
    if (isString(args[0]) && isObject(args[1])) {
        _options = { name: args[0], ...args[1] };
    }
    if (isObject(args[0])) {
        _options = args[0];
    }
    if (![...globalPlugins, ...plugins].some((v) => _options.name === v.name)) {
        plugins.push(_options);
        return _options;
    }
    console.warn(`该扩展已存在: ${_options.name}`);
};
const globalPlugins = [];
export const globalUse = (...args) => usePluginOptions(globalPlugins, ...args);
export class Plugins {
    dp;
    $plugins = [];
    get plugins() {
        return [...globalPlugins, ...this.$plugins];
    }
    constructor(dp) {
        this.dp = dp;
        if (dp.$options?.plugins)
            this.$plugins.push(...dp.$options?.plugins);
    }
    use = (...args) => {
        const plugin = usePluginOptions(this.$plugins, ...args);
        if (this.dp['canvas'])
            plugin?.mounted?.(this.dp);
    };
    run = (lifeCycleName) => {
        this.plugins.forEach((lifeCycle) => {
            lifeCycle[lifeCycleName]?.(this.dp);
        });
    };
}
//# sourceMappingURL=plugin.js.map