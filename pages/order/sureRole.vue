<template>
	<view class="contain">
		<view class="padding-12">
			
			<view @click="go('/pages/user/address?type=order')" class="flex bg-color-w b-radius-5">
				<view class="flex flex-1">
					<view class="flex f-a-c f-j-c f-s-0 shops-icon shops-icon-address f44-size padding-10"></view>
					<view v-if="address != ''" class="flex f-c flex-1 f-j-c">
						<view class="flex f-a-c">
							<text class="flex f-a-c f-w-b f15-size margin-r12">{{address.realname}}</text>
							<text class="flex f-a-c f12-size t-color-9">{{address.phone}}</text>
						</view>
						<view class="line1 margin-t4 f12-size">{{address.province}}{{address.city}}{{address.area}}{{address.address}}</view>
					</view>
					<view v-if="address == ''" class="flex f-c flex-1 f-j-c">
						<text class="t-color-9">{{i18n['选择收货地址']}}</text>
					</view>
				</view>
				<view class="flex f-s-0 f-a-c f-j-c padding-lr6 van-icon van-icon-arrow t-color-9"></view>
			</view>
			
			<view v-for="(item,index) in list" class="bg-color-w b-radius-5 padding-12 margin-t12">
				<!-- <view class="flex f-a-c margin-b10">
					<text class="flex f-a-c van-icon van-icon-shop-o t-color-y margin-r6"></text>
					<text class="f-w-500 t-color-3">{{item.shopName}}</text>
				</view> -->
				<view  class="flex margin-b10">
					<view class="flex f-s-0 w-70 h-70 b-radius-5 bg-img  margin-r10" :style="item.mainImg | bgimg(400)+''"></view>
					<view class="flex flex-1 f-c margin-r8">
						<view class="line2 f12-size">{{item.title}}</view>
						<view class="flex f-a-c margin-t6">
							<view class="text-price-role t-color-p f12-size">{{item.point}}</view>
							<view class=" t-color-p f12-size padding-lr2">+</view>
							<view class="text-price t-color-p f12-size">{{item.price}}</view>
						</view>
					</view>
					<view class="flex f-s-0 f-c">
						<view class="text-price f12-size">{{item.oriPrice}}</view>
						<view class="flex f-j-e margin-t6 t-color-9 f11-size">x{{len}}</view>
					</view>
				</view>
				
				<!-- <view class="flex f-a-c f-j-s h-36">
					<text class="f12-size t-color-9 margin-r10">{{i18n['快递运费']}}</text>
					<text v-if="item.freightFee <= 0" class=" ">{{i18n['包邮']}}</text>
					<text v-if="item.freightFee > 0" class="text-price">{{item.freightFee}}</text>
				</view>
				<view @click="getCoupon(index)" class="flex f-a-c f-j-s h-36">
					<text class="f12-size t-color-9 margin-r10">{{i18n['优惠折扣']}}</text>
					<view v-if="item.couponPrice && item.couponPrice != 0" class="flex f-a-c">
						<text class=" t-color-y f12-size">-</text>
						<text class="text-price t-color-y f12-size">{{item.couponPrice}}</text>
						<text class="flex f-a-c van-icon van-icon-arrow t-color-9 "></text>
					</view>
					<view v-else class="flex f-a-c">
						<view class="t-color-9 margin-r6">{{i18n['请选择']}}</view>
						<text class="flex f-a-c van-icon van-icon-arrow t-color-9 "></text>
					</view>
				</view> -->
				<view class="flex  f-j-s " style="padding-top: 10px;">
					<text class="flex f-s-0  f12-size t-color-9 margin-r10">{{i18n['订单备注']}}</text>
					<view class="flex flex-1">
						<textarea v-model="item.remark" class="f12-size input h-30" value="" placeholder="订单备注可选" />
					</view>
				</view>
				<!-- <view class="flex f-a-c f-j-e">
					<text class="f12-size t-color-9">{{i18n['共1件'] | i18n(2)}}，</text>
					<text class="f12-size ">{{i18n['小计']}}：</text>
					<text class="f12-size text-price t-color-y">2700</text>
				</view> -->
			</view>
			
		</view>
		<view :style="isIphonex ? 'padding-top:84px;' : 'padding-top:50px;'"></view>
		<view class="flex f-a-c f-j-e h-50 fixed-top bg-color-w padding-lr12 box-c" :style="isIphonex ? 'padding-bottom:34px;' : ''">
			<text class=" t-color-9">{{i18n['共1件'] | i18n(len)}}，</text>
			<text class=" ">{{i18n['小计']}}：</text>
			<text class="text-price-role t-color-y ">{{point}}</text>
			<text class=" t-color-y padding-lr2">+</text>
			<text class="text-price t-color-y margin-r12">{{amount | price}}</text>
			<view @click="pay" class="flex f-a-c f-j-c b b-radius-30 w-100 h-36 bg-color-linear-y t-color-w">{{i18n['提交订单']}}</view>
		</view>
		
		<uni-popup ref="coupon" type="bottom">
			<view class="bg-color-f7 wrap-popup-radius safe-area">
				<view class="flex f-a-c f-j-c padding-12 f16-size">优惠券</view>
				<scroll-view scroll-y="true" style="height:70vh"> 
					<coupon-item :list="couponList" @choose="chooseCoupon" type="use"></coupon-item>
				</scroll-view>
				<view class="padding-12">
					<view @click="noUseCoupon" class="flex f-a-c f-j-c b-radius-30 h-36 t-color-w bg-color-linear-y">暂不使用</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
