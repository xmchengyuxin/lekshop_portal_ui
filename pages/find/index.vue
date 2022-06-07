<template>
	<view class="contain ">
		<view class="fixed-top h-46 flex bg-color-r box-c" :style="{ 'padding-top': top + 'px' }">
			<view @click="$refs.showIssue.open()" class="flex f-a-c f-s-0 padding-lr10 van-icon van-icon-photograph t-color-w f20-size"></view>
			<view class="flex flex-1 t-color-w">
					<view :class="active == 0 ? 'f-w-b f18-size' : 'f16-size'" class="flex f-a-c f-j-c w-50">{{i18n['发现']}}</view>
					<view @click="go('/pages/find/video')" :class="active == 1 ? 'f-w-b f18-size' : 'f16-size'" class="flex f-a-c f-j-c w-50">{{i18n['视频']}}</view>
			</view>
			<view class="flex f-s-0">
				<text  class="flex f-s-0 f-a-c padding-lr6 t-color-w van-icon van-icon-search f20-size"></text>
				<text @click="go('/pages/find/user')" class="flex f-s-0 f-a-c padding-lr10 van-icon van-icon-contact t-color-w f20-size"></text>
			</view>
			<xcx-header></xcx-header>
		</view>
		<view :style="{ 'padding-top': top +46+10+ 'px' }"></view>
		<!-- <view class="flex  padding-lr12">
			<view class="flex flex-1 f-c over-h bg-color-w b-radius-5 padding-lr12">
				<view class="padding-6"></view>
				<view class="flex f-a-c">
					<view class="flex f-s-0 w-30 h-30 b-radius bg-img bg-color margin-r12"></view>
					<view class="flex f-c flex-1">
						<text class="t-color-6 f13-size">前海万联旗舰店</text>
						<text class="t-color-9 f10-size ">2020-09-25</text>
					</view>
					<view class="flex f-a-c f-j-c b-color-e f12-size b-radius-5 h-30 w-60">关注</view>
				</view>
				<view class="line2 margin-t12">
					<text class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-r margin-r4">短视频</text>
					<text class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-g margin-r4">种草</text>
					<text class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-y margin-r4">上新</text>
					❀最近入手一件超可爱的毛衣外套！质感柔软，亲肤，但又不会软踏踏，也太舒服了吧！衣服上的卡通图案就是本公主最喜欢的了！oversize版型轻松解锁下半身失踪，可爱不失性感~&nbsp;在千篇一律的毛衣中，这种图案
				</view>
				<view class="margin-t12 flex">
					<view class="video-img b-radius-5 bg-color"></view>
				</view>
				<scroll-view class="margin-t12  h-50" scroll-x="true">
					<view class="flex f-n ">
						<view v-for="(item,index) in 3" class="flex f-s-0 margin-r6 b-radius-10 over-h bg-color-f7">
							<view class="flex f-s-0 w-50 h-50 bg-img bg-color margin-r10"></view>
							<view class="flex f-c f-j-c ">
								<view class="line1 w-100">百褶裙短裙女夏2020新款高腰学生百搭半身裙女a字裙格裙学院秋冬</view>
								<view class="text-price t-color-y">29</view>
							</view>
							<view class="flex f-s-0 f-a-c f-j-c padding-lr6 van-icon van-icon-arrow t-color-9"></view>
						</view>
					</view>

				</scroll-view>
				<view class="margin-t12 grid grid-c-3 grid-g2 b-radius-5 over-h">
					<view v-for="(item,index) in 8" class="flex w100 bg-img h-110 bg-color"></view>
				</view>
				<view class="flex f-j-s t-color-9 f12-size">
					<text class="flex f-a-c">11 阅读</text>
					<view class="flex">
						<view class="padding-tb12 flex f-a-c margin-r20">
							<view class="flex f-a-c f-j-c van-icon van-icon-good-job-o margin-r4"></view>
							<text class=" f12-size">11</text>
						</view>
						<view class="padding-tb12 flex f-a-c">
							<view class="flex f-a-c f-j-c van-icon van-icon-comment-o margin-r4"></view>
							<text class=" f12-size">11</text>
						</view>
					</view>
					

				</view>
			</view>
		</view> -->
		<view class="padding-6">
			<find-list :list="list" :offset='1.2'></find-list>
		</view>
		<tab-bar :active="2"></tab-bar>
		<issue-btn ref="showIssue"></issue-btn>
	</view>
</template>
<style scoped>
	@import url('../../static/css/index/index.css');
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
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				active: 0,
				list: [],
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
			getList() {
				const self = this;
				$.ajax({
					url: API.findListApi,
					data: {
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
		created() {},
		mounted() {},
		destroyed() {},
		components: {issueBtn,findList},
		onPullDownRefresh() {},
		onReachBottom() {
			if(this.page < this.totalPage) {
				this.page += 1;
				this.getList();
			}
		}
	}
</script>
