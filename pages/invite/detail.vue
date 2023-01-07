<template>
	<view class="contain">
		<view class="h-10"></view>
		<view class="bg-color-w padding-lr12">
			<view class="flex">
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">用户名</view>
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">{{user.nickname}}</view>
			</view>
			<view class="flex">
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">姓名</view>
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">{{user.realname ? user.realname : ''}}</view>
			</view>
			<view class="flex">
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">账户余额</view>
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">{{user.amount}}</view>
			</view>
			<view class="flex">
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">他发展下线</view>
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">{{user.xiaxianNum}}</view>
			</view>
			<view class="flex">
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">奖励我资金/推广佣金</view>
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">{{user.devoteAmount}}</view>
			</view>
			<!-- <view class="flex">
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">奖励我任务佣金点</view>
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">sdfg</view>
			</view> -->
			<view class="flex">
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">注册时间</view>
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">{{user.addTime | time}}</view>
			</view>
			<view class="flex">
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b">最后登陆时间</view>
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b" v-if="user.lastLoginTime && user.lastLoginTime.length > 10">{{item.lastLoginTime | time}}</view>
				<view class="flex flex-1 f-a-c padding-tb10 t-color f-w-b" v-else>-</view>
			</view>
		</view>
	</view>
</template>
<style scoped>
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				id: '',
				user: '',
			};
		},
		onLoad: function(options) {
			this.id = options.id ? options.id : '';
			this.init();
		},
		methods: {
			getUser() {
				const self = this;
				$.ajax({
					url: 'member/spread/getMemberDetail',
					data: {memberId: self.id},
					method: 'GET',
					success(res) {
						self.user = res.data ? res.data : '';
					}
				})
			},
			init() {
				this.getUser();
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
