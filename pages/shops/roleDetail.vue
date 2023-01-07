<template>
	<view class="contain">
		<view class="fixed-top flex h-44 bg-color-f3" :style="{'padding-top': top + 'px'}">
			<view @click="back(1)" class="flex f-a-c f-j-c padding-lr12 van-icon van-icon-arrow-left f20-size"></view>
			<view class="flex flex-1 f-a-c margin-r4">
				<view @click="go('/pages/search/index')" class="flex flex-1 f-a-c h-32 bg-color-w b-radius-30 padding-lr10">
					<text class="flex f-a-c van-icon van-icon-search f16-size margin-r4"></text>
					<text class="t-color-9">{{i18n['搜索商品']}}</text>
				</view>
			</view>
			<view @click="$refs.menuBtn.openShare();" class="flex f-a-c f-j-c padding-lr5 van-icon van-icon-share-o f20-size"></view>
			<view @click="$refs.menuBtn.open()" class="flex f-a-c f-j-c padding-lr5 van-icon van-icon-bars f20-size"></view>
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
						<view class="text-price-role f18-size f-w-b t-color-p ">{{goods.point}}</view>
						<view v-if="goods.price > 0" class=" f18-size f-w-b t-color-p padding-lr2">+</view>
						<view v-if="goods.price > 0" class="text-price f18-size f-w-b t-color-p margin-r8">{{goods.price}}</view>
						<view class="flex f-a-c f10-size t-color-9">
							<text class="margin-r4">{{i18n['价格']}}</text>
							<text class="text-price del-line">{{goods.oriPrice}}</text>
						</view>
					</view>
				</view>
				<view v-if="shop.selfStatus == 1" class="flex f-a-c f-j-s margin-t6">
					<view class="flex f-a-c f-j-c h-16 b-radius-30 t-color-w bg-color-r f12-size padding-lr6">{{i18n['自营']}}</view>
					<view class="f12-size t-color-9">{{i18n['月销']}} {{goods.sellNum}}</view>
				</view>
				<view class="f13-size f-w-b margin-t6">{{goods.title}}</view>
			</view>
			<view class="bg-color-w b-radius-10 padding-12 margin-t12">
				<view @click="$refs.sku.open()" class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">{{i18n['选择']}}</view>
					<view class="flex  flex-1 f-c padding-lr10">
						<view class="flex f-a-c">
							<text class="f12-size margin-r2" v-if="index <= 2" v-for="(item,index) in skuInfoList">{{item.attrKey}}</text>
						</view>
						<view class="flex f-w" v-if="skuInfoList[0] && skuInfoList[0].valList.length > 0">
							<view v-if="idx <= 5" v-for="(child,idx) in skuInfoList[0].valList" class="flex f-a-c f-j-c f-s-0 b-radius-2 bg-color-f7 t-color-9 margin-r12 margin-t12 h-30 f12-size padding-lr10">{{child.value}}</view>
							<view v-if="skuInfoList.length > 0" class="flex f-a-c f-j-c f-s-0 b-radius-2 bg-color-f7 t-color-9 margin-r12 margin-t12 h-30 f12-size padding-lr10">{{i18n['更多规格可选']}}</view>
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
					<view v-if="shop.selfStatus != 1" class="flex f-s-0 f10-size t-color-9">{{i18n['月销']}} {{goods.sellNum}}</view>
					<view class="flex f-a-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></view>
				</view>
				<view v-if="shop.serviceName" @click="$refs.goodsService.open()" class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">{{i18n['服务']}}</view>
					<view class="flex f12-size flex-1 padding-lr10">
						<text class="line1">{{shop.serviceName}}</text>
					</view>
					<view class="flex f-a-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></view>
				</view>
				<view v-if="goodsParams.length > 0" @click="$refs.goodsParams.open()" class="flex padding-tb8">
					<view class="flex f-s-0 f12-size t-color-9 margin-r10">{{i18n['参数']}}</view>
					<view class="flex f12-size flex-1 padding-lr10">
						<text class="f12-size margin-r2" v-if="index <= 2" v-for="(item,index) in goodsParams">{{item.name}}</text>
					</view>
					<view class="flex f-a-c f-s-0 van-icon f12-size van-icon-arrow t-color-9"></view>
				</view>
				
			</view>
			
		</view>
		<view class="flex f-a-c f-j-c no-more t-color-9 f12-size margin-t2">{{i18n['宝贝详情']}}</view>
		<view class="padding-tb6"></view>
		<rich-text :nodes="goods.detail | html"></rich-text>
		<view v-if="isIphonex" class="padding-15"></view>
		<view  :style="{'padding-bottom': isIphonex ? '84px' : '50px'}"></view>
		<view class="fixed-top bottom-btn bg-color-w flex  f-j-s padding-lr12 h-50 box-c" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			
			<view class="flex f-a-c flex-1">
				<view   class="flex flex-1 b-radius-30 h-40 over-h">
					<view  @click="$refs.sku.open()" class="flex f-a-c f-j-c flex-1 bg-color-p t-color-w f12-size ">{{i18n['立即兑换']}}</view>
				</view>
			</view>
		</view>
		
		<!-- 产品服务 -->
		<uni-popup ref="goodsService" type="bottom" >
			<view class="padding-12 wrap-popup-radius bg-color-w">
				<view class="flex f-a-c f-j-c f16-size margin-b10">{{i18n['服务']}}</view>
				<scroll-view scroll-y="true" style="height: 50vh;">
					<view class=" padding-tb10 " >
						<view class="f12-size t-color-0">{{shop.serviceName}}</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
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
		<uni-popup ref="sku" type="bottom" @change="changeSkuPopup">
			<view class="padding-10 wrap-popup-radius bg-color-w">
				<view class="flex">
					<block v-if="sku == ''">
						<view @click="previewImg(goods.mainImg)" class="flex f-s-0 w-80 h-80 b-radius-5 bg-img margin-r12" :style="goods.mainImg | bgimg(300)+''"></view>
						<view class="flex flex-1 f-c">
							<view class="flex f-a-c">
								<view class="t-color-y f18-size f-w-b text-price-role">{{goods.point}}</view>
								<view class="t-color-y f18-size f-w-b padding-lr2" v-if="goods.price > 0">+</view>
								<view class="t-color-y f18-size f-w-b text-price" v-if="goods.price > 0">{{goods.price}}</view>
							</view>
							
							<view class="flex f11-size t-color-9">{{i18n['库存']}} {{goods.stock}}</view>
						</view>
					</block>
					<block v-if="sku != ''">
						<view @click="previewImg(sku.img)" class="flex f-s-0 w-80 h-80 b-radius-5 bg-img margin-r12" :style="sku.img | bgimg(300)+''"></view>
						<view class="flex flex-1 f-c f-j-c">
							<view class="flex f-a-c ">
								<!-- 阶梯拼团时需要计算实际价格 -->
								<view v-if="isPT(2)" class="t-color-y f18-size f-w-b text-price">{{updateSkuPrice()}}</view>
								<view v-else class="t-color-y f18-size f-w-b text-price">{{sku.price}}</view>
							</view>
							<view class="flex f11-size t-color-9">{{i18n['库存']}} {{sku.stock}}</view>
						</view>
					</block>
					
					<view @click="$refs.sku.close()" class="flex f-a-s">
						<text class="flex f-a-c van-icon van-icon-close t-color-3"></text>
					</view>
				</view>
				<view class="padding-tb6 b-bottom"></view>
				<scroll-view scroll-y="true" style="height: 30vh;">
					<view v-for="(item,index) in skuInfoList" class="padding-tb10 b-bottom">
						<view>{{item.attrKey}}</view>
						<view class="flex f-w">
							<view @click="chooseSku(index,child)" v-for="(child,idx) in item.valList" :class="child['isDis'] ? 't-color-9' : chooseSkuList[index] && chooseSkuList[index].id == child.id ? 't-color-y b-color-y' : ''" class="flex f-a-c f-j-c f-s-0 b-radius-2 bg-color-f7 margin-r12 margin-t12 h-30 f12-size padding-lr10">{{child.value}}</view>
						</view>
					</view>
					<view class="padding-tb10 flex f-j-s">
						<view class="flex f-a-c">{{i18n['购买数量']}}</view>
						<view class="flex">
							<view @click="addNum('-')" :class="num <= 1 ? 'dis' : ''" class="flex f-a-c f-j-c add-reduce "></view>
							<view class="flex f-a-c f-j-c add-num">{{num}}</view>
							<view @click="addNum('+')" class="flex f-a-c f-j-c add-btn"></view>
						</view>
					</view> 
				</scroll-view>
				<view class="flex b-radius-30 h-40 over-h margin-t12">
					<block >
						<view @click="buy()" class="flex f-a-c flex-1 f-j-c bg-color-p t-color-w f12-size w-100">{{i18n['立即兑换']}}</view>
					</block>
				</view>
				<view  :style="{'padding-bottom': isIphonex ? '24px' : ''}"></view>
			</view>
		</uni-popup>
		<menu-btn ref="menuBtn"></menu-btn>
		<notice ></notice>
	</view>
