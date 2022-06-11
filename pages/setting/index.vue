<template>
	<view class="contain">
		<view class="bg-color-w padding-lr12 ">
			<view @click="go('/pages/setting/edit')" class="bg-color-w padding-tb12 flex f-j-s f-a-c b-bottom">
				<view class="flex f-s-0 w-50 h-50 b-radius bg-img margin-r12" :style="user.headImg | bgimg(300)+''"></view>
				<view class="flex flex-1 f-c">
					<view class="f16-size">{{user.nickname}}</view>
					<view class="margin-t2">{{i18n['用户名']}}：{{user.code | hideCenterText}}</view>
				</view>
				<view class="flex f-s-0">
					<text class="flex f-a-c f-j-c van-icon van-icon-edit t-color-9 f16-size margin-r4"></text>
					<text class="f12-size margin-r4">{{i18n['编辑']}}</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
				</view>
			</view>
			<view @click="go('/pages/user/address')" class="bg-color-w  flex f-j-s f-a-c h-50">
				<text class="f15-size">{{i18n['我的收货地址']}}</text>
				<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
			</view>
		</view>
		<view class="bg-color-w padding-lr12 margin-t12 margin-t12">
			<view @click="go('/pages/setting/safe')" class="  flex f-j-s f-a-c h-50 b-bottom">
				<text class="f15-size">{{i18n['账号与安全']}}</text>
				<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
			</view>
			<view @click="go('/pages/setting/language')" class="  flex f-j-s f-a-c h-50 ">
				<text class="f15-size">{{i18n['设置语言']}}</text>
				<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
			</view>
		</view>
		<view class="bg-color-w padding-lr12 margin-t12">
			<view class="bg-color-w  flex f-j-s f-a-c h-50 b-bottom">
				<text class="f15-size">{{i18n['清除缓存']}}</text>
				<view class="flex f-a-c">
					<text class="f11-size t-color-9 margin-r4">0k</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
				</view>
			</view>
			<view  @click="go('/pages/setting/about')" class="bg-color-w  flex f-j-s f-a-c h-50 ">
				<text class="f15-size">{{i18n['关于']}}</text>
				<view class="flex f-a-c">
					<text class="f11-size t-color-9 margin-r4">1.0.0</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
				</view>
			</view>
		</view>
		<view @click="loginOut" class="flex f-a-c f-j-c h-50 margin-t12 bg-color-w f-w-500">{{i18n['退出登录']}}</view>
		
	</view>
</template>
<style scoped>
@import url('../../static/css/index/index.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				user: '',
			};
		},
		onLoad: function() {
			self = this;
		},
		onShow() {
			this.init();
		},
		methods: {
			getUserInfo() {
				self.getUser({
					success(res) {
						self.user = res;
					}
				})
			},
			init() {
				this.getUserInfo();
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
