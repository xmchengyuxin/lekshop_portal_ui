<template>
	<view>
		<waterfallsFlow v-if="sortType == 1" :list="list" :offset="offset" :idKey="idKey" :imageSrcKey="imageSrcKey"
			:cols="cols" :imageStyle="imageStyle" :single="single">
			<!--  #ifdef  MP-WEIXIN -->
			<!-- 微信小程序自定义内容 -->
			<view v-for="(item, index) of list" :key="index" slot="slot{{index}}">
				<view class="padding-12">
					<view class="">
						<text class="f10-size bg-color-r t-color-w b-radius-2 h-16 padding-lr5 margin-r6">自营</text>
						<text>{{item.text}}</text>
					</view>
					<view class="flex  f-w margin-t4">
						<view class="flex f-a-c f10-size padding-lr5 h-16 b-color-r t-color-r b-radius-2 margin-r8">
							官方放心购</view>
					</view>
					<view class="flex f-a-c f-j-s margin-t4">
						<view class="text-price f16-size f-w-b t-color-p">59.00</view>
						<view class="t-color-8 f12-size flex f-a-c">
							<text class="margin-r4"> 0</text>
							<text>评价</text>
						</view>
				 </view>
				</view>
			</view>
			<!--  #endif -->

			<!-- #ifndef  MP-WEIXIN -->
			<!-- app、h5 自定义内容 -->
			<template v-slot:default="item">
				<view class="padding-12">
					<view class="">
						<text class="f10-size bg-color-r t-color-w b-radius-2 h-16 padding-lr5 margin-r6">自营</text>
						<text>{{item.text}}</text>
					</view>
					<view class="flex  f-w margin-t4">
						<view class="flex f-a-c f10-size padding-lr5 h-16 b-color-r t-color-r b-radius-2 margin-r8">
							官方放心购</view>
					</view>
					<view class="flex f-a-c f-j-s margin-t4">
						<view class="text-price f16-size f-w-b t-color-p">59.00</view>
						<view class="t-color-8 f12-size flex f-a-c">
							<text class="margin-r4"> 0</text>
							<text>评价</text>
						</view>
				 </view>
				</view>
			</template>
			<!-- #endif -->
		</waterfallsFlow>
		<view v-if="sortType == 2" v-for="(item, index) of list" :key="index" class="b-radius-5 bg-color-w flex margin-t10">
			<view class="flex  f-s-0 w-120 h-120 bg-img b-radius-5" :style="item[imageSrcKey] | bgimg(400)"></view>
			<view class="flex flex-1 f-c f-j-s padding-10">
				<view class="flex flex-1 f-c">
					<view class="line2">
						<text class="f10-size bg-color-r t-color-w b-radius-2 h-16 padding-lr5 margin-r6">自营</text>
						<text class="">{{item.text}}</text>
					</view>
					<view class="flex  f-w margin-t4">
						<view class="flex f-a-c f10-size padding-lr5 h-16 b-color-r t-color-r b-radius-2 margin-r8">官方放心购
						</view>
					</view>
				</view>
				<view class="flex f-a-c f-j-s margin-t4">
					<view class="text-price f16-size f-w-b t-color-p">59.00</view>
					<view class="t-color-8 f12-size flex f-a-c">
						<text class="margin-r4"> 0</text>
						<text>评价</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<style scoped>
</style>
<script>
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
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
				default: 12
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
				default: "image_url"
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

			init() {},


		},
		created() {},
		mounted() {},
		destroyed() {},
		components: {
			waterfallsFlow
		},
		onPullDownRefresh() {},
		onReachBottom() {}
	}
</script>