@import url('../../static/css/iconcolor.css');
.fixed-top {
	top: auto;
	bottom: 0;
}
.input {
	text-align: right;
}
</style>
<script>
	import couponItem from '../common/couponlist.vue';
	const API = require('../../utils/api/order.js').default;
	const $ = require('../../utils/api.js');
	let self;
	let isflag = true;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				list: [],
				address: '',
				amount: 0,
				point: 0,
				len: 0,
				couponList: [],
				commonIndex: '',
				groupId: '',
				joinGroupId: '',
			};
		},
		onLoad: function(options) {
			self = this;
			this.groupId = options.groupId ? options.groupId : '';
			this.joinGroupId = options.joinId ? options.joinId : '';
			this.init();
			$.setTitle(self.i18n['确认订单']);
		},
		methods: {
			noUseCoupon() {
				let info = self.list[self.commonIndex];
				info['couponPrice'] = 0;
				info['couponId'] = '';
				self.$set(self.list,self.commonIndex,info);
				self.$refs.coupon.close();
				self.getPrice();
			},
			chooseCoupon(data) {
				if(data.reason && data.reason != '') {
					$.$toast(dta.reason);return;
				}
				let info = self.list[self.commonIndex];
				if(data.type == 2) {//折扣券
					let price = 0;
					info.goodsList.forEach((ele,index) => {
						price += ele.goodsSku.price*ele.buyNum;
					})
					info['couponPrice'] = price*(10-data.amount)/10;
				}else{
					info['couponPrice'] = data.discountAmount;
				}
				info['couponId'] = data.id;
				self.$set(self.list,self.commonIndex,info);
				self.$refs.coupon.close();
				self.getPrice();
			},
			getCoupon(parent) {
				const self = this;
				self.commonIndex = parent;
				let info = self.list[parent];
				if(info.couponList){
					self.$refs.coupon.open();
					return;
				}//请求过了无需再次请求
				let idArr = [];
				let cateArr = [];
				let price = 0;
				info.goodsList.forEach((ele,index) => {
					idArr.push(ele.goods.id);
					cateArr.push(ele.goods.cateIds);
					price += ele.goodsSku.price*ele.buyNum;
				})
				$.ajax({
					url: API.canUseCouponListApi,
					data: {
						shopId: info.shopId,
						goodsIds: idArr.join(','),
						cateIds: cateArr.join(','),
						totalAmount: price,
					},
					method: 'GET',
					success(res) {
						self.couponList = res.data ? res.data : [];
						info['couponList'] = self.couponList;
						self.$set(self.list,parent,info);
						self.$refs.coupon.open();
					}
				})
			},
			getPrice() {
				let price = 0;
				let len = 0;
				self.list.forEach((ele,index) => {
					price += ele.freightFee;
					if(ele.couponPrice && ele.couponPrice != 0) {
						price -= ele.couponPrice;
					}
					ele.goodsList.forEach((ele1,idx) => {
						len += ele1.buyNum;
						price += ele1.buyNum*ele1.goodsSku.price;
					})
				})
				self.amount = price;
				self.len = len;
			},
			pay() {
				let orderData = uni.getStorageSync('orderData') ? uni.getStorageSync('orderData') : '';
				let postData = orderData;
				if(this.address != '') {
					self.address.addTime = '';
					postData = Object.assign(this.address,postData)
				}
				if(!isflag){return}
				isflag = false;
				$.ajax({
					url: API.addRoleOrderApi,
					data: postData,
					method: 'POST',
					loading: true,
					loadingText: self.i18n['提交订单']+['…'],
					success(res) {
						let info = res.data;
						self.go('/pages/order/rolePay?orderNo='+info.orderNo+'&amount='+info.amount+'&point='+info.point);
					},
					complete() {
						isflag = true;
					}
				})
			},
			getAddress() {
				$.ajax({
					url: API.getAddressApi,
					data: {},
					method: 'GET',
					success(res) {
						self.address = res.data ? res.data : '';
						self.getInfo();
					}
				})
			},
			setAddress(item) {
				this.address = item;
				self.getInfo();
			},
			getInfo() {
				let orderData = uni.getStorageSync('orderData') ? uni.getStorageSync('orderData') : '';
				let postData = orderData;
				if(this.address != '') {
					self.address.addTime = '';
					postData = Object.assign(this.address,postData)
				}
				$.ajax({
					url: API.getRoleOrderInfoApi,
					data: postData,
					method: 'POST',
					success(res) {
						self.amount = res.data.buyTotalPrice ? res.data.buyTotalPrice : 0;
						self.point = res.data.buyTotalPoint ? res.data.buyTotalPoint : 0;
						self.len = res.data.buyNum ? res.data.buyNum : 0;
						self.list = res.data ? [res.data.goods] : [];
						// self.getPrice();
					}
				})
			},
			init() {
				this.getAddress();
			},
		},
		computed: {
			i18n() {
				return this.$t('order')
			},
		},
		created() {
		},
		onHide() {
			// uni.removeStorageSync('orderData');
		},
		mounted() {},
		destroyed() {},
		components: {couponItem},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
