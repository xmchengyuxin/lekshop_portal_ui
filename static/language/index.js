import LangCn from './zh_CN.js'
import Vue from 'vue'
import VueI18n from './vue-i18n'
Vue.use(VueI18n)
const system_info = uni.getStorageSync('system_info')
if (!system_info) {
    // 获取设备信息
    uni.getSystemInfo({
        success: function (res) {
            console.log('设备信息'+res)
            uni.setStorageSync('system_info', res);
        }
    })
}
    const cur_lang = system_info.language == 'en' ? 'en' : 'zh'
    const i18n = new VueI18n({
        locale: cur_lang || 'zh',  // 默认选择的语言
        messages: {  
                'zh': LangCn
            }
    })
    export default i18n