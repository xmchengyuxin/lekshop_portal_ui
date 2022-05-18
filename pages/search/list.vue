<template>
	<view class="contain">
		<view class="fixed-top">
			<view class=" flex h-44 flex bg-color-f7">
				<view @click="back(1)" class="flex padding-lr10 f-a-c van-icon van-icon-arrow-left f20-size"></view>
				<view class="flex f-a-c flex-1">
					<view class="flex flex-1 b-radius-30 h-30 bg-color-w padding-lr10">
						<view class="flex f-a-c van-icon van-icon-search f16-size margin-r8"></view>
						<input type="text" class="input">
					</view>
				</view>
				<view @click="sortType == 1 ? sortType=2 : sortType=1" class="flex f-a-c padding-lr10 van-icon van-icon-apps-o f20-size"></view>
			</view>
			<view class="flex h-40 bg-color-f7">
				<view class="flex f-a-c f-j-c flex-1 t-color-p">{{i18n['综合']}}</view>
				<view class="flex f-a-c f-j-c flex-1">{{i18n['销量']}}</view>
				<view class="flex f-a-c f-j-c flex-1">{{i18n['新上架']}}</view>
				<view class="flex f-a-c f-j-c flex-1">
					<text class="margin-r4">{{i18n['价格']}}</text>
					<view class="flex f-c f-a-c f-j-c">
						<text class="flex f-a-c f-j-c price-up"></text>
						<text class="flex f-a-c f-j-c price-down margin-t2"></text>
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
		
		<uni-popup ref="popup" type="right" background-color="#fff">  
			<view class="h100 bg-color-w" style="width: 70vw;">
				<scroll-view scroll-y="true" :style="{'height': height+'px'}">
					<view></view>
				</scroll-view>
				<view class="flex f-a-c f-j-e padding-lr10 h-60">
					<view class="flex w-160 b-radius-30 h-36 over-h">
						<view class="flex flex-1 f-a-c f-j-c bg-color-linear-y t-color-w">重置</view>
						<view class="flex flex-1 f-a-c f-j-c bg-color-p t-color-w">确定</view>
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
			this.shopCateId = options.shopCateId ? options.shopCateId : '';
			this.shopId = options.shopId ? options.shopId : '';
			this.init();
		},
		methods: {
			getList() {
				$.ajax({
					url: API.searchGoodsApi,
					data: {
						shopId: self.shopId,
						catePid: self.catePid,
						cateTid: self.cateTid,
						cateId: self.cateId,
						shopCateId: self.shopCateId,
						title: self.title,
						type: '',
						sort: '',
						status: '',
						page: self.page,
						pageSize: self.pageSize,
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
