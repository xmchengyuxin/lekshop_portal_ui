<template>
	<view class="contain">
		<view    class="grid grid-c-2 b-radius-10 bg-color-w wrap-tuijian margin-t12">
			<view v-for="(item,index) in navs" class="flex f-s-0 tuijain-item f-c padding-12">
				<view class="flex f-a-c">
					<text class="f15-size f-w-500 t-color-y margin-r4">{{item.name}}</text>
					<view class="flex f-a-c h-16 padding-lr5 bg-color-linear-y b-radius-30 t-color-w f10-size">
						<text style="padding: 3px;" class="b-radius bg-color-y1 margin-r4"></text>
						新品尝鲜
					</view>
				</view>
				<!-- <view class="t-color-8 f12-size">30天包退 365天包换</view> -->
				<view class="flex f-j-s margin-t10">
					<view v-for="goods in item.list" class="tuijian-img b-radius-5 bg-img " :style="goods.mainImg | bgimg(300)"></view>
				</view>
			</view>
		</view>
	</view>
</template>
<style scoped>
@import url('../../../static/css/index/index.css');
</style>
<script>
	const $ = require('../../../utils/api.js');
	const API = require('../../../utils/api/shops.js').default;
	let self;
	export default {
		props:{
			cates: {
				required: true,
				type: Array
			}
		},
		data() {
			return {
				navs: [],
			};
		},
		onLoad: function() {
			self = this;
		},
		created() {
			self = this;
			self.setNav(0);
		},
		methods: {
			setNav(index) {
				if(index <= self.cates.length-1) {
					if(self.cates[index].id != '' && self.navs.length < 6) {
						self.getList(self.cates[index],index);
					}else{
						self.setNav(index+1);
					}
				}
			},
			getList(obj,index) {
				$.ajax({
					url: API.searchGoodsApi,
					data: {
						shopId: '',
						catePid: obj['id'],
						page: 1,
						pageSize: 2,
					},
					method: 'GET',
					success(res) {
						let list = res.data.list ? res.data.list : [];
						obj['list'] = list;
						if(list.length > 0) {
							self.navs.push(obj);
						}
						self.setNav(index+1)
					}
				})
			},
			init() {},
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
