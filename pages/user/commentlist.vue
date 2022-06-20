<template>
	<view class="contain">
		<view class="h-30 ">
			<scroll-view scroll-x="true" :scroll-into-view="'navs'+active" class="h100" >
				<view class="flex f-n h100">
					<view @click="changeTab(index)" v-for="(item,index) in navs" :id="'navs'+index" :class="active == index ? 'navs-on t-color-y' : ''" class="flex f-s-0 flex-1 f-j-c  f-a-c h100   f-w-500">{{item}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="padding-12">
			<view v-for="(item,index) in list" class="bg-color-w b-radius-5 padding-12 margin-b12">
				<view class="flex f-j-s margin-b16">
					<view @click="go('/pages/shops/shops?id='+item.shopId)" class="flex f-a-c ">
						<text class="flex f-a-c van-icon van-icon-shop-o  margin-r6"></text>
						<text class="f-w-500 t-color-3 margin-r4 ">{{item['shopName']}}</text>
					</view>
				</view>
				
				<view  class="flex ">
					<view class="flex f-s-0 w-70 h-70 b-radius-5 bg-img  margin-r10" :style="item.goodsMainImg | bgimg(300)+''"></view>
					<view class="flex flex-1 f-c margin-r8">
						<view class="line1 f12-size">{{item.goodsName}}</view>
						<view class="flex f-a-c margin-t6">
							<view class="flex f-j-c padding-lr6 bg-color-f7 f11-size t-color-9 b-radius-2 h-20 line-h20 max-w120 line1">{{item.goodsParamName}}</view>
						</view>
						<view class="flex f-j-e">
							<view v-if="item.status == 0" @click="comment(item)"  class="flex f-a-c f-j-c f-s-0 w-80 h-28  margin-l12 b-radius-30 f11-size b-color-y t-color-y ">{{i18n['评价']}}</view>
							<view v-if="item.status == 1" @click="comment(item)"  class="flex f-a-c f-j-c f-s-0 w-80 h-28  margin-l12 b-radius-30 f11-size b-color-y t-color-y ">{{i18n['追评']}}</view>
						</view>
					</view>
				</view>
			</view>
			<no-data v-if="list.length <= 0"></no-data>
		</view>
		
	</view>
</template>
<style scoped>
@import url('../../static/css/order/order.css');
</style>
<script>
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				active: 0,
				navs: [],
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
			};
		},
		onLoad: function() {
			self = this;
			$.setTitle(self.i18n['我的评价'])
		},
		onShow() {
			this.init();
		},
		methods: {
			comment(data) {
				uni.setStorageSync('comment',data);
				self.go('/pages/user/comment');
			},
			changeTab(index) {
				this.active = index;
				this.page = 1;
				this.getList();
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.commentListApi,
					data: {
						page: self.page,
						pageSize: self.pageSize,
						goodsId: '',
						detailId: '',
						status: self.active,
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
				this.navs = [this.i18n['待评价'],this.i18n['可追评'],this.i18n['已追评'],];
				this.page =1;
				this.getList();
			},
		},
		created() {
		},
		mounted() {},
		destroyed() {},
		components: {},
		computed: {
			i18n() {
				return this.$t('comment')
			},
		},
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
