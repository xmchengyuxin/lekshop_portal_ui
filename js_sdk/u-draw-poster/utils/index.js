/**
 * 查询 fields 信息
 * @param selector
 * @param componentThis
 * @param options
 * @returns
 */
export const queryFields = (selector, componentThis, options) => {
    const query = componentThis
        ? uni.createSelectorQuery().in(componentThis)
        : uni.createSelectorQuery();
    return new Promise((resolve) => {
        query
            .select(selector)
            .fields(options || {}, resolve)
            .exec();
    });
};
/**
 * 当前环境信息
 */
export const UNI_PLATFORM = typeof process !== 'undefined' ? process?.env?.VUE_APP_PLATFORM : undefined;
/**
 * 将 Uni | wx 转换为异步 Api
 * @param api api
 */
export const promisify = (api) => {
    return async (...args) => {
        const [error, result] = await api(...args);
        return error ? Promise.reject(error) : Promise.resolve(result);
    };
};
//# sourceMappingURL=index.js.map