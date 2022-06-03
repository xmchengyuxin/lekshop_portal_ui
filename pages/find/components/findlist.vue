<template>
	<view>
	
		<custom-waterfalls-flow :value="list" @wapperClick="clickGood" @imageClick="clickGood"  :list="list" :columnSpace="offset":imageKey="imageSrcKey"
				:column="cols"  >
			<!--  #ifdef  MP-WEIXIN -->
			<!-- 微信小程序自定义内容 -->
			<view v-for="(item, index) of list" :key="index" slot="slot{{index}}">
				<view class="padding-12">
					<view class="line2">
						<text v-if="item.type == 1" class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-r margin-r4">{{i18n['短视频']}}</text>
						<text v-if="item.type == 3"  class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-g margin-r4">{{i18n['种草']}}</text>
						<text v-if="item.type == 2"  class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-y margin-r4">{{i18n['上新']}}</text>
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
			</view>
			<!--  #endif -->

			<!-- #ifndef  MP-WEIXIN -->
			<!-- app、h5 自定义内容 -->
			<template v-slot:default="item">
				<view class="padding-12">
					<view class="line2">
						<text v-if="item.type == 1" class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-r margin-r4">{{i18n['短视频']}}</text>
						<text v-if="item.type == 3"  class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-g margin-r4">{{i18n['种草']}}</text>
						<text v-if="item.type == 2"  class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-y margin-r4">{{i18n['上新']}}</text>
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
		</custom-waterfalls-flow>
	</view>
</template>
<style scoped>
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
				if(data.type == 1) {
					$.go('/pages/find/video?id='+data.id+'&isSelf='+isSelf+'&userId='+this.userId);
				}else{
					$.go('/pages/find/detail?id='+data.id+'&isSelf='+isSelf+'&userId='+this.userId);
				}
			},
			init() {},


		},
		computed: {
			i18n() {
				return this.$t('find')
			},
		},
		created() {},
		mounted() {},
		destroyed() {},
		components: {
			
		},
		onPullDownRefresh() {},
		onReachBottom() {}
	}
</script>
