<template>
	<view class="contain ">
		<view v-for="(item,key) in list" class="padding-12">
			<view @click="del()" class="f-w-b f11-size">{{key}}</view>
			<view class="flex f-w">
				<view @click="go('/pages/shops/detail?id='+child.goodsId)" v-for="(child,index) in item" class="flex f-c f-s-0 his-item margin-t12">
					<view class="bg-img  item-img b-radius-5" :style="child.goodsMainImg | bgimg(300)+''"></view>
					<view class="flex text-price f-w-b padding-lr10 f12-size t-color-y margin-t8">{{child.price}}</view>
				</view>
			</view>
		</view>
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
</style>
<script>
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				list: {},
				page: 1,
				pageSize: 20,
				totalPage: 1,
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			del() {
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
						if (list.length >= 0) {
							
							list.forEach((ele,index) => {
								let key = $.timeChange(ele.addTime,'timestamp','Y-m-d');
								if(!self.list[key]){
									self.$set(self.list,key,[]);
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
