<template>
	<view>
		<waterfallsFlow @wapper-lick="clickGood" :list="list" :offset="offset" :idKey="idKey" :imageSrcKey="imageSrcKey"
			:cols="cols" :imageStyle="imageStyle" :single="single">
			<!--  #ifdef  MP-WEIXIN -->
			<!-- 微信小程序自定义内容 -->
			<view v-for="(item, index) of list" :key="index" slot="slot{{index}}">
				<view class="padding-12">
					<view class="">
						<text class="f10-size bg-color-r t-color-w b-radius-2 h-16 padding-lr5 margin-r6">自营</text>
						<text>{{item.title}}</text>
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
					<view class="line2">
						<text v-if="item.type == 1" class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-r margin-r4">短视频</text>
						<text v-if="item.type == 3"  class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-g margin-r4">种草</text>
						<text v-if="item.type == 2"  class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-y margin-r4">上新</text>
						<text>{{item.content}}</text>
					</view>
					<view class="flex f-a-c f-j-s margin-t8">
						<view class="flex f-a-c">
							<view class="flex f-s-0 w-16 h-16 b-radius margin-r4 bg-img" :style="item.walkMemberHeadImg | bgimg(300)+''"></view>
							<view class="flex  f10-size t-color-9 ">{{item.walkMemberName}}</view>
						</view>
						<view class="t-color-8 f12-size flex f-a-c f-s-0">
							<text class="flex f-a-c f-j-c van-icon van-icon-like-o f10-size margin-r4"></text>
							<text class=""> {{item.collectionNum}}</text>
						</view>
				 </view>
				</view>
			</template>
			<!-- #endif -->
		</waterfallsFlow>
	</view>
</template>
<style scoped>
</style>
<script>
	import waterfallsFlow from "@/components/maramlee-waterfalls-flow/maramlee-waterfalls-flow.vue";
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
				default: 12
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

			// #ifndef MP-WEIXIN
			listStyle: {
				type: Object
			},
			// #endif
			isSelf: {
				type: Boolean,
				default: false
			},
			userId: {
				default: ''
			}
		},
		data() {
			return {};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
			clickGood(data) {
				let isSelf = this.isSelf ? 1 : 0;
				$.go('/pages/find/detail?id='+data.id+'&isSelf='+isSelf+'&userId='+this.userId);
			},
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
