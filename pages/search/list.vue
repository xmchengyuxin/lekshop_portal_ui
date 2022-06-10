<template>
	<view class="contain">
		<view class="fixed-top box-c bg-color-f7" :style="{ 'padding-top': top + 'px' }">
			<view class=" flex h-44 flex ">
				<view @click="back(1)" class="flex padding-lr10 f-a-c van-icon van-icon-arrow-left f20-size"></view>
				<view class="flex f-a-c flex-1">
					<view class="flex flex-1 b-radius-30 h-30 bg-color-w padding-lr10">
						<view @click="changeSort(sort)" class="flex f-a-c van-icon van-icon-search f16-size margin-r8"></view>
						<input @confirm="changeSort(sort)" v-model="title" type="text" class="input">
					</view>
				</view>
				<view @click="sortType == 1 ? sortType=2 : sortType=1" :class="sortType==1?'van-icon-apps-o':'van-icon-bars'" class="flex f-a-c padding-lr10 van-icon  f20-size"></view>
				<xcx-header></xcx-header>
			</view>
			<view class="flex h-40 bg-color-f7">
				<view @click="changeSort('')" :class="sort == '' ? 't-color-p' : ''" class="flex f-a-c f-j-c flex-1 ">{{i18n['综合']}}</view>
				<view @click="changeSort('sell_num desc')" :class="sort == 'sell_num desc' ? 't-color-p' : ''" class="flex f-a-c f-j-c flex-1">{{i18n['销量']}}</view>
				<view @click="changeSort('add_time desc')" :class="sort == 'add_time desc' ? 't-color-p' : ''" class="flex f-a-c f-j-c flex-1">{{i18n['新上架']}}</view>
				<view @click="changeSort('price')" :class="sort == 'price desc' || sort == 'price asc' ? 't-color-p' : ''" class="flex f-a-c f-j-c flex-1">
					<text class="margin-r4">{{i18n['价格']}}</text>
					<view class="flex f-c f-a-c f-j-c">
						<text   :class="sort =='price asc' ? 't-color-p' : ''" class="flex f-a-c f-j-c price-up"></text>
						<text :class="sort =='price desc' ? 't-color-p' : ''" class="flex f-a-c f-j-c price-down margin-t2"></text>
					</view>
				</view>
				<view @click="$refs.popup.open('right')" class="flex f-a-c f-j-c flex-1">
					<text class="margin-r4">{{i18n['筛选']}}</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-filter-o"></text>
				</view>
			</view>
		</view>
		<view  :style="{ 'padding-top': top +84+ 'px' }"></view> 
		<view class="padding-lr10">
			<goodslist class="margin-t12" :sortType="sortType" :list="list"></goodslist>
		</view>
		<no-data v-if="list.length <= 0"></no-data>
		<view class="padding-10"></view>
		<uni-popup ref="popup" type="right" background-color="#fff">  
			<view class="h100 bg-color-w wrap-filter-popup" style="width: 70vw;">
				<scroll-view scroll-y="true" :style="{'height': height+'px'}">
					<view :style="{ 'padding-top': top+44 + 'px' }"></view>
					<view class="padding-10 b-bottom">
						<view class="flex f-a-c f-j-s">
							<text class="f12-size t-color-6">{{i18n['价格区间']}}</text>
						</view>
						<view class="flex margin-t15">
							<view class="flex flex-1 b-radius-30 bg-color-f7 h-30">
								<input v-model="min" class="f12-size input w100 h100" type="number" :placeholder="i18n['最低价']">
							</view>
							<view class="flex f-s-0 f-a-c f-j-c t-color-9 padding-lr15"><text class="b-bottom w-30"></text></view>
							<view class="flex flex-1 b-radius-30 bg-color-f7 h-30">
								<input v-model="max" class="f12-size input w100 h100" type="number" :placeholder="i18n['最高价']">
							</view>
						</view>
					</view>
					<view class="padding-10 b-bottom">
						<view class="flex f-a-c f-j-s">
							<text class="f12-size t-color-6">{{i18n['发货地']}}</text>
							<text @click="provinceShow= !provinceShow" :class="provinceShow ? 'van-icon-arrow-up':'van-icon-arrow-down'" class="flex f-a-c f-j-c van-icon  t-color-9 f15-size"></text>
						</view>
						<view class="grid grid-c-3 grid-g10 margin-t10">
							<view  class="flex f-a-c f-j-c padding-lr2 h-34 b-radius-2 bg-color-f7 f12-size t-color-6">{{i18n['定位中']}}</view>
						</view>
						<block v-if="provinceShow">
						<view class="flex f-a-c f-j-s margin-t10">
							<text class="f12-size t-color-6">{{i18n['城市']}}</text>
						</view>
						<view class="grid grid-c-3 grid-g10 margin-t10">
							<view @click="chooseProvince(key)" v-for="(item,key) in provinceList" :class="province == key ? 'on t-color-y' : 'bg-color-f7 t-color-6'" class="flex f-a-c f-j-c padding-lr2 h-34 b-radius-2  f12-size ">{{item}}</view>
						</view>
						</block>
					</view>
				</scroll-view>
				<view class="flex f-a-c f-j-e padding-lr10 h-60">
					<view class="flex w-160 b-radius-30 h-36 over-h">
						<view @click="reset" class="flex flex-1 f-a-c f-j-c bg-color-linear-y t-color-w">{{i18n['重置']}}</view>
						<view @click="seach()" class="flex flex-1 f-a-c f-j-c bg-color-p t-color-w">{{i18n['确定']}}</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
	@import url('../../static/css/search/list.css');