</template>
<style scoped>
@import url('../../static/css/shops/detail.css');
</style>
<script>
	import couponList from '../common/couponlist.vue';
	import groupList from './components/grouplist.vue';
	import shopSpread from './components/shopspread.vue';
	const API = require('../../utils/api/shops.js').default;
	const $ = require('../../utils/api.js');
	let self;
	let inter;
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
				couponList: [],
				commentList: [],
				now: 0,
				now1: 0,
				day: 0,
				hour: 0,
				minute: 0,
				second: 0,
				group: '',
				groupId: '',
				joinGroupId: '',
				isShareGroup: false,
				groupList: [],
				pintuanNum: 0,
				groupListConfig: [],
				groupConfig: '',
			};
		},
		onLoad: function(options) {
			self = this;
			this.id = options.id ? options.id : 6;
			this.joinGroupId = options.joinId ? options.joinId : '';
		},
		onShow() {
			this.init();
		},
		methods: {
			getImgs(imgs) {
				if(!imgs){return;}
				if(imgs.indexOf('|') > 0) {
					return imgs.split('|')
				}else{
					return [imgs]
				}
			},
			updateSkuPrice() {//阶梯拼团时需自行更新价格
				if(this.groupConfig != ''){
					return (this.sku.price*this.groupConfig.discounts/100).toFixed(2);
				}else{
					return this.sku.price
				}
			},
			chooseGroupConfig(info) {
				if(this.group == '') {//空则可选择自己的阶梯，非空时加入别人的团
					this.groupConfig = info;
				}
			},
			joinGroup(info) {
				this.group = info;
				if(this.isPT(2)) {
					this.groupListConfig.forEach((ele,index)=> {
						if(ele.id == self.group.goodsGroupId) {
							self.groupConfig = ele;
						}
					})
				}
				this.$refs.sku.open()
			},
			changeSkuPopup(e) {//监听规格弹窗关闭初始化数据
				if(!e.show) {
					this.clearData();
				}
			},
			clearData() {
				if(this.isShareGroup){return;}//分享链接一直保持参团信息
				this.group = '';
				this.groupId = '';
			},
			oriPrice() {
				if(this.skuList.length > 0) {
					return this.skuList[0]['oriPrice']
				}else{
					return ''
				}
			},
			isMS() {
				return self.goods.type == 2
			},
			isPT(type) {//1普通拼团>>2阶梯拼团
				if(type){
					if(type == 1) {
						return self.goods.type == 3 && self.goods.groupType == 1
					}
					if(type == 2) {
						return self.goods.type == 3 && self.goods.groupType == 2
					}
				}else{
					return self.goods.type == 3
				}
			},
			getMStype(type) {
				if(type == 'start') {
					return self.now < self.goods.seckillBeginTime
				}
				if(type == 'in') {
					return self.now >= self.goods.seckillBeginTime && self.now <= self.goods.seckillEndTime
				}
				if(type == 'end') {
					return self.now > self.goods.seckillEndTime
				}
			},
			getCommonList() {
				$.ajax({
					url: API.goodsCommentListApi,
					data: {
						page: 1,
						pageSize: 10,
						goodsId: self.id,
						goodsComment: '',//1好评>>2中评>>3差评>>4有图
					},
					method: 'GET',
					success(res) {
						self.commentList = res.data.list ? res.data.list : [];
					}
				})
			},
			addNum(type) {
				// if(this.attrSymbolPath == '') {
				// 	$.$toast(self.i18n['请选择正确的规格']);return;
				// }
				if(type == '-') {
					if(self.num > 1) {
						self.num -= 1;
					}
				}else{
					if(self.goods.stock > self.num) {
						self.num += 1;
					}
				}
			},
			groupBuy(type) {
				if(this.attrSymbolPath == '') {
					$.$toast(self.i18n['请选择正确的规格']);return;
				}
				//type1，单独购买，2创建拼团,3有拼团信息的
				if(type == 1){
					this.groupId = '-1';
					this.buy();
				}else{
					//-1单独购买>>0普通拼团>>其他为阶梯拼团ID
					this.groupId = self.isPT(2) ? self.groupConfig.id : 0;
					if(type == 2) {
						this.buy();
					}else{
						$.ajax({
							url: API.validateGroupApi,
							data: {groupId: this.group.id},
							method: 'GET',
							success(res) {
								self.joinGroupId = self.group.id;
								self.buy();
							}
						})
					}
				}
			},
			buy() {
				let postData = {
						goodsId: self.id,
						buyNum: self.num,
					};
				uni.setStorageSync('orderData',postData);
				this.go('/pages/order/sureRole');
				this.$refs.sku.close();
			},
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
				if(this.attrSymbolPath == '') {
					$.$toast(self.i18n['请选择正确的规格']);return
				}
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
				this.getSkuInfo(index);
			},
			clacSkuStock(attrSymbolPath) {
				if(this.skuList.length > 0) {
					self.skuInfoList.forEach((ele1,idx1) => {//初始化默认都可选择，避免保留上次的禁止项
						ele1.valList.forEach((ele2,idx2) => {
							ele2['isDis'] = false;
						})
					})
					
					this.skuList.forEach((ele,index) => {
						// if(attrSymbolPath == ele.attrSymbolPath && ele.stock <= 996) {
						// 	self.chooseSkuList[self.chooseSkuList.length-1] = '';
						// 	self.getSkuInfo(self.chooseSkuList.length-1)
						// }else 
						if(isSame(ele.attrSymbolPath) && ele.stock <= 0) {//遍历规格找出该规格下的库存判断
							self.skuInfoList.forEach((ele1,idx1) => {//规格数组里面找未选中的判断是否有库存
								if(!isAttr(ele1)) {//当前选中的无需判断
									ele1.valList.forEach((ele2,idx2) => {
										if(ele.attrSymbolPath.indexOf(ele2.id) >= 0){//无库存包含的id禁止选择
											ele2['isDis'] = true;
										}
									})
								}
							})
						}
					})
				}
				function isSame (keys) {//判断所选是否在规格内
					let chooseArr = attrSymbolPath.split('/');
					let same = true;//默认包含
					chooseArr.forEach((ele,index) => {
						if(keys.indexOf(ele) < 0) {
							same = false;return;
						}
					})
					return same;
				}
				function isAttr (arr) {//判断该规格类型是否已选
					let attr = false;//默认不包含
					arr.valList.forEach((ele,index) => {
						if(attrSymbolPath.indexOf(ele.id) >= 0) {
							attr = true;return;
						}
					})
					return attr;
				}
				
			},
			getSkuInfo(skuIndex) {
				self.attrSymbolPath = '';
				if(this.skuList.length > 0) {
					let attrSymbolPathArr = [];
					let attrSymbolPath = '';
					let isAll = true;//默认规格全部以选择
					this.chooseSkuList.forEach((ele,index) => {
						if(ele != '' && ele.id) {
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
							if(ele.stock <= 0) {
								$.$toast('库存不足');
								self.chooseSkuList[skuIndex] = '';
								self.getSkuInfo(skuIndex);//重新计算没库存的不可选
							}else{
								self.sku = ele;
								self.attrSymbolPath = attrSymbolPath;
							}
							
						}
					})
				}
			},
			getDetail() {
				$.ajax({
					url: API.roleGoodsDetailApi,
					data: {
						goodsId:self.id,
					},
					method: 'GET',
					success(res) {
						let info = res.data ? res.data : '';
						if(info == ''){return};
						self.goods =  info.goods;
						self.banner = self.goods.goodsImg.split('|');
						
					}
				})
			},
			setSkuList(len) {
				if(self.chooseSkuList.length <= 0) {//前往确认订单页面后返回保留原数据
					// self.chooseSkuList = [];
					for(var i=0;i<len;++i) {
						self.chooseSkuList.push('');
					}
				}
				
			},
			startInterval() {
				clearInterval(inter);
				let first = true;
				inter = setInterval(() => {
					self.now += 1000;
					if(self.isMS()) {
						//判断是否时第一次秒杀开始时间
						if(first && self.now >= self.goods.seckillBeginTime && self.now <= self.goods.seckillEndTime) {
							first = false;
							self.caleTime();
						}
					}
					
				},1000)
			},
			caleTime() {
				let time = 0;
				if(self.now < self.goods.seckillBeginTime) {//暂未开始
					time = self.goods.seckillBeginTime;
				}else if(self.now >= self.goods.seckillBeginTime && self.now <= self.goods.seckillEndTime) {
					time = self.goods.seckillEndTime;
				}
				if(time <= 0){return};
				let cha = Math.abs(time-self.now);
				this.day = parseInt(cha/60/60/1000/24);
				this.hour =  parseInt(cha/60/60/1000%24);
				this.minute = parseInt(cha/1000/60%60);
				this.second = parseInt(cha/1000%60);
			},
			init() {
				this.getDetail();
				this.getCommonList();
			},
		},
		onHide() {
			clearInterval(inter);
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
		components: {couponList,groupList,shopSpread},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
