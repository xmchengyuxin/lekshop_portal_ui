<template>
	<view>
		<custom-waterfalls-flow :value="list" @wapperClick="clickGood" @imageClick="clickGood" v-if="sortType == 1"  :columnSpace="offset":imageKey="imageSrcKey"
			:column="cols"  >
			<!--  #ifdef  MP-WEIXIN -->
			<!-- 微信小程序自定义内容 -->
			<view v-for="(item, index) of list" :key="index" slot="slot{{index}}">
				<view class="padding-12">
					<view class="line2">
						<text v-if="item.type == 2" class="f10-size bg-color-linear-r t-color-w b-radius-2 h-16 padding-lr5 margin-r6">{{i18n['秒杀']}}</text>
						<text v-if="item.type == 3" class="f10-size bg-color-linear-y t-color-w b-radius-2 h-16 padding-lr5 margin-r6">{{i18n['拼团']}}</text>
						<text>{{item.title}}</text>
					</view>
					<!-- <view class="flex  f-w margin-t4">
						<view class="flex f-a-c f10-size padding-lr5 h-16 b-color-r t-color-r b-radius-2 margin-r8">
							官方放心购</view>
					</view> -->
					<view v-if="!isRoleGoods" class="flex f-a-c f-j-s margin-t4">
						<view class="text-price f16-size f-w-b t-color-p">{{item.price | price}}</view>
						<view class="t-color-8 f12-size flex f-a-c">
							<text class="margin-r4"> {{item.commentNum}}</text>
							<text>{{i18n['评价']}}</text>
						</view>
				 </view>
				 <view v-else class="flex f-a-c  margin-t4">
				 	<view class="text-price-role f16-size f-w-b t-color-p">{{item.point}}</view>
				 	<view v-if="item.price > 0" class=" f16-size f-w-b t-color-p padding-lr2">+</view>
				 	<view v-if="item.price > 0" class="text-price f16-size f-w-b t-color-p">{{item.price | price}}</view>
				 </view>
				</view>
			</view>
			<!--  #endif -->

			<!-- #ifndef  MP-WEIXIN -->
			<!-- app、h5 自定义内容 -->
			<template v-slot:default="item">
				<view class="padding-12">
					<view class="line2">
						<text v-if="item.type == 2" class="f10-size bg-color-linear-r t-color-w b-radius-2 h-16 padding-lr5 margin-r6">{{i18n['秒杀']}}</text>
						<text v-if="item.type == 3" class="f10-size bg-color-linear-y t-color-w b-radius-2 h-16 padding-lr5 margin-r6">{{i18n['拼团']}}</text>
						<text>{{item.title}}</text>
					</view>
					<!-- <view class="flex  f-w margin-t4">
						<view class="flex f-a-c f10-size padding-lr5 h-16 b-color-r t-color-r b-radius-2 margin-r8">
							官方放心购</view>
					</view> -->
					<view v-if="!isRoleGoods" class="flex f-a-c f-j-s margin-t4">
						<view class="text-price f16-size f-w-b t-color-p">{{item.price | price}}</view>
						<view class="t-color-8 f12-size flex f-a-c">
							<text class="margin-r4"> {{item.commentNum}}</text>
							<text>{{i18n['评价']}}</text>
						</view>
				 </view>
					<view v-else class="flex f-a-c  margin-t4">
						<view class="text-price-role f16-size f-w-b t-color-p">{{item.point}}</view>
						<view v-if="item.price > 0" class=" f16-size f-w-b t-color-p padding-lr2">+</view>
						<view v-if="item.price > 0" class="text-price f16-size f-w-b t-color-p">{{item.price | price}}</view>
					</view>
				</view>
			</template>
			<!-- #endif -->
		</custom-waterfalls-flow>
		<view @click="clickGood(item)" v-if="sortType == 2" v-for="(item, index) of list" :key="index" class="b-radius-5 bg-color-w flex margin-t10">
			<view class="flex  f-s-0 w-120 h-120 bg-img b-radius-5" :style="item[imageSrcKey] | bgimg(400)+''"></view>
			<view class="flex flex-1 f-c f-j-s padding-10">
				<view class="flex flex-1 f-c">
					<view class="line2">
						<text v-if="item.type == 2" class="f10-size bg-color-linear-r t-color-w b-radius-2 h-16 padding-lr5 margin-r6">{{i18n['秒杀']}}</text>
						<text v-if="item.type == 3" class="f10-size bg-color-linear-y t-color-w b-radius-2 h-16 padding-lr5 margin-r6">{{i18n['拼团']}}</text>
						<text class="">{{item.title}}</text>
					</view>
					<!-- <view class="flex  f-w margin-t4">
						<view class="flex f-a-c f10-size padding-lr5 h-16 b-color-r t-color-r b-radius-2 margin-r8">官方放心购
						</view>
					</view> -->
				</view>
				<view v-if="!isRoleGoods" class="flex f-a-c f-j-s margin-t4">
					<view class="text-price f16-size f-w-b t-color-p">{{item.price | price}}</view>
					<view class="t-color-8 f12-size flex f-a-c">
						<text class="margin-r4"> {{item.commentNum}}</text>
						<text>{{i18n['评价']}}</text>
					</view>
				</view>
				<view v-else class="flex f-a-c  margin-t4">
					<view class="text-price-role f16-size f-w-b t-color-p">{{item.point}}</view>
					<view v-if="item.price > 0" class=" f16-size f-w-b t-color-p padding-lr2">+</view>
					<view v-if="item.price > 0" class="text-price f16-size f-w-b t-color-p">{{item.price | price}}</view>
				</view>
			</view>
		</view>
	</view>
</template>
<style scoped>
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		props: {
			list: {
				type: Array,
				required: true
			},
			// offset 间距，单位为 px
			offset: {
				type: Number,
				default: 1.2
			},
			sortType: {
				type: Number,
				default: 1
			},
			// 列表渲染的 key 的键名，值必须唯一，默认为 id
			idKey: {
				type: String,
				default: "id"
			},
			// 图片 src 的键名
			imageSrcKey: {
				type: String,
				default: "mainImg"
			},
			// 列数
			cols: {
				type: Number,
				default: 2,
				validator: (num) => num >= 2
			},
			imageStyle: {
				type: Object
			},

			// 是否是单独的渲染图片的样子，只控制图片圆角而已
			single: {
				type: Boolean,
				default: false
			},
			isRoleGoods: {//是否是积分商品，默认不是
				type: Boolean,
				default: false
			},

			// #ifndef MP-WEIXIN
			listStyle: {
				type: Object
			},
			// #endif
		},
		data() {
			return {};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
			clickGood(data) {
				if(!this.isRoleGoods) {
					$.go('/pages/shops/detail?id='+data.id);
				}else{
					$.go('/pages/shops/roleDetail?id='+data.id);
				}
			},
			init() {},
		},
		computed: {
			i18n() {
				return this.$t('goodsdetail')
			},
		},
		created() {
		},
		mounted() {},
		destroyed() {},
		components: {
			
		},
		onPullDownRefresh() {},
		onReachBottom() {}
	}
</script>
