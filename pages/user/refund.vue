<template>
	<view class="contain">
		<view class="padding-12">
			<view class="bg-color-w b-radius-10 padding-lr12 margin-b12">
				<view @click="$refs.type.open()" class="padding-tb10 b-bottom flex f-j-s">
					<text class="f-w-500">退款类型</text>
					<view class="flex flex-1 f-j-e">
						<text v-if="type == ''" class="margin-r4  t-color-9">请选择</text>
						<text v-if="type != ''" class="margin-r4  ">{{type.name}}</text>
						<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9"></text>
					</view>
				</view>
				<view class="padding-tb10  flex f-j-s">
					<text class="f-w-500">退款金额</text>
					<view class="flex flex-1">
						<input class="input margin-r4" type="number" value="" placeholder="最多17.00"/>
						<text class="flex f-a-c f-j-c f-s-0 van-icon van-icon-edit t-color-9"></text>
					</view>
				</view>
			</view>	
			<view class="bg-color-w b-radius-10 padding-12 margin-b12">
				<view class="flex f-a-c  f15-size f-w-b">补充描述和凭证</view>
				<view class="bg-color-f7 b-radius-5 padding-10 margin-t12">
					<textarea class="f12-size h-32" maxlength="200" value="" placeholder="补充描述,有助于商家更好处理售后问题" />
					<view class="flex f-a-c f-j-e f10-size t-color-9 margin-t4">0/200</view>
					<view class="flex f-w">
						<view class="flex f-s-0 f-a-c f-j-c w-60 h-60 bg-color-e b-radius-5 van-icon van-icon-plus t-color-9 margin-t10 margin-r10"></view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="type" type="bottom">
			<view class="bg-color-w padding-12 wrap-popup-radius">
				<view class="f15-size margin-b10 flex f-j-c">退款类型</view>
				<view @click="choose(item)" v-for="(item,index) in typeList" class="flex f-a-c f-j-c b-bottom h-50">{{item.name}}</view>
				<view class="padding-20"></view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
@import url('../../static/css/index/index.css');
.input {
	text-align: right;
}
</style>
<script>
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				typeList: [{name: '仅退款',value: '1',},{name: '退货退款',value: '2',}],
				type: '',
				value: '',
				amount: '',
				imgs: [],
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			choose(info) {
				this.type = info;
				this.$refs.type.close();
			},
			init() {},
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
