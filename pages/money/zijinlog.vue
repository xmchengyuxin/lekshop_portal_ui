<template>
	<view class="contain">
		<view class="bg-color-w  padding-lr12">
			<view class="b-bottom padding-tb10" v-for="item in list">
				<view class="flex">
					<view class="flex flex-1 margin-r12">
						<text class="f-w-b t-color">{{item.remark}}</text>
					</view>
					<view class="flex f-c f-s-0 f-a-e">
						<text class="f-w-b t-color-p">{{item.inOut == 1 ? '+' : '-'}}¥{{item.amount}}</text>
						<text class=" t-color-9 margin-t6">{{item.addTime | time1}}</text>
					</view>
				</view>
				
			</view>
		</view>
		<no-data :list="list"></no-data>
	</view>
</template>
<style scoped>
@import url('../../static/css/index/index.css');
</style>
<script>
	const API = require('../../utils/api/user.js').default;
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
			$.setTitle(this.i18n['资金明细']);
		},
		methods: {
			getList() {
				const self = this;
				$.ajax({
					url: API.accountListApi,
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
		computed: {
			i18n() {
				return this.$t('money')
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
