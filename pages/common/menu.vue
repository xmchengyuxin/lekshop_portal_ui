<template>
	<view class="">
		<uni-popup type="top" ref="share" maskBackgroundColor="'transparent'">
			<view class="padding-12 wrap-menu">
				<view :style="{ 'padding-top': top + 'px' }"></view>
				<view class="flex f-a-c f-j-s">
					<text class="f16-size t-color-w">{{i18n['功能直达']}}</text>
					<text @click="close()" class="flex f-a-c f-j-c van-icon van-icon-cross t-color-w f18-size"></text>
				</view>
				<view class="grid grid-c-4 grid-g10 margin-t20">
					<view @click="go('/pages/chat/index')" class="flex f-c f-a-c f-j-c b-radius-10 padding-tb15 menu-item">
						<text class="flex f-a-c f-j-c van-icon van-icon-chat-o t-color-w f26-size"></text>
						<text class="f11-size t-color-w margin-t10">{{i18n['消息']}}</text>
					</view>
					<view @click="go('/pages/index/index')" class="flex f-c f-a-c f-j-c b-radius-10 padding-tb15 menu-item">
						<text class="flex f-a-c f-j-c van-icon van-icon-shop-o t-color-w f26-size"></text>
						<text class="f11-size t-color-w margin-t10">{{i18n['首页']}}</text>
					</view>
					<view @click="go('/pages/user/index')" class="flex f-c f-a-c f-j-c b-radius-10 padding-tb15 menu-item">
						<text class="flex f-a-c f-j-c van-icon van-icon-contact t-color-w f26-size"></text>
						<text class="f11-size t-color-w margin-t10">{{i18n['我的']}}</text>
					</view>
					<view @click="go('/pages/cart/index?type=goods')" class="flex f-c f-a-c f-j-c b-radius-10 padding-tb15 menu-item">
						<text class="flex f-a-c f-j-c van-icon van-icon-cart-o t-color-w f26-size"></text>
						<text class="f11-size t-color-w margin-t10">{{i18n['购物车']}}</text>
					</view>
					<view @click="kefu" class="flex f-c f-a-c f-j-c b-radius-10 padding-tb15 menu-item">
						<text class="flex f-a-c f-j-c van-icon van-icon-service-o t-color-w f26-size"></text>
						<text class="f11-size t-color-w margin-t10">{{i18n['客服']}}</text>
					</view>
					<view @click="openShare" class="flex f-c f-a-c f-j-c b-radius-10 padding-tb15 menu-item">
						<text class="flex f-a-c f-j-c van-icon van-icon-share-o t-color-w f26-size"></text>
						<text class="f11-size t-color-w margin-t10">{{i18n['分享']}}</text>
					</view>
					<view @click="go('/pages/user/advice')" class="flex f-c f-a-c f-j-c b-radius-10 padding-tb15 menu-item">
						<text class="flex f-a-c f-j-c van-icon van-icon-edit t-color-w f26-size"></text>
						<text class="f11-size t-color-w margin-t10">{{i18n['我要反馈']}}</text>
					</view>
				</view>
			</view>
		</uni-popup>
		<poster ref="posterc"></poster>
	</view>
</template>
<style scoped>
.wrap-menu {
	 border-radius: 0 0 12px 12px;
    background: rgba(60,60,60,.9);
}
.menu-item {
	background: rgba(0,0,0,.4);
}
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		props: {
			kefuUrl: {
				default: ''
			},
		},
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			kefu() {
				if(this.kefuUrl != '') {
					this.go(this.kefuUrl);
				}else{
					this.go('/pages/chat/index')
				}
			},
			openShare() {
				this.close(),
				self.$refs.posterc.open();
			},
			go(url) {
				$.go(url);
				this.close();
			},
			close() {
				self = this;
				self.$refs.share.close();
			},
			open() {
				self = this;
				self.$refs.share.open();
			},
			init() {},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('commonMenu')
			},
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
