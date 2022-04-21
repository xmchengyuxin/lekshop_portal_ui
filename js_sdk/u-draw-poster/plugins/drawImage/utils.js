/** 是否是base64本地地址 */
export const isBaseUrl = (str) => {
    return /^\s*data:(?:[a-z]+\/[\d+.a-z-]+(?:;[a-z-]+=[\da-z-]+)?)?(?:;base64)?,([\s\w!$%&'()*+,./:;=?@~-]*?)\s*$/i.test(str);
};
/** 是否是小程序本地地址 */
export const isTmpUrl = (str) => {
    return /http:\/\/temp\/wx/.test(str);
};
/** 是否是网络地址 */
export const isNetworkUrl = (str) => {
    return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w#%&+,./:=?@^~-]*[\w#%&+/=?@^~-])?$/.test(str);
};
// 下载指定地址图片, 如果不符合下载图片, 则直接返回
export const downloadImgUrl = (url) => {
    const isLocalFile = isBaseUrl(url) || isTmpUrl(url) || !isNetworkUrl(url);
    return new Promise((resolve, reject) => {
        if (isLocalFile) {
            return resolve(url);
        }
        uni.downloadFile({
            url,
            success: (res) => resolve(res.tempFilePath),
            fail: reject
        });
    });
};
//# sourceMappingURL=utils.js.map