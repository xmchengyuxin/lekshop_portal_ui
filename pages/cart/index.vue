<template>
	<view class="contain">
		<view class="flex fixed-top h-44 bg-color-f7"  :style="{'padding-top': top + 'px'}">
			<view @click="back(1)" v-if="type != ''" class="flex f-s-0 padding-lr10 f-a-c f-j-c van-icon van-icon-arrow-left f20-size"></view>
			<view v-else class="flex f-s-0 padding-lr10 f-a-c f-j-c van-icon  f20-size"></view>
			<view class="flex flex-1 f-a-c f-j-c f16-size">
			{{i18n['购物车']}}
			<text v-if="len > 0" class="f10-size t-color-9 margin-l6">({{i18n['共1件宝贝'] | i18n(len)}})</text>
			</view>
			<view @click="showDel=!showDel" class="flex f-s-0 f-a-c padding-lr10" :class="showDel ? 't-color-y' : ''">{{showDel ? i18n['完成'] : i18n['管理']}}</view>
			<xcx-header></xcx-header>
		</view>
		<view :style="{'padding-top': top+44+'px'}"></view>
		<view class="padding-10">
			<view v-for="(value,key) in list" class="bg-color-w b-radius-5 padding-tb6">
				<view class="flex f-j-s h-40">
					<view class="flex flex-1">
						<view  @click="chooseShops(key)" :class="shops.indexOf(key) >= 0 ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-9'" class="padding-lr10 flex f-a-c f-j-c van-icon  f20-size "></view>
						<view class=" flex f-a-c">
							<text class="flex f-a-c f-j-c van-icon van-icon-shop-collect-o f18-size margin-r4"></text>
							<text class="t-color-0">{{value[0]['shopName']}}</text>
						</view>
					</view>
					<view class="flex f-a-c padding-lr10 van-icon van-icon-arrow t-color-9"></view>
				</view>
				<view v-for="(item,index) in value" class="flex padding-tb6">
					<view  @click="chooseGoods(key,index,item)" :class="item.isChoose ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-9'" class="padding-lr10 flex f-s-0 f-a-c f-j-c van-icon  f20-size "></view>
					<view class="w-90 h-90 b-radius-5 bg-img flex f-s-0" :style="item.goodsMainImg | bgimg(300)+''"></view>
					<view class="padding-lr10 flex flex-1 f-c">
						<view class="flex flex-1 f-c">
							<view class="line2 t-color-6">{{item.goodsName}}</view>
							<view class="flex margin-t4">
								<view class="flex f-a-c f-j-c b-radius-2 bg-color-f7 t-color-9 f10-size h-18 padding-lr6">{{i18n['规格']}}：{{item.goodsParamName}}</view>
							</view>
						</view>
						<view class="flex f-a-c f-j-s">
							<view class="text-price t-color-y f16-size">{{item.buyPrice}}</view>
							<view class="flex">
								<view @click="addCar('-',key,index)" :class="item.num <= 1 ? 'dis' :''" class="flex f-a-c f-j-c add-reduce "></view>
								<view class="flex f-a-c f-j-c add-num">{{item.num}}</view>
								<view @click="addCar('+',key,index)" class="flex f-a-c f-j-c add-btn"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<no-data v-if="list.length <= 0" ></no-data>
		</view>
		<view class="fixed-top wrap-btn  h-50 bg-color-f7 flex f-j-s" :style="{'bottom': !isIphonex ? '50px' : '84px'}">
			<view @click="chooseAll" class="flex padding-lr10 f-a-c">
				<text :class="isAll ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-9'" class="flex f-a-c van-icon  f18-size margin-r4"></text>
				<text class="f11-size">{{i18n['全选']}}</text>
			</view>
			<view v-if="!showDel" class="flex f-a-c padding-lr10">
				<view class="flex f-c">
					<view class="flex f-a-c">
						<text class="f11-size margin-r4">{{i18n['合计']}}:</text>
						<text class="f18-size text-price t-color-y f-w-b margin-r12">{{totalPrice}}</text>
					</view>
					<text class="f11-size">{{i18n['不含运费']}}</text>
				</view>
				
				<view @click="pay" class="flex f-a-c f-j-c b-radius-30 h-32 t-color-w bg-color-linear-y w-80">{{i18n['结算']}}</view>
			</view>
			<view v-if="showDel" class="flex f-a-c padding-lr10">
				<view @click="clearCar" class="flex f-a-c f-j-c b-radius-30 h-28 f10-size t-color-y b-color-y padding-lr12 margin-r12">{{i18n['清空购物车']}}</view>
				<view @click="del" class="flex f-a-c f-j-c b-radius-30 h-28 f10-size t-color-w bg-color-linear-y w-80">{{i18n['删除']}}</view>
			</view>
		</view>
		<view class="padding-30"></view>
		<view class="padding-30"></view>
		<tab-bar :active="3"></tab-bar>
	</view>
