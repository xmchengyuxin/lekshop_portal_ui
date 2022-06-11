<template>
	<view class="contain ">
		<view style="padding: 1px 12px 12px 12px;">
		<view v-for="(item,index) in list" class="bg-color-w b-radius-5 padding-10 flex">
			<view class="flex f-s-0 w-50 h-50 b-radius bg-img margin-r12" :style="item.headImg | bgimg(300)+''"></view>
			<view class="flex flex-1 f-c f-j-c">
				<view @click="go('/pages/shops/shops?id='+item.shopId)" class="flex">{{item.shopName}}</view>
				<!-- <view class="flex f-a-c margin-t2">
					<text class="flex t-color-9 f11-size margin-r2">{{i18n['前往创作中心']}}</text>
					<text class="flex f-a-c van-icon van-icon-arrow t-color-9 f11-size"></text>
				</view> -->
			</view>
			<view class="flex f-a-c f-j-c f-s-0">
				<view @click="del(index)"  class="flex f-a-c f-j-c b-radius-5 bg-color-e padding-lr10 h-30">
					<text class="flex f-a-c f-j-c van-icon van-icon-cross margin-r4 f13-size"></text>
					<text class="f12-size">{{i18n['取消']}}</text>
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
			$.setTitle(self.i18n['我关注的店铺']);
		},
		methods: {
			del(index) {
				$.showModal({
					content: '是否确认删除',
					success() {
						$.ajax({
							url: API.delShopApi,
							data: {id: self.list[index]['shopId']},
							method: 'POST',
							success(res) {
								self.i18n['操作成功'];
								self.list.splice(index,1);
							}
						})
					},
				},this)
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.likeShopListApi,
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
			i18n() {
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
