<template>
	<view class="flex f-a-c f-j-c f-c padding-30">
		<image style="width: 160px;" src="../../static/images/no_data.png" mode="widthFix"></image>
		<view v-if="text && text != ''" class="padding-10 flex f-a-c f-j-c t-color-9 f12-size">{{text}}</view>
	</view>
</template>
<style scoped>
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		props: ['text'],
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
