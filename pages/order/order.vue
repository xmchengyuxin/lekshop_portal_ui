<template>
	<view class="contain">
		<view class="h-30 ">
			<scroll-view scroll-x="true" :scroll-into-view="'navs'+active" class="h100" >
				<view class="flex f-n h100">
					<view @click="active=index" v-for="(item,index) in navs" :id="'navs'+index" :class="active == index ? 'navs-on t-color-y' : ''" class="flex f-s-0 flex-1 f-j-c  f-a-c h100   f-w-500">{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
		<swiper class="wrap-swiper" :current="active" @change="changeSwiper" :indicator-dots="false" :autoplay="false" :interval="1000" :duration="500">
			<swiper-item v-for="(item,parent) in navs">
				<scroll-view v-if="active==parent" class="padding-12 safe-area bg-color-f7" @scrolltolower="loadList" scroll-y="true" style="height: 100%;">
					<view v-if="list.length <= 0" class="flex f-a-c f-j-c f-c">
						<view class="padding-30"></view>
						<no-data></no-data>
					</view>
					<view @click="go('/pages/order/detail?id='+child.order.id)" v-else v-for="(child,index) in list" class="bg-color-w b-radius-5 padding-12 margin-b12">
						<view class="flex f-j-s margin-b16">
							<view class="flex f-a-c ">
								<text class="flex f-a-c van-icon van-icon-shop-o  margin-r6"></text>
								<text class="f-w-500 t-color-3 margin-r4 ">{{child.order['shopName']}}</text>
								<text class="flex f-a-c van-icon van-icon-arrow t-color-9 margin-r4"></text>
								<text v-if="child.order.type == 2" class="f10-size bg-color-linear-r t-color-w b-radius-2 h-16 padding-lr5 margin-r6">{{i18n['秒杀']}}</text>
								<text v-if="child.order.type == 3" class="f10-size bg-color-linear-y t-color-w b-radius-2 h-16 padding-lr5 margin-r6">{{i18n['拼团']}}</text>
							</view>
							<text v-if="child.order.type == 3 && child.orderGroup && child.orderGroup.status == 1"  class="t-color-9 f-w-500 f12-size">{{i18n['差1人成团'] | i18n(child.orderGroup.groupNum-child.orderGroup.haveGroupNum)}}</text>
							<text v-else :style="{'color': state[child.order.status].color}" class="t-color-y f-w-500 f12-size">{{i18n[state[child.order.status].text]}}</text>
						</view>
						
						<view v-for="(goods,idx) in child.orderDetailList" class="flex margin-b10">
							<view class="flex f-s-0 w-70 h-70 b-radius-5 bg-img  margin-r10" :style="goods.goodsMainImg | bgimg(300)+''"></view>
							<view class="flex flex-1 f-c margin-r8">
								<view class="line2 f12-size">{{goods.goodsName}}</view>
								<view class="flex flex-1 w100 f-a-c f-j-s margin-t6">
									<view class=" flex  f-j-c f-s-0 padding-lr6 bg-color-f7 f11-size t-color-9 b-radius-2 h-20 line-h20 max-w120 line1">{{goods.goodsParamName}}</view>
								</view>
							</view>
							<view class="flex f-s-0 f-c f-j-s">
								<view class="flex f-c">
									<view class="text-price flex f-j-e  f12-size">{{goods.buyPrice}}</view>
									<view class="flex f-j-e margin-t6 t-color-9 f11-size">x{{goods.buyNum}}</view>
								</view>
								<view @click="goComment(goods)" v-if="state[child.order.status].value == 'ywc' && goods.commentStatus == 0"  class="flex f-a-c f-j-c f-s-0 padding-lr10 h-24  b-radius-30 f11-size b-color-y t-color-y ">{{i18n['评价']}}</view>
							</view>
						</view>
						<view class="flex f-j-e f12-size f-w-500 margin-t6">
							<text>{{i18n['实付款']}}：</text>
							<text class="text-price">{{child.order.payPrice}}</text>
						</view>
						<view class="flex f-j-e f-w">
							<view v-if="state[child.order.status].value == 'dfh'" @click.stop="changeAddress(index)" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f12-size b-color-3 ">{{i18n['修改地址']}}</view>
							<view v-if="state[child.order.status].value == 'dzf'" @click.stop="cancelOrder(parent,index)" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f12-size b-color-3 ">{{i18n['取消订单']}}</view>
							<view @click.stop="showWuliu(child)" v-if="state[child.order.status].value == 'dsh'" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f12-size b-color-3">{{i18n['查看物流']}}</view>
							<view @click.stop="showPay(index)" v-if="state[child.order.status].value == 'dzf'" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f12-size bg-color-linear-y t-color-w">{{i18n['立即支付']}}</view>
							<view v-if="state[child.order.status].value == 'dsh'" @click.stop="sureOrder(parent,index)" class="flex f-a-c f-j-c f-s-0 w-80 h-30 margin-t12 margin-l12 b-radius-30 f12-size bg-color-linear-y t-color-w">{{i18n['确认收货']}}</view>
						</view>
					</view>
						
				</scroll-view>	
			</swiper-item>
		</swiper>	
		<logistics ref="wuliuinfo"></logistics>
		<pay-item ref="payitem" @pay='pay' pageType="2"></pay-item>
		<notice ></notice>
	</view>
</template>
<style scoped>
@import url('../../static/css/order/order.css');
</style>
<script>
	import payItem from '../common/payitem';
	import logistics from '@/pages/common/logistics.vue';
	const state = require('../../utils/api/state.js').default;
	const API = require('../../utils/api/order.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				active: 0,
				navs: [],
				list: [],
				totalPage: 1,
				page: 1,
				pageSize: 20,
				state: {//0待支付>>1待发货>>2待收货>>3已完成>>4已取消
					0: {name: '待支付',value: 'dzf',text: '等待支付',color: '#FD6C01',},
					1: {name: '待发货',value: 'dfh',text: '等待发货',color: '#ff2b00',},
					2: {name: '待收货',value: 'dsh',text: '等待收货',color: '#ff2b00',},
					3: {name: '已完成',value: 'ywc',text: '订单完成',color: '#78CA73',},
					4: {name: '已取消',value: 'yqx',text: '取消订单',color: '#9B9B9B',},
					6: {name: '退款',value: 'tk',text: '退款',},
				},
				refundState: state.refundStatus,
				payIndex: '',
			};
		},
		onLoad: function(options) {
			self = this;
			this.active = options.type ? options.type : 0;
			this.init();
			$.setTitle(self.i18n['我的订单']);
		},
		methods: {
			goComment(info) {
				info.status = info.commentStatus;
				uni.setStorageSync('comment',info);
				self.go('/pages/user/comment?detailId='+info.id);
			},
			showPay(index) {
				this.payIndex = index;
				this.$refs.payitem.open();
			},
			pay(type) {
				$.ajax({
					url: API.payOrderApi,
					data: {
						payOrderNo: self.list[self.payIndex].order.payOrderNo,
						payMethod: type
					},
					method: 'POST',
					success(res) {
						if (type != 'balance') {
							// #ifndef H5
							$.wxPay({
								payType: type.toLocaleLowerCase(),
								data: res.data.message,
								success(res) {
									self.list[self.payIndex]['order']['status'] = 1;
								}
							})
							// #endif
							// #ifdef H5
							$.wxPayH5({
								data: res.data.message,
								success(res) {
									self.list[self.payIndex]['order']['status'] = 1;
								}
							})
							// #endif
						}
						if (type == 'balance') {
							self.list[self.payIndex]['order']['status'] = 1;
						}
					}
				})
			},
			showWuliu(info) {
				this.$refs.wuliuinfo.show(info.order.id);
			},
			sureOrder(parent,index) {
				let info = self.list[index];
				$.ajax({
					url: API.sureOrderApi,
					data: {
						orderId: info.order.id
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						info.order.status = 3;
						self.$set(self.list,index,info);
					}
				})
			},
			cancelOrder(parent,index) {
				$.showModal({
					content: '是否确认删除',
					success() {
						let info = self.list[index];
						$.ajax({
							url: API.cancelOrderApi,
							data: {
								orderId: info.order.id
							},
							method: 'POST',
							success(res) {
								$.$toast(self.i18n['操作成功']);
								info.order.status = 4;
								self.$set(self.list,index,info);
							}
						})
					},
				},this)
				
			},
			changeAddress(index) {
				let info = self.list[index];
				self.go('/pages/user/address?id='+info.order.id+'&type=change');
			},
			getList() {
				let info = self.navs[self.active];
				$.ajax({
					url: API.getOrderListApi,
					data: {
						page: self.page,
						pageSize: self.pageSize,
						status: info.status
					},
					method: 'GET',
					success(res) {
						if (!res.data.list) {
							self.list = [];
							return;
						}
						let list = [];
						if (self.page != 1) {
							list = self.list.concat(res.data.list);
						} else {
							list = res.data.list ? res.data.list : [];
						}
						self.list = list;
						self.totalPage = res.data.totalPage;
					}
				})
			},
			initNavs() {
				self.navs = [
					{name: self.i18n['全部'],status:'',page:1,list:[],totalPage: 1},
					{name: self.i18n['待支付'],status:'0',page:1,list:[],totalPage: 1},
					{name: self.i18n['待发货'],status:'1',page:1,list:[],totalPage: 1},
					{name: self.i18n['待收货'],status:'2',page:1,list:[],totalPage: 1},
					{name: self.i18n['已完成'],status:'3',page:1,list:[],totalPage: 1},
					];
				self.getList();
			},
			changeSwiper(e) {
				self.active = e.detail.current;
				self.page = 1;
				self.totalPage= 1;
				self.getList();
			},
			init() {
				this.initNavs();
			},
			loadList() {
				if(this.page < this.totalPage) {
					this.page += 1;
					this.getList();
				}
				
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
		components: {logistics,payItem},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
