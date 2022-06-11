<template>
	<view class="contain">
		<view class="padding-lr12" style="padding-top: 1px;">
			<view @click="go('/pages/shops/detail?id='+item.goodsId)"  v-for="(item, index) of list" :key="index" class="b-radius-5 bg-color-w flex margin-t10">
				<view class="flex  f-s-0 w-100 h-100 bg-img b-radius-5" :style="item.goodsMainImg | bgimg(300)+''"></view>
				<view class="flex flex-1 f-c f-j-s " style="padding: 10px 0 0px 10px;">
					<view class="flex flex-1 f-c">
						<view class="line2 margin-r10">
							<text class="f12-size t-color-6 line2">{{item.goodsName}}</text>
						</view>
						<view class="flex  f-w margin-t4">
							<view class="text-price  f-w-b t-color-p">{{item.price}}</view>
						</view>
					</view>
					<view class="flex f-a-c f-j-s ">
						<text></text>	
						<!-- <view class="f11-size t-color-9">{{i18nModel['1人收藏'] | i18n(item.colletionNum)}}</view> -->
						<view class="flex">
							<view @click.stop="del(index)" style="padding: 6px 10px 10px 10px;" class="flex f-a-c  van-icon van-icon-delete-o"></view>
							<view  style="padding: 6px 10px 10px 10px;" class="flex f-a-c  van-icon van-icon-shop-o "></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<no-data v-if="list.length <= 0"></no-data>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	const API = require('../../utils/api/shops.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
			};
		},
		onLoad: function() {
			self = this;
			this.init();
			$.setTitle(self.i18nModel['我的收藏'])
		},
		methods: {
			del(index) {
				$.showModal({
					content: '是否确认删除',
					success() {
						$.ajax({
							url: API.delLikeGoodsApi,
							data: {id: self.list[index]['id']},
							method: 'POST',
							success(res) {
								self.i18nModel['操作成功'];
								self.list.splice(index,1);
							}
						})
					},
				},this)
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.likeGoodsListApi,
					data: {
						page: self.page,
						pageSize: self.pageSize
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
		},
		mounted() {},
		destroyed() {},
		components: {},
		computed: {
			i18nModel() {
				return this.$t('likelist')
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
