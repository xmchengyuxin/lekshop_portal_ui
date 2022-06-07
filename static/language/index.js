import LangCn from './zh_CN.js'
import LangEn from './en_US.js'
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
    const cur_lang = system_info.language == 'en' ? 'en_US' : 'zh_CN'
	uni.setStorageSync('locale_key',cur_lang);
    const i18n = new VueI18n({
        locale: cur_lang || 'zh_CN',  // 默认选择的语言
        messages: {  
                'zh_CN': LangCn,
				'en_US': LangEn,
				'zh_TW': LangEn,
            }
    })
    export default i18n