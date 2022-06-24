<template>
	<view>
		<block v-if="showType == 1">
		<view class="wrap-list-nav bg-color-w"  :style="{ 'top': top +46+ 'px' }">
			<view class="flex h-40 bg-color-f7 wrap-list-nav-info">
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
				<view @click="sortType == 1 ? sortType=2 : sortType=1" class="flex f-a-c padding-lr10 van-icon van-icon-apps-o f20-size"></view>
			</view>
		</view>
		<scroll-view class="padding-lr6" @scrolltolower="loadMore" scroll-y="true" style="height: 100vh;">
			<view  :style="{ 'padding-top': top +46+40+ 'px' }"></view>
			<goodslist class="margin-t12" :offset="1.2" :sortType="sortType" :list="list"></goodslist>
			<no-data v-if="list.length <= 0"></no-data>
			<view :style="isIphonex ? 'padding-bottom:84px' : 'padding-bottom:60px'"></view>
		</scroll-view>
		</block>
		<block v-else>
			<goodslist class="" :offset="1.2" :sortType="sortType" :list="list"></goodslist>
			<no-data v-if="list.length <= 0"></no-data>
			<view :style="isIphonex ? 'padding-bottom:94px' : 'padding-bottom:60px'"></view>
		</block>
	</view>
</template>

<script>
	const API = require('../../../utils/api/shops.js').default;
	const $ = require('../../../utils/api.js');
	let self;
	export default {
		props: {
			shopId: {
				type: String,
				default: ''
			},
			type: {
				default: ''
			},
			showType: {
				default: 1,
			},
			pageSize: {
				default: 20
			},
			catePid: {
				default: ''
			},
			cateTid: {
				default: ''
			},
			cateId: {
				default: ''
			},
			isSpread: {
				default: false
			}
		},
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				list: [],
				page: 1,
				totalPage: 1,
				sort: '',
				sortType: 1,
				title: ''
			};
		},
		methods: {
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
						page: self.page,
						pageSize: self.pageSize,
						spreadStatus: self.isSpread ? '1' : '',
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
			loadMore() {
				if(this.page < this.totalPage) {
					this.page += 1;
					this.getList();
				}
			},
			init() {
				this.page = 1;
				this.getList();
			},
		},
		created() {
			self = this;
			this.init();
		},
		computed: {
			i18n() {
				return this.$t('search')
			},
		},
		onReachBottom() {
		}
	}	
</script>

<style scoped>
	@import url('../../../static/css/shops/shops.css');
</style>
