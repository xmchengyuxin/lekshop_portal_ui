<template>
	<view class="contain">
		<view class="padding-6"></view>
		<view class="item b-radius-5 bg-color-w" >
			<view class="flex f-c">
				<view  class="bg-color-w b-radius-5  margin-b12 b-bottom" style="padding-bottom: 10px;">
					<view  class="flex ">
						<view class="flex f-s-0 w-70 h-70 b-radius-5 bg-img  margin-r10" :style="info.goodsMainImg | bgimg(300)+''"></view>
						<view class="flex flex-1 f-c margin-r8">
							<view class="line2 f12-size">{{info.goodsName}}</view>
							<view class="flex f-a-c margin-t6">
								<view class="flex f-a-c f-j-c padding-lr6 bg-color-f7 f11-size t-color-9 b-radius-2 h-20">{{info.goodsParamName}}</view>
							</view>
							<view class="flex f-j-e">
							</view>
						</view>
					</view>
				</view>
				<view v-if="isAdd == ''" class="flex">
					<view @click="type=3" class="flex f-c flex-1 f-a-c wrap-pj-btn-item">
						<image v-if="type == 3" src="../../static/images/pj-bad-on.png" mode="widthFix"></image>
						<image v-if="type != 3" src="../../static/images/pj-bad.png" mode="widthFix"></image>
						<text class="t-color-5 f-w-500">{{i18n['非常差']}}</text>
					</view>
					<view @click="type=2"  class="flex f-c flex-1 f-a-c wrap-pj-btn-item">
						<image v-if="type == 2" src="../../static/images/pj-normal-on.png" mode="widthFix"></image>
						<image v-if="type != 2" src="../../static/images/pj-normal.png" mode="widthFix"></image>
						<text class="t-color-5 f-w-500">{{i18n['一般']}}</text>
					</view>
					<view @click="type=1" class="flex f-c flex-1 f-a-c wrap-pj-btn-item">
						<image v-if="type == 1" src="../../static/images/pj-zan-on.png" mode="widthFix"></image>
						<image v-if="type != 1" src="../../static/images/pj-zan.png" mode="widthFix"></image>
						<text class="t-color-5 f-w-500">{{i18n['超赞']}}</text>
					</view>
				</view>
			</view>
			<view  class="wrap-value b-radius-5 margin-t12">
				<textarea class="f13-size" v-model="value"  :placeholder="i18n['从多个角度评价宝贝,可以帮助更多想买的人']"></textarea>
			</view>
			<view class="flex f-w">
				<view v-for="(item,index) in imgs" :style="item | bgimg(300)+''" class="flex f-s-0  f-j-e b-radius-5 w-80 h-80 bg-img bg-color-f7 margin-r12 margin-t12">
					<text @click="delImg(index)" class="flex f-a-s f-j-c van-icon van-icon-cross t-color-9 f20-size"></text>
				</view>
				<view @click="addImg" v-if="imgs.length < 9" class="flex f-s-0 f-a-c f-j-c f-c b-radius-5 w-80 h-80 bg-color-f7 margin-r12 margin-t12">
					<text class="flex f-a-c f-j-c van-icon van-icon-plus t-color-9 f20-size"></text>
				</view>
			</view>
			<view class="flex f-a-c margin-t10">
				<view class="flex flex-1 f-c">
					<view class="flex f-a-c f-j-s">
						<view class="flex f-a-c no-user" @click="showName=!showName">
							<text :class="showName ? 'van-icon-checked t-color-y' : 'van-icon-circle t-color-9'" class="flex f-a-c f-j-c van-icon margin-r4"></text>
							<text class="f12-size f-w-500">{{i18n['公开']}}</text>
						</view>
						<text class="f11-size t-color-9">{{i18n['公开头像昵称']}}</text>
					</view>
				</view>
			</view>
		</view>
		<view  v-if="isAdd == ''" class="item b-radius-5 bg-color-w">
			<view class="flex f-a-c f-w-b margin-b12">{{info.shopName}}</view>
			<view class="flex f-a-c wrap-evaluate ">
				<text class="flex f-s-0 f12-size t-color-9">{{i18n['描述相符']}}</text>
				<view class="flex f-s-0 f-j-s wrap-star wrap-star1">
					<text @click="goodsStarNum = index+1" v-for="(item,index) in 5" :class="index <goodsStarNum ? 'van-icon-star t-color-y' : 'van-icon-star-o t-color-9'" class="flex f-a-c f-j-c van-icon   "></text>
				</view>
				<text class="f-w-500 zan-tip" v-if="goodsStarNum >= 5">{{i18n['非常好']}}</text>
			</view>
			<view class="flex f-a-c wrap-evaluate ">
				<text class="flex f-s-0 f12-size t-color-9">{{i18n['发货速度']}}</text>
				<view class="flex f-s-0 f-j-s wrap-star wrap-star1">
					<text @click="deliveryStarNum = index+1" v-for="(item,index) in 5" :class="index < deliveryStarNum ? 'van-icon-star t-color-y' : 'van-icon-star-o t-color-9'" class="flex f-a-c f-j-c van-icon   "></text>
				</view>
				<text class="f-w-500 zan-tip" v-if="deliveryStarNum >= 5">{{i18n['非常好']}}</text>
			</view>
			<view class="flex f-a-c wrap-evaluate ">
				<text class="flex f-s-0 f12-size t-color-9">{{i18n['服务态度']}}</text>
				<view class="flex f-s-0 f-j-s wrap-star wrap-star1">
					<text @click="shopStarNum = index+1" v-for="(item,index) in 5" :class="index < shopStarNum ? 'van-icon-star t-color-y' : 'van-icon-star-o t-color-9'" class="flex f-a-c f-j-c van-icon   "></text>
				</view>
				<text class="f-w-500 zan-tip" v-if="shopStarNum >= 5">{{i18n['非常好']}}</text>
			</view>
			<view class="flex f-a-c wrap-evaluate ">
				<text class="flex f-s-0 f12-size t-color-9">{{i18n['物流服务']}}</text>
				<view class="flex f-s-0 f-j-s wrap-star wrap-star1">
					<text @click="logisticStarNum = index+1" v-for="(item,index) in 5" :class="index < logisticStarNum ? 'van-icon-star t-color-y' : 'van-icon-star-o t-color-9'" class="flex f-a-c f-j-c van-icon   "></text>
				</view>
				<text class="f-w-500 zan-tip" v-if="logisticStarNum >= 5">{{i18n['非常好']}}</text>
			</view>
			
		</view>
		<view  v-if="isAdd == ''" @click="issue"  class="flex f-a-c f-j-c bg-color-linear-y t-color-w b-radius-30 f16-size f-w-500 btn">{{i18n['发表评价']}}</view>
		<view  v-else @click="add"  class="flex f-a-c f-j-c bg-color-linear-y t-color-w b-radius-30 f16-size f-w-500 btn">{{i18n['发表追评']}}</view>
		<view class="padding-30"></view>
		
	</view>
