<template>
	<view class="contain ">
		<view style="padding: 1px 12px 12px 12px;">
		<view class="bg-color-w b-radius-5 padding-10 flex">
			<view class="flex f-s-0 w-50 h-50 b-radius bg-color margin-r12"></view>
			<view class="flex flex-1 f-c f-j-c">
				<view class="flex">前海万联旗舰店</view>
				<view class="flex f-a-c margin-t2">
					<text class="flex t-color-9 f11-size margin-r2">前往创作中心</text>
					<text class="flex f-a-c van-icon van-icon-arrow t-color-9 f11-size"></text>
				</view>
			</view>
			<view class="flex f-a-c f-j-c f-s-0">
				<!-- <image class="w-30" src="../../static/images/like-on.png" mode="widthFix"></image> -->
				<image class="w-36" src="../../static/images/like.png" mode="widthFix"></image>
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
