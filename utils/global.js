import Vue from 'vue';
const API = require('./api/user.js').default;
const ApiConmon = require('./api/common.js').default;
const $ = require('./api.js');
const QQMapWX = require('./qqmap-wx-jssdk.min.js');
let qqmapsdk;
// import store from '../store/index.js'; //引入store
export default {
	previewImg(url,urls) {
		if(!urls){
			urls = [url];
		}
		uni.previewImage({
			current: url,
			urls: urls
		})
	},
	getBanner(options) {
		$.ajax({
			url: ApiConmon.bannerApi,
			data: {location: options.type ? options.type: 1},
			method: 'GET',
			success(res) {
				if(options.success) {
					options.success(res);
				}
			}
		})
	},
	getUser(options) {
		let user = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
		if(options.isAjax || user == '') {
			$.ajax({
				url: API.getUserApi,
				data: {},
				method: 'GET',
				success(res) {
					if(options.success) {
						user = res.data ? res.data : '';
						uni.setStorageSync('userInfo',user);
						options.success(user);
					}
				}
			})
		}else{
			if(options.success) {
				options.success(user);
			}
		}
		
	},
	clickBanner(item){
		if(item.url.indexOf('pages') >= 0) {
			$.go(item.url);
		}else if(item.url == 'zhaomu') {
			$.go('/pages/user/rules?type=5')
		}else if(item.url == 'invite') {
			$.go('/pages/work/posteruser')
		}else if(item.url == 'coupon') {
			$.go('/pages/user/getcoupon')
		}
	},
	h5Reload() {
		var url = window.location.href; //页面url
		var beforeUrl = url.substr(0, url.indexOf("?"));
		var afterUrl = url.substr(url.indexOf("#"));
		window.location.replace(beforeUrl + afterUrl);
	},
	//地址逆解析
			addReverse(options) {
				const self = this;
				let globalData = getApp().globalData;
				// #ifdef H5
				$.ajax({
					url: 'common/map/geocoder',
					method: 'GET',
					data: {
						key: globalData.mapKey,
						location: options.data.lat+','+options.data.lng,
					},
					success(res1) {
						let res = res1.data;
						if(res.result && res.result.ad_info){
							res.result.ad_info.location.lat = res.result.location.lat;
							res.result.ad_info.location.lng = res.result.location.lng;
							res.result.ad_info.address = res.result.address;
							res.result.ad_info.title = res.result.formatted_addresses.recommend;
							let location =  res.result.ad_info;
							uni.setStorageSync('location',location);
							if(options.success) {
								options.success(location);
							}
						}
					}
				})
				// #endif
				// #ifndef H5
				qqmapsdk = new QQMapWX({
					key: globalData.mapKey
				});
				qqmapsdk.reverseGeocoder({
					location: {
						latitude: options.data.lat,
						longitude: options.data.lng
					},
					success: function(res) {
						if(res.result && res.result.ad_info){
							res.result.ad_info.location.lat = res.result.location.lat;
							res.result.ad_info.location.lng = res.result.location.lng;
							res.result.ad_info.address = res.result.address;
							res.result.ad_info.title = res.result.formatted_addresses.recommend;
							let location =  res.result.ad_info;
							uni.setStorageSync('location',location);
							if(options.success) {
								options.success(location);
							}
						}
			
					},
					fail: function(res) {},
					complete: function(res) {}
				});
				// #endif
			},
	callPhone(phone,type) {
		const self = this;
		if(!type) {type = '-1'}
		if(!phone || phone == ''){return}
		if(type != '-1') {
			$.ajax({
				url: 'member/order/getAxnPhone',
				data: {orderId:type},
				method: 'GET',
				success(res) {
					uni.makePhoneCall({
						phoneNumber: res.data.phoneX
					})
				}
			})
		}else{
			uni.makePhoneCall({
				phoneNumber: phone
			})
		}
	},
	copy(text) {
		$.uniCopy({
			content: text,
			success: (res) => {
				uni.showToast({
					title: res,
					icon: 'none'
				})
			},
			error: (e) => {
				uni.showToast({
					title: e,
					icon: 'none',
					duration: 3000,
				})
			}
		})
	},
	setCopy(options) {
		// #ifdef H5
		$.setCopy().then((res) => {
			console.log(res);
			if(options.success) {
				options.success(res);
			}
		})
		// #endif
		// #ifndef H5
		uni.getClipboardData({
		    success: function (res) {
				uni.hideToast();
				if(options.success) {
					options.success(res.data);
				}
		    }
		});
		// #endif
		
	},
	openApp(type) {
		let pname = '';
		let action = '';
		if(type == 'wx') {
			pname = "com.tencent.mm";
			action = 'weixin://';
		}
		if(type == 'tb') {
			pname = 'com.taobao.taobao';
			action = 'taobao://';
		}
		if(type == 'jd') {
			pname = 'com.jingdong.app.mall';
			action = 'openApp.jdMobile://' ;
		}
		if(type == 'pdd') {
			pname = 'com.xunmeng.pinduoduo';
			action = 'pinduoduo://';
		}
		if(type == 'dy') {
			pname = 'com.ss.android.ugc.aweme';
			action = 'snssdk1128://';
		}
		if(type == 'alibaba') {
			pname = 'com.alibaba.wireless';
			action = 'wireless1688://';
		}
		// 判断平台
		if (plus.os.name == 'Android') {
			plus.runtime.launchApplication({
					pname: pname
				},
				function(e) {
					console.log('Open system default browser failed: ' + e.message);
				}
			);
		} else if (plus.os.name == 'iOS') {
			plus.runtime.launchApplication({
				action: action
			}, function(e) {
				console.log('Open system default browser failed: ' + e.message);
			});
		}
	},
	
	openWX() {
		// 判断平台  
		if (plus.os.name == 'Android') {
			plus.runtime.launchApplication({
					pname: 'com.tencent.mm'
				},
				function(e) {
					console.log('Open system default browser failed: ' + e.message);
				}
			);
		} else if (plus.os.name == 'iOS') {
			plus.runtime.launchApplication({
				action: 'weixin://'
			}, function(e) {
				console.log('Open system default browser failed: ' + e.message);
			});
		}

	},
	chatInit(type) {
		const self = this;
		$.ajax({
			url: 'common/im/getConfig',
			data: {},
			success(res) {
				let data = res.data;
				let app = getApp().globalData;
				app.JIM.init({
					appkey: data.appkey,
					random_str: data.randomStr,
					signature: data.signature,
					timestamp: data.timestamp,
					flag: 1
				})
					.onSuccess(function(data) {
						uni.removeStorageSync('im');
						console.log('success:' + JSON.stringify(data));
					})
					.onFail(function(data) {
						self.chatInit();
						console.log('error11:' + JSON.stringify(data));
					});
			}
		});
	},
	toast(tip, icon, time) {
		// #ifdef APP-PLUS
		plus.nativeUI.setUIStyle('light'); 
		// #endif
		uni.showToast({
			title: tip,
			icon: icon ? icon : 'none',
			duration: time ? time : 2000
		})
	},
	go(url, type = 1, time) {
		$.go(url, type, time);
	},
	back(type,time) {
		let pages = getCurrentPages();
		if(pages.length <= 1) {
			uni.reLaunch({
				url: '/pages/index/index',
			})
			return
		}
		if (time) {
			setTimeout(() => {
				uni.navigateBack({
					delta: type ? type : 1
				})
			}, time);
		} else {
			uni.navigateBack({
				delta: type ? type : 1
			})
		}
	},

};
