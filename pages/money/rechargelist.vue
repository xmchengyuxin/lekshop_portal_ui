<template>
	<view class="contain">
		<view class="h-10"></view>
		<view class="bg-color-w  ">
			<uni-swipe-action>
				<uni-swipe-action-item   @click="delItem($event,index)" :options="options" v-for="(item,index) in list" :key="item.id">
				
			<view class="b-bottom padding-10" style="width: 100%;">
				<view class="flex f-a-c f-j-s">
					<text class="f-w-b t-color">{{item.orderNo}}</text>
					<text class="f-w-b t-color-p">¥{{item.amount}}</text>
				</view>
				<view class="flex f-a-c f-j-s margin-t6">
					<view class="flex f-a-c">
						<text class="f12-size t-color margin-r20">{{i18nPay[type[item.paymethod]]}}</text>
						<text class="f11-size t-color-9">{{item.addTime | time1}}</text>
					</view>
					<text v-if="item.status == 0" class="f11-size t-color-b">{{i18n['等待审核']}}</text>
					<text v-if="item.status == 1" class="f11-size t-color-g">{{i18n['充值成功']}}</text>
					<text v-if="item.status == 2" class="f11-size t-color-r">{{i18n['充值失败']}}</text>
					<text v-if="item.status == 3" class="f11-size t-color-b">{{i18n['已取消']}}</text>
				</view>
			</view>
			</uni-swipe-action-item>
			</uni-swipe-action>
		</view>
		<no-data v-if="list.length <= 0"></no-data>
		<view class="padding-15 flex f-j-c f12-size t-color-9 f-w-500">{{i18n['没有更多']}}</view>
	</view>
</template>
<style scoped>
/* @import url('../../css/user/apply.css'); */
</style>
<script>
	const state = require('../../utils/api/state.js').default;
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue';
	let self;
	export default {
		data() {
			return {
				page: 1,
				pageSize: 20,
				totalPage: 1,
				list: [],
				options:[],
				type: state.payType	   
			};
		},
		onLoad: function() {
			self = this;
			this.init();
			$.setTitle(this.i18n['充值列表']);
		},
		methods: {
			delItem(e,index) {
				const self = this;
				$.ajax({
					url: API.cancelRechargeApi,
					data: {orderNo: self.list[index].orderNo},
					method: 'POST',
					success(res) {
						self.$toast(self.i18n['操作成功']);
						self.list[index]['status'] = 3;
					}
				})
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.rechargeListApi,
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
				this.options =[ {
				           text: this.i18n['取消充值'],
				           style: {
				               backgroundColor: '#DA2A1C'
				           }
				       }]
			},
		},
		computed: {
			i18n() {
				return this.$t('money')
			},
			i18nPay() {
				return this.$t('pay')
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
