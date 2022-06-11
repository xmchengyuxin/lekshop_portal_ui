<template>
	<view class="contain safe-area">
		<view class="padding-lr12">
			<block v-if="type != 1">
			<view class="flex f-a-c padding-tb12">
				<text class="f15-size t-color-3">{{i18n['上传图片']}}</text>
			</view>
			<view class="flex f-w">
				<view v-for="(item,index) in imgs" :style="item | bgimg(300)+''" class="flex f-s-0  f-j-e b-radius-5 w-80 h-80 bg-img bg-color-e margin-r12 margin-t12">
					<text @click="delImg(index)" class="flex f-a-s f-j-c van-icon van-icon-cross t-color-9 f20-size"></text>
				</view>
				<view @click="addImg" v-if="imgs.length < 9" class="flex f-s-0 f-a-c f-j-c f-c b-radius-5 w-80 h-80 bg-color-e margin-r12 margin-t12">
					<text class="flex f-a-c f-j-c van-icon t-color-9 van-icon-plus"></text>
					<text class="f12-size margin-t6 t-color-9">{{i18n['添加图片']}}</text>
				</view>
			</view>
			<view class="flex f-a-c padding-tb12">
				<text class="flex f-a-c f-j-c van-icon van-icon-editor t-color-0 f18-size margin-r4"></text>
				<text class="f15-size t-color-3">{{i18n['种草内容']}}</text>
			</view>
			<textarea v-model="content" class="bg-color-e h-140 box-c w100 b-radius-5 f12-size padding-10" value="" :placeholder="i18n['种草内容']" />
			</block>
			<block v-if="type == 1">
				<view class="flex f-a-c padding-tb12">
					<text class="f15-size t-color-3">{{i18n['上传视频']}}</text>
				</view>
				<view class="flex f-w">
					<view @click="uploadVideo" :style="video | videobgimg(300)+''" class="bg-img flex f-s-0 f-a-c f-j-c f-c b-radius-5 w-80 h-80 bg-color-e margin-r12 ">
						<text class="flex f-a-c f-j-c van-icon t-color-9 van-icon-plus"></text>
					</view>
				</view>
				<view class="flex f-a-c padding-tb12">
					<text class="flex f-a-c f-j-c van-icon van-icon-editor t-color-0 f18-size margin-r4"></text>
					<text class="f15-size t-color-3">{{i18n['视频内容']}}</text>
				</view>
				<textarea v-model="content" class="bg-color-e h-140 w100 b-radius-5 f12-size padding-10" value="" :placeholder="i18n['视频内容']" />
			</block>
			<view @click="$refs.goodslist.open()" class="flex f-a-c f-j-s padding-tb12">
				<view class="flex f-a-c">
					<text class="flex f-a-c f-j-c van-icon van-icon-thumb-circle-o t-color-0 f18-size margin-r4"></text>
					<text class="f15-size t-color-3">{{i18n['选择商品']}}</text>
				</view>
				<text class="flex f-a-c van-icon van-icon-arrow t-color-9"></text>
			</view>
			<view class="flex f-w">
				<view v-if='item.isChoose'  @click="choose(index)"  :style="item.goodsMainImg | bgimg(300)+''" v-for="(item,index) in list" class="bg-img flex f-a-s f-j-e f-s-0 margin-r10 margin-b10 w-80 h-80 padding-6 b-radius-5 bg-color-e">
					<text class="flex f-a-c f-j-c van-icon van-icon-cross"></text>
				</view>
				<view @click="$refs.goodslist.open()" class="flex f-a-c f-c f-j-c f-s-0 margin-r10 margin-b10 w-80 h-80 padding-6 b-radius-5 bg-color-e">
					<text class="flex f-a-c f-j-c van-icon t-color-9 van-icon-plus"></text>
					<text class="f12-size margin-t6 t-color-9">{{i18n['添加商品']}}</text>
				</view>
			</view>
		</view>
		<view class="padding-30"></view>
		<view class="fixed-top padding-12" :style="{'padding-bottom':isIphonex ? '34px' : ''}">
			<view @click="issue()" class="flex f-a-c f-j-c b-radius-5 h-44 bg-color-linear-r t-color-w">
				<text class="flex f-a-c f-j-c van-icon van-icon-fabu t-color-w margin-r4 f18-size"></text>
				{{type == 1 ? i18n['发布短视频'] : i18n['发布种草']}}
			</view>
		</view>
		
		<uni-popup ref="goodslist" type="bottom">
			<view class="bg-color-f7 padding-12 wrap-goods">
				<view class="flex f-a-c f-j-s">
					<view class="flex f-s-0 w-20"></view>
					<view class="flex f-j-c">{{i18n['选择商品']}}</view>
					<text @click="$refs.goodslist.close()" class="flex f-a-c f-j-c van-icon van-icon-cross"></text>
				</view>
				<view class="flex f-a-c h-40">
					<view class="flex bg-color-e b-radius-30 h-32 w100">
						<text class="flex f-a-c f-j-c f-s-0 padding-lr10 van-icon van-icon-search"></text>
						<view class="flex flex-1">
							<input v-model="name" :placeholder="i18n['请输入']" class="input" type="text" value="" />
						</view>
					</view>
					<view class="flex f-a-c f-j-c f-s-0 f12-size t-color-y padding-lr12">{{i18n['搜索']}}</view>
				</view>
				<scroll-view scroll-y="true" style="height: 60vh;">
					<view @click="choose(index)" v-for="(item,index) in list" class="flex padding-12 b-radius-5 bg-color-w margin-t12">
						<view :style="item.goodsMainImg | bgimg(300)+''" class="flex f-s-0 w-60 h-60 b-radius-5 bg-img margin-r12"></view>
						<view class="flex flex-1 f-c f-j-s margin-r12">
							<view class="line2 f12-size">{{item.goodsName}}</view>
							<text class="text-price t-color-y">{{item.buyPrice}}</text>
						</view>
						<view :class="item.isChoose ? 'van-icon-checked t-color-r' :'van-icon-circle t-color-9'" class="flex f-a-c f-j-c f-s-0 van-icon  f20-size"></view>
					</view>
					<view v-if="list.length <= 0" class="h100 flex f-c f-a-c f-j-c">
						<no-data></no-data>
					</view>
				</scroll-view>
				<view @click="$refs.goodslist.close()" class="flex f-a-c f-j-c b-radius-5 h-36 bg-color-linear-r t-color-w margin-t12">{{i18n['完成']}}</view>
				<view class="" :style="{'padding-bottom':isIphonex ? '34px' : ''}"></view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
