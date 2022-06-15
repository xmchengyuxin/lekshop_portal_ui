<template>
	<view class="contain">
		<view class="padding-12">
			<view class="bg-color-w b-radius-10 padding-12 margin-b12">
				<view class="flex f-a-c  f15-size f-w-b margin-b10">{{i18n['退款商品']}}</view>
				<view class="">
					<view @click="go('/pages/shops/detail?id='+goods.goodsId)" class="flex">
						<view class="flex f-s-0 w-70 h-70 b-radius-5 bg-img  margin-r10" :style="goods.goodsMainImg | bgimg(300)+''"></view>
						<view class="flex flex-1 f-c margin-r8">
							<view class="line2 f12-size">{{goods.goodsName}}</view>
							<view v-if="goods.goodsParamName" class="flex f-a-c margin-t6">
								<view class="flex f-a-c f-j-c padding-lr6 bg-color-f7 f11-size t-color-9 b-radius-2 h-20">{{goods.goodsParamName}}</view>
							</view>
						</view>
						<view class="flex f-s-0 f-c">
							<view class="text-price f12-size">{{goods.buyPrice | price}}</view>
							<view class="flex f-j-e margin-t6 t-color-9 f11-size">x{{goods.buyNum}}</view>
						</view>
					</view>
				</view>
			</view>	
			<view class="bg-color-w b-radius-10 padding-lr12 margin-b12">
				<view @click="$refs.type.open()" class="padding-tb10 b-bottom flex f-j-s">
					<text class="f-w-500">{{i18n['退款类型']}}</text>
					<view class="flex flex-1 f-j-e">
						<text v-if="type == ''" class="margin-r4  t-color-9">{{i18n['请选择']}}</text>
						<text v-if="type != ''" class="margin-r4  ">{{type.name}}</text>
						<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9"></text>
					</view>
				</view>
				<view class="padding-tb10  flex f-j-s">
					<text class="f-w-500">{{i18n['退款金额']}}</text>
					<view class="flex flex-1">
						<input v-model="amount" class="input margin-r4" type="number" value="" :placeholder="i18n['最多可申请退还金额¥1'] | i18n(goods.buyTotalPrice)"/>
						<text class="flex f-a-c f-j-c f-s-0 van-icon van-icon-edit t-color-9"></text>
					</view>
				</view>
			</view>	
			<view class="bg-color-w b-radius-10 padding-12 margin-b12">
				<view class="flex f-a-c  f15-size f-w-b">{{i18n['补充描述和凭证']}}</view>
				<view class="bg-color-f7 b-radius-5 padding-10 margin-t12">
					<textarea v-model="value" class="f12-size h-32" maxlength="200" value="" :placeholder="i18n['补充描述,有助于商家更好处理售后问题']" />
					<view class="flex f-a-c f-j-e f10-size t-color-9 margin-t4">{{value.length}}/200</view>
					<view class="flex f-w">
						<view   v-for="(item,index) in imgs" :style="item | bgimg(300)+''" class="bg-img flex f-s-0 f-j-e w-60 h-60 bg-color-e b-radius-5  t-color-9 margin-t10 margin-r10">
							<text @click="delImg(index)" class="flex f-a-s f-j-c van-icon van-icon-cross t-color-9 f20-size"></text>
						</view>
						<view  @click="addImg" v-if="imgs.length < 9" class="flex f-s-0 f-a-c f-j-c w-60 h-60 bg-color-e b-radius-5 van-icon van-icon-plus t-color-9 margin-t10 margin-r10"></view>
					</view>
				</view>
			</view>
		</view>
		<view class="padding-15" v-if='isIphonex'></view>
		<view class="padding-30"></view>
		<view class="warp-tabbar bg-color-w flex f-a-c f-j-e padding-lr15" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			<view  @click="apply" class="flex flex-1 f-a-c f-j-c flex-1 bg-color-linear-y t-color-w b-radius-30 h-36">
				<text class="t-color-w f-w-500">{{i18n['确认申请']}}</text>
			</view>
		</view>
		<uni-popup ref="type" type="bottom">
			<view class="bg-color-w padding-12 wrap-popup-radius">
				<view class="f15-size margin-b10 flex f-j-c">{{i18n['退款类型']}}</view>
				<view @click="choose(item)" v-for="(item,index) in typeList" class="flex f-a-c f-j-c b-bottom h-50">{{item.name}}</view>
				<view class="padding-20"></view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
@import url('../../static/css/index/index.css');
.input {
	text-align: right;
}
</style>
<script>
	const api = require('../../utils/validate.js');
	const API = require('../../utils/api/order.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				typeList: [],
				type: '',
				value: '',
				amount: '',
				imgs: [],
				goods: '',
			};
		},
		onLoad: function() {
			self = this;
			this.init();
			$.setTitle(self.i18n['申请售后']);
		},
		methods: {
			apply() {
				let check = api.validate([
					{
						value: this.type,
						text:this.i18n['请选择退款类型'],
						rules: ''
					},
					{
						value: this.amount,
						text:this.i18n['请填写退款金额'],
						rules: ''
					},
					{
						value: this.value,
						text:this.i18n['请填写退款原因'],
						rules: ''
					},
					
				]);
				if(!check){return};
				if(Number(self.amount) > Number(self.goods.buyTotalPrice)) {
					self.amount = self.goods.buyTotalPrice;
					$.$toast(this.i18n['退款金额不能高于商品金额']);return;
				}
				$.ajax({
					url: API.refundOrderApi,
					data: {
						orderDetailId: self.goods.id,
						refundInd: self.type.value,
						refundAmount: self.amount,
						reason: self.value,
						img: self.imgs.join('|')
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['提交成功,等待审核']);
						self.back(1,2000);
					}
				})
			},
			delImg(index) {
				self.imgs.splice(index,1);
			},
			addImg() {
				if(self.imgs.length >= 9){return}
				$.uploadimg({
					count: 9-self.imgs.length,
					success(res) {
						self.imgs.push(res.imgUrl);
					}
				})
			},
			choose(info) {
				this.type = info;
				this.$refs.type.close();
			},
			getData() {
				this.typeList = [
					{name: this.i18n['仅退款'],value: '1',},{name: this.i18n['退货退款'],value: '2',}
				]
				let info = uni.getStorageSync('comment') ? uni.getStorageSync('comment') : '';
				this.goods = info;
				self.amount = self.goods.buyTotalPrice;
				console.log(this.goods);
			},
			init() {
				this.getData()
			},
		},
		computed: {
			i18n() {
				return this.$t('refund')
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
			if(this.page < this.totalPage) {
				this.page += 1;
				this.getList();
			}
		}
	}
</script>
