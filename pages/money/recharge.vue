<template>
	<view class="contain">
		<view class="bg-color-w padding-12">
			<view class="padding-lr20">
				<view class="">{{i18n['充值金额']}}</view>
				<view class="flex f-a-c margin-t12">
					<text class="flex f-s-0 margin-r12 f32-size">￥</text>
					<view class="flex flex-1 h-70">
						<input v-model="amount" type="number" value="" class="input" style="font-size: 50px;" />
					</view>
				</view>
				
			</view>
		</view>
		<payItem ref="payitem" class="padding-lr20 margin-t12" :isBalance="false" ></payItem>
		<view class="padding-30 margin-t12">
			<view @click="recharge()" class="flex f-a-c f-j-c h-36 bg-color-linear-y t-color-w b-radius-5">{{i18n['充值']}}</view>
		</view>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	import payItem from '../common/payitem.vue';
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				amount: '',
			};
		},
		onLoad: function() {
			self = this;
			this.init();
			$.setTitle(this.i18n['充值']);
		},
		methods: {
			recharge() {
				const self = this;
				if(self.amount == '') {
					$.$toast(self.i18n['请输入充值金额']);return;
				}
				let type = this.$refs.payitem.type;
				$.ajax({
					url: API.rechargeApi,
					data: {
						amount: self.amount,
						payMethod: type,
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						self.back(1,2000);
					}
				})
			},
			init() {},
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
		components: {payItem},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
