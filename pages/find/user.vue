<template>
	<view class="contain">
		<block v-if="show">
		<view class="wrap-header fixed-top bg-color-f7 flex h-46 animate fadeIn" style="position: fixed;" :style="{'padding-top': top + 'px'}">
			<view @click="back(1)" class="padding-lr10 flex f-a-c f-j-c">
				<text class="van-icon van-icon-arrow-left t-color-0 f20-size"></text>
			</view>
			<view @click="goEdit" class="flex flex-1 f-j-c f-a-c">
				<view class="flex f-s-0 w-30 h-30 b-radius bg-img  margin-r8" :style="info.headImg | bgimg(300)+''"></view>
				<view class="flex f-c">
					<text class="f12-size t-color-w f-w-500">{{info.nickname}}</text>
					<view class="flex f-a-c">
						<text v-if="info.personSign" class="t-color-w f10-size">{{info.personSign}}</text>
						<text v-else class="t-color-w f10-size">{{i18n['他/她未留下任何个性签名']}}</text>
					</view>
				</view>
			</view>
			<xcx-header></xcx-header>
		</view>
		<view   :style="{'padding-top': top+44+'px'}"></view>
		</block>
		<view class="wrap-header-page1" >
			<view v-if="info.background && info.background != ''" class="header-user-img bg-img" :style="info.background | bgimg(700)+''"></view>
			<view v-else class="header-user-img bg-img" :style="'https://qiniu.chengyuwb.com/shop_find_bg.png' | bgimg(700)+''"></view>
			<view   :style="{'padding-top': top+'px'}"></view>
			<view class="flex f-j-s h-44" style="position: relative;z-index: 1;">
				<view @click="back(1)" class="padding-lr10 flex f-a-c f-j-c">
					<text class="van-icon van-icon-arrow-left t-color-w f20-size"></text>
				</view>
				<view class="flex flex-1"></view>
				<view @click="$refs.poster.open()" class="flex f-a-c f-j-c f18-size van-icon van-icon-share-o t-color-w padding-lr10"></view>
				<view @click="$refs.shareinfo.open()" class="flex f-a-c f-j-c f18-size van-icon van-icon-weapp-nav t-color-w padding-lr10"></view>
				<xcx-header></xcx-header>
			</view>
			<view class="padding-tb6"></view>
			<view class="padding-15" style="position: relative;z-index: 1;">
				<view @click="goEdit" class="padding-10 flex" style="position: relative;">
					<view class="flex f-s-0 w-80 h-80 b-radius bg-img user-img margin-r16">
						<view class="w100 h100 b-radius bg-img" :style="info.headImg | bgimg(300)+''"></view>
					</view>
					<view class="flex f-c f-j-c">
						<view class="flex f-a-c">
							<view class="f16-size t-color-w f-w-b margin-r12">{{info.nickname}}</view>
							<text v-if="isSelf" class="flex f-a-c f-j-c van-icon van-icon-edit t-color-w"></text>	
						</view>
						<view class="flex f-a-c margin-t6">
							<text v-if="info.personSign"  class="f12-size t-color-w line2">{{info.personSign}}</text>
							<text v-else  class="f12-size t-color-w line2">{{i18n['他/她未留下任何个性签名']}}</text>
						</view>
						<view class="flex f-w margin-t2">
						</view>
					</view>
					<view v-if="!isSelf" @click="like" class="wrap-like flex f-j-c h-34 w-80 f-a-c">
						<text :class="isLike ? 'van-icon-like t-color-r' :'t-color-w van-icon-like-o'" class="flex f-a-c f-j-c van-icon margin-r10"></text>
						<text class="f10-size t-color-w f-w-500">{{i18n['关注']}}</text>
					</view>
				</view>
			</view>
			<view style="position: relative;z-index: 1;" class="wrap-total flex">
				<view @click="go('/pages/find/likeusers?id='+id)" class="flex flex-1 f-c f-a-c f-j-c">
					<text class="f12-size f-w-500 t-color-w">{{i18n['关注人数']}}</text>
					<text class="f12-size f-w-500 t-color-w margin-t6">{{info.focusNum}}人</text>
				</view>
				<view @click="go('/pages/find/likefans?id='+id)" class="flex flex-1 f-c f-a-c f-j-c">
					<text class="f12-size f-w-500 t-color-w">{{i18n['粉丝数量']}}</text>
					<text class="f12-size f-w-500 t-color-w margin-t6">{{info.fansNum}}</text>
				</view>
				<view @click="go('/pages/work/pingjialist?id='+info.id)" class="flex flex-1 f-c f-a-c f-j-c">
					<text class="f12-size f-w-500 t-color-w">{{i18n['获赞数量']}}</text>
					<text class="f12-size f-w-500 t-color-w margin-t6" >{{info.likeNum}}</text>
				</view>
			</view>
		</view>
		<view class="wrap-photos">
			<view class="padding-10"></view>
		</view>
		<view class="contain-page padding-lr6" style="top: -30px;">
			<view class="flex f-j-c"><view class="line-bg"></view></view>
			<!-- <view class="flex f-a-c f-j-c margin-t6" style="padding-bottom: 12px;">
				<view @click="scrollGo('goods')" :class="scrollTo == 'goods' ? 'nav-on' :'f13-size f-w-b'" class="flex f-a-c "><text class="f13-size f-w-b ">作品</text></view>
				<view class="padding-lr20"></view>
				<view @click="scrollGo('order-tip')" :class="scrollTo == 'order-tip' ? 'nav-on' :'f13-size f-w-b'"  class="flex f-a-c "><text class="f13-size f-w-b ">喜欢</text></view>
			</view>	 -->
			<find-list :list="list" :isSelf="isSelf" @del="del" :userId="id"></find-list>
			<block v-if="list.length <= 0">
				<no-data style="padding-top: 10vh!important;"></no-data>
				<view class="flex f-a-c f-j-c">
					<view @click="$refs.showIssue.open()" class="flex f-a-c f-j-c b-radius-5 t-color-y b-color-y h-32 w-100">
						<text class="flex f-a-c f-j-c van-icon van-icon-plus t-color-y margin-r4"></text>
						<text>{{i18n['立即发布']}}</text>
					</view>
				</view>
			</block>
			
		</view>
		<menu-btn ref="shareinfo"></menu-btn>
		<poster ref="poster"></poster>
		<issue-btn ref="showIssue"></issue-btn>
	</view>
