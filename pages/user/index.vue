<template>
	<view class="contain">
		<view class="wrap-header" :style="{ 'padding-top': top + 'px' }">
			<view class="flex f-j-e h-44 padding-lr5">
				<!-- <view class="flex f-a-c f-j-c van-icon van-icon-qr f20-size t-color-3 padding-lr5"><text
						class="f12-size">{{i18n['会员码']}}</text></view> -->
				<view @click="go('/pages/setting/index')" class="flex f-a-c f-j-c van-icon van-icon-setting-o f20-size padding-lr5"></view>
				<!-- <view @click="go('/pages/chat/index')" class="flex f-a-c f-j-c van-icon van-icon-chat-o f20-size padding-lr5"></view> -->
				<xcx-header></xcx-header>
			</view>
			<view class="padding-lr15 flex">
				<view v-if="user != ''" @click="updateImg" class="w-60 h-60 b-radius  bg-img margin-r12" :style="user.headImg | bgimg(300)+''"></view>
				<view v-else class="w-60 h-60 b-radius  bg-img margin-r12" :style="defaultImg | bgimg(300)+''"></view>
				<view class="flex f-c f-a-s">
					<view v-if="user == ''" @click="go('/pages/passport/login')" class="f22-size">{{i18n['登录']}} / {{i18n['注册']}}</view>
					<view v-if="user != ''"  class="f22-size">{{user.nickname}}</view>
					<view class="f10-size padding-lr6 b-radius-2 h-16 t-color-w bg-color-linear-r margin-t6">
						{{i18n['Hi，欢迎登录']}}</view>
				</view>
			</view>
			<view class="flex margin-t15">
				<view @click="go('/pages/user/like')" class="flex flex-1 f-c f-a-c f-j-c">
					<view class="flex f-a-c f-j-c van-icon van-icon-star-o f24-size margin-b4"></view>
					<text class="f12-size">{{i18n['收藏夹']}}</text>
				</view>
				<view @click="go('/pages/user/likeshops')" class="flex flex-1 f-c f-a-c f-j-c">
					<view class="flex f-a-c f-j-c van-icon van-icon-sign f24-size margin-b4"></view>
					<text class="f12-size">{{i18n['关注店铺']}}</text>
				</view>
				<view @click="go('/pages/user/history')" class="flex flex-1 f-c f-a-c f-j-c">
					<view class="flex f-a-c f-j-c van-icon van-icon-clock-o f24-size margin-b4"></view>
					<text class="f12-size">{{i18n['足迹']}}</text>
				</view>
				<view @click="go('/pages/money/index')" class="flex flex-1 f-c f-a-c f-j-c">
					<text class="f16-size f-w-b">{{account != '' ? account.amount : 0}}</text>
					<text class="f12-size margin-t6">{{i18n['余额']}}</text>
				</view>
			</view>
			<view class="padding-20"></view>
			<view class="wrap-coupon-btn flex b-radius-5 bg-color-w padding-10">
				<view @click="go('/pages/coupon/getlist')" class="flex flex-1 f-a-c f-j-s padding-lr2 wrap-coupon-btn-left margin-r10">
					<view class="flex f-c">
						<text class="f12-size f-w-b">{{i18n['红包卡券']}}</text>
						<view class="flex f-a-c">
							<text class="f10-size t-color-y margin-r4">{{i18n['领取优惠券']}}</text>
							<text class="flex f-a-c van-icon van-icon-arrow t-color-y f12-size"></text>
						</view>
					</view>
					<image src="../../static/images/user_coupon_icon.png" mode="widthFix" class="w-36 margin-r12">
					</image>
				</view>
				<view @click="go('/pages/money/role')" class="flex flex-1 f-a-c f-j-s padding-lr2">
					<view class="flex f-c">
						<text class="f12-size f-w-b">{{i18n['我的积分']}}</text>
						<view class="flex f-a-c">
							<text class="f10-size t-color-y margin-r4">{{i18n['查看积分明细']}}</text>
							<text class="flex f-a-c van-icon van-icon-arrow t-color-y f12-size"></text>
						</view>
					</view>
					<image src="../../static/images/user_vip_icon.png" mode="widthFix" class="w-36 margin-r12"></image>
				</view>
			</view>
		</view>
		<view class="padding-12"></view>
		<view class="padding-lr12">
			<view class="bg-color-w b-radius-5 margin-t12">
				<view class="padding-lr10">
					<view @click="go('/pages/order/order')" class="flex h-40  f-a-c f-j-s">
						<text class="f15-size">{{i18n['我的订单']}}</text>
						<view class="flex f-a-c">
							<text class="f12-size t-color-9 margin-r4">{{i18n['全部']}}</text>
							<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
						</view>
					</view>
				</view>	
				
				<view class=" flex  wrap-nav">
					<view @click="go('/pages/order/order?type=1')" class="flex flex-1 f-s-0 f-c f-a-c f-j-c p-r">
						<text class="flex f-a-c van-icon van-icon-pending-payment f24-size"></text>
						<text class="f12-size margin-t2">{{i18n['待支付']}}</text>
					</view>
					<view @click="go('/pages/order/order?type=2')" class="flex flex-1 f-s-0 f-c f-a-c f-j-c p-r">
						<text v-if="order != '' && order.waitDeliveryNum" class="order-num flex f-a-c f-j-c h-16 b-radius-30 bg-color-r t-color-w f10-size">{{order.waitDeliveryNum}}</text>
						<text class="flex f-a-c van-icon van-icon-send-gift-o f24-size"></text>
						<text class="f12-size margin-t2">{{i18n['待发货']}}</text>
					</view>
					<view @click="go('/pages/order/order?type=3')" class="flex flex-1 f-s-0 f-c f-a-c f-j-c p-r">
						<text v-if="order != '' && order.waitReceiveNum" class="order-num flex f-a-c f-j-c h-16 b-radius-30 bg-color-r t-color-w f10-size">{{order.waitReceiveNum}}</text>
						<text class="flex f-a-c van-icon van-icon-logistics f24-size"></text>
						<text class="f12-size margin-t2">{{i18n['待收货']}}</text>
					</view>
					<view @click="go('/pages/user/commentlist')" class="flex flex-1 f-s-0 f-c f-a-c f-j-c p-r">
						<text v-if="order != '' && order.waitCommentNum" class="order-num flex f-a-c f-j-c h-16 b-radius-30 bg-color-r t-color-w f10-size">{{order.waitCommentNum}}</text>
						<text class="flex f-a-c van-icon van-icon-comment-o f24-size"></text>
						<text class="f12-size margin-t2">{{i18n['待评价']}}</text>
					</view>
					<view @click="go('/pages/user/refundlist')" class="flex flex-1 f-s-0 f-c f-a-c f-j-c nav-last-item p-r">
						<text v-if="order != '' && order.refundNum" class="order-num flex f-a-c f-j-c h-16 b-radius-30 bg-color-r t-color-w f10-size">{{order.refundNum}}</text>
						<text class="flex f-a-c van-icon van-icon-tosend f24-size t-color-y"></text>
						<text class="f12-size margin-t2">{{i18n['退货/售后']}}</text>
					</view>
				</view>
			</view>
			<!-- <view class="bg-color-w b-radius-5  flex margin-t12 wrap-nav">
				<view @click="go('/pages/coupon/list')" class="flex flex-1 f-s-0 f-c f-a-c f-j-c">
					<text class="f16-size f-w-b">0</text>
					<text class="f12-size margin-t6">{{i18n['我的卡券']}}</text>
				</view>
				<view @click="go('/pages/money/index')" class="flex flex-1 f-s-0 f-c f-a-c f-j-c">
					<text class="f16-size f-w-b">{{account != '' ? account.amount : 0}}</text>
					<text class="f12-size margin-t6">{{i18n['余额']}}</text>
				</view>
				<view @click="go('/pages/user/bank')" class="flex flex-1 f-s-0 f-c f-a-c f-j-c">
					<text class="f16-size f-w-b">0</text>
					<text class="f12-size margin-t6">{{i18n['银行卡']}}</text>
				</view>
				<view class="flex flex-1 f-s-0 f-c f-a-c f-j-c">
					<text class="f16-size f-w-b">{{account != '' ? account.point : 0}}</text>
					<text class="f12-size margin-t6">{{i18n['积分']}}</text>
				</view>
				<view @click="go('/pages/money/zijinlog')" class="flex flex-1 f-s-0 f-c f-a-c f-j-c nav-last-item">
					<text class="flex f-a-c van-icon van-icon-bill-o f24-size t-color-y"></text>
					<text class="f12-size margin-t2">{{i18n['账单明细']}}</text>
				</view>
			</view> -->
			<view class="bg-color-w b-radius-5  flex f-w margin-t12" style="padding-top: 12px;">
				<view @click="go('/pages/money/index')" class="flex f-s-0 f-c btn-item">
					<view class="flex f-a-c f-j-c h-30">
						<text class="flex f-a-c f-j-c shops-icon shops-icon-qianbao f26-size"></text>
					</view>
					<view class="flex f-j-c f12-size t-color-6 margin-t2">{{i18n['钱包']}}</view>
				</view>
				<view @click="go('/pages/coupon/list')" class="flex f-s-0 f-c btn-item">
					<view class="flex f-a-c f-j-c h-30">
						<text class="flex f-a-c f-j-c shops-icon shops-icon-pintuan f24-size"></text>
					</view>
					<view class="flex f-j-c f12-size t-color-6 margin-t2">{{i18n['我的卡券']}}</view>
				</view>
				<view @click="go('/pages/user/commentlist')" class="flex f-s-0 f-c btn-item">
					<view class="flex f-a-c f-j-c h-30">
						<text class="flex f-a-c f-j-c shops-icon shops-icon-pinglun-08 f24-size"></text>
					</view>
					<view class="flex f-j-c f12-size t-color-6 margin-t2">{{i18n['评论']}}</view>
				</view>
				<view @click="go('/pages/user/address')" class="flex f-s-0 f-c btn-item">
					<view class="flex f-a-c f-j-c h-30">
						<text class="flex f-a-c f-j-c shops-icon shops-icon-address f26-size"></text>
					</view>
					<view class="flex f-j-c f12-size t-color-6 margin-t2">{{i18n['收货地址']}}</view>
				</view>
				<view class="flex f-s-0 f-c btn-item">
					<view class="flex f-a-c f-j-c h-30">
						<text class="flex f-a-c f-j-c shops-icon shops-icon-qiandao f24-size"></text>
					</view>
					<view class="flex f-j-c f12-size t-color-6 margin-t2">{{i18n['签到']}}</view>
				</view>
				<!-- <view class="flex f-s-0 f-c btn-item">
					<view class="flex f-a-c f-j-c h-30">
						<text class="flex f-a-c f-j-c shops-icon shops-icon-gerenjubaodengji f24-size"></text>
					</view>
					<view class="flex f-j-c f12-size t-color-6 margin-t2">{{i18n['我的举报']}}</view>
				</view> -->
				<view @click="go('/pages/user/advice')" class="flex f-s-0 f-c btn-item">
					<view class="flex f-a-c f-j-c h-30">
						<text class="flex f-a-c f-j-c shops-icon shops-icon-yijianfankui f28-size"></text>
					</view>
					<view class="flex f-j-c f12-size t-color-6 margin-t2">{{i18n['反馈']}}</view>
				</view>
				<view @click="go('/pages/user/help')" class="flex f-s-0 f-c btn-item">
					<view class="flex f-a-c f-j-c h-30">
						<text class="flex f-a-c f-j-c shops-icon shops-icon-bangzhu f26-size"></text>
					</view>
					<view class="flex f-j-c f12-size t-color-6 margin-t2">{{i18n['帮助中心']}}</view>
				</view>
				<view @click="goService(2)" class="flex f-s-0 f-c btn-item">
					<view class="flex f-a-c f-j-c h-30">
						<text class="flex f-a-c f-j-c shops-icon shops-icon-kefu f24-size"></text>
					</view>
					<view class="flex f-j-c f12-size t-color-6 margin-t2">{{i18n['智能小蜜']}}</view>
				</view>
				<view @click="go('/pages/find/user')" class="flex f-s-0 f-c btn-item">
					<view class="flex f-a-c f-j-c h-30">
						<text class="flex f-a-c f-j-c shops-icon shops-icon-faxian f28-size"></text>
					</view>
					<view class="flex f-j-c f12-size t-color-6 margin-t2">{{i18n['创作中心']}}</view>
				</view>
				<view @click="go('/pages/setting/index')" class="flex f-s-0 f-c btn-item">
					<view class="flex f-a-c f-j-c h-30">
						<text class="flex f-a-c f-j-c shops-icon shops-icon-shezhi f24-size"></text>
					</view>
					<view class="flex f-j-c f12-size t-color-6 margin-t2">{{i18n['设置']}}</view>
				</view>
			</view>
			<view class="flex f-a-c f-j-c margin-t12">
				<image class="h-18" src="../../static/images/guess_you_like_it.png" mode="heightFix"></image>
			</view>
			<view class="padding-6"></view>
			<goodslist  :list="list"></goodslist>
		</view>
		<tab-bar ref="tabbar" :active="4"></tab-bar>
	</view>