</template>
<style scoped>
@import url('../../static/css/cart/index.css');
</style>
<script>
	const API = require('../../utils/api/shops.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				showDel: false,
				list: '',
				shops: [],
				isAll: false,
				totalPrice: 0,
				type: '',
				len: 0,
			};
		},
		onLoad: function(options) {
			self = this;
			self.type = options.type ? options.type : '';
			this.init();
		},
		methods: {
			clearCar() {
				$.ajax({
					url: API.clearCarApi,
					data: {},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						self.totalPrice = 0;
						self.shops = [];
						self.isAll = false;
						self.getList();
					}
				})
			},
			del() {
				let carIds = [];
				for (let key in this.list) {
					this.list[key].forEach((ele,index) => {
						if(ele.isChoose) {
							carIds.push(ele.id);
						}
					})
				}
				if(carIds.length <= 0) {
					$.$toast(self.i18n['请选择商品']);return;
				}
				$.ajax({
					url: API.delCarApi,
					data: {ids: carIds.join(',')},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						self.totalPrice = 0;
						self.shops = [];
						self.isAll = false;
						self.getList();
					}
				})
			},
			pay() {
				let postData = [];
				let isSelected = false;
				let carIds = {};
				for (let key in this.list) {
					let ids = [];
					this.list[key].forEach((ele,index) => {
						if(ele.isChoose) {
							isSelected = true;
							let obj = {
								shopId: ele.shopId,
								skuId: ele.goodsSkuId,
								num: ele.num,
							}
							postData.push(obj);
							ids.push(ele.id);
						}
					})
					carIds[key] = ids.join(',');
				}
				if(!isSelected) {
					$.$toast(self.i18n['请选择商品']);return;
				}
				uni.setStorageSync('orderData',postData);
				uni.setStorageSync('orderCarIds',carIds);
				this.go('/pages/order/sure');
			},
			getPrice() {
				let price = 0;
				for (let key in this.list) {
					this.list[key].forEach((ele,index) => {
						if(ele.isChoose) {
							price += ele.num*ele.buyPrice;
						}
					})
				}
				this.totalPrice = price;
			},
			addCar(type,key,index) {
				let info = this.list[key][index];
				if(info.num <= 1 && type == '-') {
					return;
				}
				$.ajax({
					url: API.addCarNumApi,
					data: {
						carId: info.id,
						num: type == '+' ? '1' : '-1',
					},
					method: 'POST',
					success(res) {
						if(type == '+'){
							info.num += 1;
						}else{
							info.num -= 1;
						}
						self.$set(self.list[key],index,info);
						self.getPrice();
					}
				})
			},
			chooseGoods(key,index,item) {
				if(item.isChoose){
					item.isChoose = false;
				}else{
					item.isChoose = true;
				}
				this.$set(this.list[key],index,item);
				this.isAllChoose();
			},
			chooseAll() {
				if(this.list == ''){return;}
				for (let key in this.list) {
					if(this.isAll) {
						this.shops = [];
					}else{
						this.shops.push(key);
					}
					this.list[key].forEach((ele,index) => {
						if(self.isAll) {
							ele.isChoose = false;
						}else{
							ele.isChoose = true;
						}
						
					})
				}
				this.isAll = !this.isAll;
				self.getPrice();
			},
			isAllChoose() {
				let isAll = true;
				for (let key in this.list) {
					let isAllShopGoods = true;//默认店铺内商品全部勾选
					this.list[key].forEach((ele,index) => {
						if(!ele.isChoose){
							isAll = false;
							isAllShopGoods = false;
						}
					})
					let len = this.shops.indexOf(key);
					if(isAllShopGoods && len < 0) {//判断店铺商品全选，且店铺id不在shops里
						this.shops.push(key);
					}
					if(!isAllShopGoods && len >= 0) {//判断店铺商品非全选，且店铺id在shops里
						this.shops.splice(len,1);
					}
				}
				this.isAll = isAll;
				self.getPrice();
				
			},
			chooseShops(key) {
				let len = this.shops.indexOf(key);
				if(len >= 0) {
					this.shops.splice(len,1);
				}else{
					this.shops.push(key);
				}
				this.list[key].forEach((ele,index) => {
					ele.isChoose = len >= 0 ? false : true;
				})
				this.isAllChoose();
			},
			getList() {
				$.ajax({
					url: API.carListApi,
					isAuth: true,
					data: {},
					method: 'GET',
					success(res) {
						self.list = res.data ? res.data : '';
						self.getGoodsLen();
					}
				})
			},
			getGoodsLen() {
				$.ajax({
					url: API.carGoodsLenApi,
					data: {},
					method: 'GET',
					success(res) {
						self.len = res.data ? res.data : 0;
					}
				})
			},
			init() {
				this.getList();
			},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('cart')
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
