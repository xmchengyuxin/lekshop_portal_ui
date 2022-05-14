<template>
	<view class="contain safe-area">
		<view class="padding-lr12">
			<view class="flex f-a-c padding-tb12">
				<text class="f15-size t-color-3">上传图片</text>
			</view>
			<view class="flex f-w">
				<view class="flex f-a-c f-c f-j-c f-s-0 margin-r10 margin-b10 w-80 h-80 padding-6 b-radius-5 bg-color-e">
					<text class="flex f-a-c f-j-c van-icon t-color-9 van-icon-plus"></text>
					<text class="f12-size margin-t6 t-color-9">添加图片</text>
				</view>
			</view>
			<view class="flex f-a-c padding-tb12">
				<text class="flex f-a-c f-j-c van-icon van-icon-editor t-color-0 f18-size margin-r4"></text>
				<text class="f15-size t-color-3">种草内容</text>
			</view>
			<textarea class="bg-color-e h-140 w100 b-radius-5 f12-size padding-10" value="" placeholder="种草文案~" />
			<view @click="$refs.goodslist.open()" class="flex f-a-c f-j-s padding-tb12">
				<view class="flex f-a-c">
					<text class="flex f-a-c f-j-c van-icon van-icon-thumb-circle-o t-color-0 f18-size margin-r4"></text>
					<text class="f15-size t-color-3">选择商品</text>
				</view>
				<text class="flex f-a-c van-icon van-icon-arrow t-color-9"></text>
			</view>
			<view class="flex f-w">
				<view class="flex f-a-c f-c f-j-c f-s-0 margin-r10 margin-b10 w-80 h-80 padding-6 b-radius-5 bg-color-e">
					<text class="flex f-a-c f-j-c van-icon t-color-9 van-icon-plus"></text>
					<text class="f12-size margin-t6 t-color-9">添加商品</text>
				</view>
			</view>
		</view>
		<view class="padding-30"></view>
		<view class="fixed-top padding-12" :style="{'padding-bottom':isIphonex ? '34px' : ''}">
			<view class="flex f-a-c f-j-c b-radius-5 h-44 bg-color-linear-r t-color-w">
				<text class="flex f-a-c f-j-c van-icon van-icon-fabu t-color-w margin-r4 f18-size"></text>
				发布种草
			</view>
		</view>
		
		<uni-popup ref="goodslist" type="bottom">
			<view class="bg-color-f7 padding-12 wrap-goods">
				<view class="flex f-a-c f-j-s">
					<view class="flex f-s-0 w-20"></view>
					<view class="flex f-j-c">选择商品</view>
					<text @click="$refs.goodslist.close()" class="flex f-a-c f-j-c van-icon van-icon-cross"></text>
				</view>
				<scroll-view scroll-y="true" style="height: 60vh;">
					<view class="h100 flex f-c f-a-c f-j-c">
						<no-data></no-data>
					</view>
				</scroll-view>
				<view class="flex f-a-c f-j-c b-radius-5 h-36 bg-color-linear-r t-color-w">完成</view>
				<view class="" :style="{'padding-bottom':isIphonex ? '34px' : ''}"></view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
.fixed-top {
	top: auto;
	bottom: 0;
}
.wrap-goods {
	border-radius: 10px 10px 0 0;
}
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
			};
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
