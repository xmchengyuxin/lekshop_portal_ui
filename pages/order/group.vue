<template>
	<view class="contain">
		<view class="padding-12">
			<view class="flex bg-color-w b-radius-5 margin-b12">
				<view class="flex flex-1 f-a-c padding-12">
					<view class="flex f-a-c f-j-c f-s-0 w-36 h-36 bg-img b-radius margin-r12" :style="group.memberHeadImg | bgimg(300)+''"></view>
					<view class="flex f-c flex-1 f-j-c">
						<text class="flex f-a-c f-w-b f12-size margin-r12">{{group.memberName | hideCenterText}}</text>
						<text class="flex f-a-c f12-size t-color-9 f11-size margin-t4">{{i18n['发起1人拼团'] | i18n(group.groupNum)}}</text>
					</view>
				</view>
				<view class="padding-lr5"></view>
			</view>
			
			<view class="bg-color-w b-radius-5 padding-12 margin-b12">
				<view class="flex f-j-s margin-b16">
					<view class="flex f-a-c ">
						<text class="flex f-a-c van-icon van-icon-shop-o  margin-r6"></text>
						<text class="f-w-500 t-color-3 margin-r4 ">{{order.shopName}}</text>
						<text class="flex f-a-c van-icon van-icon-arrow t-color-9 "></text>
					</view>
				</view>
				<view class="margin-b10" v-for="(item,index) in goodsList">
					<view class="flex">
						<view class="flex f-s-0 w-70 h-70 b-radius-5 bg-img  margin-r10" :style="item.goodsMainImg | bgimg(300)+''"></view>
						<view class="flex flex-1 f-c margin-r8">
							<view class="line2 f12-size">{{item.goodsName}}</view>
							<view v-if="item.goodsParamName" class="flex f-a-c margin-t6">
								<view class="flex f-a-c f-j-c padding-lr6 bg-color-f7 f11-size t-color-9 b-radius-2 h-20">{{item.goodsParamName}}</view>
							</view>
						</view>
						<view class="flex f-s-0 f-c">
							<view class="text-price f12-size">{{item.buyPrice | price}}</view>
							<view class="flex f-j-e  text-price f12-size t-color-9 del-line">{{item.buyOriPrice | price}}</view>
							<view class="flex f-j-e margin-t6 t-color-9 f11-size">x{{item.buyNum}}</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="bg-color-w b-radius-5 padding-12 margin-b12">
				<view class="flex f-j-c f15-size f-w-500">{{i18n['邀请1位好友,可拼团成功'] | i18n(group.groupNum-group.haveGroupNum)}}</view>
				<view class="padding-10 flex f-j-c">
					<text class="f11-size t-color-9 flex f-a-c">{{i18n['倒计时']}}</text>
					<uni-countdown class="time" color="#FFFFFF" :showDay="false" background-color="#000" border-color="#00B26A"  :second="second"></uni-countdown>
				</view>
				<view class="flex f-w f-j-c padding-lr15 ">
					<block  v-for="(item,index) in group.groupNum">
						<view v-if="groupJoinList[index]" :style="groupJoinList[index]['memberHeadImg'] | bgimg(300)+''" class="flex f-s-0 w-30 h-30 b-radius bg-img margin-t6 margin-r12"></view>
						<view v-else class="flex f-s-0 w-30 h-30 f-a-c f-j-c van-icon van-icon-contact t-color-9 b-radius bg-img bg-color-e margin-t6 margin-r12"></view>
					</block>
				</view>
				<view class="padding-6"></view>
				<view @click="$refs.posterc.open()" class="flex f-a-c f-j-c margin-12 bg-color-linear-y t-color-w h-40 b-radius-30">{{i18n['邀请好友拼团']}}</view>
			</view>	
		</view>
		<poster ref="posterc" :url="url"></poster>
	</view>
</template>
<style scoped>
@import url('../../static/css/iconcolor.css');
.time {
	transform: scale(0.8);
}
</style>
<script>
	const API = require('../../utils/api/order.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				id: '',
				goodsList: [],
				order: '',
				groupJoinList: [],
				group: '',
				second: 0,
				url: '',
			};
		},
		onLoad: function(options) {
			self = this;
			this.id = options.id ? options.id : '';
			this.init();
			$.setTitle(self.i18n['拼团详情']);
		},
		methods: {
			getDetail() {
				$.ajax({
					url: API.orderDetailApi,
					data: {
						orderId: self.id
					},
					method: 'GET',
					success(res) {
						let info = res.data ? res.data : '';
						if(info == ''){return}
						self.goodsList = info.orderDetailList ? info.orderDetailList : [];
						self.groupJoinList = info.groupMemberList ? info.groupMemberList : [];
						self.order = info.order ? info.order : '';
						self.group = info.orderGroup ? info.orderGroup : '';
						self.second = (info.orderGroup.endTime - res.now)/1000;
						self.url = '/pages/shops/detail?id='+self.group.goodsId+'&joinId='+self.group.id;
					}
				})
			},
			init() {
				this.getDetail();
			},
		},
		created() {
		},
		computed: {
			i18n() {
				return this.$t('orderlist')
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
