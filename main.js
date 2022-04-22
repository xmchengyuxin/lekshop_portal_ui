import Vue from 'vue';
import App from './App';
import share1 from './utils/share.js';
import filters from './utils/filter.js';
import tabbar from './pages/common/tabbar.vue';
import nodata from './pages/common/nodata.vue';
import update from './pages/common/update.vue';
import goodslist from './pages/common/goodslist.vue';
Vue.config.productionTip = false
import i18n from './static/language/index.js' 
Vue.prototype._i18n = i18n;
Vue.mixin(share1)
App.mpType = 'app'
import global from './utils/global.js';

Vue.prototype.copy = global.copy;
Vue.prototype.setCopy = global.setCopy;
Vue.prototype.go = global.go;
Vue.prototype.back = global.back;
Vue.prototype.$toast = global.toast;
Vue.prototype.chatInit = global.chatInit;
Vue.prototype.openApp = global.openApp;
Vue.prototype.callPhone = global.callPhone;
Vue.prototype.addReverse = global.addReverse;
Vue.prototype.h5Reload = global.h5Reload;
Vue.prototype.clickBanner = global.clickBanner;
Vue.component('tabBar',tabbar);
Vue.component('noData',nodata);
Vue.component('upDate',update);
Vue.component('goodslist',goodslist);
//过滤器统一处理加载
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
const app = new Vue({
	i18n,
	...App
})
app.$mount()