<template>
	<view class="">
		<uni-popup ref="xieyi" type="center">
			<view class="flex f-j-c">
				<view class="padding-15 bg-color-w b-radius-10" style="width: 80%;">
					<view class="flex f-j-c">服务协议及隐私保护</view>
					<view class="margin-t20 f12-size">
						<text class="t-color-9">为了更好地保障您的合法权益，请您阅读并同意以下协议</text>
						<text @click="go('/pages/user/rules?type=1')">《用户协议》</text><text @click="go('/pages/user/rules?type=2')">《隐私政策》</text>
						<text class="t-color-9">未注册手机号将自动为您创建账号</text>
					</view>
					<view class="flex margin-t16">
						<view @click="$refs.xieyi.close()" class="flex flex-1 f-a-c f-j-c h-36 margin-r12 b-color-y t-color-y b-radius-30">不同意</view>
						<view @click="agree" class="flex flex-1 f-a-c f-j-c h-36  bg-color-linear-y t-color-w b-radius-30">同意</view>
					</view>
				</view>
			</view>
			
		</uni-popup>
	</view>
</template>
<style scoped>
@import url('../../static/css/index/index.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			open() {
				this.$refs.xieyi.open();
			},
			agree() {
				this.$refs.xieyi.close();
				this.$emit('agree');
			},
			init() {},
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
