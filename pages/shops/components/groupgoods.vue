<template>
	<view>
		<view class="b-radius-10 bg-color-w wrap-pintuan ">
			<view @click="go('/pages/search/list?type='+type+'&shopId='+shopId)" class="flex padding-lr12 h-40 f-a-c f-j-s">
				<view class="flex f-a-c">
					<text class="f-w-b margin-r8">{{i18n['热门拼团']}}</text>
					<text class="f10-size" >{{i18n['拼着买，更便宜']}}</text>
				</view>
				<view class="flex f-a-c">
					<text class="f12-size t-color-9 margin-r2">{{i18n['更多']}}</text>
					<text class="flex f-a-c van-icon van-icon-arrow t-color-9"></text>
				</view>
			</view>
			<view class="flex padding-lr12 ">
				<view @click="go('/pages/shops/detail?id='+item.id)" v-for="item in list" class="flex  f-s-0 margin-r12 f-c pintuan-item">
					<view :style="item.mainImg | bgimg(300)+''" class="h-100 bg-img b-radius-8"></view>
					<view class="f12-size line1 margin-t4">{{item.title}}</view>
					<view class="flex f-a-c f-j-s margin-t4">
						<view class="text-price f16-size t-color-y">{{item.price}}</view>
						<view class="bg-color-linear-y h-16 t-color-w f10-size padding-lr5 b-radius-30">{{i18n['拼']}}</view>
					</view>
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
		props: {
			pageSize: {
				default: 6
			},
			type: {
				default: 3,//1普通商品>>2秒杀商品>>3拼团商品
			},
			shopId: {
				default: ''
			}
		},
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				list: [],
				page: 1,
				totalPage: 1,
			};
		},
		methods:{
			getList() {
				$.ajax({
					url: API.searchGoodsApi,
					data: {
						shopId: self.shopId,
						type: self.type,
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
				return this.$t('hotGroup')
			},
		},
	}	
</script>

<style scoped>
	@import url('../../../static/css/shops/shops.css');
</style>
