
// const API = 'http://192.168.0.113:7076/';
// import  './ican-H5Api.js';
let API;

/**
 * 获取token
 */
function getToken() {
	return new Promise(function(resolve, reject) {
		uni.login({
			success: res => {

				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				if (res.code) {

					uni.request({
						url: API + "common/xcx/auth",
						data: {
							code: res.code
						},
						header: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						method: 'POST',
						success: res => {
							resolve(res);
						}
					})
				} else {
					console.log('获取用户登录态失败！' + res.errMsg);
					reject('error');
				}
			}
		})
	})
}

/**
 * 用户发起接口请求前判断token是否存在
 * 不存在，则请求login接口
 * 存在，直接请求相应接口
 */
function ajax(options) {
	API = getApp() && getApp().globalData ? getApp().globalData.api : '';
	// API = 'http://192.168.0.102:7070/';
	// API = 'http://portalapi.wode24h.com/';
	if (options.loading) {
		uni.showLoading({
			title: options.loadingText ? options.loadingText : '加载中',
			mask: true
		})
	}
	// #ifdef APP-PLUS
		options.data.applicationType = 'app';
	// #endif
	// #ifdef MP-WEIXIN
	options.data.applicationType = 'xcx';
	// #endif
	// #ifdef H5
	options.data.applicationType = 'gzh';
	// #endif
	//options.data.applicationType = 'xcx';//value = "fiveXcx:五代小程序,xcx:七代小程序,gzh：公众号,app:APP"
	//options.data.brandId = options.data.brandId ? options.data.brandId : uni.getStorageSync("style") ? uni.getStorageSync("style").brandId : '';
	uni.request({
		url: API + options.url,
		data: options.data,
		method: options.method ? options.method : 'POST',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Authorization': uni.getStorageSync("token") ? uni.getStorageSync("token") : ''
		},
		success: (response) => {
			if (response.data.code != 501 && response.data.code != 200 && response.data.code != 300 && response.data.code != 401 && !options.complete) {
				console.log(response.data)
				uni.showToast({
					title: response.data.message,
					icon: 'none',
					duration: 2000
				})
				
			}else if (response.data.code == 501) {
				uni.showModal({
					title: '',
					content: response.data.message,
					showCancel: false,
					confirmText: '确认',
					confirmColor: '#DA2A1C',
					success(res) {
						if (res.confirm) {
							if(response.data.message.indexOf('关注') >= 0) {
								go('/pages/user/gzh');
							}
						} else if (res.cancel) {}
					}
				})
			} else if (response.data.code == 401 && !options.isAuth) {
				uni.removeStorageSync('token');
				setTimeout(() => {
					// #ifdef MP-WEIXIN
					go('/pages/wxAuth/index')
					// #endif
					// #ifndef MP-WEIXIN
					// if(getApp().globalData.isWeiXin) {
					// 	wxAuthH5(getApp().globalData.tuijianren);
					// }else{
					// 	go('/pages/passport/login')
					// }
					go('/pages/passport/login');
					// #endif
				},600)
				
			} else if (response.data.code == 300) {
				uni.showToast({
					title: '请进行绑定手机',
					icon: 'none',
					duration: 2000
				});
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/wxAuth/bindphone'
					})
				}, 1000);
			} else if (response.data.code == 200) {
				if (options.success) {
					options.success(response.data);
				}
			}

		},
		fail: (response) => {
			if (options.error) {
				options.error(response.data);
			}
		},
		complete: (response) => {
			if (options.loading) {
				uni.hideLoading();
			}
			if (options.complete) {
				options.complete(response.data);
			}
		}
	})
}
let isPay = false;

function wxPay(options) {
	if (isPay) {
		return
	};
	isPay = true;
	setTimeout(() => {
		isPay = false;
	},1000)
	let param;
	if(options.payType == 'alipay') {
		param = options.data;
	}else{
		// #ifndef APP-PLUS
		param = JSON.parse(options.data);
		// #endif
		// #ifdef APP-PLUS
		// param = options.data;
		param = JSON.parse(options.data);
		param.timestamp = Number(param.timestamp);
		// #endif
	}
	uni.requestPayment({
		provider: options.payType,
		orderInfo: param,
		// #ifdef MP-WEIXIN
		timeStamp: param.timeStamp,
		nonceStr: param.nonceStr,
		package: param.package,
		signType: 'MD5',
		paySign: param.paySign,
		// #endif
		success(res) {
			if (options.success) {
				options.success(res.data);
			}
		},
		fail(res) {
			console.log(res);
			if (res.errMsg == 'requestPayment:fail cancel') {
	
			} else {
				uni.showToast({
					title: res.errMsg,
					icon: 'none',
					duration: 2000
				})
			}
	
			if (options.error) {
				options.error(res.data);
			}
		}
	})
	
}

