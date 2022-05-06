<template>
	<view class="contain">
		<view class="bg-color-w padding-lr12 ">
			<view @click="go('/pages/setting/edit')" class="bg-color-w padding-tb12 flex f-j-s f-a-c b-bottom">
				<view class="flex f-s-0 w-50 h-50 b-radius bg-color margin-r12"></view>
				<view class="flex flex-1 f-c">
					<view class="f16-size">198****2511</view>
					<view class="margin-t2">用户名：19859222511</view>
				</view>
				<view class="flex f-s-0">
					<text class="flex f-a-c f-j-c van-icon van-icon-edit t-color-9 f16-size margin-r4"></text>
					<text class="f12-size margin-r4">编辑</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
				</view>
			</view>
			<view @click="go('/pages/user/address')" class="bg-color-w  flex f-j-s f-a-c h-50">
				<text class="f15-size">我的收货地址</text>
				<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
			</view>
		</view>
		<view @click="go('/pages/setting/safe')" class="bg-color-w padding-lr12 flex f-j-s f-a-c h-50 margin-t12">
			<text class="f15-size">账号与安全</text>
			<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
		</view>
		<view class="bg-color-w padding-lr12 margin-t12">
			<view class="bg-color-w  flex f-j-s f-a-c h-50 b-bottom">
				<text class="f15-size">清除缓存</text>
				<view class="flex f-a-c">
					<text class="f11-size t-color-9 margin-r4">0k</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
				</view>
			</view>
			<view  @click="go('/pages/setting/about')" class="bg-color-w  flex f-j-s f-a-c h-50 ">
				<text class="f15-size">关于</text>
				<view class="flex f-a-c">
					<text class="f11-size t-color-9 margin-r4">1.0.0</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
				</view>
			</view>
		</view>
		<view class="flex f-a-c f-j-c h-50 margin-t12 bg-color-w f-w-500">退出登录</view>
		
	</view>
</template>
<style scoped>
@import url('../../static/css/index/index.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			init() {},
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
