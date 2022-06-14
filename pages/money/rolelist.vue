<template>
	<view class="contain">
		<view class="h-10"></view>
		<view class="bg-color-w  ">
				<block v-for="(item,index) in list" :key="item.id">
			<view class="b-bottom padding-10" style="width: 100%;">
				<view class="flex">
					<view class="flex flex-1 margin-r12">
						<text class="f15-size t-color">{{item.remark}}</text>
					</view>
					<view class="flex f-c f-s-0 f-a-e">
						<text class=" t-color-p">{{item.inOut == 1 ? '+' : '-'}} {{item.amount}}</text>
						<text class=" t-color-9 margin-t6">{{item.addTime | time1}}</text>
					</view>
				</view>
			</view>
			</block>
		</view>
		<no-data  v-if="list.length <= 0"></no-data>
		<view class="padding-15 flex f-j-c f12-size t-color-9 f-w-500">{{i18n['没有更多']}}</view>
	</view>
</template>
<style scoped>
/* @import url('../../css/user/apply.css'); */
</style>
<script>
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				page: 1,
				pageSize: 20,
				totalPage: 1,
				list: [],
			};
		},
		onLoad: function() {
			self = this;
			this.init();
			$.setTitle(this.i18n['积分明细']);
		},
		methods: {
			getList() {
				const self = this;
				$.ajax({
					url: API.poinListApi,
					data: {
						page: self.page,
						pageSize: self.pageSize
					},
					method: 'GET',
					success(res) {
						if (!res.data.list) {
							self.list = [];
							return;
						}
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
		computed: {
			i18n() {
				return this.$t('role')
			},
		},
		created() {
		},
		mounted() {},
		destroyed() {},
		components: {},
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
