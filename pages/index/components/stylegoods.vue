<template>
	<view class="">
		<no-data :list="goodsList"></no-data>
		<custom-waterfalls-flow ref="stylegoods"  @wapperClick="clickGood" @imageClick="clickGood"  :value="goodsList" :columnSpace="offset":imageKey="imageSrcKey"
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
					<view class="flex f-a-c f-j-s margin-t4">
						<view class="text-price f16-size f-w-b t-color-p">{{item.price | price}}</view>
						<!-- <view class="t-color-8 f12-size flex f-a-c">
							<text class="margin-r4"> {{item.commentNum}}</text>
							<text>{{i18n['评价']}}</text>
						</view> -->
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
					<view class="flex f-a-c f-j-s margin-t4">
						<view class="text-price f16-size f-w-b t-color-p">{{item.price | price}}</view>
						<!-- <view class="t-color-8 f12-size flex f-a-c">
							<text class="margin-r4"> {{item.commentNum}}</text>
							<text>{{i18n['评价']}}</text>
						</view> -->
				 </view>
				</view>
			</template>
			<!-- #endif -->
		</custom-waterfalls-flow>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	const $ = require('../../../utils/api.js');
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
			cateIndex: {
				default: 0
			},
		},
		data() {
			return {
				goodsList: [],
			};
		},
		onLoad: function() {
		},
		watch: {
			cateIndex(newValue) {
				if(this.list.length <= 0){return;}
				this.goodsList = [];
				this.list.forEach((ele,index) => {
					if(ele.___index == newValue) {
						this.goodsList.push(ele);
					}
				})
				this.$refs.stylegoods.refresh();
			}
		},
		methods: {
			clickGood(data) {
				$.go('/pages/shops/detail?id='+data.id);
			},
			init() {
				this.goodsList = [];
				this.list.forEach((ele,index) => {
					if(ele.___index == this.cateIndex) {
						this.goodsList.push(ele);
					}
				})
			},
		},
		computed: {
			i18n() {
				return this.$t('goodsdetail')
			},
		},
		created() {
			this.init();
		},
		mounted() {},
		destroyed() {},
		components: {
			
		},
		onPullDownRefresh() {},
		onReachBottom() {}
	}
</script>
