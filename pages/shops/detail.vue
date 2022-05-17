<template>
	<view class="contain">
		<view class="fixed-top flex h-44 bg-color-f3" :style="{'padding-top': top + 'px'}">
			<view @click="back(1)" class="flex f-a-c f-j-c padding-lr12 van-icon van-icon-arrow-left f20-size"></view>
			<view class="flex flex-1 f-a-c margin-r4">
				<view class="flex flex-1 f-a-c h-32 bg-color-w b-radius-30 padding-lr10">
					<text class="flex f-a-c van-icon van-icon-search f16-size margin-r4"></text>
					<text class="t-color-9">{{i18n['搜索商品']}}</text>
				</view>
			</view>
			<view @click="$refs.menuBtn.openShare();" class="flex f-a-c f-j-c padding-lr5 van-icon van-icon-share-o f20-size"></view>
			<view @click="$refs.menuBtn.open()" class="flex f-a-c f-j-c padding-lr5 van-icon van-icon-bars f20-size"></view>
			<view @click="go('/pages/cart/index?type=goods')" class="flex f-a-c f-j-c padding-lr5 van-icon van-icon-shopping-cart-o f20-size "></view>
			<view class="padding-lr2"></view>
			<xcx-header></xcx-header>
		</view>
		<view :style="{'padding-top': top+44+'px'}"></view>
		<view class="wrap-banner" >
			<swiper class="wrap-banner" @change="changeSwiper" :indicator-dots="false" :loop="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item @click="previewImg(item)" v-for="item in banner">
					<view class=" h100 bg-img" :style="item | bgimg(700)+''"></view>
				</swiper-item>
			</swiper>
			<view class="flex f-a-c f-j-c wrap-dot  b-radius-30 t-color-w f10-size">{{bannerIndex+1}}/{{banner.length}}</view>
		</view>
		
		<view class="padding-12">
			<view class="bg-color-w b-radius-10 padding-12">
				<view class="flex f-j-s">
					<view class="flex f-a-c">
						<view class="text-price f18-size f-w-b t-color-p margin-r8">{{goods.price}}</view>
						<view class="flex f-a-c f10-size t-color-9">
							<text class="margin-r4">{{i18n['价格']}}</text>
							<text class="text-price del-line">{{goods.price}}</text>
						</view>
					</view>
					<view class="w-50 wrap-coupon-btn flex f-a-c f-j-c h-20 bg-color-linear-r t-color-w">
						<text class="f10-size ">领券</text>
						<text class="flex f-a-c van-icon van-icon-arrow f10-size"></text>
					</view>
				</view>
				<view class="flex f-a-c f-j-s margin-t6">
					<view class="flex f-a-c f-j-c h-16 b-radius-30 t-color-w bg-color-r f10-size padding-lr6">{{i18n['自营']}}</view>
					<view class="f10-size t-color-9">{{i18n['月销']}} {{goods.sellNum}}</view>
				</view>
				<view class="f12-size f-w-b margin-t6">{{goods.title}}</view>
			</view>
			<view class="bg-color-w b-radius-10 padding-12 margin-t12">
				<view @click="$refs.sku.open()" class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">{{i18n['选择']}}</view>
					<view class="flex  flex-1 f-c padding-lr10">
						<view class="flex f-a-c">
							<text class="f12-size margin-r2" v-if="index <= 2" v-for="(item,index) in skuInfoList">{{item.attrKey}}</text>
						</view>
						<view class="flex f-w" v-if="skuInfoList[0] && skuInfoList[0].valList.length > 0">
							<view  v-for="(child,idx) in skuInfoList[0].valList" class="flex f-a-c f-j-c f-s-0 b-radius-2 bg-color-f7 t-color-9 margin-r12 margin-t12 h-30 f12-size padding-lr10">{{child.value}}</view>
							<view v-if="skuInfoList.length > 0" class="flex f-a-c f-j-c f-s-0 b-radius-2 bg-color-f7 t-color-9 margin-r12 margin-t12 h-30 f12-size padding-lr10">更多规格可选</view>
						</view>
					</view>
					<view class="flex f-a-s " style="padding-top: 3px;">
						<text class="flex f-j-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></text>
					</view>
				</view>
				<view class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">{{i18n['发货']}}</view>
					<view class="flex f12-size flex-1 padding-lr10">
						<text class="margin-r12">{{fahuo.province}}{{fahuo.city}}</text>
						<!-- <text class="margin-r12 t-color-9">|</text>
						<text class="margin-r12">快递：免运费</text> -->
					</view>
					<view class="flex f-a-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></view>
				</view>
				<view @click="$refs.goodsParams.open()" class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">{{i18n['参数']}}</view>
					<view class="flex f12-size flex-1 padding-lr10">
						<text class="f12-size margin-r2" v-if="index <= 2" v-for="(item,index) in goodsParams">{{item.name}}</text>
					</view>
					<view class="flex f-a-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></view>
				</view>
			</view>
			
			<view class="bg-color-w b-radius-10 padding-12 margin-t12">
				<view class="flex f-a-c f-j-s">
					<view class="f-w-b">{{i18n['宝贝评价']}}(100+)</view>
					<view class="flex f-a-c">
						<text class="f10-size t-color-y margin-r4">{{i18n['查看全部']}}</text>
						<text class="flex f-a-c van-icon van-icon-arrow f10-size t-color-y"></text>
					</view>
				</view>
				<view class="flex margin-t12">
					<view class="flex w-30 h-30 b-radius bg-color margin-r12"></view>
					<view class="flex f-c f-j-s">
						<text class="f10-size">dsasdasa</text>
						<text class="f10-size t-color-9">22天前</text>
					</view>
				</view>
				<view class="f12-size margin-t10">查看全部查看全部查看全部查看全部查看全部查看全部</view>
			</view>
			
			<view class="bg-color-w b-radius-10 padding-12 margin-t12">
				<view class="flex">
					<view class="flex w-50 h-50 b-radius bg-img margin-r12" :style="shop.logo | bgimg(300)+''"></view>
					<view class="flex f-c f-j-c flex-1">
						<text class="f15-size f-w-b">{{goods.shopName}}</text>
						<text class="f12-size t-color-9 margin-t4">{{i18n['1人关注店铺'] | i18n(2)}}</text>
					</view>
					<view class="flex f-s-0 f-c wrap-shops-pj f-j-c">
						<view class="flex f-a-c f10-size t-color-9">{{i18n['宝贝描述']}} 4.7 低</view>
						<view class="flex f-a-c f10-size t-color-9 margin-t2">{{i18n['卖家服务']}} 4.7 低</view>
						<view class="flex f-a-c f10-size t-color-9 margin-t2">{{i18n['物流服务']}} 4.7 低</view>
					</view>
				</view>
				<view class="flex f-a-c f-j-c padding-10 b-bottom">
					<view class="flex f-a-c f-j-c h-24 b-color-y b-radius-30 t-color-y f12-size padding-lr10 margin-r12">{{i18n['进店逛逛']}}</view>
					<view class="flex f-a-c f-j-c h-24 bg-color-p t-color-w b-radius-30 f12-size padding-lr10">{{i18n['全部宝贝']}}</view>
				</view>
				<view class="padding-tb6"></view>
				<view class="flex f-a-c f-j-s">
					<text class="f12-size f-w-b">{{i18n['店铺推荐']}}</text>
					<view class="flex f-a-c">
						<text class="f10-size t-color-y">{{i18n['查看全部']}}</text>
						<text class="flex f-a-c van-icon van-icon-arrow t-color-y f12-size"></text>
					</view>
				</view>
				<view class="flex f-w ">
					<view v-for="item in 5" class="flex  f-s-0  f-c pintuan-item">
						<view class="h-100 bg-img bg-color b-radius-8"></view>
						<view class="f10-size line1 margin-t4">{{goods.title}}</view>
						<view class="flex f-a-c f-j-s margin-t4">
							<view class="text-price f16-size t-color-y">189.00</view>
						</view>
					</view>
				</view>
				
			</view>
			
		</view>
		<view class="flex f-a-c f-j-c no-more t-color-9 f12-size margin-t2">{{i18n['宝贝详情']}}</view>
		<view class="padding-tb6"></view>
		<rich-text :nodes="goods.detail | html"></rich-text>
		<view  :style="{'padding-bottom': isIphonex ? '84px' : '50px'}"></view>
		<view class="fixed-top bottom-btn bg-color-w flex padding-lr12 h-50" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			<view class="flex flex-1 f-j-s margin-r20">
				<view class="flex f-c f-a-c f-j-c">
					<text class="flex f-a-c van-icon van-icon-shop-o f18-size t-color-y"></text>
					<text class="f10-size t-color-9 margin-t2">{{i18n['店铺']}}</text>
				</view>
				<view class="flex f-c f-a-c f-j-c">
					<text class="flex f-a-c van-icon van-icon-chat-o f18-size "></text>
					<text class="f10-size t-color-9 margin-t2">{{i18n['客服']}}</text>
				</view>
				<view @click="like" class="flex f-c f-a-c f-j-c">
					<text :class="isLike ? 't-color-r van-icon-star' : 'van-icon-star-o '" class="flex f-a-c van-icon f18-size "></text>
					<text class="f10-size t-color-9 margin-t2">{{i18n['收藏']}}</text>
				</view>
			</view>
			<view class="flex f-a-c">
				<view class="flex b-radius-30 h-34 over-h">
					<view @click="$refs.sku.open()" class="flex f-a-c f-j-c bg-color-linear-y t-color-w f12-size w-100">{{i18n['加入购物车']}}</view>
					<view class="flex f-a-c f-j-c bg-color-p t-color-w f12-size w-100">{{i18n['立即购买']}}</view>
				</view>
			</view>
		</view>
		
		<!-- 产品参数 -->
		<uni-popup ref="goodsParams" type="bottom" >
			<view class="padding-12 wrap-popup-radius bg-color-w">
				<view class="flex f-a-c f-j-c f16-size margin-b10">{{i18n['产品参数']}}</view>
				<view class="b-bottom padding-tb10 flex" v-for="item in goodsParams">
					<text class="flex f-s-0 w-80 f12-size t-color-9">{{item.name}}</text>
					<view class="flex flex-1  f12-size t-color-0">{{item.value}}</view>
				</view>
			</view>
		</uni-popup>
		
		<!-- 规格弹窗 -->
		<uni-popup ref="sku" type="bottom" >
			<view class="padding-10 wrap-popup-radius bg-color-w">
				<view class="flex">
					<block v-if="sku == ''">
						<view @click="previewImg(goods.mainImg)" class="flex f-s-0 w-80 h-80 b-radius-5 bg-img margin-r12" :style="goods.mainImg | bgimg(300)+''"></view>
						<view class="flex flex-1 f-c">
							<view class="t-color-y f18-size f-w-b text-price">{{goods.price}}</view>
							<view class="flex f11-size t-color-9">{{i18n['库存']}} 99</view>
						</view>
					</block>
					<block v-if="sku != ''">
						<view @click="previewImg(sku.img)" class="flex f-s-0 w-80 h-80 b-radius-5 bg-img margin-r12" :style="sku.img | bgimg(300)+''"></view>
						<view class="flex flex-1 f-c f-j-c">
							<view class="flex f-a-c ">
								<view class="t-color-y f18-size f-w-b text-price">{{sku.price}}</view>
							</view>
							<view class="flex f11-size t-color-9">{{i18n['库存']}} {{sku.stock}}</view>
						</view>
					</block>
					
					<view @click="$refs.sku.close()" class="flex f-a-s">
						<text class="flex f-a-c van-icon van-icon-close t-color-3"></text>
					</view>
				</view>
				<view class="padding-tb6 b-bottom"></view>
				<scroll-view scroll-y="true" style="height: 60vh;">
					<view v-for="(item,index) in skuInfoList" class="padding-tb10 b-bottom">
						<view>{{item.attrKey}}</view>
						<view class="flex f-w">
							<view @click="chooseSku(index,child)" v-for="(child,idx) in item.valList" :class="child['isDis'] ? 't-color-9' : chooseSkuList[index] && chooseSkuList[index].id == child.id ? 't-color-y b-color-y' : ''" class="flex f-a-c f-j-c f-s-0 b-radius-2 bg-color-f7 margin-r12 margin-t12 h-30 f12-size padding-lr10">{{child.value}}</view>
						</view>
					</view> 
					<view class="padding-tb10 flex f-j-s">
						<view class="flex f-a-c">{{i18n['购买数量']}}</view>
						<view class="flex">
							<view class="flex f-a-c f-j-c add-reduce dis"></view>
							<view class="flex f-a-c f-j-c add-num">{{num}}</view>
							<view class="flex f-a-c f-j-c add-btn"></view>
						</view>
					</view> 
				</scroll-view>
				<view class="flex b-radius-30 h-34 over-h margin-t12">
					<view @click="addCar" class="flex f-a-c flex-1 f-j-c bg-color-linear-y t-color-w f12-size w-100">{{i18n['加入购物车']}}</view>
					<view class="flex f-a-c flex-1 f-j-c bg-color-p t-color-w f12-size w-100">{{i18n['立即购买']}}</view>
				</view>
				<view  :style="{'padding-bottom': isIphonex ? '24px' : ''}"></view>
			</view>
		</uni-popup>
		<menu-btn ref="menuBtn"></menu-btn>
	</view>
