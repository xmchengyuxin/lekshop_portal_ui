/** 是否是base64本地地址 */
export declare const isBaseUrl: (str: string) => boolean;
/** 是否是小程序本地地址 */
export declare const isTmpUrl: (str: string) => boolean;
/** 是否是网络地址 */
export declare const isNetworkUrl: (str: string) => boolean;
export declare const downloadImgUrl: (url: string) => Promise<string>;