/**
 * 上传资源到服务器
 * @param   {String} filePath 要上传文件资源的路径
 * @param   {String} path     接口地址
 * @return  {Promise}
 */
function uploadFile(path, filePath, time) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: `${API}/${path}`,
			header: {
				contentType: "multipart/form-data"
			},
			filePath: filePath,
			formData: {
				openId: uni.getStorageSync("openid"),
				timelong: time
			},
			name: 'file',
			success: resolve,
			fail: reject
		})
	})
}


/**
 * 上传多张图片到服务器
 * @param   {Object}  data   
 * @return  {Promise}  
 */
function uploadimg(options) {
	let url = options.url ? `${API}${options.url}` : `${API}` + 'common/upload';
	uni.chooseImage({
		count: options.length ? options.length : 1,
		sizeType: ['original', 'compressed'],
		sourceType: ['album', 'camera'],
		success: function(res) {
			if (res.errMsg == "chooseImage:ok") {
				if (options.hideloading) {} else {
					uni.showLoading({
						title: options.loadingText ? options.loadingText : '上传中',
						mask: true
					})
				}

				let files = res.tempFiles;
				files.forEach((ele, index) => {
					uni.uploadFile({
						url: url,
						filePath: ele.path,
						name: 'file',
						header: {
							'Authorization': uni.getStorageSync("token") ? uni.getStorageSync("token") : ''
						},
						formData: {
							token: wx.getStorageSync("token"),
						},
						success: function(res) {
							if (files.length - 1 <= index) {
								uni.hideLoading();
							}
							if (options.success) {
								options.success(JSON.parse(res.data).data);
							}
						},
						fali: function(res) {
							uni.hideLoading();
							uni.showToast({
								title: res.description,
								icon: 'none',
								duration: 2000
							});
							if (options.error) {
								options.error(JSON.parse(res.data).data);
							}
						}
					});
				});

			} else {
				uni.showToast({
					title: res.errMsg,
					icon: 'none',
					duration: 2000
				})
			}
		}
	})
}

function uploadvideo(options) {
	let url = options.url ? `${API}${options.url}` : `${API}` + 'common/uploadVideo';
	uni.chooseVideo({
		sourceType: options.type ? options.type : ['album', 'camera'],
		maxDuration: options.duration ? options.duration : 60,
		camera: 'back',
		success(res) {
			if (res.errMsg == 'chooseVideo:ok') {
				if (options.hideloading) {} else {
					uni.showLoading({
						title: options.loadingText ? options.loadingText : '上传中',
						mask: true
					})
				}
				uni.uploadFile({
					url: url,
					filePath: res.tempFilePath,
					name: 'file',
					formData: {
						openId: uni.getStorageSync("openid"),
					},
					success(suc) {
						uni.hideLoading();
						if (options.success) {
							console.log(suc.data)
							options.success(JSON.parse(suc.data).data);
						}
					},
					fail(res) {
						uni.hideLoading();
						uni.showToast({
							title: res.description,
							icon: 'none',
							duration: 2000
						});
						if (options.error) {
							options.error(JSON.parse(res.data).data);
						}

					}
				})
			} else {
				uni.showToast({
					title: res.errMsg,
					icon: 'none',
					duration: 2000
				})
			}
		},
		fail(res) {
			console.log(res);
		}
	})
}


function go(url, type = 1, time) {
	//type 1:navigate,2redirectTo,3reLaunch
	//list:判断是否需要登录页面数组
	let list = []
	throttle(function() {
		// 判断是否需要登录再跳转
		for (var i = 0; i < list.length; i++) {
			if (url.indexOf(list[i]) >= 0 && !uni.getStorageSync("token")) {
				uni.navigateTo({
					url: '/pages/passport/login',
				})
				return
			}
		}

		let pages = getCurrentPages();
		if (time) {
			setTimeout(() => {
				if (type == 1) {
					if (pages && pages.length >= 10) {
						uni.reLaunch({
							url: url,
						})
					} else {
						uni.navigateTo({
							url: url,
						})
					}
				} else if (type == 2) {
					uni.redirectTo({
						url: url,
					})
				} else if (type == 3) {
					uni.reLaunch({
						url: url,
					})
				}
			}, time);
		} else {
			if (type == 1) {
				if (pages && pages.length >= 10) {
					uni.reLaunch({
						url: url,
					})
				} else {
					uni.navigateTo({
						url: url,
					})
				}
			} else if (type == 2) {
				uni.redirectTo({
					url: url,
				})
			} else if (type == 3) {
				uni.reLaunch({
					url: url,
				})
			}
		}
	}, 500);

};

