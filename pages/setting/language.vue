<template>
	<view class="contain">
		<view class="padding-lr12">
			<view @click="choose(item.value)" v-for="(item,index) in list" class="flex f-a-c f-j-s h-50 b-bottom">
				<text class="f12-size f-w-500">{{item.name}}</text>
				<text v-if="item.value == lang" class="flex f-a-c f-j-c van-icon van-icon-success t-color-g f18-size"></text>
			</view>
		</view>

	</view>
</template>
<style scoped>
@import url('../../static/css/page/white.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				list: [
					{name: '简体中文',value:'zh_CN'},
					{name: '繁体中文',value:'zh_TW'},
					{name: 'English',value:'en_US'},
				],
				lang: 'zh_CN',
			};
		},
		onLoad: function() {
			self = this;
			this.init();
			$.setTitle(self.i18n['设置语言']);
		},
		methods: {
			init() {
				let lang = uni.getStorageSync('locale_key') ? uni.getStorageSync('locale_key') :'';
				this.lang = lang;
			},
			choose(value) {
				this.lang = value;
				this.changeLang(value);
			},
		},
		computed: {
			i18n() {
				return this.$t('set')
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
