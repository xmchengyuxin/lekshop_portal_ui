<template>
	<view class="contain">
		<view class="flex h-50 bg-color-linear-y">
			<view class="flex f-a-c f-j-c flex-1 t-color-w f16-size f-w-b">头像</view>
			<view class="flex f-a-c f-j-c flex-1 t-color-w f16-size f-w-b">用户名</view>
			<view class="flex f-a-c f-j-c flex-1 t-color-w f16-size f-w-b">他的下级</view>
		</view>
		<view class="margin-t12 bg-color-w padding-lr12">
			<view @click="go('/pages/invite/detail?id='+item.memberId)" v-for="item in list" class="flex f-j-s b-bottom padding-tb10">
				<view class="flex">
					<view class="flex f-a-c f-j-c margin-r12">
						<view :style="item.headImg | bgimg('200')" class="bg-img w-60 h-60 b-radius "></view>
					</view>
					<view class="flex f-c">
						<view class="flex f-a-c t-color f-w-b">{{item.memberName | hideCenterText}}</view>
						<view class="flex f-a-c t-color f-w-b margin-t6">余额：¥{{item.amount}}</view>
						<view class="flex f-a-c t-color-9 margin-t6 f-w-b">注册：{{item.addTime | time1}}</view>
					</view>
				</view>
				<view class="flex f-s-0 f-a-c">
					<text class="t-color-r f-w-b">{{item.xiaxianNum}}</text>
					<text class="t-color f-w-b">个</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9"></text>
				</view>
			</view>
		</view>
		<no-data :list="list"></no-data>
	</view>
</template>
<style scoped>
</style>
<script>
	const API = require('@/utils/api/common.js').default;
	const $ = require('@/utils/api.js');
	let self = this;
	export default {
		components: {},
		data() {
			return {
				page: 1,
				pageSize: 20,
				totalPage: 1,
				type: '1',
				list: [],
			};
		},
		onLoad: function(options) {
			self = this;
			self.type = options.type ? options.type: '1';
			this.init();
		},
		onShow() {
		},
		methods: {
			getList() {
				$.ajax({
					url: 'member/spread/getList',
					data: {
						page: self.page,
						pageSize: self.pageSize,
						level: self.type
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
		computed: {},
		created() {
		},
		mounted() {},
		destroyed() {},
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