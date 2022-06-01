<template>
	<view class="">
		<uni-popup ref="pjcontent" type="bottom">
			<view class="wrap-popup-radius bg-color-w safe-area">
				<view class="flex f-r f-a-c f-j-c padding-12 f15-size f-w-b b-bottom">{{i18n['评论']}}({{total}})</view>
				<scroll-view class="b-bottom" scroll-y="true" style="height: 60vh;">
					<view v-for="(item,index) in list" class="padding-12 flex f-r">
						<view class="flex f-r f-a-s margin-r12">
							<view class="flex f-s-0 w-30 h-30 b-radius bg-img " :style="item.walkTrendsComment.viewMemberHeadImg | bgimg(300)+''"></view>
						</view>
						<view class="flex flex-1 f-c">
							<view class="flex f-r">
								<view @click="chooseComment(index,'-1')" class="flex f-c flex-1">
									<view class="t-color-9 f11-size">{{item.walkTrendsComment.viewMemberName}}</view>
									<view class="f12-size f-w-500 margin-t4">{{item.walkTrendsComment.content}}</view>
								</view>
								<view @click="likeComment(index,'-1')" class="flex f-c f-a-c f-s-0" style="padding-left: 10px;">
									<view :class="item.walkTrendsComment.likeStatus == 1 ? 'van-icon-like t-color-y' : 'van-icon-like-o'" class="flex f-s-0 f-a-c f-j-c  van-icon "></view>
									<text :class="item.walkTrendsComment.likeStatus == 1 ? 't-color-y' : 't-color-9'" class="f11-size margin-t4 ">{{item.walkTrendsComment.likeNum}}</text>
								</view>
							</view>
							
							<view v-for="(child,idx) in item.chilidCommentList" class="padding-tb12 flex f-r">
								<view class="flex f-r f-a-s margin-r12">
									<view class="flex f-s-0 w-30 h-30 b-radius bg-img " :style="child.viewMemberHeadImg | bgimg(300)+''"></view>
								</view>
								<view  @click="chooseComment(index,idx)" class="flex flex-1 f-c">
									<view class="t-color-9 f11-size">{{child.viewMemberName}}</view>
									<view class="f12-size f-w-500 margin-t4">{{child.content}}</view>
									
								</view>
								<view @click="likeComment(index,idx)" class="flex f-c f-a-c" style="padding-left: 10px;">
									<view :class="child.likeStatus == 1 ? 'van-icon-like t-color-y' : 'van-icon-like-o'" class="flex f-s-0 f-a-c f-j-c  van-icon "></view>
									<text :class="child.likeStatus == 1 ? 't-color-y' : 't-color-9'" class="f11-size margin-t4 ">{{child.likeNum}}</text>
								</view>
							</view>
						</view>
						
					</view>
					<view v-if="page < totalPage" @click="loadMore()" class="flex f-r f-a-c f-j-c f12-size t-color-9 padding-10">{{i18n['点击查看更多']}}</view>
					<view v-else class="flex f-r f-a-c f-j-c no-more">{{i18n['到底了']}}</view>
					<view class="padding-10"></view>
				</scroll-view>
				<view class="flex f-a-c f-r h-40 box-c padding-lr20">
					<view :style="user.headImg | bgimg(300)+''" class="flex f-s-0 w-24 h-24 b-radius bg-img  margin-r12"></view>
					<view class="flex flex-1 h-30 b-radius-30 bg-color-f7 padding-lr12">
						<input @confirm="issue()" @blur="blur" :focus="focus" v-model="value" class="input f12-size" :placeholder="comment != '' ? '@'+comment['viewMemberName'] : i18n['展开说说吧']" type="text"  />
					</view>
					<view @click="issue" style="padding-left: 10px;" class=" t-color-y f12-size f-w-500">{{i18n['评论']}}</view>
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
		},
		data() {
			return {
				findId: '',
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
				value: '',
				user: '',
				focus: false,
				comment: '',
				parent: '',
				total: 0,
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			loadMore() {
				if(this.page < this.totalPage) {
					this.page += 1;
					this.getList();
				}
			},
			likeComment(parent,child) { 
				const self = this;
				let info;
				if(child != '-1') {
					info = self.list[parent]['chilidCommentList'][child];
				}else{
					info = self.list[parent]['walkTrendsComment'];
				}
				$.ajax({
					url: API.commentLikeApi,
					data: {
						commentId: info.id
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						info.likeStatus = info.likeStatus == 1 ? 0 : 1;
						info.likeNum = info.likeStatus == 1 ? info.likeNum+1 : info.likeNum-1;
						if(child != '-1') {
							self.list[parent]['chilidCommentList'][child] = info;
						}else{
							self.list[parent]['walkTrendsComment'] = info;
						}
					}
				})
			},
			blur() {
				this.focus =false;
				setTimeout(() => {
					self.comment= '';
					this.parent = '';
				},300)
			},
			chooseComment(index,idx) {
				this.value = '';
				this.focus = true;
				this.parent = index;
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
						$.$toast(self.i18n['操作成功']);
						self.value = '';
						let info = res.data ? res.data : '';
						if(info != '' && info.pid) {
							self.list[self.parent]['chilidCommentList'].unshift(info);
						}else {
							let obj = {
								chilidCommentList: [],
								walkTrendsComment: info
							}
							self.list.unshift(obj);
						}
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
						pageSize: self.pageSize,
						trendsId: self.findId
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
						self.total = res.data.total;
					}
				})
			},
			init(id) {
				self = this;
				self.findId = id ? id : '';
				if(self.list.length > 0 && self.page == 1 && self.list[0]['walkTrendsComment']['trendsId'] == self.findId) {
					return;
				}
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
