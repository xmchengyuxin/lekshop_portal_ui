<template>
	<view class="contain">
		<view class="padding-6"></view>
		<view class="padding-lr15">
			<view class="f15-size f-w-b">反馈内容</view>
			<view class="margin-t12 padding-12 b-color-e  b-radius-5">
				<textarea v-model="value" maxlength="200" value="" class="f12-size" placeholder="请输入您要反馈的内容" />
				<view class="flex f-a-c f-j-e">
					<text class="f12-size t-color-b margin-r2">总共可输入</text>
					<text class="f12-size t-color-y margin-r2">200</text>
					<text class="f12-size t-color-b margin-r2">个字</text>
				</view>
			</view>
			<view class="f15-size f-w-b margin-t20">上传截图、图片</view>
			<view class="flex f-w">
				<view @click="del(index)" :style="item | bgimg(400)+''" v-for="(item,index) in imgs"
					class="flex f-s-0 f-a-s f-j-e bg-img margin-r12 margin-t12 wrap-img w-100 h-100 b-radius-5 ">
					<text class="flex f-a-c f-j-c van-icon van-icon-close f20-size"></text>
				</view>
				<view @click="chooseImg" class="flex f-a-c f-j-c f-c margin-t12 wrap-img w-100 h-100 b-radius-5">
					<text class="flex f-a-c f-j-c van-icon van-icon-photo-o f24-size t-color-b"></text>
					<text class="t-color-b margin-t8">上传图片</text>
				</view>
			</view>

		</view>
		<view class="warp-tabbar flex f-a-c padding-lr12" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			<view @click="submit" class="flex flex-1 f-a-c f-j-c b-radius-30 bg-color-linear-y t-color-w h-36">提交意见
			</view>
		</view>
	</view>
</template>
<style scoped>
	@import url('../../static/css/page/white.css');
	.wrap-img {
		border: 1px dashed #BCBCBC;
	}

	textarea {
		height: 100px;
		width: 100%;
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
				value: '',
				imgs: [],
			};
		},
		onLoad: function() {
			let height = getApp().globalData.height;
			height = height - 44 - this.top - 15;
			this.height = height;
			this.init();
		},
		methods: {
			del(index) {
				this.imgs.splice(index, 1);
			},
			chooseImg(type) {
				const self = this;
				$.uploadimg({
					success(res) {
						self.imgs.push(res.imgUrl);
					}
				})
			},
			submit() {
				const self = this;
				if (self.value == '') {
					$.$toast('请输入反馈内容');
					return;
				}
				$.ajax({
					url: 'member/feedback/save',
					data: {
						content: self.value,
						imgs: self.imgs.join('|')
					},
					method: 'POST',
					success(res) {
						$.$toast('操作成功');
						self.back(1, 2000);
					}
				})
			},
			init() {},


		},
		created() {},
		mounted() {},
		destroyed() {},
		components: {},
		onPullDownRefresh() {},
		onReachBottom() {}
	}
</script>
