<template>
	<view class="contain">
		<view style="padding-top: 1px;"></view>
		<view class="flex b-bottom f-a-c h-50 padding-lr15 f15-size">{{i18n['常见问题']}}</view>	
		<view class="padding-lr15">
			<view @click="go('/pages/user/helpdetail?id='+item.id)" v-for="(item,index) in list" class="flex h-50 b-bottom">
				<view class="flex flex-1 f-a-c">
					<view class="f15-size  line1">{{item.title}}</view>
				</view>	
				<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f16-size"></text>	
				<!-- <view class="f13-size t-color-9 margin-t8">{{item.produce}}</view>
				<view v-if="item.image != ''" class="h-120 b-radius-8  margin-t10 bg-img" :style="item.image | bgimg(600)+''"></view> -->
			</view>
		</view>
		<view class="padding-10"></view>
	</view>
</template>
<style scoped>
	@import url('../../static/css/page/white.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				height: 0,
				list: [],
			};
		},
		onLoad: function() {
			let height = getApp().globalData.height;
			height = height - 44 - this.top - 15;
			this.height = height;
			this.init();
			$.setTitle(this.i18n['帮助中心'])
		},
		methods: {
			getList() {
				const self = this;
				$.ajax({
					url: 'common/article/getList',
					data: {
						cateId: '1'
					},
					method: 'GET',
					success(res) {
						self.list = res.data ? res.data : [];
					}
				})
			},
			init() {
				this.getList();
			},
		},
		computed: {
			i18n() {
				return this.$t('user')
			},
		},
		created() {},
		mounted() {},
		destroyed() {},
		components: {},
		onPullDownRefresh() {},
		onReachBottom() {}
	}
</script>
