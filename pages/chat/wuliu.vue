<template>
	<view class="contain">
		<view class="padding-12">
			<view v-for="item in list" class="padding-lr10 bg-color-w b-radius-5 margin-b12">
				<view @click="go('/pages/shops/shops?id='+item.shopId)" class="padding-tb10 flex b-bottom">
					<view :style="item.shopLogo | bgimg(300)+''" class="flex f-s-0 w-20 h-20 b-radius bg-img  margin-r10"></view>
					<view class="flex flex-1 f-a-c f11-size t-color-6">{{item.shopName}}</view>
					<text class="flex f-s-0 f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
				</view>
				<view class="padding-tb12">
					<view class="flex f-a-c f-j-s">
						<view class="flex flex-1 margin-r10">
							<text class="f15-size f-w-b line1">{{item.title}}</text>
							<view v-if="item.readStatus == '0'" class="flex f-a-c f-s-0 margin-l6">
								<text class="b-radius  bg-color-r " style="width: 6px;height: 6px;"></text>
							</view>
						</view>
						
						<text class="f11-size t-color-9 ">{{item.sendTime | time1}}</text>
					</view>
					<view @click="detail(item)" class="flex bg-color-f7 margin-t12">
						<view v-if="item.img" :style="item.img | bgimg(300)+''" class="flex f-s-0 w-70 h-70 margin-r8 bg-img "></view>
						<view v-else class="flex f-s-0 w-70 h-70 margin-r8 f-a-c f-j-c shops-icon shops-icon-kefu f44-size"></view>
						<view class="flex flex-1 f-c f-j-c">
							<text class="f11-size t-color-9 line1">{{item.content}}</text>
							<text class="f11-size t-color-9 line1 margin-t12">{{i18n['点击查看详情']}}>></text>
						</view>
					</view>
				</view>
			</view>
			<no-data :list="list"></no-data>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/iconcolor.css');
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
			this.read();
		},
		methods: {
			detail(info) {
				let orderType = ['1','2','3','11','12'];//1, "订单已发货"2, "订单物流状态,3, "订单已完成,11拼团失败,12拼团成功
				let moneyType = ['6','7','8'];//6充值成功,7提现成功,8提现失败
				let obj = info.turnParams ? JSON.parse(info.turnParams) : '';
				if(orderType.indexOf(String(info.type)) >= 0) {
					self.go('/pages/order/detail?id='+obj.orderId)
				}else if(moneyType.indexOf(String(info.type)) >= 0) {
					self.go('/pages/money/index')
				}
				if(info.type == 5 || info.type == 4) {//商家驳回了您的退款申请,4商家同意了您的退款申请
					self.go('/pages/user/refunddetail?id='+obj.refundId);
				}
				if(info.type == 10) {//评价提醒
					self.go('/pages/user/commentlist');
				}
			},
			read() {
				$.ajax({
					url: API.readNewsApi,
					data: {type:''},
					method: 'POST',
					success(res) {
					}
				})
			},
			getList() {
				$.ajax({
					url: API.wuliuChatApi,
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
				this.page = 1;
				this.getList();
				
			},
		},
		computed: {
			i18n() {
				return this.$t('chat')
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
		}
	}
</script>
