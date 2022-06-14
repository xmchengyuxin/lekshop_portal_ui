<template>
	<view class="contain">
		<view class="h-30 fixed-top">
			<scroll-view scroll-x="true" :scroll-into-view="'navs'+active" class="h100" >
				<view class="flex f-n h100">
					<view @click="change(index)" v-for="(item,index) in navs" :id="'navs'+index" :class="active == index ? 'navs-on t-color-y' : ''" class="flex f-s-0 flex-1 f-j-c  f-a-c h100   f-w-500">{{item.name}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="padding-12">
			<view class="padding-15"></view>
			<block v-for="item in list">
				<view  class="flex margin-t12">
					<view class="flex w-30 h-30 b-radius bg-img margin-r12" :style="item.comment.memberHeadImg | bgimg(300)+''"></view>
					<view class="flex f-c f-j-s">
						<text class="f10-size">{{item.comment.memberName}}</text>
						<text class="f10-size t-color-9">{{item.comment.addTime | time3}}</text>
					</view>
				</view>
				<view class=" t-color-9 padding-lr10 margin-t6">
					{{i18n['已购商品']}}：{{item.comment.goodsParamName}}
				</view>	
				<view class="f12-size margin-t10">{{item.comment.content}}</view>
				<view v-if="item.comment.img != ''" :class="getImgs(item.comment.img).length >= 3 ? 'grid-c-3' : 'grid-c-2'" class="grid  grid-g10 margin-t10">
					<view @click="previewImg(img)" v-for="(img,index) in getImgs(item.comment.img)" class="b-radius-5 bg-img" :style="img | bgimg(300)+''" style="padding: 50%;"></view>
				</view>
				<block v-if="item.leftCommentList" v-for="child in item.leftCommentList">
					<view v-if="child.type == 1" class="padding-10 bg-color-e b-radius-5 t-color-8 margin-t8">
						{{i18n['商家回复']}}：{{child.content}}
					</view>	
					<view v-if="child.type == 2" class="padding-10  margin-t8"  >
						<text class="t-color-y ">{{child.addTime | time1}}{{i18n['追评']}}：</text>
						{{child.content}}
					</view>	
					<view v-if="child.img && child.img != ''"  class="grid grid-c-3 grid-g10 margin-t10">
						<view @click="previewImg(img)" v-for="(img,index) in getImgs(child.img)" class="b-radius-5 bg-img" :style="img | bgimg(300)+''" style="padding: 50%;"></view>
					</view>
				</block>
			
			</block>
			<no-data :list="list"></no-data>
		</view>
	</view>
</template>
<style scoped>
@import url('../../static/css/order/order.css');
/* #ifdef H5 */
.fixed-top {
	top: 44px
}
/* #endif */
</style>
<script>
	const API = require('../../utils/api/shops.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				active: 0,
				navs: [],
				list: [],
				totalPage: 1,
				page: 1,
				pageSize: 20,
				id: '',
			};
		},
		onLoad: function(options) {
			self = this;
			this.id = options.id ? options.id : '';
			this.init();
		},
		methods: {
			change(e) {
				this.active = e;
				this.page = 1;
				this.getList();
			},
			getImgs(imgs) {
				if(!imgs){return;}
				if(imgs.indexOf('|') > 0) {
					return imgs.split('|')
				}else{
					return [imgs]
				}
			},
			getList() {
				let info = self.navs[self.active];
				$.ajax({
					url: API.goodsCommentListApi,
					data: {
						page: self.page,
						pageSize: self.pageSize,
						goodsId: self.id,
						goodsComment: info.status,//1好评>>2中评>>3差评>>4有图
					},
					method: 'GET',
					success(res) {
						if (!res.data.list) {
							self.list = [];
							return;
						}
						let list = [];
						if (self.page != 1) {
							list = self.list.concat(res.data.list);
						} else {
							list = res.data.list ? res.data.list : [];
						}
						self.list = list;
						self.totalPage = res.data.totalPage;
					}
				})
			},
			initNavs() {
				self.navs = [
					{name: self.i18n['全部'],status:'',},
					{name: self.i18n['好评'],status:'1',},
					{name: self.i18n['中评'],status:'2',},
					{name: self.i18n['差评'],status:'3',},
					{name: self.i18n['有图'],status:'4',},
					];
				self.getList();
			},
			init() {
				self.initNavs();
			},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('commentList')
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
