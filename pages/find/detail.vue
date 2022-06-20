<template>
	<view class="contain">
		<block v-for="(item,index) in list">
			<view class="flex f-j-s padding-12 ">
				<view @click="go('/pages/find/user?id='+item.walkTrends.walkMemberId)" class="flex f-a-c f-j-c ">
					<view class="flex f-s-0 w-30 h-30 b-radius bg-img  margin-r6" :style="item.walkTrends.walkMemberHeadImg | bgimg(300)+''"></view>
					<text class="f-w-b">{{item.walkTrends.walkMemberName}}</text>
				</view>
				<view class="flex f-a-c f-j-c f-s-0 ">
					<view  v-if="!isSelf"  @click="likeUser(index)" :class="item.collectWalkMember ? 't-color-y b-color-y' : 'bg-color-f7'" class="flex f-a-c f-j-c b-radius-5  padding-lr10 h-30">
						<text :class="item.collectWalkMember ? 'van-icon-success':'van-icon-plus'" class="flex f-a-c f-j-c van-icon  margin-r4 f13-size"></text>
						<text class="f12-size">{{!item.collectWalkMember ? i18n['关注'] : i18n['已关注']}}</text>
					</view>
					<!-- <view  v-else  @click="del(index)" class="flex f-a-c f-j-c b-radius-5 bg-color-f7 padding-lr10 h-30">
						<text  class="flex f-a-c f-j-c van-icon van-icon-cross margin-r4 f13-size"></text>
						<text class="f12-size">{{i18n['删除']}}</text>
					</view> -->
				</view>
			</view>
			<swiper class="wrap-img" indicator-color="#fff" indicator-active-color="#FD6C01" :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000">
				<swiper-item @click="previewImg(img,getImgs(item.walkTrends.images))" v-for="img in getImgs(item.walkTrends.images)" class="padding-lr6 box-b">
					<view class="swiper-item bg-img b-radius-10" :style="img | bgimg(700)+''"></view>
				</swiper-item>
			</swiper>
			<view @click="showGoods(item.trendsGoodsList)" v-if="item.trendsGoodsList.length > 0" class="padding-lr12 b-bottom flex f-j-s">
				<text class="flex f-a-c f11-size t-color-9">{{i18n['查看Ta提到的宝贝']}}</text>
				<view class="flex f-a-c padding-tb6">
					<view class="w-30 h-30 b-radius-2 bg-img  b-radius-2 margin-r4" :style="item.trendsGoodsList[0]['goodsMainImg'] | bgimg(300)+''"></view>
					<view class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f15-size"></view>
				</view>
			</view>
			<view @click="showMore(index)" class="padding-lr12 margin-t12">
				<view :ref="'text'+index" :class="item.show ? '' : 'line2'" class="  f12-size">{{item.walkTrends.content}}</view>
				<view v-if="isLine(item.walkTrends.content,'text'+index,2,13)" :class="item.show ? 'van-icon-arrow-up' : 'van-icon-arrow-down'" class="flex f-a-c f-j-c van-icon  t-color-9 margin-t8"></view>
			</view>
			<view class="flex h-50 f-j-s padding-lr12">
				<view class="flex f-a-c f-j-c van-icon van-icon-share-o f20-size"></view>
				<view class="flex">
					<!-- <view class="flex f-a-c f-j-c van-icon van-icon-like-o f20-size margin-r4 t-color-6"></view>
					<text class="f11-size flex f-a-c margin-r16">{{item.walkTrends.viewNum}}</text> -->
					<view @click="like(index)" :class="item.collectTrends ? 'van-icon-like t-color-y' : 'van-icon-like-o t-color-6'" class="flex f-a-c f-j-c van-icon  f20-size margin-r4 "></view>
					<text @click="like(index)" :class="item.collectTrends ? 't-color-y' : ''" class="f16-size flex f-a-c margin-r16 p-r" style="top: 1px;">{{item.walkTrends.collectionNum}}</text>
					<view @click="openComment(index)" class="flex f-a-c f-j-c van-icon van-icon-chat-o f20-size margin-r4 t-color-6"></view>
					<text class="f16-size flex f-a-c p-r" style="top: 1px;">{{item.walkTrends.commentNum}}</text>
				</view>
			</view>
		</block>
		<no-data v-if="list.length <= 0"></no-data>
			
		<uni-popup ref="goods" type="bottom">
			<view class="wrap-popup-radius bg-color-w padding-lr12">
				<view class="flex f-a-c f-j-c b-bottom f15-size f-w-b padding-tb12">{{i18n['Ta提到的商品']}}</view>
				<view @click="go('/pages/shops/detail?id='+item.goodsId)" v-for="(item,index) in goodsList" class="padding-tb10 flex">
					<view class="flex f-s-0 w-80 h-80 b-radius-5 bg-img margin-r12" :style="item.goodsMainImg | bgimg(300)+''"></view>
					<view class="flex f-c f-j-s">
						<view class="f12-size line2">{{item.goodsName}}</view>
						<view class="text-price t-color-y">{{item.price}}</view>
					</view>
				</view>
				<view class="padding-30"></view>
			</view>
		</uni-popup>
		<comment-list ref="comment" :findId="commentId"></comment-list>
	</view>
