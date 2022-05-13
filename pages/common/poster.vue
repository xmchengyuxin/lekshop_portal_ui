<template>
	<view class="=">
		<uni-popup ref="posterbtn" type="bottom">
			<view class="bg-color-w wrap-poster">
				<view class="flex  f-a-c f-j-c padding-tb10 f16-size">分享到</view>
				<view class="padding-lr10">
					<view class="padding-tb20 b-bottom grid grid-c-5 grid-g10">
						<view class="flex f-s-0 f-c f-a-c f-j-c">
							<view class="flex f-a-c f-j-c bg-color-f7 w-50 h-50 b-radius f26-size t-color-6 van-icon van-icon-photo-o"></view>
							<text class="f12-size margin-t10">生成海报</text>
						</view>
						<view class="flex f-s-0 f-c f-a-c f-j-c">
							<view class="flex f-a-c f-j-c bg-color-f7 w-50 h-50 b-radius f26-size t-color-6 van-icon van-icon-qr"></view>
							<text class="f12-size margin-t10">链接</text>
						</view>
					</view>
				</view>
				<view @click="close()" class="flex f-a-c f-j-c h-50">取消</view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
.wrap-poster {
	border-radius: 10px 10px 0 0;
}
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
			close() {
				self.$refs.posterbtn.close();
			},
			open() {
				self = this;
				self.$refs.posterbtn.open();
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
