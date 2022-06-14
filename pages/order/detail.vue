<template>
	<view class="contain">
		<view class="padding-12">
			<view v-if="order != ''" class="bg-color-w padding-12 b-radius-5 margin-b12">
				<view class="f-w-b f15-size" :style="{'color': orderState[order.status]['color']}">{{orderState[order.status]['text']}}</view>
				<view class="margin-t6 flex f-a-c">
					<uni-countdown v-if="orderState[order.status]['value'] == 'dsh' && autoGetGoods > 0"  color="#9B9B9B" splitorColor="#9B9B9B" :font-size="11" :second="autoGetGoods" />
					<uni-countdown v-if="orderState[order.status]['value'] == 'dzf' && cancelTime > 0"  color="#9B9B9B" splitorColor="#9B9B9B" :font-size="11" :second="cancelTime" />
				</view>
			</view>
			
			<view class="flex bg-color-w b-radius-5 margin-b12">
				<view class="flex flex-1">
					<view class="flex f-a-c f-j-c f-s-0 shops-icon shops-icon-address f44-size padding-10"></view>
					<view class="flex f-c flex-1 f-j-c">
						<view class="flex f-a-c">
							<text class="flex f-a-c f-w-b f15-size margin-r12">{{order.receiveName}}</text>
							<text class="flex f-a-c f12-size t-color-9">{{order.receivePhone}}</text>
						</view>
						<view class="line1 margin-t4 f12-size">{{order.receiveAddress}}</view>
					</view>
				</view>
				<view class="padding-lr5"></view>
			</view>
			<!-- 拼团 -->
			<view v-if="order.type == 3" class="bg-color-w b-radius-5 padding-12 margin-b12">
				<view @click="go('/pages/order/group?id='+id)" class="flex  f-j-s">
					<text class="f-w-b t-color-3 margin-r4 ">{{i18n['差1人成团'] | i18n(1)}}</text>
					<view class="flex f-a-c">
						<text class="t-color-y f12-size margin-r2">{{i18n['拼团详情']}}</text>
						<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f13-size margin-t2"></text>
					</view>
				</view>
				<view class="flex f-w">
					<view v-for="(item,index) in groupJoinList" :style="item.memberHeadImg | bgimg(300)+''" class="flex f-s-0 w-30 h-30 b-radius bg-img margin-t10 margin-r10"></view>
				</view>
			</view>
			
			<view class="bg-color-w b-radius-5 padding-12 margin-b12">
				<view @click="go('/pages/shops/shops?id='+order.shopId)" class="flex f-j-s margin-b16">
					<view class="flex f-a-c ">
						<text class="flex f-a-c van-icon van-icon-shop-o  margin-r6"></text>
						<text class="f-w-500 t-color-3 margin-r4 ">{{order.shopName}}</text>
						<text class="flex f-a-c van-icon van-icon-arrow t-color-9 "></text>
					</view>
				</view>
				<view class="margin-b10" v-for="(item,index) in goodsList">
					<view class="flex">
						<view class="flex f-s-0 w-70 h-70 b-radius-5 bg-img  margin-r10" :style="item.goodsMainImg | bgimg(300)+''"></view>
						<view class="flex flex-1 f-c margin-r8">
							<view class="line2 f12-size">{{item.goodsName}}</view>
							<view v-if="item.goodsParamName" class="flex f-a-c margin-t6">
								<view class="flex f-a-c f-j-c padding-lr6 bg-color-f7 f11-size t-color-9 b-radius-2 h-20">{{item.goodsParamName}}</view>
							</view>
						</view>
						<view class="flex f-s-0 f-c">
							<view class="text-price f12-size">{{item.buyPrice}}</view>
							<view class="flex f-j-e margin-t6 t-color-9 f11-size">x{{item.buyNum}}</view>
						</view>
					</view>
					<view v-if="item.remark != ''" class="flex f-j-s padding-tb6 f11-size">
						<text class="flex f-s-0">{{i18n['订单备注']}}</text>
						<text class="">{{item.remark}}</text>
					</view>
					<view class="flex f-a-c f-j-e">
						<view v-if="state[item.refundStatus].value == 'wtk' && (orderState[order.status]['value'] == 'dfh' || orderState[order.status]['value'] == 'dsh' || (orderState[order.status]['value'] == 'ywc'&&order.refundExpiredTime >= now))"  @click="refund(item)" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f11-size b-color-e t-color-8 ">{{i18n['退款']}}</view>
						<view v-if="state[item.refundStatus].value != 'wtk'"  @click="go('/pages/user/refunddetail?detailId='+item.id)" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f11-size b-color-e t-color-8 ">{{i18n['退款详情']}}</view>
					</view>
				</view>
				<view class="flex f-j-s padding-tb6 f12-size">
					<text>{{i18n['商品总价']}}</text>
					<text class="text-price">{{order.totalPrice | price}}</text>
				</view>
				<view class="flex f-j-s padding-tb6 f12-size">
					<text>{{i18n['运费']}}</text>
					<text v-if="order.freightFee" class="text-price">{{order.freightFee | price}}</text>
					<text v-else class="text-price">0</text>
				</view>
				<view class="flex f-j-s padding-tb6 f12-size">
					<text>{{i18n['优惠']}}</text>
					<text class="text-price">24.00</text>
				</view>
				<view class="flex f-j-e f12-size t-color-y f-w-500 margin-t6">
					<text>{{i18n['实付款']}}：</text>
					<text class="text-price">{{order.payPrice | price}}</text>
				</view>
			</view>
			
			<view class="bg-color-w b-radius-5 padding-12 margin-b12">
				<view class="flex f-j-s margin-b10">
					<view class="flex f-a-c ">
						<text class="f-w-500 t-color-3 margin-r4 ">{{i18n['订单详情']}}</text>
					</view>
				</view>
				<view class="flex f-a-c padding-tb6 f12-size">
					<text class="t-color-9 w-80">{{i18n['订单编号']}}：</text>
					<text class="">{{order.orderNo}}</text>
				</view>
				<view class="flex f-a-c padding-tb6 f12-size">
					<text class="t-color-9 w-80">{{i18n['支付交易号']}}：</text>
					<text class="">{{order.payOrderNo}}</text>
				</view>
				<view class="flex f-a-c padding-tb6 f12-size ">
					<text class="t-color-9 w-80">{{i18n['创建时间']}}：</text>
					<text class="">{{order.buyTime | time}}</text>
				</view>
				<view class="flex f-a-c padding-tb6 f12-size ">
					<text class="t-color-9 w-80">{{i18n['支付时间']}}：</text>
					<text class="">{{order.payTime | time}}</text>
				</view>
				<view v-if="order.deliveryTime" class="flex f-a-c padding-tb6 f12-size ">
					<text class="t-color-9 w-80">{{i18n['发货时间']}}：</text>
					<text class="">{{order.deliveryTime | time}}</text>
				</view>
				<view v-if="order.finishTime" class="flex f-a-c padding-tb6 f12-size ">
					<text class="t-color-9 w-80">{{i18n['完成时间']}}：</text>
					<text class="">{{order.finishTime | time}}</text>
				</view>
				<view class="b-bottom margin-t10"></view>
				<view @click="go('/pages/chat/chat?id='+shopMemberId+'&orderId='+order.id)" class="flex f-a-c f-j-c" style="padding-top: 10px;">
					<text class="flex f-a-c f-j-c van-icon van-icon-chat-o t-color-y margin-r4"></text>
					<text class="f12-size f-w-500">{{i18n['联系卖家']}}</text>
				</view>
			</view>	
			
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/iconcolor.css');
</style>
<script>
	const state = require('../../utils/api/state.js').default;
	const API = require('../../utils/api/order.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				id: '',
				goodsList: [],
				order: '',
				groupJoinList: [],
				state: state.refundStatus,
				orderState: state.orderStatus,
				shopMemberId: '',
				now: 0,
				autoGetGoods: 0,
				cancelTime: 0,
			};
		},
		onLoad: function(options) {
			self = this;
			this.id = options.id ? options.id : '';
			this.init();
			$.setTitle(self.i18n['订单详情']);
		},
		methods: {
			refund(data) {
				//与评价共用一个缓存
				uni.setStorageSync('comment',data);
				self.go('/pages/user/refund');
			},
			getDetail() {
				$.ajax({
					url: API.orderDetailApi,
					data: {
						orderId: self.id
					},
					method: 'GET',
					success(res) {
						let info = res.data ? res.data : '';
						if(info == ''){return}
						self.goodsList = info.orderDetailList ? info.orderDetailList : [];
						self.groupJoinList = info.groupMemberList ? info.groupMemberList : [];
						self.order = info.order ? info.order : '';
						self.shopMemberId = info.shopMemberId ? info.shopMemberId : '';
						self.now = res.now;
						if(self.order.finishExpiredTime) {//自动确认收货时间
							self.autoGetGoods = Number(self.order.finishExpiredTime - res.now)/1000;
						}
						if(self.order.payEndTime) {//超过这个时间未支付订单取消
							self.cancelTime = Number(self.order.payEndTime - res.now)/1000;
						}
					}
				})
			},
			init() {
				this.getDetail();
			},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('orderlist')
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
