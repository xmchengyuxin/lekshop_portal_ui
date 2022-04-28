<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="flex f-s-0" style="width: 180upx;"></view>
		<!-- #endif -->
	</view>
</template>
<style scoped>
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		props: [],
		data() {
			return {};
		},
		onLoad: function() {
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