</template>
<style scoped>
@import url('../../static/css/find/user.css');

</style>
<script>
	import issueBtn from './components/issuebtn.vue';
	import findList from './components/findlist.vue';
	const API = require('../../utils/api/find.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				info: '',
				id: '',
				isLike: false,
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
				show: false,
				isSelf: false,
			};
		},
		onLoad: function(options) {
			self = this;
			this.id = options.id ? options.id : '';
			this.init();
		},
		onShow:function(){
			this.getInfo();
		},
		methods: { 
			del(index) {
				this.list.splice(index,1);
			},
			goEdit() {
				if(this.isSelf) {
					self.go('/pages/find/edit');
				}
			},
			like() { 
				const self = this;
				$.ajax({
					url: API.likeUserApi,
					data: {
						walkMemberId: self.id
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						self.isLike = !self.isLike;
					}
				})
			},
			getInfo() {
				const self = this;
				$.ajax({
					url: API.userDetailApi,
					data: {walkMemberId: self.id},
					method: 'GET',
					success(res) {
						self.info = res.data.walkMember ? res.data.walkMember : '';
						self.isLike = res.data.isCollect ? res.data.isCollect : false;
						if(self.id == ''){
							self.id = self.info.id;
						}
						self.getUser({
							success(user) {
								self.isSelf = user.id == self.info.memberId;
							}
						})
					}
				})
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.findUserListApi,
					data: {
						walkMemberId: self.id,
						type: '',
						page: self.page,
						pageSize: self.pageSize
					},
					method: 'GET',
					success(res) {
						let list = res.data.list ? res.data.list : [];
						if(list.length <= 0 && self.page == 1){
							self.list = [];return;
						}
						list.forEach((ele,index)=> {
							let obj = ele.walkTrends;
							obj.collectTrends = ele.collectTrends;
							obj.collectWalkMember = ele.collectWalkMember;
							if(obj.videoUrl && obj.videoUrl != '') {
								obj['mainImg'] = obj.videoUrl+'?vframe/jpg/offset/0/w/300';
							}else if(String(obj.images).indexOf('|') >= 0) {
								obj['mainImg'] = obj.images.split('|')[0];
							}else{
								obj['mainImg'] = obj.images;
							}
							self.list.push(obj);
						})
						self.totalPage = res.data.totalPage;
					}
				})
			},
			init() {
				this.page = 1;
				this.getList();
			},


		},
		computed: {
			i18n() {
				return this.$t('find')
			},
		},
		created() {
		},
		mounted() {},
		destroyed() {},
		components: {findList,issueBtn},
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