.fixed-top {
	top: auto;
	bottom: 0;
}
.wrap-goods {
	border-radius: 10px 10px 0 0;
}
</style>
<script>
	const API = require('../../utils/api/find.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				isIphonex: uni.getStorageSync('isIphonex') ? uni.getStorageSync('isIphonex') : false,
				type: '',
				content: '',
				imgs: [],
				video: '',
				name: '',
				list: [],
			};
		},
		onLoad: function(options) {
			self = this;
			self.type = options.type ? options.type : '3';//1短视频>>2宝贝上新>>3种草>>4买家秀
			this.init();
		},
		methods: {
			uploadVideo() {
				$.uploadvideo({
					success(res) {
						self.video = res.videoUrl;
					}
				})
			},
			addImg() {
				if(self.imgs.length >= 9){return}
				$.uploadimg({
					count: 9-self.imgs.length,
					success(res) {
						self.imgs.push(res.imgUrl);
					}
				})
			},
			choose(index) {
				let info = self.list[index];
				if(info['isChoose']) {
					info['isChoose'] = false;
				}else{
					info['isChoose'] = true;
				}
				self.$set(self.list,index,info);
 			},
			getList() {
				$.ajax({
					url: API.buyGoodsListApi,
					data: {
						goodsName: self.name,
					},
					method: 'GET',
					success(res) {
						self.list = res.data ? res.data : [];
					}
				})
			},
			issue() {
				let goodsArr = [];
				self.list.forEach((ele,index) => {
					if(ele.isChoose) {
						goodsArr.push(ele.goodsId);
					}
				})
				if(self.video == '' && this.type == 1){
					$.$toast('请上传视频');return;
				}
				if(self.imgs.length <= 0 && this.type != 1){
					$.$toast('请上传图片');return;
				}
				if(goodsArr.length <= 0 && this.type != 1){
					$.$toast('请选择商品');return;
				}
				$.ajax({
					url: API.issueApi,
					data: {
						type: self.type,
						images: self.imgs.join('|'),
						videoUrl: self.video,
						content: self.content,
						goodsIds: goodsArr.join(','),
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						setTimeout(() => {
							let pages = getCurrentPages(); // 当前页面
							let beforePage = pages[pages.length - 2]; // 前一个页面
							wx.navigateBack({
								delta: 1,
								success: function() {
									if (beforePage.$vm.init) {
										beforePage.$vm.init(); // 执行前一个页面的changeBanner方法
									}
								}
							});
						},2000)
						
					}
				})
			},
			init() {
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
		components: {},
		onPullDownRefresh() {
		},
		onReachBottom() {
		}
	}
</script>