</template>
<style scoped>
	/* @import url('../../static/css/page/white.css'); */
@import url('../../static/css/user/comment.css');
</style>
<script>
	const api = require('../../utils/validate.js');
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				type: 1,
				goodsStarNum: 0,//描述相符
				deliveryStarNum: 0,//发货速度
				shopStarNum: 0,//服务态度
				logisticStarNum: 0,//物流服务
				showName: true,
				info: '',
				value: '',
				imgs: [],
				isAdd: '',
			};
		},
		onLoad: function(options) {
			self = this;
			this.isAdd = options.add ? options.add : '';
			this.init();
		},
		methods: {
			add() {
				let check = api.validate([
					{
						value: this.value,
						text:this.i18n['评价内容不能为空'],
						rules: ''
					},
				]);
				if(!check){return};
				$.ajax({
					url: API.addCommentApi,
					data: {
						anonymousStatus: self.showName ? 0 : 1,
						content: self.value,
						img: self.imgs.join('|'),
						id: self.info.id,
					},
					method: 'POST',
					success(res) {
						$.$toast('操作成功');
						uni.removeStorageSync('comment');
						$.back(1,2000);
					}
				})
			},
			issue() {
				let check = api.validate([
					{
						value: this.value,
						text:this.i18n['评价内容不能为空'],
						rules: ''
					},
					{
						value: this.goodsStarNum,
						text:this.i18n['请对描述相符进行评分'],
						rules: ''
					},
					{
						value: this.deliveryStarNum,
						text:this.i18n['请对发货速度进行评分'],
						rules: ''
					},
					{
						value: this.shopStarNum,
						text:this.i18n['请对服务态度进行评分'],
						rules: ''
					},
					{
						value: this.logisticStarNum,
						text:this.i18n['请对物流服务进行评分'],
						rules: ''
					}
				]);
				if(!check){return};
				$.ajax({
					url: API.commentApi,
					data: {
						anonymousStatus: self.showName ? 0 : 1,
						content: self.value,
						img: self.imgs.join('|'),
						goodsComment: self.type,
						goodsStarNum: self.goodsStarNum,
						deliveryStarNum: self.deliveryStarNum,
						shopStarNum: self.shopStarNum,
						logisticStarNum: self.logisticStarNum,
						id: self.info.id,
					},
					method: 'POST',
					success(res) {
						$.$toast('操作成功');
						uni.removeStorageSync('comment');
						$.back(1,2000);
					}
				})
			},
			delImg(index) {
				self.imgs.splice(index,1);
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
			init() {
				this.info = uni.getStorageSync('comment') ? uni.getStorageSync('comment') : '';
				this.isAdd = this.info.status == 1 ? '1' : '';
			},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('comment')
			},
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
