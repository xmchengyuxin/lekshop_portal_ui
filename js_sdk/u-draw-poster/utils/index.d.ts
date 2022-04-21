/// <reference types="@dcloudio/types" />
/**
 * 查询 fields 信息
 * @param selector
 * @param componentThis
 * @param options
 * @returns
 */
export declare const queryFields: (selector: string, componentThis?: any, options?: UniApp.NodeField | undefined) => Promise<UniApp.NodeInfo>;
declare type UniPlatforms = 'app-plus' | 'app-plus-nvue' | 'h5' | 'mp-weixin' | 'mp-alipay' | 'mp-baidu' | 'mp-toutiao' | 'mp-qq' | 'mp-360' | 'mp' | 'quickapp-webview' | 'quickapp-webview-union' | 'quickapp-webview-huawei' | undefined;
/**
 * 当前环境信息
 */
export declare const UNI_PLATFORM: UniPlatforms;
declare type UniApiKey = keyof UniApp.Uni;
declare type UniApiValue = UniApp.Uni[UniApiKey];
declare type GetSuccessReult<T extends UniApiValue> = Parameters<Parameters<T>[0]['success']>[0];
/**
 * 将 Uni | wx 转换为异步 Api
 * @param api api
 */
export declare const promisify: <V extends UniApiValue>(api: V) => (...args: Parameters<V>) => Promise<GetSuccessReult<V>>;
export {};
