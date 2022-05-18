<template>
	<view class="">
		<view v-if="list.length > 0" class="padding-12">
			<view v-for="(item,index) in list" :class="item.status && item.status != 0 && !item.validityType ? 'wrap-couponed' : ''" class="flex bg-color-w b-radius-5 h-100 wrap-coupon margin-b12">
				<view v-if="item.type == 1" class="w-110 flex f-s-0 f-c f-a-c f-j-c coupon-left"> 
					<text class="text-price f20-size t-color-y f-w-b">{{item.amount}}</text>
					<view class="flex f-a-c f-j-c b-radius-2 bg-color-f3 h-20 padding-lr6 f11-size margin-t4">{{i18n['满1使用'] | i18n(item.fullAmount)}}</view>
				</view>
				<view v-if="item.type == 2" class="w-110 flex f-s-0 f-c f-a-c f-j-c coupon-left">
					<text class=" f20-size t-color-y f-w-b">{{i18n['1折'] | i18n(item.amount)}}</text>
					<view class="flex f-a-c f-j-c b-radius-2 bg-color-f3 h-20 padding-lr6 f11-size margin-t4">{{i18n['满1使用'] | i18n(item.fullAmount)}}</view>
				</view>
				<view class="padding-10 flex flex-1 f-c f-j-s">
					<view class="flex f-c">
						<view  v-if="type != 'goods'" class="flex f-a-c f-j-s margin-b4">
							<view class="flex f-a-c">
								<text class="flex f-a-c f-j-c van-icon van-icon-shop-o t-color-9 margin-r4"></text>
								<text>{{item.shopName}}</text>
							</view>
							<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f15-size"></text>
						</view>
						<view   class="flex f-a-c">
							<view v-if="item.type == 1" class="coupon-role flex f-a-c f-j-c margin-r6 h-18 padding-lr6 f10-size t-color-w bg-color-linear-r b-radius-2">{{i18n['满减券']}}</view>
							<view v-if="item.type == 2" class="coupon-role flex f-a-c f-j-c margin-r6 h-18 padding-lr6 f10-size t-color-w bg-color-linear-y b-radius-2">{{i18n['折扣券']}}</view>
							<text>{{item.name}}</text>
						</view>
						
					</view>
					<view class="flex">
						<view v-if="item.validityType" class="flex flex-1 f-c f-j-e">
							<view v-if="item.validityType == 1" class="coupon-dot flex f-a-c margin-t4 f12-size t-color-9">{{i18n['未使用前永久有效']}}</view>
							<view v-if="item.validityType == 2" class="coupon-dot flex f-a-c margin-t4 f12-size t-color-9">{{i18n['领取后1天内有效'] | i18n(item.validityDays)}}</view>
							<view v-if="item.validityType == 3" class="coupon-dot flex f-a-c margin-t4 f12-size t-color-9">{{i18n['1内有效'] | i18n(item.fixedEndDate,'time1')}}</view>
						</view>
						<!-- 领取后 -->
						<view v-else class="flex flex-1 f-c f-j-e">
							<view v-if="item.validityEndTime" class="coupon-dot flex f-a-c margin-t4 f12-size t-color-9">{{i18n['1内有效'] | i18n(item.validityEndTime,'time1')}}</view>
							<view v-else class="coupon-dot flex f-a-c margin-t4 f12-size t-color-9">{{i18n['未使用前永久有效']}}</view>
						</view>
						<view v-if="item.validityType" @click="getCoupon(item.id)" class="flex f-s-0 f-a-c f-j-c h-30 b-radius-30 f12-size t-color-w bg-color-linear-y w-70">{{i18n['立即领取']}}</view>
						<block v-else>
							<view v-if="item.status == 0" @click="getCoupon(item.id)"  class="flex f-s-0 f-a-c f-j-c h-30 b-radius-30 f12-size t-color-w bg-color-linear-y w-70">{{i18n['去使用']}}</view>
							<view v-else class="flex f-s-0 f-a-c f-j-c h-30 b-radius-30 f12-size t-color-9 bg-color-e w-70">{{i18n['去使用']}}</view>
						</block>
					</view>
				</view>
			</view>
		</view>
		<no-data v-if="list.length <= 0"></no-data>
	</view>
</template>
<style scoped>
@import url('../../static/css/coupon/common.css');
</style>
<script>
	const API = require('../../utils/api/shops.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		props: {
			list: {
				type: Array,
				default: [],
			},
			type: {
				type: String,
				default: 'goods'
			}
		},
		data() {
			return {};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			getCoupon(id) {
				const self = this;
				$.ajax({
					url: API.drawCouponApi,
					data: {shopCouponId: id},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['领取成功']);
					}
				})
			},
			init() {},
		},
		created() {
			self = this;
		},
		computed: {
			i18n() {
				return this.$t('coupon')
			},
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