</template>
<style scoped>
@import url('../../static/css/shops/detail.css');
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
				goods: '',
				id: '',
				banner: [],
				bannerIndex: 0,
				goodsParams: [],
				skuInfoList: [],//规格属性
				skuList: [],//规格价格表
				chooseSkuList: [],
				sku: '',//选中规格后的商品信息
				attrSymbolPath: '',
				num: 1,
				shop: '',
				isLike: false,
				fahuo: '',
			};
		},
		onLoad: function(options) {
			self = this;
			this.id = options.id ? options.id : 6;
			this.init();
		},
		methods: {
			changeSwiper(e) {
				self.bannerIndex = e.detail.current;
			},
			like() {
				$.ajax({
					url: API.likeGoodsApi,
					data: {
						goodsId: self.id
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						self.isLike = !self.isLike;
					}
				})
			},
			addCar() {
				let postData = {
					goodsId: self.id,
					attrSymbolPath: self.attrSymbolPath,
					num: self.num,
				}
				$.ajax({
					url: API.addCarApi,
					data: postData,
					method: 'POST',
					success(res) {
						$.$toast('操作成功');
						self.$refs.sku.close();
					}
				})
			},
			chooseSku(index,data) {
				if(data.isDis){return}
				this.num = 1;
				this.$set(this.chooseSkuList,index,data);
				this.$set(this.skuInfoList[index],'isChoose',true);
				this.getSkuInfo();
			},
			clacSkuStock(attrSymbolPath) {
				if(this.skuList.length > 0) {
					self.skuInfoList.forEach((ele1,idx1) => {//初始化默认都可选择，避免保留上次的禁止项
						ele1.valList.forEach((ele2,idx2) => {
							ele2['isDis'] = false;
						})
					})
					
					this.skuList.forEach((ele,index) => {
						if(ele.attrSymbolPath.indexOf(attrSymbolPath) >= 0 && ele.stock <= 0) {//遍历规格找出该规格下的库存判断
							self.skuInfoList.forEach((ele1,idx1) => {//规格数组里面找未选中的判断是否有库存
								if(!ele1.isChoose) {//当前选中的无需判断
									ele1.valList.forEach((ele2,idx2) => {
										if(ele.attrSymbolPath.indexOf(ele2.id) >= 0){//无库存包含的id禁止选择
											ele2['isDis'] = true;
										}else{
											ele2['isDis'] = false;
										}
									})
								}
							})
						}
					})
				}
				
			},
			getSkuInfo() {
				if(this.skuList.length > 0) {
					let attrSymbolPathArr = [];
					let attrSymbolPath = '';
					let isAll = true;//默认规格全部以选择
					this.chooseSkuList.forEach((ele,index) => {
						if(ele.id) {
							attrSymbolPathArr.push(ele.id);
						}else{
							isAll = false;
							self.attrSymbolPath = '';
						}
					})
					self.clacSkuStock(attrSymbolPathArr.join('/'));
					if(!isAll){return;}//未全部选中不执行下一步
					attrSymbolPath = attrSymbolPathArr.join('/');
					this.skuList.forEach((ele,index) => {
						if(ele.attrSymbolPath == attrSymbolPath) {
							self.sku = ele;
							self.attrSymbolPath = attrSymbolPath;
						}
					})
				}
			},
			getDetail() {
				$.ajax({
					url: API.goodsDetailApi,
					data: {goodsId:self.id},
					method: 'GET',
					success(res) {
						let info = res.data ? res.data : '';
						if(info == ''){return};
						self.goods =  info.goods;
						self.banner = self.goods.goodsImg.split('|');
						self.goodsParams = info.goodsParams ? info.goodsParams : [];
						self.skuList = info.goodsSku.skuList ? info.goodsSku.skuList : [];
						self.skuInfoList = info.goodsSku.attrKeyResultList ? info.goodsSku.attrKeyResultList : [];
						self.chooseSkuList = new Array(self.skuInfoList.length);
						self.shop = info.shop;
						self.isLike = info.isCollectGoods;
						self.fahuo = info.freight ? info.freight : '';
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
				return this.$t('goodsdetail')
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
