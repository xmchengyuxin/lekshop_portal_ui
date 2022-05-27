<template>
	<view class="contain">
		<view class="padding-12">
		<view  v-for="(item,index) in list" class="bg-color-w b-radius-5 padding-12 margin-b12">
			<view class="flex f-j-s margin-b16">
				<view class="flex f-a-c ">
					<text class="flex f-a-c van-icon van-icon-shop-o  margin-r6"></text>
					<text class="f-w-500 t-color-3 margin-r4 ">{{item.shopName}}</text>
					<text class="flex f-a-c van-icon van-icon-arrow t-color-9 "></text>
				</view>
				<view class="flex f-a-c">
					<text class="flex f-a-c f-j-c f18-size van-icon van-icon-refund-o  margin-r4" style="color: #E80080;"></text>
					<text v-if="item.refundInd == 1" class="f12-size t-color-9">{{i18n['退款']}}</text>
					<text v-if="item.refundInd == 2" class="f12-size t-color-9">{{i18n['退货']}}</text>
				</view>
			</view>
			<view class="margin-b10">
				<view class="flex">
					<view class="flex f-s-0 w-80 h-80 b-radius-5 bg-img  margin-r10" :style="item.goodsMainImg | bgimg(300)+''"></view>
					<view class="flex flex-1 f-c margin-r8">
						<view class="line2 f12-size">{{item.goodsName}}</view>
						<view v-if="item.goodsParamName" class="flex f-a-c margin-t6">
							<view class="flex f-a-c f-j-c padding-lr6 bg-color-f7 f11-size t-color-9 b-radius-2 h-20">{{item.goodsParamName}}</view>
						</view>
						<view class="flex f-a-c margin-t6">
							<text class="margin-r4 f12-size">{{i18n['退款']}}:</text>
							<view class="text-price f12-size">{{item.refundAmount}}</view>
						</view>
					</view>
				</view>
				<view class="flex bg-color-f7 b-radius-5 padding-tb12 margin-t12">
					<view class="flex f-s-0 f-j-e f12-size f-w-b w-80 margin-r10">{{state[item.status].text}}</view>
					<view  v-if="state[item.status].value == 'suc'" class="flex flex-1 f12-size">{{i18nState[state[item.status].tip] | i18n(item.refundAmount)}}</view>
					<view  v-else class="flex flex-1 f12-size">{{i18nState[state[item.status].tip]}}</view>
				</view>
				<view class="flex f-a-c f-j-e">
					<view  v-if="item.refundInd == 2 && state[item.status].value == 'dth'" @click="go('/pages/user/refunddetail?id='+item.id)" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f11-size b-color-e t-color-8 ">{{i18n['退货']}}</view>
					<view v-if="state[item.status].value != 'suc' && state[item.status].value != 'close'"  @click="cancel(index)" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f11-size b-color-e t-color-8 ">{{i18n['取消售后']}}</view>
					<view v-if="state[item.status].value =='reject'"  @click="kefu(index)" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f11-size b-color-e t-color-8 ">{{i18n['客服介入']}}</view>
					<view  @click="go('/pages/user/refunddetail?id='+item.id)" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f11-size b-color-e t-color-8 ">{{i18n['查看详情']}}</view>
				</view>
			</view>
		</view>
		<no-data :list="list"></no-data>
		</view>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	const state = require('../../utils/api/state.js').default.refundListSatus;
	const API = require('../../utils/api/order.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
				state: state,
			};
		},
		onLoad: function() {
			self = this;
			this.init();
			$.setTitle(self.i18n['退款/售后']);
		},
		methods: {
			kefu(index) {
				$.showModal({
					content: '是否确认申请客服介入',
					success() {
						$.ajax({
							url: API.kefuRefundApi,
							data: {
								refundId: self.list[index].id
							},
							method: 'POST',
							success(res) {
								self.$toast(self.i18n['操作成功']);
							}
						})
					}
				},this)
			},
			cancel(index) {
				$.showModal({
					content: '是否确认取消',
					success() {
						$.ajax({
							url: API.cancelRefundApi,
							data: {
								refundId: self.list[index].id
							},
							method: 'POST',
							success(res) {
								self.$toast(self.i18n['操作成功']);
							}
						})
					}
				},this)
				
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.refundListApi,
					data: {
						page: self.page,
						pageSize: self.pageSize
					},
					method: 'GET',
					success(res) {
						let list = [];
						if (self.page != 1) {
							list = self.list.concat(res.data.list);
						} else {
							list = res.data.list ? res.data.list : [];
						}
						self.totalPage = res.data.totalPage;
						self.list = list;
					}
				})
			},
			init() {
				this.getList();
			},
		},
		computed: {
			i18n() {
				return this.$t('refund')
			},
			i18nState() {
				return this.$t('state')
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
