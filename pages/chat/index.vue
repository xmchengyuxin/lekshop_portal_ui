<template>
	<view class="contain">
		<view class="flex fixed-top h-44 bg-color-f7"  :style="{'padding-top': top + 'px'}">
			<view @click="back(1)" v-if="type != ''" class="flex f-s-0 padding-lr10 f-a-c f-j-c van-icon van-icon-arrow-left f20-size"></view>
			<view v-else class="flex f-s-0 padding-lr10 f-a-c f-j-c van-icon  f20-size"></view>
			<view class="flex flex-1 f-a-c f-j-c f16-size">
			{{i18n['消息']}}
			<text v-if="len > 0" class="f10-size t-color-9 margin-l6">(21)</text>
			</view>
			<view  class="flex f-s-0 f-a-c padding-lr10 van-icon van-icon-delete-o" ></view>
			<xcx-header></xcx-header>
		</view>
		<view :style="{'padding-top': top+44+'px'}"></view>
		<view class="bg-color-w">
			<view class="flex ">
				<view class="padding-lr12 flex f-a-c f-s-0">
					<view class="w-36 h-36 flex f-a-c f-j-c b-radius bg-color-b van-icon van-icon-logistics t-color-w f20-size"></view>
				</view>
				<view class="flex f-c flex-1 b-bottom " style="padding: 10px 12px 10px 0;">
					<view class="flex f-a-c f-j-s">
						<text class="f12-size f-w-500 t-color-y">交易物流</text>
						<text class="f10-size t-color-9">12.12</text>
					</view>
					<view class="flex f-a-c f-j-s margin-t6">
						<view class="flex flex-1">
							<text class="line1 f11-size t-color-6">122121212121</text>
						</view>
						<text class="f10-size t-color-w bg-color-r b-radius padding-lr2 h-16" style="min-width: 16px;">11</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				len: 1,
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			init() {},
		},
		computed: {
			i18n() {
				return this.$t('chat')
			},
		},
		created() {
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
