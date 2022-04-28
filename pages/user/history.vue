<template>
	<view class="contain ">
		<view class="padding-12">
			<view class="f-w-b f11-size">4月29日</view>
			<view class="flex f-w">
				<view v-for="(item,index) in 5" class="flex f-c f-s-0 his-item margin-t12">
					<view class="bg-img bg-color item-img b-radius-5"></view>
					<view class="flex text-price f-w-b padding-lr10 f12-size t-color-y margin-t8">11</view>
				</view>
			</view>
		</view>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
.his-item {
	width: 32%;
}
.item-img {
	padding: 50%;
}
.his-item:nth-child(3n+2) {
	margin: 0 2%;
}
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
