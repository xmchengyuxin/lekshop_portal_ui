<template>
	<view class="contain">
			<view style="padding-top: 1px;"></view>
			<view class="padding-lr15">
				<view @click="choose(item)" v-for="item in list" class="flex bg-color-w bg-shadow-0 padding-tb12 margin-t12 b-radius-8">
					<view class="flex f-a-c padding-lr12">
						<text class="flex f-a-c f-j-c van-icon  f20-size" :class="item.id == id ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-9'"></text>
					</view>
					<view class="flex flex-1 f-c">
						<view class="flex f-a-c">
							<text class="f-w-b">{{item.bank}}</text>
						</view>
						<view class="flex f-a-c margin-t2">
							<text v-if="item.zfbAccount" class="f12-size t-color-9">{{item.zfbAccount | hideCenterText}}</text>
							<text v-if="item.bankAccount" class="f12-size t-color-9">{{item.bankAccount | hideCenterText}}</text>
						</view>
					</view>
					<view @click.stop="edit(item)" class="flex f-a-c padding-lr12">
						<text class="flex f-a-c f-j-c van-icon van-icon-editor f20-size"></text>
					</view>
				</view>
			</view>
			<no-data v-if="list.length <= 0"></no-data>
			<view class="padding-15"></view>
			<view class="padding-30"></view>
		<view class="warp-tabbar bg-color-w flex f-a-c padding-lr15" :style="{'padding-bottom': isIphonex ? '34px' : ''}">
			<view @click="go('/pages/user/addbank')" class="flex f-a-c f-j-c flex-1 bg-color-linear-y t-color-w b-radius-30 h-36">
				<text class="flex f-a-c f-j-c van-icon van-icon-plus t-color-w margin-r6"></text>
				<text class="t-color-w f-w-500">{{i18n['增加新账户']}}</text>
			</view>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/user/address.css');
</style>
<script>
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				list: [],
				type: '',
				id: '',
			};
		},
		onLoad: function(options) {
			self = this;
			this.type = options.type ? options.type : '';
			this.id = options.id ? options.id : '';
			$.setTitle(self.i18n['银行卡']);
		},
		onShow: function() {
			this.init();
		},
		methods: {
			choose(item) {
				const self = this;
				if(this.type != '') {
					let pages = getCurrentPages(); // 当前页面
					let beforePage = pages[pages.length - 2]; // 前一个页面
					let len = 1;
					uni.navigateBack({
						delta: len,
						success: function() {
							// #ifndef MP-WEIXIN
							if (beforePage.$vm.setBank) {
								beforePage.$vm.setBank(item); // 执行前一个页面的changeBanner方法
							}
							// #endif
							
							// #ifdef MP-WEIXIN
							if (beforePage.setBank) {
								beforePage.setBank(item); // 执行前一个页面的changeBanner方法
							}
							// #endif
						}
					});
				}
			},
			edit(item) {
				uni.setStorageSync('bankInfo',item);
				this.go('/pages/user/addbank?id='+item.id);
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.bankListApi,
					data: {
						page: 1,
						pageSize: 99
					},
					method: 'GET',
					success(res) {
						self.list = res.data.list ? res.data.list : [];
					}
				})
			},
			init() {
				this.getList();
			},
		},
		computed: {
			i18n() {
				return this.$t('bank')
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
