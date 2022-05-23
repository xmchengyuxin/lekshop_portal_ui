<template>
	<view class="contain">
		<block v-if="show">
		<view class="wrap-header fixed-top bg-color-f7 flex h-46 animate fadeIn" style="position: fixed;" :style="{'padding-top': top + 'px'}">
			<view @click="back(1)" class="padding-lr10 flex f-a-c f-j-c">
				<text class="van-icon van-icon-arrow-left t-color-0 f20-size"></text>
			</view>
			<view class="flex flex-1 f-j-c f-a-c">
				<view class="flex f-s-0 w-30 h-30 b-radius bg-img  margin-r8" :style="info.headImg | bgimg(300)+''"></view>
				<view class="flex f-c">
					<text class="f12-size t-color-w f-w-500">{{info.nickname}}</text>
					<view class="flex f-a-c">
						<text class="t-color-w f10-size">他/她未留下任何个性签名</text>
					</view>
				</view>
			</view>
			<xcx-header></xcx-header>
		</view>
		<view   :style="{'padding-top': top+44+'px'}"></view>
		</block>
		<view class="wrap-header-page1" >
			<view class="header-user-img bg-img" :style="info.headImg | bgimg(700)+''"></view>
			<view   :style="{'padding-top': top+'px'}"></view>
			<view class="flex f-j-s h-44" style="position: relative;z-index: 1;">
				<view @click="back(1)" class="padding-lr10 flex f-a-c f-j-c">
					<text class="van-icon van-icon-arrow-left t-color-w f20-size"></text>
				</view>
				<view class="flex flex-1"></view>
				<view @click="$refs.poster.open()" class="flex f-a-c f-j-c f18-size van-icon van-icon-share-o t-color-w padding-lr10"></view>
				<view @click="$refs.shareinfo.open()" class="flex f-a-c f-j-c f18-size van-icon van-icon-weapp-nav t-color-w padding-lr10"></view>
				<xcx-header></xcx-header>
			</view>
			<view class="padding-tb6"></view>
			<view class="padding-15" style="position: relative;z-index: 1;">
				<view class="padding-10 flex" style="position: relative;">
					<view class="flex f-s-0 w-80 h-80 b-radius bg-img user-img margin-r16">
						<view class="w100 h100 b-radius bg-img" :style="info.headImg | bgimg(300)+''"></view>
					</view>
					<view class="flex f-c f-j-c">
						<view class="flex f-a-c">
							<view class="f16-size t-color-w f-w-b margin-r12">{{info.nickname}}</view>
							<view v-if="!isShow" @click="go('/pages/work/shopinfo')" class="flex f-a-c">
								<text class="t-color-9 f12-size margin-r2">商家信息</text>
								<text class="flex f-a-c f-j-c f12-size van-icon van-icon-arrow t-color-9"></text>
							</view>
						</view>
						<view class="flex f-a-c margin-t6">
							<text class="f12-size t-color-w line2">他/她未留下任何个性签名</text>
						</view>
						<view class="flex f-w margin-t2">
						</view>
					</view>
					<view @click="like" class="wrap-like flex h-34 w-80 f-a-c">
						<!-- <image class="w-30" src="../../static/images/like-on.png" mode="widthFix"></image> -->
						<image class="w-36" src="../../static/images/like.png" mode="widthFix"></image>
						<text class="f10-size t-color-w f-w-500">关注</text>
					</view>
				</view>
			</view>
			<view style="position: relative;z-index: 1;" class="wrap-total flex">
				<view class="flex flex-1 f-c f-a-c f-j-c">
					<text class="f12-size f-w-500 t-color-w">关注人数</text>
					<text class="f12-size f-w-500 t-color-w margin-t6">{{info.focusNum}}人</text>
				</view>
				<view class="flex flex-1 f-c f-a-c f-j-c">
					<text class="f12-size f-w-500 t-color-w">粉丝数量</text>
					<text class="f12-size f-w-500 t-color-w margin-t6">0</text>
				</view>
				<view @click="go('/pages/work/pingjialist?id='+info.id)" class="flex flex-1 f-c f-a-c f-j-c">
					<text class="f12-size f-w-500 t-color-w">获赞数量</text>
					<text class="f12-size f-w-500 t-color-w margin-t6" >0</text>
				</view>
			</view>
		</view>
		<view class="wrap-photos">
			<view class="padding-10"></view>
		</view>
		<view class="contain-page " style="top: -30px;">
			<view class="flex f-j-c"><view class="line-bg"></view></view>
			<view class="flex f-a-c f-j-c margin-t6" style="padding-bottom: 12px;">
				<view @click="scrollGo('goods')" :class="scrollTo == 'goods' ? 'nav-on' :'f13-size f-w-b'" class="flex f-a-c "><text class="f13-size f-w-b ">作品</text></view>
				<view class="padding-lr20"></view>
				<view @click="scrollGo('order-tip')" :class="scrollTo == 'order-tip' ? 'nav-on' :'f13-size f-w-b'"  class="flex f-a-c "><text class="f13-size f-w-b ">喜欢</text></view>
			</view>	
		</view>
		<menu-btn ref="shareinfo"></menu-btn>
		<poster ref="poster"></poster>
	</view>
</template>
<style scoped>
@import url('../../static/css/find/user.css');

</style>
<script>
	const API = require('../../utils/api/find.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				scrollTo: 'goods',
				show: false,
				info: '',
				id: '',
				isLike: false,
				tjList: [],
				list: [],
				photos: [],
				km: '',
				rules: '',
				isShow: true,
			};
		},
		onLoad: function(options) {
			self = this;
			this.id = options.id ? options.id : '';
			this.init();
		},
		methods: { 
			preImg(img) {
				const self = this;
				uni.previewImage({
					current: img,
					urls: self.photos,
				})
			},
			like() {
				const self = this;
				$.ajax({
					url: 'member/focus/focusOrCancel',
					data: {techUserId: self.id},
					method: 'POST',
					success(res) {
						$.$toast('操作成功');
						self.isLike = !self.isLike;
					}
				})
			},
			getInfo() {
				const self = this;
				$.ajax({
					url: API.userDetailApi,
					data: {walkMemberId: self.id},
					method: 'GET',
					success(res) {
						self.info = res.data.techUser ? res.data.techUser : '';
						self.isLike = res.data.isCollect ? res.data.isCollect : false;
						self.tjList = res.data.spreadUserList ? res.data.spreadUserList : [];
						self.list = res.data.projectList ? res.data.projectList : [];
						self.photos = self.info.photos &&  self.info.photos != '' ? self.info.photos.split('|') : [];
					}
				})
			},
			init() {
				this.getInfo();
			},


		},
		created() {
		},
		mounted() {},
		destroyed() {},
		components: {},
		onPullDownRefresh() {
		},
		onPageScroll(e) {
			const self = this;
			let top = e.scrollTop;
			if(top >= 260) {
				self.show = true;
			}else{
				self.show = false;
			}
		},
		onReachBottom() {
		}
	}
</script>
