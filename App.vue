<script>
const API = require('./utils/api/user.js').default;
const app = require('./utils/app.js').default;
const $ = require('./utils/api.js');
const QQMapWX = require('./utils/qqmap-wx-jssdk.min.js');
let qqmapsdk;
// #ifdef H5
var wx = require('./utils/jweixin-module.js');
	// #endif 
// const VConsole = require('./utils/vconsole.js');
//import './utils/vconsole.js';
// const JMessage = require('./utils/jmessage-wxapplet-sdk-1.4.2.min.js');
let appRole = 'daxiang';
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
				// #ifndef APP-PLUS
				// let safeArea = ['iPhone X','iPhone XR','iPhone XS','iPhone XS Max','iPhone 11'];
				let safeArea = ['iPhone 8','iPhone 8Pro','iPhone 7','iPhone 7Pro','iPhone 6','iPhone 6Pro','iPhone 5','iPhone SE'];
				// #endif
				// #ifdef APP-PLUS
				// let safeArea = ['iPhoneX','iPhoneXR','iPhoneXS','iPhoneXSMax','iPhone11','iPhone11Pro','iPhone11Pro max'];
				let safeArea = ['iPhone8','iPhone8Pro','iPhone7','iPhone7Pro','iPhone6','iPhone6Pro','iPhone5','iPhoneSE'];
				// #endif
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
						self.getLocation();
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
		getLocation() {
			const self = this;
			$.getLocation({
				success(res) {
					self.addReverse(res.latitude, res.longitude);
				},
				error(res) {
					if (res.errMsg == 'getLocation:fail auth deny' || res.errMsg == 'getLocation:fail authorize no response') {
						//未开启定位授权
					}
				},
				complete(res) {
					if (res.errMsg.indexOf('getLocation:fail') >= 0) {
						let location = {
							nation_code: '156',
							adcode: '350211',
							city_code: '156350200',
							name: '中国,福建省,厦门市,集美区',
							location: { lat: 24.57591, lng: 118.09728 },
							nation: '中国',
							province: '福建省',
							city: '厦门市',
							district: '集美区',
							address: '福建省厦门市集美区岑东路168-2号',
							title: '厦门市集美区人民政府(岑西路东)'
						};
						uni.setStorageSync('location', location);
					}
				}
			});
		},
		//地址逆解析
		addReverse: function(lat, long) {
			const self = this;
			// #ifdef H5
			$.ajax({
				url: 'common/map/geocoder',
				method: 'GET',
				data: {
					key: self.globalData.mapKey,
					location: lat + ',' + long
				},
				success(res1) {
					let res = res1.data;
					if (res.result && res.result.ad_info) {
						res.result.ad_info.location.lat = res.result.location.lat;
						res.result.ad_info.location.lng = res.result.location.lng;
						res.result.ad_info.address = res.result.address;
						res.result.ad_info.title = res.result.formatted_addresses.recommend;
						let location = res.result.ad_info;
						uni.setStorageSync('location', location);
					}
				}
			});
			// #endif
			// #ifndef H5
			qqmapsdk = new QQMapWX({
				key: this.globalData.mapKey
			});
			qqmapsdk.reverseGeocoder({
				location: {
					latitude: lat,
					longitude: long
				},
				success: function(res) {
					if (res.result && res.result.ad_info) {
						res.result.ad_info.location.lat = res.result.location.lat;
						res.result.ad_info.location.lng = res.result.location.lng;
						res.result.ad_info.address = res.result.address;
						res.result.ad_info.title = res.result.formatted_addresses.recommend;
						let location = res.result.ad_info;
						uni.setStorageSync('location', location);
					}
				},
				fail: function(res) {},
				complete: function(res) {}
			});
			// #endif
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
/* 解决头条小程序组件内引入字体不生效的问题 */
/* #ifdef MP-TOUTIAO */
@font-face {
	font-family: uniicons;
	src: url('/static/uni.ttf');
}
/* #endif */
</style>
