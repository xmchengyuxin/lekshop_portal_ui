<template>
	<view class="contain ">
		<view class="flex fixed-top h-44 bg-color-f7 box-c" :style="{'padding-top': top + 'px'}">
			<view @click="back(1)" v-if="type != ''"
				class="flex f-s-0 padding-lr10 f-a-c f-j-c van-icon van-icon-arrow-left f20-size"></view>
			<view v-else class="flex f-s-0 padding-lr10 f-a-c f-j-c van-icon  f20-size"></view>
			<view class="flex flex-1 f-a-c f-j-c f16-size">
				{{i18nModel['我的足迹']}}
			</view>
			<view @click="clear" class="flex f-s-0 f-a-c padding-lr10 van-icon van-icon-readed"></view>
			<xcx-header></xcx-header>
		</view>
		<view :style="{'padding-top': top+44+'px'}"></view>
		<view v-for="(item,key) in list" class="padding-12">
			<view @click="del()" class="f-w-b f15-size">{{key}}</view>
			<view class="flex f-w">
				<view @click="go('/pages/shops/detail?id='+child.goodsId)" v-for="(child,index) in item" class="flex f-c f-s-0 his-item margin-t12 p-r">
					<text @click.stop="show(key,index)" class="padding-6 flex f-a-c f-j-c van-icon van-icon-weapp-nav t-color-3 f15-size find-menu-btn"></text>
					
					<view class="bg-img  item-img b-radius-5 p-r" :style="child.goodsMainImg | bgimg(300)+''">
						<view @click.stop="show(key,index)" v-if="showMenu && index == showIndex && key == showKey" class="flex  f-a-c f-j-c wrap-layout">
							<view @click="del(key,index)" class="flex f-a-c f-j-c w-50 h-50 t-color-w f12-size b-radius-30">{{i18nModel['删除']}}</view>
						</view>
					</view>
					<view class="flex f-a-c text-price f-w-b padding-lr10 f12-size t-color-y margin-t8">{{child.price}}</view>
				</view>
			</view>
		</view>
		<no-data :list="list1"></no-data>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
.his-item {
	width: 32%;
}
.item-img {
	padding: 50%;
}
.his-item:nth-child(3n+2) {
	margin: 0 2%;
}
.find-menu-btn {
		position: absolute;
		right: 4px;
		top: 4px;
		padding: 4px 10px;
		border-radius: 50%;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}
	.wrap-layout {
		position: absolute;
	}
	.wrap-layout view {
		background-color: rgba(0,0,0,0.3);
	}
</style>
<script>
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				list: {},
				list1: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
				showMenu: false,
				showIndex: '',
				showKey: '',
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			show(key,index) {
				this.showKey = key;
				this.showIndex = index;
				this.showMenu = !this.showMenu;
			},
			clear() {
				$.showModal({
					content: '是否确认删除',
					success() {
						$.ajax({
							url: API.clearHistory,
							data: {},
							method: 'POST',
							success(res) {
								self.list = {};
								self.list1 = [];
							}
						})
					}
				},this)
			},
			del() {
				$.showModal({
					content: '是否确认删除',
					success() {
						$.ajax({
							url: API.delHistory,
							data: {
								id: self.list[self.showKey][self.showIndex].id,
							},
							method: 'POST',
							success(res) {
								self.list[self.showKey].splice(self.showIndex,1);
							}
						})
					}
				},this)
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.viewGoodsListApi,
					data: {
						page: self.page,
						pageSize: self.pageSize
					},
					method: 'GET',
					success(res) {
						let list = res.data.list ? res.data.list : [];
						self.list1 = list;
						if (list.length >= 0) {
							list.forEach((ele,index) => {
								let key =String($.timeChange(ele.addTime,'timestamp','m月d日'));
								if(!self.list[key]){
									self.$set(self.list,key,[])
								}
								self.list[key].push(ele);
							})
						} 
						self.totalPage = res.data.totalPage;
					}
				})
			},
			init() {
				this.getList();
			},
		},
		created() {
		},
		computed: {
			i18nModel() {
				return this.$t('likelist')
			},
		},
		mounted() {},
		destroyed() {},
		components: {},
		onPullDownRefresh() {
		},
		onReachBottom() {
			if(this.page < this.totalPage) {
				this.page += 1;
				this.getList();
			}
		}
	}
</script>
