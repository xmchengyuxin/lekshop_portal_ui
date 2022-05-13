<template>
	<view class="contain">
		<view class="bg-color-w padding-12">
			<view class="padding-lr20">
				<view class="">充值金额</view>
				<view class="flex f-a-c margin-t12">
					<text class="flex f-s-0 margin-r12 f32-size">￥</text>
					<view class="flex flex-1 h-70">
						<input type="text" value="" class="input" style="font-size: 50px;" />
					</view>
				</view>
				
			</view>
		</view>
		<payItem ref="payitem" class="padding-lr20 margin-t12" :isBalance="false" ></payItem>
		<view class="padding-30 margin-t12">
			<view @click="recharge()" class="flex f-a-c f-j-c h-36 bg-color-linear-r t-color-w b-radius-5">充值</view>
		</view>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	import payItem from '../common/payitem.vue';
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				payType: 'wxPay'
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			recharge() {
				console.log(this.$refs.payitem.type);
			},
			init() {},
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
