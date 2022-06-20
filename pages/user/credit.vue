<template>
	<view class="contain">
		<view  :style="{'padding-top': top+'px!important'}" class="flex wrap-header b-none h-44 box-c   t-color-0">
			<view @click="back()" class="flex f-a-c  van-icon van-icon-arrow-left t-color-0 f20-size padding-lr12"></view>
			<view class="flex flex-1 f-a-c f-j-c f20-size">{{i18n['我的积分']}}</view>
			<!-- #ifndef MP-WEIXIN -->
			<view class="flex f-s-0 w-44"></view>
			<!-- #endif -->
			<xcx-header></xcx-header>
		</view>
		<view class="padding-30 flex f-a-c f-j-c">
			<view @click="go('/pages/user/signlog')" class="wrap-img">
				<view class="wrap-role flex f-c f-a-c f-j-c">
					<view class="flex f-j-c f12-size">{{i18n['您当前的积分']}}</view>
					<view class="flex f-j-c " style="font-size: 43px;">{{money.point}}</view>
				</view>
				<image src="https://qiniu.chengyuwb.com/shop_credit_bg.png" mode="widthFix"></image>
			</view>
			
		</view>
		<view class="flex f-a-c f-j-c wrap-pro">
			<view :class="Number(money.freezePoint) <= 300 ? 'on' : ''" class="flex f-s-0 role-item"></view>
			<view class="flex f-s-0 w-10"></view>
			<view :class="Number(money.freezePoint) > 300 && Number(money.freezePoint) <= 500 ? 'on' : ''" class="flex f-s-0 role-item"></view>
			<view class="flex f-s-0 w-10"></view>
			<view :class="Number(money.freezePoint) > 500 && Number(money.freezePoint) <= 700 ? 'on' : ''" class="flex f-s-0 role-item"></view>
			<view class="flex f-s-0 w-10"></view>
			<view :class="Number(money.freezePoint) > 700 && Number(money.freezePoint) <= 1000 ? 'on' : ''" class="flex f-s-0 role-item"></view>
			<view class="flex f-s-0 w-10"></view>
			<view :class="Number(money.freezePoint) > 1000 && Number(money.freezePoint) <= 1500 ? 'on' : ''" class="flex f-s-0 role-item"></view>
		</view>
		<view style="width: 348px;margin: auto;">
		<view class="flex f-a-c margin-t4  ">
			<view class="flex flex-1 f-j-c">0</view>
			<view class="flex flex-1 f-j-c">300</view>
			<view class="flex flex-1 f-j-c">500</view>
			<view class="flex flex-1 f-j-c">700</view>
			<view class="flex flex-1 f-j-c">1000</view>
			<view class="flex flex-1 f-j-c">1500</view>
		</view>
		<view class="padding-lr30 margin-t16">
			<view @click="sign" class=" bg-color-linear-y t-color-w flex f-a-c f-j-c h-40 b-radius-30">{{i18n['签到']}}</view>
		</view>
		</view>
		<view class="margin-t16" style="background-color: #f4f4f4;height: 15px;"></view>
		<view class="  padding-10">
			<rich-text :nodes="rules.detail | html"></rich-text>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/user/credit.css');
@import url('../../static/css/page/white.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				money: '',
				rules: ''
			};
		},
		onLoad: function() {
			$.setTitle();
			this.init();
		},
		methods: {
			sign() {
				const self = this;
				$.ajax({
					url: 'member/sign',
					data: {},
					method: 'POST',
					success(res) {
									$.$toast(self.i18n['签到成功']);
									self.getMoney();
					}
				})
			},
			getData() {
				  const self = this;
				  $.ajax({
				  	url: 'common/agreement/get',
				  	data: {
						cate: 'point_rule'
					},
				  	method: 'GET',
				  	success(res) {
						self.rules = res.data
						
				  	}
				  })
			},
			getMoney() {
				const self = this;
				$.ajax({
					url: 'member/getAccount',
					data: {},
					method: 'GET',
					success(res) {
						self.money = res.data ? res.data : '';
					}
				})
			},
			init() {
				this.getMoney();
				this.getData();
			},


		},
		computed: {
			i18n() {
				return this.$t('sign')
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