</template>
<style scoped>
	@import url('../../static/css/user/index.css');
	@import url('../../static/css/iconcolor.css');
</style>
<script>
	const shopsAPI = require('../../utils/api/shops.js').default;
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				list: [],
				user: '',
				account: '',
				order: '',
				defaultImg: ''
			};
		},
		onLoad: function() {
			self = this;
			this.getList();
			let config = uni.getStorageSync('config') ? uni.getStorageSync('config') : '';
			self.defaultImg = config != '' ? config.default_head_img : '';
		},
		onShow:function(){
			this.init();
		},
		methods: {
			updateImg() {
				$.uploadimg({
					url: API.updateHeadImgApi,
					success(res) {
						self.user.headImg = res;
						uni.setStorageSync('userInfo',self.user);
					}
				})
			},
			getAccount() {
				$.ajax({
					url: API.getAccountApi,
					data: {},
					isAuth: true,
					method: 'GET',
					success(res) {
						self.account = res.data ? res.data : '';
						uni.stopPullDownRefresh();
					}
				})
			},
			getUserInfo() {
				self.getUser({
					success(res) {
						self.user = res;
						uni.setStorageSync('userInfo',self.user);
					}
				})
			},
			getList() {
				$.ajax({
					url: shopsAPI.likeListApi,
					isAuth: true,
					data: {
						page: 1,
						pageSize: 20
					},
					method: 'GET',
					success(res) {
						self.list = res.data.list ? res.data.list : [];
					}
				})
			},
			getOrderNum() {
				$.ajax({
					url: API.getOrderNum,
					data: {},
					isAuth: true,
					method: 'GET',
					success(res) {
						self.order = res.data ? res.data :'';
						uni.stopPullDownRefresh();
					}
				})
			},
			init() {
				this.getUserInfo();
				this.getAccount();
				this.getOrderNum();
				this.$nextTick(() => {
					this.$refs.tabbar.getChatLen();
				})
			},
		},
		created() {},
		computed: {
			i18n() {
				return this.$t('user')
			},
		},
		mounted() {},
		destroyed() {},
		components: {},
		onPullDownRefresh() {
			this.init();
		},
		onReachBottom() {}
	}
</script>
