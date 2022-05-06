<template>
	<view class="contain">
		<view class="bg-color-w padding-lr12 ">
			<view @click="go('/pages/passport/password')" class="bg-color-w  flex f-j-s f-a-c h-50 b-bottom">
				<text class="f15-size">修改登录密码</text>
				<view class="flex f-a-c">
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
				</view>
			</view>
			<view @click="go('/pages/passport/pay')" class="bg-color-w  flex f-j-s f-a-c h-50 ">
				<text class="f15-size">修改支付密码</text>
				<view class="flex f-a-c">
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
				</view>
			</view>
		</view>
		<view  @click="go('/pages/setting/about')" class="bg-color-w padding-lr12 flex f-j-s f-a-c h-50 margin-t12">
			<text class="f15-size">注销账户</text>
			<view class="flex f-a-c">
				<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
			</view>
		</view>
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
