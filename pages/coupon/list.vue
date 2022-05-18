<template>
	<view class="contain">
		<view class="flex h-30">
			<view @click="active=index" v-for="(item,index) in navs" :id="'navs'+index" :class="active == index ? 'navs-on' : ''" class="flex f-s-0  f-a-c flex-1  f-j-c  f-w-500">{{item.name}}</view>
		</view>
		<swiper class="wrap-swiper" :style="{'height': height+'px'}" :current="active" @change="changeSwiper" :indicator-dots="false" :autoplay="false" :interval="1000" :duration="500">
			<swiper-item v-for="(item,parent) in navs">
				<scroll-view @scrolltolower="loadList" scroll-y="true"  :style="{'height': height+'px'}">
					<coupon-list :type="'user'" :list="item.list"></coupon-list>
				</scroll-view>
			</swiper-item>
		</swiper>			
		
	</view>
</template>
<style scoped>
@import url('../../static/css/coupon/common.css');
</style>
<script>
	import couponList from '../common/couponlist.vue';
	const API = require('../../utils/api/shops.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				active: 0,
				navs: [],
				pageSize: 20,
				height: 0,
			};
		},
		onLoad: function() {
			self = this;
			let height = getApp().globalData.height;
			height = height-30;
			// #ifdef H5
			height = height - 44;
			// #endif
			this.height = height;
			this.init();
			$.setTitle(self.i18n['我的卡券']);
		},
		methods: {
			getList() {
				let info = self.navs[self.active];
				$.ajax({
					url: API.couponList,
					data: {
						page: self.navs[self.active]['page'],
						pageSize: self.pageSize,
						type: '',//1满减券>>2折扣券
						shopId: '',
						status: self.active,//0:未使用 1:已使用 2:已过期
					},
					method: 'GET',
					success(res) {
						let list = res.data.list ? res.data.list : [];
						if (list.length > 0) {
							info.list = info.list.concat(list);
						} 
						info.totalPage = res.data.totalPage;
						self.$set(self.navs,self.active,info);
					}
				})
			},
			changeSwiper(e) {
				self.active = e.detail.current;
				let info = self.navs[self.active];
				if(info.list.length <= 0){
					self.getList();
				}
			},
			loadList() {
				if(self.navs[self.active]['page'] < self.navs[self.active]['totalPage']) {
					self.navs[self.active]['page'] += 1;
					self.getList();
				}
			},
			init() {
				this.navs = [
					{name: this.i18n['未使用'],list: [],page: 1,totalPage: 1,},
					{name: this.i18n['已使用'],list: [],page: 1,totalPage: 1,},
					{name: this.i18n['已失效'],list: [],page: 1,totalPage: 1,},
				];
				this.getList();
			},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('coupon')
			},
		},
		mounted() {},
		destroyed() {},
		components: {couponList},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
