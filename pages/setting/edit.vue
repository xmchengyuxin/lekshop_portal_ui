<template>
	<view class="contain">
		<view class="contain-page top-0">
			<view class="padding-15 flex f-a-c f-j-s b-bottom">
				<view class=" f15-size">{{i18n['头像']}}</view>
				<view @click="updateImg" class="w-60 h-60 b-radius bg-img" :style="headImg | bgimg(300)+''"></view>
			</view>
			<!-- <view class="padding-15 flex f-j-s b-bottom">
				<view class=" f15-size">{{i18n['手机号']}}</view>
				<view class="flex flex-1">
					<input v-model="phone" type="number" disabled="true" class="w100 h100  right f15-size" value="" :placeholder="i18n['请输入']" />
				</view>
			</view> -->
			<view class="padding-15 flex f-j-s b-bottom">
				<view class=" f15-size">{{i18n['昵称']}}</view>
				<view class="flex flex-1">
					<input v-model="name"  type="text" class="w100 h100  right f15-size" value="" :placeholder="i18n['请输入']" />
				</view>
			</view>
			<view class="padding-15 flex f-j-s b-bottom">
				<view class=" f15-size">{{i18n['性别']}}</view>
				<view class="flex flex-1 f-j-e">
					<view @click="sex='1'" class="flex f-a-c f-j-c margin-r20">
						<text class="flex f-a-c f-j-c van-icon  margin-r8 f18-size" :class="sex == '1' ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-b'"></text>
						<text class="t-color-b f15-size ">{{i18n['男']}}</text>
					</view>
					<view @click="sex='2'" class="flex f-a-c f-j-c">
						<text class="flex f-a-c f-j-c van-icon  margin-r8  f18-size" :class="sex == '2' ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-b'"></text>
						<text class="t-color-b  f15-size">{{i18n['女']}}</text>
					</view>
				</view>
			</view>
			<view class="padding-15 ">
				<view class=" f15-size">{{i18n['个性签名']}}</view>
				<view class="flex flex-1 h-40">
					<textarea auto-height="true" v-model="sign" type="text" class="w100 h-100 f15-size" value="" :placeholder="i18n['请输入']" />
				</view>
			</view>
			<view class="padding-10"></view>
			<view class="padding-30"></view>
		</view>
		<view class="warp-tabbar flex f-a-c padding-lr12" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			<view @click="submit" class="flex flex-1 f-a-c f-j-c f15-size b-radius-30 bg-color-linear-y t-color-w h-36">{{i18n['保存']}}</view>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/page/white.css');
.wrap-img {
	border: 1px dashed #BCBCBC;
	box-sizing: content-box;
}
input.right {
	text-align: right;
}
</style>
<script>
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				sign: '',
				sex: '',
				headImg: '',
				name: '',
				phone: ''
			};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
			submit() {
				const self = this;
				$.ajax({
					url: API.updateInfo,
					data: {
						personSign: self.sign,
						gender: self.sex,
						nickname: self.name,
						// age: self.age,
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['编辑成功']);
						$.back(1,2000);
						self.getUser({isAjax: true});//编辑后更新缓存
					}
				})
			},
			updateImg() {
				const self = this;
				$.uploadimg({
					url: API.updateHeadImgApi,
					success(res) {
						self.headImg = res.imgUrl;
						let user = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
						user.headImg = res.imgUrl;
						uni.setStorageSync('userInfo',user);
					}
				})
			},
			getUserInfo() {
				const self = this;
				self.getUser({
					success(res) {
						let info = res;
						self.user = info;
						self.name = info.nickname ? info.nickname : '';
						self.headImg = info.headImg ? info.headImg : '';
						self.sex = info.gender ? info.gender : '';
						self.sign = info.personSign ? info.personSign : '';
						self.phone = info.phone? info.phone : '';
					}
				})
			},
			init() {
				this.getUserInfo();
			},
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
