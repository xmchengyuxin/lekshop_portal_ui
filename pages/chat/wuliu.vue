<template>
	<view class="contain">
		<view class="padding-12">
			<view class="padding-lr10 bg-color-w b-radius-5 margin-b12">
				<view class="padding-tb10 flex b-bottom">
					<view class="flex f-s-0 w-20 h-20 b-radius bg-img bg-color margin-r10"></view>
					<view class="flex flex-1 f-a-c f11-size t-color-6">12121221</view>
					<text class="flex f-s-0 f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
				</view>
				<view class="padding-tb12">
					<view class="flex f-a-c f-j-s">
						<text class="f15-size f-w-b">121221</text>
						<text class="f11-size t-color-9">12/11</text>
					</view>
					<view class="flex bg-color-f7 margin-t12">
						<view class="flex f-s-0 w-70 h-70 margin-r8 bg-img bg-color"></view>
						<view class="flex flex-1 f-c f-j-c">
							<text class="f11-size t-color-9 line1">dsadsadsadsa</text>
							<text class="f11-size t-color-9 line1 margin-t12">点击查看详情>></text>
						</view>
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