</style>
<script>
	const address = require('../../utils/address.js').default;
	const API = require('../../utils/api/shops.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				sortType: 1,
				height: 0,
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
				title: '',
				shopId: '',
				catePid: '',
				cateTid: '',
				cateId: '',
				shopCateId: '',
				type: '',
				sort: '',
				provinceList: address.province_list,
				provinceShow: false,
				province: '',
				max: '',
				min: '',
				spread: ''
			};
		},
		onLoad: function(options) {
			self = this;
			let height = getApp().globalData.height;
			height = height-60;
			if(this.isIphonex) {
				height-=34;
			}
			this.height = height;
			this.title = options.title ? options.title : '';
			this.catePid = options.catePid ? options.catePid : '';
			this.cateTid = options.cateTid ? options.cateTid : '';
			this.cateId = options.cateId ? options.cateId : '';
			this.shopId = options.shopId ? options.shopId : '';
			this.type = options.type ? options.type : '';
			this.spread = options.spread ? options.spread : '';
			this.init();
		},
		methods: {
			reset() {
				this.province = '';
				this.max = '';
				this.min = '';
			},
			chooseProvince(item) {
				if(this.province == item) {
					this.province = '';
				}else{
					this.province = item;
				}
			},
			changeSort(type) {
				if(type == 'price'){
					this.sort = this.sort == 'price desc' ? 'price asc' : 'price desc';
				}else{
					this.sort = type;
				}
				this.page = 1;
				this.getList();
			},
			getList() {
				$.ajax({
					url: API.searchGoodsApi,
					data: {
						shopId: self.shopId,
						catePid: self.shopId != '' ? '' : self.catePid,
						cateTid: self.shopId != '' ? '' : self.cateTid,
						cateId: self.shopId != '' ? '' : self.cateId,
						shopCatePid: self.shopId != '' ? self.catePid : '',
						shopCateTid: self.shopId != '' ? self.cateTid : '',
						shopCateId: self.shopId != '' ? self.cateId : '',
						title: self.title,
						type: self.type,//1普通商品>>2秒杀商品>>3拼团商品
						sort: self.sort,
						status: '',
						minAmount: self.min,
						maxAmount: self.max,
						provinceCode: self.province,
						page: self.page,
						pageSize: self.pageSize,
						spreadStatus: self.spread != '' ? '1' : '',
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
						self.list  = list;
					}
				})
			},
			seach() {
				this.page = 1;
				this.getList();
				this.$refs.popup.close();
			},
			init() {
				this.getList();
			},
		},
		created() {},
		computed: {
			i18n() {
				return this.$t('search')
			},
		},
		mounted() {},
		destroyed() {},
		components: {},
		onPullDownRefresh() {},
		onReachBottom() {
			if(this.page < this.totalPage) {
				this.page += 1;
				this.getList();
			}
		}
	}
</script>
