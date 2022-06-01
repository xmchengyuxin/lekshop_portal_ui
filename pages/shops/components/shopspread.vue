<template>
	<view>
		<view @click="go('/pages/shops/shops?id='+shopId)" class="flex f-a-c f-j-s">
			<text class="f12-size f-w-b">{{i18n['店铺推荐']}}</text>
			<view class="flex f-a-c">
				<text class="f10-size t-color-y">{{i18n['查看全部']}}</text>
				<text class="flex f-a-c van-icon van-icon-arrow t-color-y f12-size"></text>
			</view>
		</view>
		<view class="flex f-w ">
			<view @click="go('/pages/shops/detail?id='+item.id)" v-for="item in list" class="flex  f-s-0  f-c pintuan-item">
				<view :style="item.mainImg | bgimg(300)+''" class="h-100 bg-img  b-radius-8"></view>
				<view class="f10-size line1 margin-t4">{{item.title}}</view>
				<view class="flex f-a-c f-j-s margin-t4">
					<view class="text-price f16-size t-color-y">{{item.price}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const API = require('../../../utils/api/shops.js').default;
	const $ = require('../../../utils/api.js');
	let self;
	 export default {
		 props:{
			 shopId: {
			 	required: true,
			 },
			 type: {
			 	default: ''
			 },
			 showType: {
			 	default: 1,
			 },
			 pageSize: {
			 	default: 6
			 },
		 },
		 data() {
			 return {
				page: 1,
				list: [],
				totalPage: 1,
			 }
		 },
		 methods: {
			 getList() {
			 	const self = this;
			 	$.ajax({
			 		url: API.searchGoodsApi,
			 		data: {
			 			shopId: self.shopId,
			 			type: self.type,//1普通商品>>2秒杀商品>>3拼团商品
			 			page: self.page,
			 			pageSize: self.pageSize,
			 			spreadStatus: 1,
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
			 			self.list = list;
			 		}
			 	})
			 },
			 init() {
			 	this.getList();
			 },
		 },
		 created() {
		 	self = this;
			this.init();
		 },
		 computed: {
		 	i18n() {
		 		return this.$t('goodsdetail')
		 	},
		 },
	 }
</script>
<style scoped>
	@import url('../../../static/css/shops/detail.css');
</style>
