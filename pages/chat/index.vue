<template>
	<view class="contain">
		<view v-if="!isRefresh" :class="refreshClass" class="animate flex fixed-top h-44 bg-color-f7 box-c" :style="{'padding-top': top + 'px'}">
			<view @click="back(1)" v-if="type != ''"
				class="flex f-s-0 padding-lr10 f-a-c f-j-c van-icon van-icon-arrow-left f20-size"></view>
			<view v-else class="flex f-s-0 padding-lr10 f-a-c f-j-c van-icon  f20-size"></view>
			<view class="flex flex-1 f-a-c f-j-c f16-size">
				{{i18n['消息中心']}}
				<text v-if="len > 0" class="f16-size t-color-9 margin-l6">({{len}})</text>
			</view>
			<view @click="read" class="flex f-s-0 f-a-c padding-lr10 van-icon van-icon-readed"></view>
			<xcx-header></xcx-header>
		</view>
		<view :style="{'padding-top': top+44+'px'}"></view>
		<view class="padding-12">
			<view class="grid grid-c-3 bg-color-w padding-tb12 b-radius-10">
				<view @click="go('/pages/chat/wuliu')" class="flex f-c f-a-c f-j-c f-s-0">
					<view
						class="w-50 h-50 b-radius btn-color1 flex f-a-c f-j-c van-icon van-icon-logistics t-color-w f24-size p-r">
						<text 	v-if="newsLen > 0" class="dot-tip b-radius bg-color-r"></text>
					</view>
					<text class="f12-size margin-t4">{{i18n['交易物流']}}</text>
				</view>
				<view  @click="goService(1)" class="flex f-c f-a-c f-j-c f-s-0">
					<view
						class="w-50 h-50 b-radius btn-color2 flex f-a-c f-j-c van-icon van-icon-kefu t-color-w f24-size">
					</view>
					<text class="f12-size margin-t4">{{i18n['人工客服']}}</text>
				</view>
				<view @click="goService(2)" class="flex f-c f-a-c f-j-c f-s-0">
					<view
						class="w-50 h-50 b-radius bg-color-linear-bg flex f-a-c f-j-c van-icon van-icon-chat-o t-color-w f24-size">
					</view>
					<text class="f12-size margin-t4">{{i18n['智能客服']}}</text>
				</view>
			</view>
		</view>
		<view class="bg-color-w">
			<uni-swipe-action>
				<uni-swipe-action-item @click="delItem($event,index)" :options="options" v-for="(item,index) in list"
					:key="item.id">
					<view @click="go('/pages/chat/chat?id='+item.targetId)" class="flex w100">
						<view class="padding-lr12 flex f-a-c f-s-0">
							<view class="w-36 h-36 flex f-a-c f-j-c b-radius bg-img "
								:style="item.targetHeadImg | bgimg(300)+''"></view>
						</view>
						<view class="flex f-c flex-1 b-bottom " style="padding: 10px 12px 10px 0;">
							<view class="flex f-a-c f-j-s">
								<text class="f13-size f-w-500 t-color-y">{{item.targetNickname}}</text>
								<text class="f11-size t-color-9">{{item.updTime | time3}}</text>
							</view>
							<view class="flex f-a-c f-j-s margin-t6">
								<view class="flex flex-1 margin-r12">
									<text v-if="item.msgType == 'goods'" class="line1 f12-size t-color-6">[{{i18n['商品链接']}}]</text>
									<text v-else-if="item.msgType == 'order'" class="line1 f12-size t-color-6">[{{i18n['订单详情']}}]</text>
									<text v-else-if="item.msgType == 'image'" class="line1 f12-size t-color-6">[{{i18n['图片']}}]</text>
									<text v-else class="line1 f12-size t-color-6">{{item.lastMsg}}</text>
								</view>
								<text v-if="item.unReadNum > 0"
									class="flex f-a-c f-j-c box-b f11-size t-color-w bg-color-r b-radius padding-lr2 h-16"
									style="min-width: 16px;">{{item.unReadNum}}</text>
							</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<tab-bar ref="tabbar" :active="1" :isShow="false"></tab-bar>
	</view>
