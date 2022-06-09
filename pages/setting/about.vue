<template>
	<view class="contain">
				<view class="padding-lr15">
					<view class="padding-10"></view>
					<view class="flex f-c f-a-c f-j-c">
						<view class="w-70 h-70 b-radius-5 bg-img " :style="config.logo | bgimg('300')+''"></view>
						<view class="f-w-b margin-t16">{{config.web_name}}</view>
						<view class=" margin-t6">{{i18n['当前版本']}}{{verson}}</view>
					</view>
					<view class="padding-15"></view>
					<view @click="go('/pages/user/rules?type=2')" class="flex f-a-c f-j-s b-bottom h-50">
						<text class="f-w-b">{{i18n['隐私协议']}}</text>
						<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-b"></text>
					</view>
					<view @click="go('/pages/user/rules?type=1')" class="flex f-a-c f-j-s b-bottom h-50">
						<text class="f-w-b">{{i18n['平台申明']}}</text>
						<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-b"></text>
					</view>
					<view class="flex f-a-c f-j-s b-bottom h-50">
						<text class="f-w-b">{{i18n['系统通知']}}</text>
						<view class="flex f-a-c" style="position: relative;"><switch @change="switch2Change" class="switch" color="#2EB37E" :checked="notice" /></view>
					</view>
				</view>
				<view class="padding-10"></view>
	</view>
</template>
<style scoped>
@import url('../../static/css/page/white.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				config: '',
				verson: '',
				notice: true,
			};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
switch2Change: function(e) {
			this.notice = e.target.value;
			this.change();
		},
		change() {
			const self = this;
			$.ajax({
				url: 'member/updateInfo',
				data: {
					gender: self.notice ? 1 : 2,
				},
				method: 'POST',
				success(res) {
					$.$toast(self.i18n['操作成功']);
				}
			});
		},
			init() {
				this.verson = getApp().globalData.version;
				this.config = uni.getStorageSync('config') ? uni.getStorageSync('config') : '';
				let user = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
				this.notice = user != '' && user.gender == 1 ? true : false;
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
