<template>
	<view class="flex f-a-c f-j-c f-c padding-30" style="padding-top: 20vh!important;">
		<image style="width: 160px;" src="../../static/images/no_data.png" mode="widthFix"></image>
		<view v-if="text && text != ''" class="padding-10 flex f-a-c f-j-c t-color-9 f12-size">{{i18n[text]}}</view>
	</view>
</template>
<style scoped>
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		props: {
			text: {
				default: '暂无数据',
			}
		},
		data() {
			return {};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
			init() {},
		},
		computed: {
			i18n() {
				return this.$t('nodata')
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
