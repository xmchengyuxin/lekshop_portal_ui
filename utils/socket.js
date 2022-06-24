let keepAliveTimer;
let errTimer;
export default {
	ws: {}, //websocket对象
	delay: 5000, //重连延迟，单位：毫秒
	count: 0, //重连次数
	limitCount: 9999, //重来最多次数
	isAuth: false,
	uid: '',
	socketUrl: '',
	//设置websocket对象方法
	setWs: function(newWs) {
		this.ws = newWs
	},
	//设置延迟方法
	setDelay: function(newDelay) {
		this.delay = newDelay
	},
	//发送websocket信息方法
	sendMsg: function(message, fc) {
		this.ws.send({
			data: JSON.stringify(message),
			complete(res) {
				if (fc) {
					fc(res);
				}
				// console.log(res, 'send')
			}
		})
	},
	playAudio() {
		let AUDIO = uni.createInnerAudioContext();
		AUDIO.src = 'https://qiniu.chengyuwb.com/ding.mp3';
		AUDIO.play();
	},
	onMessage: function(info) {
		let self = this;
		// self.playAudio();
		uni.$emit('onMessage',info);
	},
	close: function() {
		if (this.ws.close) {
			this.ws.close({
				code: 1000, //1000（表示正常关闭连接）
				reason: '正常关闭'
			})
		}
	},
	creatSocket(options) {
		let self = this;
		if(!getApp()){
			setTimeout(() => {
				this.creatSocket(options)
			},500)
			return;
		}
		this.socketUrl = getApp().globalData.socket;
		const url = this.socketUrl;
		let userInfo = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
		if (url == '' || userInfo == '') {
			return;
		}
		self.uid = 'member-' + userInfo.id;
		clearTimeout(errTimer);
		this.close();
		self.ws = uni.connectSocket({
			url: url, //仅为示例，并非真实接口地址。
			complete: (res) => {
				console.log(res, 'connect');
			}
		});
		//监听websocket连接打开方法
		self.ws.onOpen((res) => {
			console.log("打开websocket")
			self.count = 0;
			//调用keepalive方法（不一定都需要调用此方法，可注释）
			self.keepAlive()
		})
		//监听websocket错误方法
		self.ws.onError((ev) => {
			console.log("连接已出错...");
			//延迟执行重连
			if (self.count < self.limitCount) {
				self.count += 1;
				errTimer = setTimeout(() => {
					self.creatSocket(options);
				}, self.delay);
			}

		});
		//监听websocket关闭方法
		self.ws.onClose((ev) => {
			// 关闭 websocket
			console.log("连接已关闭...");
			//延迟执行重连
			if (self.count < self.limitCount) {
				self.count += 1;
				errTimer = setTimeout(() => {
					self.creatSocket(options);
				}, self.delay);
			}
		});
		//监听websocket接收消息事件（接收来自服务器的实时消息）
		self.ws.onMessage((res) => {
			let info = JSON.parse(res.data);
			console.log("App.vue收到服务器内容");
			// console.log("App.vue收到服务器内容", info);
			if (info.cmd == 5) { //正常聊天信息
				self.onMessage(JSON.parse(info.data));
			}
		});
		
	},
	keepAlive() {
		let self = this;
		clearTimeout(keepAliveTimer);
		//判断当前webscokt状态
		if (self.ws.readyState == 1) {
			if (!self.isAuth) {
				self.sendMsg({
					"cmd": '1',
					"clientId": self.uid
				})
				self.isAuth = true;
			} else {
				//调用发送方法
				self.sendMsg({
					"cmd": '2',
					"clientId": self.uid
				})
			}

			keepAliveTimer = setTimeout(() => {
				self.keepAlive()
			}, 10000);
		}

	},
}
