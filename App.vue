<script>
const API = require('./utils/api/user.js').default;
const app = require('./utils/app.js').default;
const $ = require('./utils/api.js');
// #ifdef H5
var wx = require('./utils/jweixin-module.js');
	// #endif 
// const VConsole = require('./utils/vconsole.js');
//import './utils/vconsole.js';
// const JMessage = require('./utils/jmessage-wxapplet-sdk-1.4.2.min.js');
let appRole = 'jiafangchang';
export default {
	globalData: {
		appRole: appRole,
		name: app[appRole]['name'],
		version: app[appRole]['version'],
		api: app[appRole]['api'], 
		hot: app[appRole]['hot'],
		socket: app[appRole]['socket'] ? app[appRole]['socket'] : '',
		appKey: '15f4200c968b1e0a',
		appSecret: '31593886409a3f86804a12ec9e4ff176',
		mapKey: 'ML5BZ-G4JKK-ZUIJN-ACWR7-7TQXV-HBBEC',
		height: 0,
		tuijianren: '',
		isWeiXin: false,
	},
	onLaunch: function(options) {
		const self = this;
		
		this.globalData.tuijianren = options.query.invite ? options.query.invite : '';
		// #ifdef H5
			if (window.location.href.indexOf('pages/passport/down') >= 0) {
				return;//通过下载链接进来的无需进行授权
			}
			if(this.isWeiXin()) {
				wx.ready(function(){
					// TODO  
				});
				if(!uni.getStorageSync('token')){
					$.wxAuthH5(options.query.invite ? options.query.invite : '');
				}
				if (window.location.href.indexOf('from') >= 0) {
					this.h5Reload();
				}
				
			}
		// #endif
		 
		// var vConsole = new VConsole();
		console.log('App Launch');
		// let JIM = new JMessage({
		// 	debug: false
		// });
		// this.globalData.JIM = JIM;
		uni.getSystemInfo({
			success: function(res) {
				console.log(res);
				self.globalData.height = res.windowHeight;
				if (res.platform == 'devtools') {
					let nav_top = Number(res.statusBarHeight);
					uni.setStorageSync('bartop', nav_top);
				} else if (res.platform == 'ios') {
					let nav_top = Number(res.statusBarHeight);
					uni.setStorageSync('bartop', nav_top);
					uni.setStorageSync('isIos', true);
				} else if (res.platform == 'android') {
					let nav_top = Number(res.statusBarHeight);
					uni.setStorageSync('bartop', nav_top);
					uni.setStorageSync('isIos', false);
				}
				let safeArea = ['iPhone8','iPhone8Pro','iPhone7','iPhone7Pro','iPhone6','iPhone6Pro','iPhone5','iPhoneSE'];
				if(res.platform == 'ios') {
					// #ifndef H5
					uni.setStorageSync('isIphonex', true);
					// #endif
					safeArea.forEach((ele,index) => {
						if(res.model && res.model.indexOf(ele) >= 0) {
							uni.setStorageSync('isIphonex', false);
						}
					})
				}
				uni.setStorageSync('model', res.model);
			}
		});
		
		this.getKefuId();
		self.socket.creatSocket({
			onMessage(res) {
			}
		})
		
	},

	methods: {
		getWxConfig() {
			const self = this;
			$.ajax({
				url: 'common/wechatParam',
				data: {
					url: 'https://h5.wode24h.com/#/',
				},
				method: 'GET',
				success(res) {
				},
				complete(data) {
					if(data.signature) {
						wx.config({
							debug: false, ////生产环境需要关闭debug模式
							appId: data.appid, //appId通过微信服务号后台查看
							timestamp: data.timestamp, //生成签名的时间戳
							nonceStr: data.nonceStr, //生成签名的随机字符串
							signature: data.signature, //签名
							jsApiList: [ //需要调用的JS接口列表
								'checkJsApi', //判断当前客户端版本是否支持指定JS接口
								'onMenuShareTimeline', //分享给好友
								'onMenuShareAppMessage', //分享到朋友圈
								'scanQRCode',
								'getLocation'
							],
							openTagList: ['wx-open-launch-weapp']
						});
						// self.share();
					}
				}
			})
		},
		shareWx() {
			const self = this;
			let data = uni.getStorageSync('config') ? uni.getStorageSync('config') : '';
			let user = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
			let link = data.h5_url + '/#/pages/index/index?tuijianren=';//h5不享受邀请奖励政策
			if(user != '') {
				link = link + user.id;
			}
			// let link = data.h5_url + '/#/pages/index/index';
			wx.ready(function() {
				// 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
				wx.onMenuShareTimeline({
					title: data.web_name ? data.web_name : '米兔',
					link: link,
					imgUrl: data.logo ? data.logo : 'https://qiniu.chengyuwb.com/xss-share.jpg',
					desc: data.spread_content ? data.spread_content : '', // 分享描述
					success: function(res) {
						//share();
					}
				}); 
				//分享到朋友圈
				wx.onMenuShareAppMessage({
					title: data.web_name ? data.web_name : '米兔',
					link: link,
					imgUrl: data.logo ? data.logo : 'https://qiniu.chengyuwb.com/xss-share.jpg',
					desc: data.spread_content ? data.spread_content : '', // 分享描述
					success: function(res) {
						//share();
					}
				});
			});
		},
		 isWeiXin(){
		    var ua = window.navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
				this.globalData.isWeiXin = true;
		        return true;
		    }else{
		        return false;
		    }
		},
		getStyleConfig() {
			const self = this;
			$.ajax({
				url: 'common/globalStyle/get',
				data: {},
				method: 'GET',
				success(res) {
					let info = res.data;
					setTimeout(() => {
						uni.setStorageSync('styleConfig', res.data);
					},1000)
				}
			});
		},
		getConfig() {
			const self = this;
			$.ajax({
				url: 'common/config/getList',
				data: {},
				method: 'GET',
				success(res) {
					let info = res.data;
					uni.setStorageSync('config', res.data);
					// #ifdef H5
					if(self.globalData.isWeiXin){
						self.getWxConfig();
					}
					// #endif
					if(info.language != 'all' && info.language != 'folowSystem') {
						self.changeLang(info.language)
					}
				}
			});
		},
		getUser() {
			const self = this;
			$.ajax({
				url: 'member/getUser',
				isAuth: true,
				data: {},
				method: 'GET',
				success(res) {
					let info = res.data ? res.data : '';
					if(!info.phone) {
						self.go('/pages/wxAuth/bindphone')
					}
				}
			})
		},
		getKefuId() {
			$.ajax({
				url: API.getKefuIdApi,
				data: {},
				method: 'GET',
				success(res) {
					let info = res.data ? res.data : '';
					if(info == ''){return;}
					uni.setStorageSync('kefuId',info);
				}
			})
		},
	},
	onShow: function() {
		this.getConfig();
		this.getStyleConfig();
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import './static/css/uni.css';
@import './static/css/icon.css';
@import './static/css/color.css';
@import './static/css/common.css';
@import './static/css/animate.css';
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
