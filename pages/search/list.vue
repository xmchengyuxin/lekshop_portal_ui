<template>
	<view class="contain">
		<view class="fixed-top">
			<view class=" flex h-44 flex bg-color-f7">
				<view @click="back(1)" class="flex padding-lr10 f-a-c van-icon van-icon-arrow-left f20-size"></view>
				<view class="flex f-a-c flex-1">
					<view class="flex flex-1 b-radius-30 h-30 bg-color-w padding-lr10">
						<view class="flex f-a-c van-icon van-icon-search f16-size margin-r8"></view>
						<input type="text" class="input">
					</view>
				</view>
				<view @click="sortType == 1 ? sortType=2 : sortType=1" class="flex f-a-c padding-lr10 van-icon van-icon-apps-o f20-size"></view>
			</view>
			<view class="flex h-40 bg-color-f7">
				<view class="flex f-a-c f-j-c flex-1 t-color-p">{{i18n['综合']}}</view>
				<view class="flex f-a-c f-j-c flex-1">{{i18n['销量']}}</view>
				<view class="flex f-a-c f-j-c flex-1">{{i18n['新上架']}}</view>
				<view class="flex f-a-c f-j-c flex-1">
					<text class="margin-r4">{{i18n['价格']}}</text>
					<view class="flex f-c f-a-c f-j-c">
						<text class="flex f-a-c f-j-c price-up"></text>
						<text class="flex f-a-c f-j-c price-down margin-t2"></text>
					</view>
				</view>
				<view @click="$refs.popup.open('right')" class="flex f-a-c f-j-c flex-1">
					<text class="margin-r4">{{i18n['筛选']}}</text>
					<text class="flex f-a-c f-j-c van-icon van-icon-filter-o"></text>
				</view>
			</view>
		</view>
		<view  :style="{ 'padding-top': top +84+ 'px' }"></view> 
		<view class="padding-lr10">
			<goodslist class="margin-t12" :sortType="sortType" :list="list"></goodslist>
		</view>
		
		<uni-popup ref="popup" type="right" background-color="#fff">  
			<view class="h100 bg-color-w" style="width: 70vw;">
				<scroll-view scroll-y="true" :style="{'height': height+'px'}">
					<view></view>
				</scroll-view>
				<view class="flex f-a-c f-j-e padding-lr10 h-60">
					<view class="flex w-160 b-radius-30 h-36 over-h">
						<view class="flex flex-1 f-a-c f-j-c bg-color-linear-y t-color-w">重置</view>
						<view class="flex flex-1 f-a-c f-j-c bg-color-p t-color-w">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
	@import url('../../static/css/search/list.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				sortType: 1,
				height: 0,
				list: [{
						id: 6,
						image_url: "https://stc.wanlshop.com/1a42d31bbb0f1d8d9aa66f804b47c7a3.jpg?x-oss-process=image/auto-orient,1/interlace,1/format,jpg/quality,q_90/sharpen,50/resize,m_mfit,w_516",
						title: "恐龙",
						text: "恐龙来啦",
					},
					{
						id: 1,
						image_url: "https://stc.wanlshop.com/9b777f933945c6d515ce8313ee3c38cd.jpg?x-oss-process=image/auto-orient,1/interlace,1/format,jpg/quality,q_90/sharpen,50/resize,m_mfit,w_516",
						title: "可爱的小猫咪呀",
						text: "小小的猫咪，甚是呆萌，呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌呆萌",
					},
				],
			};
		},
		onLoad: function() {
			self = this;
			let height = getApp().globalData.height;
			height = height-60;
			if(this.isIphonex) {
				height-=34;
			}
			this.height = height;
			this.init();
		},
		methods: {
			init() {},
		},
		created() {},
		computed: {
			i18n() {
				return this.$t('search')
			},
		},
		mounted() {},
		destroyed() {},
		components: {},
		onPullDownRefresh() {},
		onReachBottom() {}
	}
</script>
