<template>
	<view class="">
		<view v-if="list.length > 0" class="padding-12">
			<view class="flex bg-color-w b-radius-5 h-100 wrap-coupon">
				<view class="w-110 flex f-s-0 f-c f-a-c f-j-c coupon-left"> 
					<text class="text-price f20-size t-color-y f-w-b">1000</text>
					<view class="flex f-a-c f-j-c b-radius-2 bg-color-f3 h-20 padding-lr6 f11-size margin-t4">满1001减1000</view>
				</view>
				<view class="padding-10 flex flex-1 f-c f-j-s">
					<view class="flex f-c">
						<view class="flex f-a-c f-j-s">
							<view class="flex f-a-c">
								<text class="flex f-a-c f-j-c van-icon van-icon-shop-o t-color-9 margin-r4"></text>
								<text>巴拉巴拉</text>
							</view>
							<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f15-size"></text>
						</view>
					</view>
					<view class="flex">
						<view class="flex flex-1 f-c f-j-e">
							<view class="coupon-dot flex f-a-c margin-t4 f12-size t-color-9">未使用前 永久 有效</view>
						</view>
						<view @click="go1" class="flex f-s-0 f-a-c f-j-c h-30 b-radius-30 f12-size t-color-w bg-color-linear-y w-70">立即领取</view>
					</view>
				</view>
			</view>
		</view>
		<no-data v-if="list.length <= 0"></no-data>
	</view>
</template>
<style scoped>
@import url('../../static/css/coupon/common.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		props: {
			list: {
				type: Array,
				default: [],
			}
		},
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
			self = this;
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
