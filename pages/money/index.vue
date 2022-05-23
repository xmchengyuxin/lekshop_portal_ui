<template>
	<view class="contain">
		<view class="padding-10"></view>
		<view class="padding-lr15">
			<view class="flex f-a-c f-j-c f-c b-radius-8 bg-color-linear-g padding-20">
				<view class="f-w-500 t-color-w">余额</view>
				<view class="f-w-b f24-size margin-t10 t-color-w">0</view>
				<view @click="go('/pages/user/tixian?type=1')" class="f-w-500 f13-size margin-t12 t-color-w flex f-a-c f-j-c b-radius-30 h-36 w-100 " style="border: 1px solid #fff;">提现</view>
			</view>
			<view class="bg-color-w b-radius-8 bg-shadow-0 margin-t12 over-h">
				<view @click="go('/pages/money/recharge')" class=" flex f-a-c f-j-s  h-50  padding-lr12 ">
					<text class="f13-size f-w-b">充值</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-b"></text>
				</view>
				<view @click="go('/pages/money/zijinlog')" class=" flex f-a-c f-j-s  h-50  padding-lr12 ">
					<text class="f13-size f-w-b">资金明细</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-b"></text>
				</view>
				<view @click="go('/pages/user/zijinlist')" class="bg-color-w flex f-a-c f-j-s h-50 padding-lr12 ">
					<text class="f13-size f-w-b">提现明细</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-b"></text>
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
