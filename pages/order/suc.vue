<template>
	<view class="contain">
		<view class="padding-30"></view>
		<view class="flex f-a-c f-j-c shops-icon shops-icon-success" style="font-size: 100px;"></view>
		<view class="flex f-j-c margin-t12 f16-size">{{i18n['支付成功']}}</view>
		<view class="padding-30">
			<view @click="go('/pages/user/index',3)" class="flex f-a-c f-j-c h-40 t-color-w bg-color-linear-y margin-t12 b-radius-5">{{i18n['用户中心']}}</view>
			<view @click="go('/pages/index/index',3)" class="flex f-a-c f-j-c h-40 t-color-9 b-color-b b-color-9  margin-t12 b-radius-5">{{i18n['返回首页']}}</view>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/iconcolor.css');
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
			$.setTitle(self.i18n['支付成功']);
		},
		methods: {
			init() {},
		},
		computed: {
			i18n() {
				return this.$t('suc')
			},
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