</template>
<style scoped>
@import url('../../static/css/page/white.css');
.swiper-item,.wrap-img {
	height: 110vw;
}
</style>
<script>
	import commentList from './components/pjlist.vue';
	const API = require('../../utils/api/find.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				goodsList: [],
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
				isLike: false,
				id: '',
				commentId: '',
				userId: '',
				isSelf: false
			};
		},
		onLoad: function(options) {
			self = this;
			this.id = options.id ? options.id : '';
			this.userId = options.userId ? options.userId : '';
			this.isSelf = options.isSelf && options.isSelf == 1 ? true : false;
			this.init();
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
			del(index) {
				$.showModal({
					content: '是否确认删除',
					success() {
						let info = self.list[index];
						$.ajax({
							url: API.delFindApi,
							data: {
								ids: info.walkTrends.id,
							},
							method: 'POST',
							success(res) {
								$.$toast(self.i18n['操作成功']);
								self.list.splice(index,1);
							}
						})
					}
				},this)
			},
			openComment(index) {
				this.commentId = this.list[index]['walkTrends']['id'];
				this.$refs.comment.open();
				this.$refs.comment.init(this.commentId);
			},
			likeUser(index) {
				const self = this;
				let info = self.list[index];
				$.ajax({
					url: API.likeUserApi,
					data: {
						walkMemberId: info.walkTrends.walkMemberId
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						info.collectWalkMember = !info.collectWalkMember;
						self.list[index] = info;
					}
				})
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
			showMore(index) {
				let info = this.list[index];
				if(!info.show){
					info.show = true;
				}else{
					info.show = false;
				}
				this.$set(this.list,index,info);
			},
			showGoods(list) {
				this.goodsList = list;
				this.$refs.goods.open();
			},
			getImgs(imgs) {
				if(!imgs){return}
				return imgs.split('|')
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.detailListApi,
					data: {
						page: self.page,
						pageSize: self.pageSize,
						trendsId: self.id,
						trendsType: 1,//	1文案类>>2视频类
						walkMemberId: self.userId,
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
			getIsSelf() {
				if(self.userId == ''){return;}
				$.ajax({
					url: API.userDetailApi,
					data: {walkMemberId: self.userId},
					method: 'GET',
					success(res) {
						let info = res.data.walkMember ? res.data.walkMember : '';
						self.getUser({
							success(user) {
								self.isSelf = user.id == info.memberId;
							}
						})
					}
				})
			},
			init() {
				this.getList();
				// this.getIsSelf();
			},
		},
		created() {
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
			if(this.page < this.totalPage) {
				this.page += 1;
				this.getList();
			}
		}
	}
</script>
