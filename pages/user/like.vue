<template>
	<view class="contain">
		<view class="padding-lr12" style="padding-top: 1px;">
		<view  v-for="(item, index) of list" :key="index" class="b-radius-5 bg-color-w flex margin-t10">
			<view class="flex  f-s-0 w-100 h-100 bg-color b-radius-5"></view>
			<view class="flex flex-1 f-c f-j-s " style="padding: 10px 0 0px 10px;">
				<view class="flex flex-1 f-c">
					<view class="line2 margin-r10">
						<text class="f12-size t-color-6 line2">示代码撒马上爱刷撒</text>
					</view>
					<view class="flex  f-w margin-t4">
						<view class="text-price  f-w-b t-color-p">59.00</view>
					</view>
				</view>
				<view class="flex f-a-c f-j-s ">
					<view class="f11-size t-color-9">20人收藏</view>
					<view class="flex">
						<view style="padding: 6px 10px 10px 10px;" class="flex f-a-c  van-icon van-icon-delete-o"></view>
						<view  style="padding: 6px 10px 10px 10px;" class="flex f-a-c  van-icon van-icon-shop-o "></view>
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
			return {
				list: [ '']
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
