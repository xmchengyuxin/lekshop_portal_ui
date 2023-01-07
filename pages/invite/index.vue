<template>
	<view class="contain">
		<view class="padding-10"></view>
		<view class="padding-lr15">
			<view class="flex f-a-c f-j-c f-c b-radius-8 bg-color-linear-y padding-tb20">
				<view class="f-w-500 t-color-w">推广佣金</view>
				<view class="f-w-b f24-size margin-t10 t-color-w">{{account != '' ? account.totalSpreadAmount : 0}}</view>
				<view class="grid grid-c-3 w100 margin-t16">
					<view class="flex f-c f-a-c f-j-c t-color-w">
						<text class="f18-size">{{account.oneSpreadNum}}</text>
						<text class="f12-size">直推人数</text>
					</view>
					<view style="border-left: 1px solid rgba(255, 255, 255, 0.6);border-right: 1px solid rgba(255, 255, 255, 0.6);" class="flex f-c f-a-c f-j-c t-color-w">
						<text class="f18-size">{{account.twoSpreadNum}}</text>
						<text class="f12-size">二级人数</text>
					</view>
					<view class="flex f-c f-a-c f-j-c t-color-w">
						<text class="f18-size">{{account.threeSpreadNum}}</text>
						<text class="f12-size">三级人数</text>
					</view>
				</view>
			</view>
			<view class="bg-color-w b-radius-8 bg-shadow-0 margin-t12 over-h">
				<view @click="go('/pages/invite/list?type=1')" class="bg-color-w flex f-a-c f-j-s h-50 padding-lr12 ">
					<text class="f15-size">直推列表</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-b"></text>
				</view>
				<view @click="go('/pages/invite/list?type=2')" class="bg-color-w flex f-a-c f-j-s h-50 padding-lr12 ">
					<text class="f15-size">二级列表</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-b"></text>
				</view>
				<view @click="go('/pages/invite/list?type=3')" class="bg-color-w flex f-a-c f-j-s h-50 padding-lr12 ">
					<text class="f15-size">三级列表</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-b"></text>
				</view>
			</view>
			
		</view>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				account: '',
			};
		},
		onLoad: function() {
			self = this;
		},
		onShow:function(){
			this.init();
		},
		methods: {
			getAccount() {
				$.ajax({
					url: 'member/spread/count',
					data: {},
					method: 'GET',
					success(res) {
						self.account = res.data ? res.data : '';
					}
				})
			},
			init() {
				this.getAccount();
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
		}
	}
</script>