</template>
<style scoped>
	/* @import url('../../static/css/index/index.css'); */
	.btn-color1 {
		background-image: linear-gradient(90deg, #0081ff, #56ade0);
	}

	.btn-color2 {
		background-image: linear-gradient(90deg, #ff9700, #f9ec50);
	}

	.btn-color3 {
		background-image: linear-gradient(90deg, #3edc53, #8dc63f);
	}
	.dot-tip {
		position: absolute;
		top: 2px;
		right: 0px;
		width: 6px;
		height: 6px;
	}
</style>
<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue';
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				len: 0,
				newsLen: 0,
				type: 'back',
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
				options: [],
				isRefresh: false,//小程序的下拉刷新子定义标题挡住loading
				refreshClass: [''],
			};
		},
		onLoad: function() {
			self = this;
			
			this.options = [{
					text: this.i18n['标记已读'],
					style: {
						backgroundColor: '#56ade0'
					}
				},
				{
					text: this.i18n['删除会话'],
					style: {
						backgroundColor: '#DA2A1C'
					}
				}
			]
			uni.hideTabBar()
			this.onMessage();
		},
		onShow() {
			this.init();
		},
		methods: {
			onMessage() {
				const self = this;
				uni.$on('onMessage',(res) => {
					let pages = getCurrentPages(); // 当前页面
					let beforePage = pages[pages.length - 1]; // 前一个页面 
					let info = JSON.parse(res.content);
					if(res.type == 5 && beforePage.route == 'pages/chat/index') {
						self.init();
					}
				})
			},
			read() {
				const self = this;
				let url = API.readChatApi;
				$.ajax({
					url: url,
					data: {sessionId: ''},
					method: 'POST',
					success(res) {
						self.$toast(self.i18n['操作成功']);
						self.init();
					}
				})
			},
			delItem(e,index) {
				const self = this;
				let url = API.delChatApi;
				if(e.index != 1) {
					url = API.readChatApi
				}
				$.ajax({
					url: url,
					data: {sessionId: self.list[index].id},
					method: 'POST',
					success(res) {
						self.$toast(self.i18n['操作成功']);
						self.init();
					}
				})
			},
			getChatLen() {
				$.ajax({
					url: API.chatNumApi,
					data: {},
					isAuth: true,
					method: 'GET',
					success(res) {
						self.len = res.data ? res.data : 0;
					}
				})
			},
			getNewsLen() {
				$.ajax({
					url: API.newsNumApi,
					data: {},
					isAuth: true,
					method: 'GET',
					success(res) {
						self.newsLen = res.data ? res.data.num : 0;
					}
				})
			},
			getList() {
				$.ajax({
					url: API.chatListApi,
					isAuth: true,
					data: {
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
						self.list = list;
						uni.stopPullDownRefresh();
						// #ifdef MP-WEIXIN
						if(self.isRefresh) {
							self.isRefresh = false;
							self.refreshClass = ['fadeIn'];
						}
						// #endif
					}
				})
			},
			
			init() {
				this.page = 1;
				this.getList();
				this.getChatLen();
				this.getNewsLen();
				this.$nextTick(() => {
					this.$refs.tabbar.getChatLen();
				})
			},
		},
		computed: {
			i18n() {
				return this.$t('chat')
			},
		},
		created() {},
		mounted() {},
		destroyed() {},
		components: {uniSwipeAction,uniSwipeActionItem},
		onPullDownRefresh() {
			// #ifdef MP-WEIXIN
			this.isRefresh = true;
			this.refreshClass = ['fadeOut'];
			// #endif
			this.init();
		},
		onReachBottom() {}
	}
</script>
