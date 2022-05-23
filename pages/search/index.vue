<template>
	<view class="contain">
		<view class="flex f-s-0 h-44 bg-color-w b-bottom" :style="{ 'padding-top': top + 'px' }">
			<view @click="back(1)" class="flex padding-lr10 f-a-c van-icon van-icon-arrow-left f20-size"></view>
			<view class="flex f-a-c flex-1">
				<view class="flex flex-1 h-32  b-radius-30 bg-color-f9 padding-lr4">
					<text class="flex f-a-c f-s-0 van-icon van-icon-search padding-lr2 f18-size t-color-0 margin-r6"></text>
					<view class="flex flex-1 h100">
						<input @confirm="search" v-model="value" type="text" value="" class="input f12-size" :placeholder="i18n['搜索商品']" />
					</view>
					<view class="flex f-a-c h100">
						<view @click="search()" class="flex f-a-c f-j-c f-s-0 w-50 b-radius-30 h-26 bg-color-linear-y t-color-w f12-size">{{i18n['搜索']}}</view>
					</view>
				</view>
			</view>
			<view class="flex f-a-c f-j-c padding-lr6 f20-size"></view>
			<xcx-header></xcx-header>
		</view>
		<view class="padding-6"></view>
		<view class="padding-lr12 ">
			<view class="flex f-a-c f-j-s">
				<text class="f-w-500">{{i18n['历史搜索']}}</text>
				<text class="flex f-a-c padding-10 van-icon van-icon-delete-o t-color-9"></text>
			</view>
			<view class="flex f-w">
				<view v-for="(item,index) in list" class="flex f-a-c f-j-c f-s-0 h-28 bg-color-f3 b-radius-30 padding-lr10 f12-size t-color-9 margin-r10 margin-b12">{{item}}</view>
			</view>
		</view>
		<view class="padding-lr12 ">
			<view class="flex f-a-c f-j-s">
				<text class="f-w-500">{{i18n['热门推荐']}}</text>
				<text class="flex f-a-c padding-10 van-icon van-icon-fire-o t-color-9"></text>
			</view>
			<view class="flex f-w">
				<view @click="hotSearch(item)" v-for="(item,index) in hotList" class="flex f-a-c f-j-c f-s-0 h-28 bg-color-f3 b-radius-30 padding-lr10 f12-size t-color-9 margin-r10 margin-b12">{{item.name}}</view>
			</view>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/page/white.css');
</style>
<script>
	const API = require('../../utils/api/shops.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				value: '',
				list: [],
				hotList: [],
			};
		},
		onLoad: function() {
			self = this;
			self.list = uni.getStorageSync('history') ? uni.getStorageSync('history') : [];
			this.init();
		},
		methods: {
			hotSearch(info) {
				self.go('/pages/search/list?title='+info.name,2);
			},
			search() {
				if(self.value == ''){
					self.go('/pages/search/list',2);
					// $.$toast(self.i18n['请输入搜索内容']);
					return;
				}
				if(self.list.length <= 0) {
					self.list.push(self.value);
				}else{
					let have = false;
					self.list.forEach((ele,index) => {
						if(ele == self.value) {
							have = true;
						}
					})
					if(!have) {
						self.list.push(self.value);
					}
				}
				uni.setStorageSync('history',self.list);
				self.go('/pages/search/list?title='+self.value,2);
			},
			getHot() {
				$.ajax({
					url: API.searchTJApi,
					data: {},
					method: 'GET',
					success(res) {
						self.hotList = res.data ? res.data : [];
					}
				})
			},
			init() {
				this.getHot();
			},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('search')
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
