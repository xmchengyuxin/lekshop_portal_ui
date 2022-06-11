<template>
	<view class="contain">
		<view class="padding-10"></view>
		<view class="padding-lr15">
			<view class="flex f-a-c f-j-c f-c b-radius-8 bg-color-linear-y padding-20">
				<view class="f16-size t-color-w">{{i18n['积分']}}</view>
				<view class="f-w-b f24-size margin-t10 t-color-w">{{account != '' ? account.point : 0}}</view>
				<!-- <view @click="go('/pages/money/tixian?type=1&amount='+account.amount)" class="f-w-500 f13-size margin-t12 t-color-w flex f-a-c f-j-c b-radius-30 h-36 w-100 " style="border: 1px solid #fff;">{{i18n['提现']}}</view> -->
			</view>
			<view class="bg-color-w b-radius-8 bg-shadow-0 margin-t12 over-h">
				<view @click="go('/pages/money/rolelist')" class=" flex f-a-c f-j-s  h-50  padding-lr12 ">
					<text class="f15-size ">{{i18n['积分明细']}}</text>
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
			$.setTitle(this.i18n['积分']);
		},
		onShow:function(){
			this.init();
		},
		methods: {
			getAccount() {
				$.ajax({
					url: API.getAccountApi,
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
		}
	}
</script>
