<template>
	<view class="">
		<uni-popup ref="pjcontent" type="bottom">
			<view class="wrap-popup-radius bg-color-w safe-area">
				<view class="flex f-a-c f-j-c padding-12 f15-size f-w-b b-bottom">评论</view>
				<scroll-view class="b-bottom" scroll-y="true" style="height: 60vh;">
					<view v-for="(item,index) in list" class="padding-12 flex">
						<view class="flex f-a-s margin-r12">
							<view class="flex f-s-0 w-30 h-30 b-radius bg-img " :style="item.walkTrendsComment.viewMemberHeadImg | bgimg(300)+''"></view>
						</view>
						<view class="flex flex-1 f-c">
							<view class="flex">
								<view @click="chooseComment(index,'-1')" class="flex f-c flex-1">
									<view class="t-color-9 f11-size">{{item.walkTrendsComment.viewMemberName}}</view>
									<view class="f12-size f-w-500 margin-t4">{{item.walkTrendsComment.content}}</view>
								</view>
								<view class="flex f-c f-a-c f-s-0" style="padding-left: 10px;">
									<view class="flex f-s-0 f-a-c f-j-c  van-icon van-icon-like-o"></view>
									<text class="f11-size margin-t4 t-color-9">{{item.walkTrendsComment.likeNum}}</text>
								</view>
							</view>
							
							<view v-for="(child,idx) in item.chilidCommentList" class="padding-tb12 flex">
								<view class="flex f-a-s margin-r12">
									<view class="flex f-s-0 w-30 h-30 b-radius bg-img " :style="child.viewMemberHeadImg | bgimg(300)+''"></view>
								</view>
								<view  @click="chooseComment(index,idx)" class="flex flex-1 f-c">
									<view class="t-color-9 f11-size">{{child.viewMemberName}}</view>
									<view class="f12-size f-w-500 margin-t4">{{child.content}}</view>
									
								</view>
								<view class="flex f-c f-a-c" style="padding-left: 10px;">
									<view class="flex f-s-0 f-a-c f-j-c  van-icon van-icon-like-o"></view>
									<text class="f11-size margin-t4 t-color-9">{{child.likeNum}}</text>
								</view>
							</view>
						</view>
						
					</view>
					<view class="flex f-a-c f-j-c no-more">到底了</view>
					<view class="padding-10"></view>
				</scroll-view>
				<view class="flex f-a-c h-40 box-c padding-lr20">
					<view :style="user.headImg | bgimg(300)+''" class="flex f-s-0 w-24 h-24 b-radius bg-img  margin-r12"></view>
					<view class="flex flex-1 h-30 b-radius-30 bg-color-f7 padding-lr12">
						<input @confirm="issue()" @blur="blur" :focus="focus" v-model="value" class="input f12-size" :placeholder="comment != '' ? '@'+comment['viewMemberName'] : '展开说说吧…'" type="text"  />
					</view>
					<view @click="issue" style="padding-left: 10px;" class=" t-color-y f12-size f-w-500">评论</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
</style>
<script>
	const API = require('../../../utils/api/find.js').default;
	const $ = require('../../../utils/api.js');
	let self;
	export default {
		props: {
			findId: {
				required: true
			},
		},
		data() {
			return {
				commentId: '',
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
				value: '',
				user: '',
				focus: false,
				comment: '',
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			blur() {
				this.focus =false;
				setTimeout(() => {
					self.comment= '';
				},300)
			},
			chooseComment(index,idx) {
				this.value = '';
				this.focus = true;
				if(idx != '-1') {
					this.comment = this.list[index]['chilidCommentList'][idx];
				}else{
					this.comment = this.list[index]['walkTrendsComment'];
				}
			},
			issue() {
				const self = this;
				$.ajax({
					url: API.commentApi,
					data: {
						trendsId: self.findId,//	动态ID
						commentId: self.comment != '' ? self.comment.id: '',//	针对某条评论ID
						content: self.value,
					},
					method: 'POST',
					success(res) {
						$.$toast('操作成功');
						self.value = '';
					}
				})
			},
			open() {
				this.$refs.pjcontent.open();
			},
			close() {
				this.$refs.pjcontent.close();
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.commentListApi,
					data: {
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
				self = this;
				this.getList();
				this.getUser({
					success(res) {
						self.user = res;
					}
				});
			},
			
		},
		created() {
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
