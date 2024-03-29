<template>
	<view class="">
		<view v-for="(item,index) in list" class="fixed-top bg-color-w b-radius-5 animate fadeInDown" :style="{'top': top+10+'px'}">
			<view @click="go('/pages/chat/chat?id='+item.targetId)" class="flex w100">
				<view class="padding-lr12 flex f-a-c f-s-0">
					<view class="w-36 h-36 flex f-a-c f-j-c b-radius bg-img " :style="item.targetHeadImg | bgimg(300)+''"></view>
				</view>
				<view class="flex f-c flex-1 b-bottom " style="padding: 10px 12px 10px 0;">
					<view class="flex f-a-c f-j-s">
						<text class="f13-size f-w-500 t-color-y">{{item.targetNickname}}</text>
						<!-- <text class="f11-size t-color-9">{{item.updTime | time3}}</text> -->
					</view>
					<view class="flex f-a-c f-j-s margin-t6">
						<view class="flex flex-1 margin-r12">
							<text v-if="item.msgType == 'goods'" class="line1 f12-size t-color-6">[{{i18n['商品链接']}}]</text>
							<text v-else-if="item.msgType == 'order'" class="line1 f12-size t-color-6">[{{i18n['订单详情']}}]</text>
							<text v-else-if="item.msgType == 'image'" class="line1 f12-size t-color-6">[{{i18n['图片']}}]</text>
							<text v-else  class="line1 f12-size t-color-6">{{item.msgContent}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<one></one>
	</view>
</template>
<style scoped>
	.fixed-top {
		top: 10px;
		left: 15px;
		right: 15px;
		z-index: 99999999;
		box-shadow: 2px 0 10px rgba(0,0,0,0.3);
	}
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		props: {
			
		},
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				list: [],
			};
		},
		onLoad: function() {
			self = this;
		},
		methods: {
			delMsg() {
				const self = this;
				setTimeout(() => {
					self.list.splice(0,1);
				},4000);
			},
			onMessage() {
				const self = this;
				uni.$on('onMessage',(res) => {
					let pages = getCurrentPages(); // 当前页面
					let beforePage = pages[pages.length - 1]; // 前一个页面 
					let info = JSON.parse(res.content);
					if(res.type == 5) {
						self.list.push(info);
						self.delMsg();
					}
				})
			},
			init() {
				this.onMessage();
			},
		},
		computed: {
			i18n() {
				return this.$t('chat')
			},
		},
		created() {
			this.init();
		},
		mounted() {},
		destroyed() {},
		components: {},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
