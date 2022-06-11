<template>
	<view v-if="list.length <= 0" class="flex f-a-c f-j-c f-c padding-30" style="padding-top: 20vh!important;">
		<image style="width: 160px;" src="../../static/images/no_data.png" mode="widthFix"></image>
		<view class="padding-10" v-if="text == 'cart'">
			<view class=" flex f-a-c f-j-c t-color-9 f12-size">{{i18n['购物车竟然是空的']}}</view>
			<view class=" flex f-a-c f-j-c t-color-9 f12-size margin-t2">{{i18n['再忙也要买点东西犒劳自己哦']}}</view>
		</view>
		<view v-else class="padding-10 flex f-a-c f-j-c t-color-9 f12-size">{{i18n[text]}}</view>
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
			},
			list: {
				type: Array,
				default:()=>[]
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
