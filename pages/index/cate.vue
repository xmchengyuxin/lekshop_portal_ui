<template>
	<view class="contain">
		<view class="flex f-s-0 h-44 bg-color-w b-bottom" :style="{ 'padding-top': top + 'px' }">
			<view class="flex f-a-c padding-lr10">
				<image class="w-24" src="../../static/images/tuan.png" mode="widthFix"></image>
			</view>
			<view @click="go('/pages/search/index')" class="flex f-a-c flex-1">
				<view class="flex flex-1 h-30 f-a-c b-radius-30 bg-color-f9 padding-lr10">
					<text class="flex f-a-c van-icon van-icon-search f18-size t-color-0 margin-r8"></text>
					<text class="t-color-9">搜索商品、类目</text>
				</view>
			</view>
			<view @click="$refs.menuBtn.open()" class="flex f-a-c f-j-c padding-lr10 van-icon van-icon-ellipsis f20-size"></view>
		</view>
		<view class="flex">
			<scroll-view :scroll-into-view="'cate'+active" scroll-y="true" class="flex f-c f-s-0 w-100 bg-color-fb" :style="{'height': height+'px'}">
				<view @click="active=index" v-for="(item,index) in cateList" :class="index === active ? 'cate-on' : ''" :id="'cate'+index" class="flex f-s-0 h-50 f-a-c f-j-c f12-size t-color-5 ">{{item.name}}</view>
				<view  :style="{ 'padding-top': !isIphonex ? '50px' : '84px'}"></view>
			</scroll-view>
			<scroll-view v-if="cateList.length > 0" scroll-y="true" class="flex f-c f-s-0 flex-1 padding-10" :style="{'height': height+'px'}">
				<view v-for="item in cateList[active]['children']" class="bg-color-w b-radius-10  wrap-sub-cate padding-10">
					<view class="flex f-a-c f-j-s">
						<text class="t-color-5 f12-size">{{item.name}}</text>
						<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>
					</view>
					<view class="flex f-w">
						<view v-for="(child,idx) in item.children" class="flex f-s-0 sub-item f-c f-a-c f-j-c margin-t20">
							<view class="flex w-60 h-60 bg-img  b-radius-5" :style="child.img | bgimg(300)+''"></view>
							<view class="f12-size t-color-6 margin-t4">{{child.name}}</view>
						</view>
					</view>
				</view>
				<view  :style="{ 'padding-top': !isIphonex ? '50px' : '84px'}"></view>
			</scroll-view>
		</view>
		<menu-btn ref="menuBtn"></menu-btn>
		<tab-bar :active="1" :isShow="false"></tab-bar>
	</view>
</template>
<style scoped>
@import url('../../static/css/index/cate.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				cateList: [],
				height: 0,
				active: 0,
			};
		},
		onLoad: function() {
			self = this;
			let height = getApp().globalData.height;
			height = height-44-this.top;
			this.height = height;
			this.init();
		},
		methods: {
			getCate() {
				$.ajax({
					url: 'common/goodsCate/getList',
					data: {},
					method: 'GET',
					success(res) {
						self.cateList = res.data;
					}
				})
			},
			init() {
				this.getCate();
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
