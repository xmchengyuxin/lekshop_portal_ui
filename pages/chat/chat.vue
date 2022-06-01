<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<view v-if="isHistoryLoading" class="loading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.id">
					<!-- 系统消息 -->
					<block v-if="row.type=='system'" >
						<view class="system">
							<!-- 文字消息 -->
							<view v-if="row.msgType=='text'" class="text">
								{{row.msgContent}}
							</view>
							<!-- 领取红包消息 -->
							<view v-if="row.msgType=='redEnvelope'" class="red-envelope">
								<image src="/static/img/red-envelope-chat.png"></image>
								{{row.msgContent}}
							</view>
						</view>
					</block>
					<!-- 用户消息 row.type=='user'-->
					<block v-else>
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.sendType == 1">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 发送商品链接 -->
								<view @click="go('/pages/shops/detail?id='+JSONGoods(row.msgContent,'id'))" v-if="row.msgType=='goods'" class="bubble flex f-a-s bg-color-w">
									<view class="flex f-s-0 w-70 h-70 bg-img margin-r10" :style="JSONGoods(row.msgContent,'mainImg') | bgimg(300)+''"></view>
									<view class="flex flex-1 f-c f-j-s h100">
										<view class="line2 f12-size t-color-6">{{JSONGoods(row.msgContent,'title')}}</view>
										<view class="text-price t-color-y margin-t6">{{JSONGoods(row.msgContent,'price')}}</view>
									</view>
								</view>
								<!-- 发送订单 -->
								<view @click="go('/pages/order/detail?id='+JSONGoods(row.msgContent,'id'))" v-if="row.msgType=='order'" class="bubble f-c f-a-s  bg-color-w">
									<view class="f13-size f-w-b t-color-3">{{i18n['您正在咨询的订单']}}</view>
									<view class="flex margin-t8">
										<view class="flex f-s-0 w-50 h-50 bg-img margin-r10" :style="JSONGoods(row.msgContent,'mainImg') | bgimg(300)+''"></view>
										<view class="flex flex-1 f-c f-j-s h100">
											<view class="line2 f12-size t-color-6">{{JSONGoods(row.msgContent,'title')}}</view>
											<view class="flex f-a-c margin-t6 f11-size t-color-9">
												<text class="margin-r4">合计</text>
												<text class="text-price">{{JSONGoods(row.msgContent,'price')}}</text>
											</view>
										</view>
									</view>
									<view class="flex f-a-c  w100 f11-size t-color-9 margin-t6">{{i18n['订单号']}}: {{JSONGoods(row.msgContent,'orderNo')}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.msgType=='text'" class="bubble">
									<rich-text :nodes="emojiNameToImage(row.msgContent)"></rich-text>
								</view>
								<!-- 语言消息 -->
								<view v-if="row.msgType=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="length">{{row.msg.content.length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msgType=='image'" class="bubble img" @tap="showPic(row.msgContent)">
									<image :src="row.msgContent" class="w-120"  mode="widthFix"></image>
								</view>
								<!-- 红包 -->
								<view v-if="row.msgType=='redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelope(row.msg,index)">
									<image src="/static/img/red-envelope.png"></image>
									<view class="tis">
										<!-- 点击开红包 -->
									</view>
									<view class="blessing">
										{{row.msgContent}}
									</view>
								</view>
								
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<view class="w-36 h-36 bg-img b-radius" :style="row.memberHeadImg | bgimg(300)+''"></view>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-if="row.sendType == 2">
							<!-- 左-头像 -->
							<view class="left">
								<view class="w-36 h-36 bg-img b-radius" :style="row.targetHeadImg | bgimg(300)+''"></view>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<!-- <view class="username">
									<view class="name">{{row.targetNickname}}</view> <view class="time">{{row.sendTime | time}}</view>
								</view> -->
								<!-- 发送商品链接 -->
								<view @click="go('/pages/shops/detail?id='+JSONGoods(row.msgContent,'id'))" v-if="row.msgType=='goods'" class="bubble flex bg-color-w">
									<view class="flex f-s-0 w-70 h-70 bg-img margin-r10" :style="JSONGoods(row.msgContent,'mainImg') | bgimg(300)+''"></view>
									<view class="flex flex-1 f-c f-j-s h100">
										<view class="line2 f12-size t-color-6">{{JSONGoods(row.msgContent,'title')}}</view>
										<view class="text-price t-color-y margin-t6">{{JSONGoods(row.msgContent,'price')}}</view>
									</view>
								</view>
								<!-- 发送订单 -->
								<view @click="go('/pages/order/detail?id='+JSONGoods(row.msgContent,'id'))" v-if="row.msgType=='order'" class="bubble f-c f-a-s  bg-color-w">
									<view class="flex">
										<view class="flex f-s-0 w-50 h-50 bg-img margin-r10" :style="JSONGoods(row.msgContent,'mainImg') | bgimg(300)+''"></view>
										<view class="flex flex-1 f-c f-j-s h100">
											<view class="line2 f12-size t-color-6">{{JSONGoods(row.msgContent,'title')}}</view>
											<view class="flex f-a-c margin-t6 f11-size t-color-9">
												<text class="margin-r4">{{i18n['合计']}}</text>
												<text class="text-price">{{JSONGoods(row.msgContent,'price')}}</text>
											</view>
										</view>
									</view>
									<view class="flex f-a-c  w100 f11-size t-color-9 margin-t6">{{i18n['订单号']}}: {{JSONGoods(row.msgContent,'orderNo')}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.msgType=='text'" class="bubble">
									<rich-text :nodes="emojiNameToImage(row.msgContent)"></rich-text>
								</view>
								<!-- 语音消息 -->
								<view v-if="row.msgType=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="icon other-voice"></view>
									<view class="length">{{row.msgContent.length}}</view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msgType=='image'" class="bubble img" @tap="showPic(row.msgContent)">
									<image :src="row.msgContent" class="w-120" mode="widthFix"></image>
								</view>
								<!-- 红包 -->
								<view v-if="row.msgType=='redEnvelope'" class="bubble red-envelope" @tap="openRedEnvelope(row.msg,index)">
									<image src="/static/img/red-envelope.png"></image>
									<view class="tis">
										<!-- 点击开红包 -->
									</view>
									<view class="blessing">
										{{row.msg.content.blessing}}
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
				<view v-if="showGoods" style="padding: 55px;"></view>
				<view v-if="isAi()" style="padding: 15px;"></view>
				<view id="bottompage" class="padding-10"></view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 --> 
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="em.src"></image>
					</view>
				</swiper-item>
			</swiper> 
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage"><view class="icon tupian2"></view></view>
					<view class="box" @tap="camera"><view class="icon paizhao"></view></view>
					<!-- <view class="box" @tap="handRedEnvelopes"><view class="icon hongbao"></view></view> -->
				</view>
			</view>
		</view>
		<!-- 商品链接 -->
		<view v-if="showGoods" class="popup-goods padding-12">
			<view v-if="goodsId != ''" class="bg-color-w b-radius-5 padding-10 flex">
				<view :style="goods.mainImg | bgimg(300)+''" class="flex f-s-0 w-60 h-60 b-radius-5 bg-img  margin-r12"></view>
				<view class="flex flex-1 f-c f-j-s">
					<view class="flex">
						<view class="flex flex-1 f-w-500"><text class="line1">{{goods.title}}</text></view>
						<text @click="showGoods=!showGoods" class="flex f-a-c f-j-c f-s-0 van-icon van-icon-cross t-color-9"></text>
					</view>
					<view class="flex f-a-c f-j-s">
						<text class="text-price t-color-y">{{goods.price}}</text>
						<view @click="sendGoods()" class="flex f-a-c f-j-c b-radius-30 f11-size t-color-w bg-color-linear-y h-24 padding-lr10">{{i18n['发送商品']}}</view>
					</view>
				</view>
			</view>
			<view v-if="orderId != ''" class="bg-color-w b-radius-5 padding-10 flex">
				<view :style="order.orderDetailList[0].goodsMainImg | bgimg(300)+''" class="flex f-s-0 w-60 h-60 b-radius-5 bg-img  margin-r12"></view>
				<view class="flex flex-1 f-c f-j-s">
					<view class="flex">
						<view class="flex flex-1 f-w-500"><text class="line1">{{i18n['你可能想咨询该订单']}}</text></view>
						<text @click="showGoods=!showGoods" class="flex f-a-c f-j-c f-s-0 van-icon van-icon-cross t-color-9"></text>
					</view>
					<view class="flex f-a-c f-j-s">
						<view class="flex f-a-c">
							<text class="f12-size t-color-9 margin-r4">{{i18n['共1件商品'] | i18n(order.orderDetailList.length)}}：{{i18n['合计']}}</text>
							<text class="f12-size t-color-9 text-price">{{order.order.payPrice}}</text>
						</view>
						<view @click="sendOrder()" class="flex f-a-c f-j-c b-radius-30 f11-size t-color-w bg-color-linear-y h-24 padding-lr10">{{i18n['发送订单']}}</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="isAi()" class="popup-goods padding-12 flex f-j-e">
			<view @click="goService(1)" class="flex f-a-c f-j-c b-radius-30 f11-size t-color-w bg-color-linear-y h-24 padding-lr10">{{i18n['人工客服']}}</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode"  :class="isVoice?'hidden':''">
					<view class="box">
						<textarea auto-height="true" v-model="textMsg" @focus="textareaFocus"/>
					</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">{{i18n['发送']}}</view>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
		<!-- 红包弹窗 -->
		<view class="windows" :class="windowsState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="open-redenvelope">
					<view class="top">
						<view class="close-btn">
							<view class="icon close" @tap="closeRedEnvelope"></view>
						</view>
						<image src="/static/img/im/face/face_1.jpg"></image>
					</view>
					<view class="from">来自{{redenvelopeData.from}}</view>
					<view class="blessing">{{redenvelopeData.blessing}}</view>
					<view class="money">{{redenvelopeData.money}}</view>
					<view class="showDetails" @tap="toDetails(redenvelopeData.rid)">
						查看领取详情 <view class="icon to"></view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>
<script>
	const emojis = require('./utils/emoji.js').default;
	const API = require('./utils/api.js').default;
	const shopApi = require('../../utils/api/shops.js').default;
	const orderApi = require('../../utils/api/order.js').default;
	const $ = require('../../utils/api.js');
	const emojiMap ={};
	export default {
		data() {
			return {
				showGoods: false,
				//文字消息
				textMsg:'',
				//消息列表
				isHistoryLoading:false,
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],
				msgImgList:[],
				myuid:0,
				
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER:uni.getRecorderManager(),
				// #endif
				isVoice:false,
				voiceTis:'按住 说话',
				recordTis:"手指上滑 取消发送",
				recording:false,
				willStop:false,
				initPoint:{identifier:0,Y:0},
				recordTimer:null,
				recordLength:0,
				
				//播放语音相关参数
				AUDIO:uni.createInnerAudioContext(),
				playMsgid:null,
				VoiceTimer:null,
				// 抽屉参数
				popupLayerClass:'',
				// more参数
				hideMore:true,
				//表情定义
				hideEmoji:true,
				emojiList:emojis,
				//红包相关参数
				windowsState:'',
				redenvelopeData:{
					rid:null,	//红包ID
					from:null,
					face:null,
					blessing:null,
					money:null
				},
				id: '',
				page: 1,
				pageSize: 20,
				totalPage: 1,
				goodsId: '',
				goods: '',
				orderId:'',
				order: '',
			};
		},
		onLoad(options) {
			const self = this;
			this.id = options.id ? options.id : '';
			this.goodsId = options.goodsId ? options.goodsId : '';
			this.orderId = options.orderId ? options.orderId : '';
			this.getMsgList();
			this.getGoods();
			this.getOrder();
			//语音自然播放结束
			this.AUDIO.onEnded((res)=>{
				this.playMsgid=null;
			});
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e)=>{
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e)=>{
				this.recordEnd(e);
			})
			// #endif
			self.onMessage();
			self.initMap();
		},
		onShow(){
		},
		onHide() {
			this.read();
		},
		methods:{
			isAi() {
				return this.id == this.goService(4)
			},
			JSONGoods(info,dom) {
				info = JSON.parse(info);
				 return info[dom]
			},
			getOrder() {
				if(this.orderId == ''){return};
				const self = this;
				$.ajax({
					url: orderApi.orderDetailApi,
					data: {
						orderId: self.id
					},
					method: 'GET',
					success(res) {
						self.order = res.data ? res.data : '';
						if(self.order != ''){
							self.showGoods = true;
							self.updateMsg();
						}
					}
				})
			},
			getGoods() {
				if(this.goodsId == ''){return};
				const self = this;
				$.ajax({
					url: shopApi.goodsDetailApi,
					data: {
						goodsId: self.goodsId
					},
					method: 'GET',
					success(res) {
						self.goods = res.data ? res.data.goods : '';
						if(self.goods != ''){
							self.showGoods = true;
							self.updateMsg();
						}
					}
				})
			},
			read() {
				const self = this;
				if(self.msgList.length <= 0){return;}
				let id = self.msgList[0]['sessionId'];
				$.ajax({
					url: API.readChatApi,
					data: {
						sessionId: id
					},
					method: 'POST',
					success(res) {
					}
				})
			},
			initMap() {
				emojis.forEach((ele,index) => {
					ele.forEach((ele1,idx) => {
						emojiMap[ele1.name] = ele1.src;
					})
				})
			},
			//清除字符串内的所有HTML标签
			clearHtml(str) {
			  return str.replace(/<.*?>/gi, "");
			},
			/**
			 * 将字符串内的 EmojiItem.name 替换为 img
			 * @param {String} str 被替换的字符串
			 * @return {String} 替换后的字符串
			 */
			emojiNameToImage(str) {
				if(str.indexOf(']') < 0) {
					return str;
				}
				str = this.clearHtml(str);
			  return str.replace(/\[!(\w+)\]/gi, (str, match) => {
			    const file = match;
			    return emojiMap[file]
			      ? `<img style="width:20px;margin-right:4px;" emoji-name="${match}" src="${emojiMap[file]}" />`
			      : `[!${match}]`;
			  });
			},
			emojiImageToName(str) {
			  return str.replace(/<img emoji-name=\"([^\"]*?)\" [^>]*>/gi, "[!$1]");
			},
			onMessage() {
				const self = this;
				self.socket.onMessage({
					onMessage(res){
						console.log(res);
						if(res.type == 5 && res.content.targetId == self.id) {
							self.msgList.push(JSON.parse(res.content));
							uni.vibrateLong();
							self.updateMsg();
						}
					}
				})
			},
			// 接受消息(筛选处理)
			screenMsg(msg){
				const self = this;
				$.ajax({
					url: API.sendChatApi,
					data: {
						targetMemberId: self.id,
						msgType: msg.msgType,
						content: msg.msgContent
					},
					method: 'POST',
					success(res) {
						if(self.msgImgList.length <= 0){//第一条时无数据
							self.getMsgList();return;
						}
						self.msgList.push(msg);
						if(msg.sendType == 2){
							console.log('振动');
							uni.vibrateLong();
						}
						self.updateMsg();
					}
				})
				
			},
			
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e){
				const self= this;
				if(this.isHistoryLoading){
					return ;
				}
				this.isHistoryLoading = true;//参数作为进入请求标识，防止重复请求
				this.scrollAnimation = false;//关闭滑动动画
				if(this.page < this.totalPage) {
					this.page += 1;
				}else{
					this.isHistoryLoading = false;
					return;
				}
				let Viewid = this.msgList[0].id;//记住第一个信息ID
				$.ajax({
					url: API.chatHisListApi,
					data: {
						targetMemberId: self.id,
						page: self.page,
						pageSize: self.pageSize,
					},
					method: 'GET',
					success(res) {
						let list = [];
						if (self.page != 1) {
							list = res.data.list.concat(self.msgList);
						} else {
							list = res.data.list ? res.data.list : [];
						}
						self.totalPage = res.data.totalPage;
						self.msgList = list;
						//这段代码很重要，不然每次加载历史数据都会跳到顶部
						self.$nextTick(function() {
							self.scrollToView = 'msg'+Viewid;//跳转上次的第一行信息位置
							self.$nextTick(function() {
								self.scrollAnimation = true;//恢复滚动动画
							});
							
						});
						// self.updateMsg('msg'+Viewid);//跳转上次的第一行信息位置
					},
					complete(res) {
						self.isHistoryLoading = false;
					}
				})
			},
			// 加载初始页面消息
			getMsgList(){
				const self = this;
				$.ajax({
					url: API.chatHisListApi,
					data: {
						targetMemberId: self.id,
						page: self.page,
						pageSize: self.pageSize,
					},
					method: 'GET',
					success(res) {
						let list = [];
						if (self.page != 1) {
							list = self.list.concat(res.data.list);
						} else {
							list = res.data.list ? res.data.list : [];
						}
						self.totalPage = res.data.totalPage;
						self.msgList = list;
						self.updateMsg();
						if(self.msgList.length <= 0){return;}
						self.read();
						$.setTitle(list[0]['targetNickname']);
					}
				})
			},
			updateMsg(dom) {
				const self = this;
				if(!dom)  {
					self.scrollToView = '';
				}
				setTimeout(() => {
					// 滚动到底部
					self.$nextTick(function() {
						//进入页面滚动到底部
						self.$nextTick(function() {
							self.scrollToView = dom ? dom : 'bottompage';
							self.scrollAnimation = dom ? false :true;
						});
						
					});
				},200)
				
			},
			//更多功能(点击+弹出) 
			showMore(){
				this.isVoice = false;
				this.hideEmoji = true;
				if(this.hideMore){
					this.hideMore = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer(){
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer(){
				this.popupLayerClass = '';
				setTimeout(()=>{
					this.hideMore = true;
					this.hideEmoji = true;
				},150);
			},
			// 选择图片发送
			chooseImage(){
				this.getImage('album');
			},
			//拍照发送
			camera(){
				this.getImage('camera');
			},
			//发红包
			handRedEnvelopes(){
				uni.navigateTo({
					url:'HM-hand/HM-hand'
				});
				this.hideDrawer();
			},
			//选照片 or 拍照
			getImage(type){
				const self = this;
				this.hideDrawer();
				$.uploadimg({
					type: [type],
					success(res) {
						let msg = res.imgUrl;
						self.sendMsg(msg,'image');
					}
				})
			},
			// 选择表情
			chooseEmoji(){
				this.hideMore = true;
				if(this.hideEmoji){
					this.hideEmoji = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em){
				this.textMsg+='[!'+em.name+']';
			},
			
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(){
				if(this.popupLayerClass=='showLayer' && this.hideMore == false){
					this.hideDrawer();
				}
			},
			// 发送文字消息
			sendText(){
				this.hideDrawer();//隐藏抽屉
				if(!this.textMsg){
					return;
				}
				let msg = this.textMsg;
				this.sendMsg(msg,'text');
				this.textMsg = '';//清空输入框
			},
			sendOrder() {
				let order = this.order.order;
				let goods = this.order.orderDetailList[0];
				let obj = {
					'mainImg': goods.goodsMainImg,
					'id': order.id,
					'orderNo': order.orderNo,
					'price': order.payPrice,
					'title': goods.goodsName
				}
				this.sendMsg(JSON.stringify(obj),'order');
				this.showGoods = false;
			},
			sendGoods() {
				let obj = {
					'mainImg': this.goods.mainImg,
					'id': this.goods.id,
					'price': this.goods.price,
					'title': this.goods.title
				}
				this.sendMsg(JSON.stringify(obj),'goods');
				this.showGoods = false;
			},
			
			// 发送消息
			sendMsg(content,type){
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				var nowDate = new Date();
				let lastObj = this.msgList.length > 0 ? this.msgList[this.msgList.length-1] : {id: 0};
				let obj = Object.assign({},lastObj);
				obj['id'] = lastObj['id']+=1;
				obj['sendTime'] = nowDate.getTime();
				obj['msgContent'] = content;
				obj['msgType'] = type;
				obj['sendType'] = 1;//1发送，2接收
				// 发送消息
				this.screenMsg(obj);
			},
			
			
			// 打开红包
			openRedEnvelope(msg,index){
				let rid = msg.content.rid;
				uni.showLoading({
					title:'加载中...'
				});
				console.log("index: " + index);
				//模拟请求服务器效果
				setTimeout(()=>{
					//加载数据
					if(rid==0){
						this.redenvelopeData={
							rid:0,	//红包ID
							from:"大黑哥",
							face:"/static/img/im/face/face.jpg",
							blessing:"恭喜发财，大吉大利",
							money:"已领完"
						}
					}else{
						this.redenvelopeData={
							rid:1,	//红包ID
							from:"售后客服008",
							face:"/static/img/im/face/face_2.jpg",
							blessing:"恭喜发财",
							money:"0.01"
						}
						if(!msg.content.isReceived){
							// {type:"system",msg:{id:8,type:"redEnvelope",content:{text:"你领取了售后客服008的红包"}}},
							this.sendSystemMsg({text:"你领取了"+(msg.userinfo.uid==this.myuid?"自己":msg.userinfo.username)+"的红包"},'redEnvelope');
							console.log("this.msgList[index]: " + JSON.stringify(this.msgList[index]));
							this.msgList[index].msg.content.isReceived = true;
						}
					}
					uni.hideLoading();
					this.windowsState = 'show';
					
				},200)
				
			},
			// 关闭红包弹窗
			closeRedEnvelope(){
				this.windowsState = 'hide';
				setTimeout(()=>{
					this.windowsState = '';
				},200)
			},
			sendSystemMsg(content,type){
				let lastid = this.msgList[this.msgList.length-1].id;
				lastid++;
				let row = {type:"system",msg:{id:lastid,type:type,content:content}};
				this.screenMsg(row)
			},
			//领取详情
			toDetails(rid){
				uni.navigateTo({
					url:'HM-details/HM-details?rid='+rid
				})
			},
			// 预览图片
			showPic(img){
				this.previewImg(img)
			},
			// 播放语音
			playVoice(msg){
				this.playMsgid=msg.id;
				this.AUDIO.src = msg.content.url;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e){
				if(e.touches.length>1){
					return ;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({format:"mp3"});//录音开始,
			},
			//录音开始UI效果
			recordBegin(e){
				this.recording = true;
				this.voiceTis='松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(()=>{
					this.recordLength++;
				},1000)
			},
			// 录音被打断
			voiceCancel(){
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true;//不发送录音
				this.RECORDER.stop();//录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e){
				if(!this.recording){
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if(this.initPoint.Y - touche.clientY>=uni.upx2px(100)){
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				}else{
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e){
				if(!this.recording){
					return;
				}
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop();//录音结束
			},
			//录音结束(回调文件)
			recordEnd(e){
				clearInterval(this.recordTimer);
				if(!this.willStop){
					console.log("e: " + JSON.stringify(e));
					let msg = {
						length:0,
						url:e.tempFilePath
					}
					let min = parseInt(this.recordLength/60);
					let sec = this.recordLength%60;
					min = min<10?'0'+min:min;
					sec = sec<10?'0'+sec:sec;
					msg.length = min+':'+sec;
					this.sendMsg(msg,'voice');
				}else{
					console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice(){
				this.hideDrawer();
				this.isVoice = this.isVoice?false:true;
			},
			discard(){
				return;
			}
		},
		computed: {
			i18n() {
				return this.$t('chat')
			},
		},
	}
</script>
<style scoped lang="scss">
	@import "../../static/css/chat/index.scss"; 
	/* @import url('../../static/css/index/index.css'); */
</style>