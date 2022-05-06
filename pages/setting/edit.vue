<template>
	<view class="contain">
		<view class="contain-page top-0">
			<view class="padding-15 flex f-a-c f-j-s b-bottom">
				<view class="f-w-b">头像</view>
				<view @click="chooseImg1" class="w-60 h-60 b-radius bg-img" :style="headImg | bgimg(300)+''"></view>
			</view>
			<view class="padding-15 flex f-j-s b-bottom">
				<view class="f-w-b">手机号</view>
				<view class="flex flex-1">
					<input v-model="phone" type="number" disabled="true" class="w100 h100 f-w-500 right" value="" placeholder="请输入" />
				</view>
			</view>
			<view class="padding-15 flex f-j-s b-bottom">
				<view class="f-w-b">昵称</view>
				<view class="flex flex-1">
					<input v-model="name" maxlength="4" type="text" class="w100 h100 f-w-500 right" value="" placeholder="请输入" />
				</view>
			</view>
			<view class="padding-15 flex f-j-s b-bottom">
				<view class="f-w-b">年龄</view>
				<view class="flex flex-1">
					<input v-model="age" type="number" class="w100 h100 f-w-500 right" value="" placeholder="请输入" />
				</view>
			</view>
			
			<view class="padding-15 flex f-j-s b-bottom">
				<view class="f-w-b">性别</view>
				<view class="flex flex-1 f-j-e">
					<view @click="sex='1'" class="flex f-a-c f-j-c margin-r20">
						<text class="flex f-a-c f-j-c van-icon  margin-r8 f18-size" :class="sex == '1' ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-b'"></text>
						<text class="t-color-b f-w-500">男</text>
					</view>
					<view @click="sex='2'" class="flex f-a-c f-j-c">
						<text class="flex f-a-c f-j-c van-icon  margin-r8  f18-size" :class="sex == '2' ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-b'"></text>
						<text class="t-color-b f-w-500">女</text>
					</view>
				</view>
			</view>
			<view class="padding-15 ">
				<view class="f-w-b">个性签名</view>
				<view class="flex flex-1 h-40">
					<input v-model="sign" type="text" class="w100 h100 f-w-500" value="" placeholder="请输入" />
				</view>
			</view>
			<view class="padding-10"></view>
			<view class="padding-30"></view>
		</view>
		<view class="warp-tabbar flex f-a-c padding-lr12" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			<view @click="submit" class="flex flex-1 f-a-c f-j-c b-radius-30 bg-color-linear-y t-color-w h-36">保存</view>
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
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				height: 0,
				target: '',
				photos: [],
				targets: [],
				sign: '',
				sex: '',
				headImg: '',
				age: '',
				name: '',
				phone: ''
			};
		},
		onLoad: function() {
			let height = getApp().globalData.height;
			height = height-44-this.top-15;
			this.height = height;
			this.init();
		},
		methods: {
			delPhotos(index) {
				this.photos.splice(index,1);
			},
			delTarget(index) {
				this.targets.splice(index,1);
			},
			addTarget() {
				if(this.target == '') {
					$.$toast('请输入标签内容');return;
				}
				this.targets.push(this.target);
				this.target = '';
			},
			submit() {
				const self = this;
				$.ajax({
					url: 'member/updateInfo',
					data: {
						personSign: self.sign,
						gender: self.sex,
						photos: self.photos.length > 0 ? self.photos.join('|') : '',
						targets: self.targets.length > 0 ? self.targets.join(',') : '',
						nickname: self.name,
						age: self.age,
					},
					method: 'POST',
					success(res) {
						$.$toast('编辑成功');
						$.back(1,2000);
					}
				})
			},
			chooseImg() {
				const self = this;
				$.uploadimg({
					success(res) {
						self.photos.push(res.imgUrl);
					}
				})
			},
			chooseImg1() {
				const self = this;
				$.uploadimg({
					url: 'member/updateHeadImg',
					success(res) {
						self.headImg = res;
					}
				})
			},
			getUser() {
				const self = this;
				$.ajax({
					url: 'member/getUser',
					data: {},
					method: 'GET',
					success(res) {
						let info = res.data ? res.data : '';
						self.user = info;
						self.name = info.nickname ? info.nickname : '';
						self.headImg = info.headImg ? info.headImg : '';
						self.photos = info.photos ? info.photos.split('|') : [];
						self.targets = info.targets ? info.targets.split(',') : [];
						self.sex = info.gender ? info.gender : '';
						self.age = info.age ? info.age : '';
						self.sign = info.personSign ? info.personSign : '';
						self.phone = info.phone? info.phone : '';
					}
				})
			},
			init() {
				this.getUser();
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