function back(type, time) {
	let pages = getCurrentPages();
	if (pages.length <= 1) {
		go('/pages/index/index',3)
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
};

function $toast(tip, icon, time) {
	// #ifdef APP-PLUS
	plus.nativeUI.setUIStyle('light'); 
	// #endif
	uni.showToast({
		title: tip,
		icon: icon ? icon : 'none',
		duration: time ? time : 2000
	})
}
/**
 *腾讯地图转百度地图经纬度
 */
function qqMapTransBMap(lng, lat) {
	let x_pi = 3.14159265358979324 * 3000.0 / 180.0;
	let x = lng;
	let y = lat;
	let z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
	let theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
	let lngs = z * Math.cos(theta) + 0.0065;
	let lats = z * Math.sin(theta) + 0.006;
	return {
		lng: lngs,
		lat: lats
	};
}
let throttle_lastTime;

function throttle(fn, gapTime) {
	if (gapTime == null || gapTime == undefined) {
		gapTime = 1500
	}
	let _nowTime = parseInt(((new Date()).getTime()));
	if (_nowTime - throttle_lastTime > gapTime || !throttle_lastTime) {
		fn.apply(this, arguments) //将this和参数传给原函数
		throttle_lastTime = _nowTime
	}
}
/*函数防抖*/
function debounce(fn, interval) {
	var timer;
	var gapTime = interval || 1000; //间隔时间，如果interval不传，则默认1000ms
	clearTimeout(timer);
	var context = this;
	var args = arguments; //保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
	timer = setTimeout(function() {
		fn.call(context, args);
	}, gapTime);
}


//获取当前位置
function getLocation(options) {
	uni.getLocation({
		type: 'gcj02',
		success(res) {
			if (options.success) {
				options.success(res);
			}
		},
		fail(res) {
			$toast(res);
			if (options.error) {
				options.error(res);
			}
		},
		complete(res) {
		}
	})
}

function shareWX(options) {
	uni.share({
		provider: 'weixin',
		type: 5,
		title: options.title ? options.title : '',
		// href: options.url ? options.url : '',
		imageUrl: options.icon,
		summary: options.text ? options.text : '',
		scene: options.type == 1 ? 'WXSceneSession' : 'WXSenceTimeline',
		miniProgram: {
			id: '',
			path: options.url ? options.url : '',
			type: 0, // 0-正式版； 1-测试版； 2-体验版。
			webUrl: '',
		},
		success() {
			if (options.success) {
				options.success();
			}
		},
		fail(res) {
			if (options.fail) {
				options.fail();
			}
		}
	})
}

function saveVideo(url) {
	uni.showLoading({
		title: '下载中',
		mask: true
	});
	// #ifdef H5
	//**调用download.js下载，下载速度相对快一些**
					let downjs = require("./videodown.js"); //引用当前目录下的自定义函数
					let x=new XMLHttpRequest();
					x.open("GET", url, true);
					x.responseType = 'blob';
					x.onload=function(e) {
						downjs(x.response, "9898.mp4", "video/mp4" )
						uni.hideLoading();
						$toast('下载完成');
					};
					x.send();
	// #endif
	// #ifndef H5
	
	// #endif
	uni.downloadFile({
		url: url, //仅为示例，并非真实的资源
		success: (res) => {
			if (res.statusCode === 200) {
				uni.saveVideoToPhotosAlbum({
					filePath: res.tempFilePath,
					success: function() {
						uni.hideLoading();
						$toast('下载完成');
					}
				})
			}
		},
		complete: (res) => {
			uni.hideLoading();
			// console.log(res);
		}
	});
}

function saveImg(arr) {
	uni.showLoading({
		title: '下载中',
		mask: true
	});
	arr.forEach((ele, index) => {
		uni.downloadFile({
			url: ele, //仅为示例，并非真实的资源
			success: (res) => {
				console.log(res, index);
				if (res.statusCode === 200) {
					uni.saveImageToPhotosAlbum({
						filePath: res.tempFilePath
					})
				}

				if (index >= arr.length - 1) {
					uni.hideLoading();
					$toast('下载完成');
				}
			},
			complete: (res) => {
				// console.log(res);
			}
		});
	})
}

function timeChange(source, inFormat, outFormat) {
	var checkTime = function(time) {
		if (time < 10) {
			time = "0" + time;
		};
		return time;
	};
	switch (inFormat) {
		case 'Y-m-d H:i:s':
			var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
			source = source.match(reg);
			source = new Date(source[1], source[3] - 1, source[4], source[5], source[6], source[7]);
			break;
		case 'Y-m-d H:i':
			var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
			source = source.match(reg);
			source = new Date(source[1], source[3] - 1, source[4], source[5], source[6]);
			break;
		case 'Y-m-d':
			var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
			source = source.match(reg);
			source = new Date(source[1], source[3] - 1, source[4]);
			break;
		case 'timestamp':
			source = new Date(parseInt(source));
			break;
	};
	switch (outFormat) {
		case 'Y-m-d H:i:s':
			return source.getFullYear() + '-' +
				checkTime(source.getMonth() + 1) +
				'-' +
				checkTime(source.getDate()) +
				' ' +
				checkTime(source.getHours()) +
				':' +
				checkTime(source.getMinutes()) +
				':' +
				checkTime(source.getSeconds());
			break;
		case 'Y-m-d H:i':
			return source.getFullYear() + '-' +
				checkTime(source.getMonth() + 1) +
				'-' +
				checkTime(source.getDate()) +
				' ' +
				checkTime(source.getHours()) +
				':' +
				checkTime(source.getMinutes());
			break;
		case 'Y-m-d':
			return source.getFullYear() + '-' +
				checkTime(source.getMonth() + 1) +
				'-' +
				checkTime(source.getDate());
			break;
		case 'Y.m.d':
			return source.getFullYear() + '.' +
				checkTime(source.getMonth() + 1) +
				'.' +
				checkTime(source.getDate());
			break;
		case 'm-d H:i':
			return checkTime(source.getMonth() + 1) +
				'-' +
				checkTime(source.getDate()) +
				' ' +
				checkTime(source.getHours()) +
				':' +
				checkTime(source.getMinutes());
			break;
		case 'm月d日 H:i':
			return checkTime(source.getMonth() + 1) +
				'月' +
				checkTime(source.getDate()) +
				'日 ' +
				checkTime(source.getHours()) +
				':' +
				checkTime(source.getMinutes());
			break;
		case 'm-d':
			return checkTime(source.getMonth() + 1) +
				'-' +
				checkTime(source.getDate());
			break;
		case 'm.d':
			return checkTime(source.getMonth() + 1) +
				'.' +
				checkTime(source.getDate());
			break;
		case 'm.d H:i':
			return checkTime(source.getMonth() + 1) +
				'.' +
				checkTime(source.getDate()) +
				' ' +
				checkTime(source.getHours()) +
				':' +
				checkTime(source.getMinutes());
			break;
		case 'H:i':
			return checkTime(source.getHours()) +
				':' +
				checkTime(source.getMinutes());
			break;
		case 'timestamp':
			return parseInt(source.getTime() / 1000);
			break;
		case 'newDate':
			return source;
			break;
		case 'Y/m/d':
			return source.getFullYear() + '/' +
				checkTime(source.getMonth() + 1) +
				'/' +
				checkTime(source.getDate());
			break;
	};
}
function hideText(text) {
	if(!text){return};
	let  questionArr = text.split('');
	let questionTip = '';
	questionArr.forEach((ele,index) => {
		if(index%2 == 1) {
			questionTip += '*';
		}else{
			questionTip += ele;
		}
	});
	return questionTip
}
function uniCopy({content,success,error}) {
	if(!content) return error('复制的内容不能为空 !')
	content = typeof content === 'string' ? content : content.toString() // 复制内容，必须字符串，数字需要转换为字符串
	/**
	 * 小程序端 和 app端的复制逻辑
	 */
	//#ifndef H5
	uni.setClipboardData({
		data: content,
		success: function() {
			success("复制成功~")
			console.log('success');
		},
		fail:function(){
			success("复制失败~")
		}
	});
	//#endif
	
	/**
	 * H5端的复制逻辑
	 */
	// #ifdef H5
	if (!document.queryCommandSupported('copy')) { //为了兼容有些浏览器 queryCommandSupported 的判断
		// 不支持
		error('浏览器不支持')
	}
	let textarea = document.createElement("textarea")
	textarea.value = content
	textarea.readOnly = "readOnly"
	document.body.appendChild(textarea)
	textarea.select() // 选择对象
	textarea.setSelectionRange(0, content.length) //核心
	let result = document.execCommand("copy") // 执行浏览器复制命令
	if(result){
		success("复制成功~")
	}else{
		error("复制失败，请检查h5中调用该方法的方式，是不是用户点击的方式调用的，如果不是请改为用户点击的方式触发该方法，因为h5中安全性，不能js直接调用！")
	}	
	textarea.remove()
	// #endif
}
function setCopy() {
	 return new Promise((success, fail) => {
	    // #ifdef H5
	    try {
	      navigator.clipboard.readText().then(success).catch(fail)
	    } catch (error) {
	      fail(error)
		  $toast('粘贴失败');
	    }
	    // #endif
	  })
}
function setTitle(name) {
	uni.setNavigationBarTitle({
		title: name ? name : getApp().globalData.name
	})
}
function showModal (options,self) {
	let i18n = self.$t('model');
	uni.showModal({
		title: options.title ? options.title : '',
		content: options.content ? i18n[options.content] : '',
		showCancel: options.showCancel ? options.showCancel : true,
		cancelText:  options.cancelText ? options.cancelText : i18n['取消'],
		confirmText: options.confirmText ? options.confirmText  : i18n['确认'],
		cancelColor:  options.cancelColor ? options.cancelColor : '#383838',
		confirmColor: options.cancelColor ? options.cancelColor : '#78CA73',
		success:function(res){
			if(res.confirm) {
				if(options.success) {
					options.success();
				}
			}else{
				if(options.cancel) {
					options.cancel();
				}
				
			}
		}
	})
}
function wxAuthH5(id) {
		let appid = 'wx5d00782d2a97b460';
		let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
			encodeURIComponent(window.location.href) +
			'&response_type=code&scope=snsapi_userinfo&state=123&connect_redirect=1#wechat_redirect';
	
		function getQueryString(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null) return unescape(r[2]);
			return null;
		};
	
		function postCode(code) {
			ajax({
				url: 'common/gzh/getAccessToken',
				data: {
					code: code
				},
				success(res) {
					if (res.data.errcode == 40029) { //重新授权
						uni.hideLoading();
						$toast('授权失败');
						return;
					}
					ajax({
						url: 'common/gzh/getUser',
						data: {
							access_token: res.data.access_token,
							openid: res.data.openid,
							inviteCode: id ? id : '',
						},
						method: 'post',
						success(info) {
							uni.setStorageSync('token', info.data.tokenHead + ' ' + info.data.token);
							var url = window.location.href; //页面url
							var beforeUrl = url.substr(0, url.indexOf("?"));
							var afterUrl = url.substr(url.indexOf("#"));
							window.location.href = beforeUrl + afterUrl;
							uni.hideLoading();
						}
	
					})
				}
			})
		};
		getUserInfo();
	
		function getUserInfo() {
	
			if (getQueryString('code') != null) {
				uni.showLoading({
					title: '授权中...'
				})
				postCode(getQueryString('code'));
			} else {
				window.location.href = url;
			}
		};
	};
	function wxPayH5(options) {
		
		//调用微信JS api 支付
		function jsApiCall() {
			WeixinJSBridge.invoke(
				'getBrandWCPayRequest',
				JSON.parse(options.data),
				function(res) {
					//根据不同的操作结果进行不同的响应
					switch (res.err_msg) {
						case 'get_brand_wcpay_request:cancel':
							$toast('您已取消微信支付');
							if (options.cancel) {
								options.cancel(res);
							}
							break;
						case "get_brand_wcpay_request:ok":
							$toast('微信支付成功');
							if (options.success) {
								options.success(res);
							}
							break;
						default:
							$toast(res.errMsg);
							if (options.error) {
								options.error(res);
							}
							break;
					}
				}
			);
	
		};
		if (typeof WeixinJSBridge == "undefined") {
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', jsApiCall);
				document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
			}
		} else {
			jsApiCall();
		}
	}
module.exports = {
	uploadFile,
	ajax,
	uploadimg,
	uploadvideo,
	getToken,
	API,
	go,
	$toast,
	wxPay,
	qqMapTransBMap,
	throttle,
	debounce,
	getLocation,
	back,
	shareWX,
	saveImg,
	timeChange,
	hideText,
	saveVideo,
	uniCopy,
	setCopy,
	setTitle,
	showModal,
	wxAuthH5,
	wxPayH5
}
