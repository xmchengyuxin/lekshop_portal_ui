<template>
	<view class="contain">
		<view class="padding-6"></view>
		<view @click="go('/pages/user/bank?type=tixian')" class="padding-12 bg-color-w flex margin-b12">
			<view class="flex flex-1 f-j-c h-36 f-c">
				<view v-if="bank == ''" class="flex f-a-c f15-size ">{{i18n['选择提现账户']}}</view>
				<block v-if="bank != ''">
					<view class="flex f-a-c">
						<text class="flex f13-size f-w-b margin-r12">{{bank.accountName | hideCenterText}}</text>
						<view class="flex f13-size f-w-b">{{bank.bank}}</view>
					</view>
					<view class="flex f12-size t-color-9 margin-t2">{{bank.bankAccount | hideCenterText}}</view>
				</block>
			</view>
			<text class="flex f-s-0 f-a-c f-j-c van-icon van-icon-arrow t-color-9"></text>
		</view>
		<view class="bg-color-w padding-12">
			<view class="">
				<view class="f16-size">{{i18n['提现金额']}}</view>
				<view class="flex f-a-c margin-t12 b-bottom">
					<text class="flex f-s-0 margin-r12 f32-size">￥</text>
					<view class="flex flex-1 h-70">
						<input v-model="amount" type="number" value="" class="input" style="font-size: 50px;" />
					</view>
				</view>
				<view @click="amount=account" class="flex f-a-c f12-size margin-t12">
					<text class="t-color-9 margin-r2">{{i18n['服务费']}}</text>
					<text class="t-color-y text-price margin-r8">0</text>
					<text class="t-color-9 margin-r2">{{i18n['可用余额']}}</text>
					<text class="t-color-9 text-price margin-r12">{{account}}</text>
					<text class="t-color-y">{{i18n['全部']}}</text>
				</view>
			</view>
			
		</view>
		<view class="padding-12 margin-t15">
			<view @click="tixian" class="flex f-a-c f-j-c h-40 t-color-w bg-color-linear-y b-radius-5 f15-size">{{i18n['提现']}}</view>
		</view>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				amount: '',
				bank: '',
				account: 0,
			};
		},
		onLoad: function(options) {
			self = this;
			this.account = options.amount ? options.amount : 0;
			this.init();
		},
		methods: {
			setBank(info) {
				this.bank = info;
			},
			tixian() {
				if(this.amount == '') {
					$.$toast(self.i18n['请输入提现金额']);return;
				}
				if(this.bank == '') {
					$.$toast(self.i18n['请选择提现账号']);return;
				}
				if(this.amount > this.account) {
					$.$toast(self.i18n['余额不足']);
					this.amount = this.account;
					return;
				}
				let type = self.bank.bankAccount ? 1 : self.bank.zfbAccount ? 2 : 3;
				$.ajax({
					url: API.withdrawApi,
					data: {
						method: '1',//1账户资金>>2佣金资金
						type: type,//1银行>>2支付宝>>3微信
						amount: self.amount,
						accountName: self.bank.accountName,
						bank: self.bank.bank,
						bankAccount: type == 1 ? self.bank.bankAccount : self.bank.zfbAccount,
						qrCode: type == 3 ? self.bank.wxAccount : ''
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						self.back(1,2000);
					}
				})
			},
			init() {
			},
		},
		computed: {
			i18n() {
				return this.$t('money')
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
