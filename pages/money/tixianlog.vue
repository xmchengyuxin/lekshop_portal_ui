<template>
	<view class="contain">
		<view class="padding-12">
		<view class="bg-color-linear-g b-radius-10 padding-30 flex f-a-c f-j-c f-c">
			<text class="f16-size f-w-b t-color-w">{{i18n['提现金额']}}</text>
			<text class="f24-size f-w-b t-color-w margin-t10">{{total.totalAmount ? total.totalAmount : 0}}</text>
		</view>
		</view>
		<view class="h-10"></view>
		<view class="bg-color-w  padding-lr12">
			<view class="b-bottom padding-tb10" v-for="item in list">
				<view class="flex f-a-c f-j-s">
					<text class=" t-color">{{item.orderNo}}</text>
					<text class="f-w-b t-color-y">-¥{{item.totalAmount}}</text>
				</view>
				<view class="flex f-a-c f-j-s margin-t6">
					<view class="flex f-a-c">
						<text class="f-w-b t-color margin-r20" >{{item.bankName}}</text>
						<text class="f11-size t-color-9">{{item.addTime | time1}}</text>
					</view>
					<text class=" t-color-y" v-if="item.status == 0">{{i18n['待审核']}}</text>
					<text class=" t-color-g" v-if="item.status == 1">{{i18n['已完成']}}</text>
					<text class=" t-color-r" v-if="item.status == 2">{{i18n['提现失败']}}</text>
				</view>
			</view>
		</view>
		<no-data :list="list"></no-data>
	</view>
</template>
<style scoped>
/* @import url('../../css/user/apply.css'); */
</style>
<script>
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				page: 1,
				pageSize: 20,
				totalPage: 1,
				list: [],
				total: 0,
				
			};
		},
		onLoad: function() {
			$.setTitle(this.i18n['提现明细']);
		},
		onShow:function(){
			this.page = 1;
			this.init();
		},
		methods: {
			getList() {
				const self = this;
				$.ajax({
					url: 'member/withdraw/getList',
					data: {
						page: self.page,
						pageSize: self.pageSize,
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
				});
			},
			getTotal() {
				const self = this;
				$.ajax({
					url: 'member/withdraw/count',
					data: {},
					method: 'GET',
					success(res) {
						self.total = res.data ? res.data : '';
					}
				})
			},
			init() {
				this.getList();
				this.getTotal();
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
