<template>
	<view class="">
		<uni-popup ref="issuebtn" type="bottom">
			<view class="padding-6">
				<view class="b-radius-5 bg-color-w ">
					<view @click="go('/pages/find/issue?type=3')" class="flex f-a-c f-j-c h-44 b-radius-5 f18-size b-bottom">{{i18n['发布种草']}}</view>
					<view @click="go('/pages/find/issue?type=1')" class="flex f-a-c f-j-c h-44 b-radius-5 f18-size">{{i18n['发布短视频']}}</view>
				</view>
				<view @click="close()" class="flex f-a-c f-j-c h-44 b-radius-5 bg-color-w f18-size margin-t6">{{i18n['取消']}}</view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
</style>
<script>
	const $ = require('../../../utils/api.js');
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
			go(url) {
				this.close();
				$.go(url);
			},
			open() {
				this.$refs.issuebtn.open();
			},
			close() {
				this.$refs.issuebtn.close();
			},
			init() {},
		},
		computed: {
			i18n() {
				return this.$t('find')
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
