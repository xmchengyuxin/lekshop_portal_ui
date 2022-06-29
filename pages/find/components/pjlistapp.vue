<template>
	<view class="">
			<view class="wrap-popup-radius bg-color-w flex f-c safe-area">
				<view class="flex f-a-c f-j-c b-bottom">
					<text class="flex f-r f-a-c f-j-c padding-12 f15-size f-w-b ">{{i18n['评论']}}({{total}})</text>
				</view>
				<scroll-view class="" scroll-y="true" style="height: 800upx;">
					<view v-for="(item,index) in list" class="padding-12 flex f-r">
						<view class="flex f-r f-a-s margin-r12">
							<image :src="item.walkTrendsComment.viewMemberHeadImg | img(300)+''" class="flex f-s-0 w-30 h-30 b-radius bg-img" mode="aspectFill"></image>
						</view>
						<view class="flex flex-1 f-c">
							<view class="flex f-r">
								<view @click="chooseComment(index,'-1')" class="flex f-c flex-1">
									<text class="t-color-9 f13-size">{{item.walkTrendsComment.viewMemberName}}</text>
									<text class="f13-size  margin-t4">{{item.walkTrendsComment.content}}</text>
									<text class="t-color-9 f11-size margin-t4">{{time4(item.walkTrendsComment.addTime)}}</text>
								</view>
								<view @click="likeComment(index,'-1')" class="flex f-c f-a-c f-s-0" style="padding-left: 10px;">
									<text :class="item.walkTrendsComment.likeStatus == 1 ? 'van-icon-like t-color-y' : 'van-icon-like-o'" class="flex f-s-0 f-a-c f-j-c  van-icon ">
										<!-- #ifdef APP-NVUE -->
										{{item.walkTrendsComment.likeStatus == 1 ? '&#xe715' : '&#xe712'}}
										<!-- #endif -->
									</text>
									<text :class="item.walkTrendsComment.likeStatus == 1 ? 't-color-y' : 't-color-9'" class="f15-size margin-t4 ">{{item.walkTrendsComment.likeNum}}</text>
								</view>
							</view>
							
							<view v-for="(child,idx) in item.chilidCommentList" class="padding-tb12 flex f-r">
								<view class="flex f-r f-a-s margin-r12">
									<image :src="child.viewMemberHeadImg | img(300)+''" class="flex f-s-0 w-30 h-30 b-radius bg-img" mode="aspectFill"></image>
								</view>
								<view  @click="chooseComment(index,idx)" class="flex flex-1 f-c">
									<text class="t-color-9 f13-size">{{child.viewMemberName}}</text>
									<text class="f13-size  margin-t4">{{child.content}}</text>
									
								</view>
								<view @click="likeComment(index,idx)" class="flex f-c f-a-c" style="padding-left: 10px;">
									<text :class="child.likeStatus == 1 ? 'van-icon-like t-color-y' : 'van-icon-like-o'" class="flex f-s-0 f-a-c f-j-c  van-icon ">
										<!-- #ifdef APP-NVUE -->
										{{child.likeStatus == 1 ? '&#xe715' : '&#xe712'}}
										<!-- #endif -->
									</text>
									<text :class="child.likeStatus == 1 ? 't-color-y' : 't-color-9'" class="f15-size margin-t4 p-r" style="top: 1px;">{{child.likeNum}}</text>
								</view>
							</view>
						</view>
						
					</view>
					<view v-if="page < totalPage" @click="loadMore()" class="flex f-r f-a-c f-j-c f12-size t-color-9 padding-10">
						<text>{{i18n['点击查看更多']}}</text>
					</view>
					<view v-else class="flex f-r f-a-c f-j-c ">
						<text class="f13-size no-more">{{i18n['到底了']}}</text>
					</view>
					<view class="padding-10"></view>
				</scroll-view>	
				<!-- #ifndef APP-NVUE -->
				<view class="h-50"></view>
				<view  :class="{ 'padding-b34': isIphonex}"></view>
				<!-- #endif -->
				
				<view :class="{ 'padding-b34': isIphonex}" class="flex f-a-c f-r  box-c  wrap-pj-input">
					<image :src="user.headImg | img(300)+''" class="flex f-s-0 w-30 h-30 b-radius bg-img  margin-r12" mode="aspectFill"></image>
					<view class="flex flex-1  h-36 b-radius-30 bg-color-f7 padding-lr12 p-r ">
						<input @confirm="issue()" @blur="blur" cursor-spacing="10" :focus="focus" v-model="value" class="input f13-size h-36" :placeholder="comment != '' ? '@'+comment['viewMemberName'] : i18n['展开说说吧']" type="text"  />
					</view>
					<view @click="issue" style="padding-left: 10px;" class=" t-color-y f15-size f-w-500">
						<text class="t-color-y f15-size f-w-500">{{i18n['评论']}}</text>
					</view>
				</view>
			</view>
	</view>
</template>
<style scoped>
	.wrap-pj-input {
		/* #ifndef APP-NVUE */
		position: fixed;
		/* #endif */
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 11111;
		border-top: 1px solid #f4f4f4;
		padding: 8px 20px;
	}
	.padding-b34 {
		padding-bottom: 34px!important;
	}
	.input {
		min-width: 460upx;
	}
</style>
<script>
	// #ifdef APP-NVUE
	import i18n from '@/static/language/index.js'
	var domModule = weex.requireModule('dom');
	domModule.addRule('fontFace', {
	  'fontFamily': "videoicon",
	  'src': `url('https://at.alicdn.com/t/font_3349930_vhg7e5bbcqr.ttf?t=1654048995632')`
	})
	// #endif
	import global from '@/utils/global.js';
	const API = require('../../../utils/api/find.js').default;
	const $ = require('../../../utils/api.js');
	let self;
	export default {
		props: {
		},
		data() {
			return {
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
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
			time4(source) {
				console.log(source)
				var checkTime = function(time) {
					if (time < 10) {
						time = "0" + time;
					};
					return time;
				};
				source = new Date(parseInt(source));
				var nowMonth = checkTime((new Date()).getMonth()+1);
				var nowday = checkTime((new Date()).getDate());
				var time;
				if(nowMonth == checkTime(source.getMonth() + 1) && nowday == checkTime(source.getDate())){
					//判断同一天
					time = checkTime(source.getHours()) +
					':' +
					checkTime(source.getMinutes());
				}else{
					time = checkTime(source.getMonth() + 1) +
					'-' +
					checkTime(source.getDate()) +
					' ' +
					checkTime(source.getHours()) +
					':' +
					checkTime(source.getMinutes());
				}
				return time
			},
			getUser(options) {
				global.getUser(options)
			},
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
						if(self.list.length <= 0) {
							self.getList();return;
						}
						let info = res.data ? res.data : '';
						info.likeNum = 0;
						info.likeStatus= 0;
						if(info != '' && info.pid) {
							self.list[self.parent]['chilidCommentList'].unshift(info);
						}else {
							let obj = {
								chilidCommentList: [],
								walkTrendsComment: info
							}
							self.list.unshift(obj);
						}
						self.$emit('pjlisy','add');
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
				// #ifdef APP-NVUE
				return i18n.messages[i18n.locale]['commentList']
				// #endif
				// #ifndef APP-NVUE
				return this.$t('commentList')
				// #endif
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
