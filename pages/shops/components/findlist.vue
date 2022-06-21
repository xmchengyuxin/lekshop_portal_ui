<template>
	<view class="">
		<scroll-view class="padding-lr12" scroll-y="true" style="height: 100%;">
			<view :style="{ 'padding-top': top +46+10+ 'px' }"></view>
			<view v-for="(item,index) in list" class="flex">
				<view class="flex f-s-0 f-w-b f22-size margin-r4">{{item.walkTrends.addTime | timeDay}}</view>
				<view class="flex f-s-0  margin-t2 f10-size t-color-9 margin-r10">{{item.walkTrends.addTime | timeMonth}} {{i18n['月']}}</view>
				<view class="flex flex-1 f-c over-h">
					<view @click="showMore(index)">
						<view :ref="'text'+index" :class="item.show ? '' : 'line2'" class="">
							<text v-if="item.walkTrends.type == 1" class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-r margin-r4">{{i18n['短视频']}}</text>
							<text v-if="item.walkTrends.type == 3" class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-g margin-r4">{{i18n['种草']}}</text>
							<text v-if="item.walkTrends.type == 2" class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-y margin-r4">{{i18n['上新']}}</text>
							{{item.walkTrends.content}}
						</view>
						<view v-if="isLine(item.walkTrends.content,'text'+index,2,14)" :class="item.show ? 'van-icon-arrow-up' : 'van-icon-arrow-down'" class="flex f-a-c f-j-c van-icon  t-color-9 "></view>
					</view>
					<view v-if="item.walkTrends.type == 1" class="margin-t12 flex">
						<view class="video-img b-radius-5 bg-color"></view>
					</view>
						
					<view v-if="item.walkTrends.type != 1" class="margin-t12 grid grid-c-3 grid-g2 b-radius-5 over-h">
						<view @click="previewImg(img)" v-for="img in getImgs(item.walkTrends.images)" class="flex w100 bg-img h-110 " :style="img | bgimg(300)+''"></view>
					</view>	
					<scroll-view class="margin-t12  h-50" scroll-x="true" >
						<view class="flex f-n ">
							<view @click="go('/pages/shops/detail?id='+good.goodsId)" v-for="(good,idx) in item.trendsGoodsList" class="flex f-s-0 margin-r6 b-radius-10 over-h bg-color-w">
								<view class="flex f-s-0 w-50 h-50 bg-img  margin-r10" :style="good.goodsMainImg | bgimg(300)+''"></view>
								<view class="flex f-c f-j-c ">
									<view class="line1 w-80">{{good.goodsName}}</view>
									<view class="text-price t-color-y">{{good.price}}</view>
								</view>
								<view class="flex f-s-0 f-a-c f-j-c padding-lr6 van-icon van-icon-arrow t-color-9"></view>
							</view>
						</view>
					</scroll-view>	
					<view class="flex h-50 f-j-s ">
						<view class="flex f-a-c f-j-c   f20-size"></view>
						<view class="flex">
							<view class="flex f-a-c f-j-c van-icon van-icon-like-o f20-size margin-r4 t-color-6"></view>
							<text class="f11-size flex f-a-c margin-r16">{{item.walkTrends.viewNum}}</text>
							<view @click="like(index)" :class="item.collectTrends ? 'van-icon-star t-color-y' : 'van-icon-star-o t-color-6'" class="flex f-a-c f-j-c van-icon  f20-size margin-r4 "></view>
							<text @click="like(index)" :class="item.collectTrends ? 't-color-y' : ''" class="f11-size flex f-a-c margin-r16">{{item.walkTrends.collectionNum}}</text>
							<view @click="openComment(index)" class="flex f-a-c f-j-c van-icon van-icon-chat-o f20-size margin-r4 t-color-6"></view>
							<text class="f11-size flex f-a-c ">{{item.walkTrends.commentNum}}</text>
						</view>
					</view>
				</view>
			</view>
			<view :style="isIphonex ? 'padding-bottom:84px' : 'padding-bottom:50px'"></view>
		</scroll-view>	
		<comment-list ref="comment" :findId="commentId"></comment-list>
	</view>
</template>
<style scoped>
	@import url('../../../static/css/index/index.css');
</style>
<script>
	import commentList from '../../find/components/pjlist.vue';
	const API = require('../../../utils/api/find.js').default;
	const $ = require('../../../utils/api.js');
	let self;
	export default {
		props: {
			findId: {
				required:true,
			},
		},
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
				commentId: '',
			};
		},
		onLoad: function() {
			self = this;
		},
		methods: {
				isLine(text,textId,line=2,size=13) {
					this.$nextTick(function(){
						if(!this.$refs[textId]){return}
						let dom = this.$refs[textId][0].$el;
						let width = dom.clientWidth;
						let len = width*line/size;
						if(text.length >= len) {
							return true
						}else{
							return false
						}
					})
					
				},
			showMore(index) {
				let info = this.list[index];
				if(!info.show){
					info.show = true;
				}else{
					info.show = false;
				}
				this.$set(this.list,index,info);
			},
			like(index) {
				const self = this;
				let info = self.list[index];
				$.ajax({
					url: API.likeFindApi,
					data: {
						trendsId: info.walkTrends.id
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						info.collectTrends = !info.collectTrends;
						if(info.collectTrends){
							info.walkTrends.collectionNum += 1;
						}else{
							info.walkTrends.collectionNum -= 1;
						}
						self.list[index] = info;
					}
				})
			},
			openComment(index) {
				this.commentId = this.list[index]['walkTrends']['id'];
				this.$refs.comment.open();
				this.$refs.comment.init(this.commentId);
			},
			getImgs(imgs) {
				if(!imgs){return}
				return imgs.split('|')
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.shopFindListApi,
					data: {
						shopId: self.findId,
						page: self.page,
						pageSize: self.pageSize
					},
					method: 'GET',
					success(res) {
						let list = [];
						if (self.page != 1) {
							list = self.list.concat(res.data.list);
						} else {
							list = res.data.list ? res.data.list : [];
						}
						self.totalPage = res.data.totalPage;
						self.list = list;
					}
				})
			},
			init() {
				this.page = 1;
				this.getList();
			},
		},
		created() {
			this.init();
		},
		computed: {
			i18n() {
				return this.$t('find')
			},
		},
		mounted() {},
		destroyed() {},
		components: {commentList},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
