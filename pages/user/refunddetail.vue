<template>
	<view class="contain">
		<view class="padding-12">
			<view v-if="info != ''" class="bg-color-w b-radius-10 padding-12 margin-b12">
				<view class="flex">
					<text class="f15-size f-w-b t-color-y">{{i18nState[state[info.status]['text']]}}</text>
				</view>
				<view class="margin-t6 flex f-a-c">
					<text v-if="state[info.status]['value'] == 'suc'" class="f11-size  t-color-9">{{i18nState[state[info.status]['tip']] | i18n(info.refundAmount)}}</text>
					<text v-else class="f11-size f-w-500  t-color-9">{{i18nState[state[info.status]['tip']]}}</text>
					<uni-countdown v-if="state[info.status]['value'] == 'sqtk'"  color="#9B9B9B" splitorColor="#9B9B9B" :font-size="11" :second="autoCheckTime" />
					<uni-countdown v-if="state[info.status]['value'] == 'dth'"  color="#9B9B9B" splitorColor="#9B9B9B" :font-size="11" :second="buyerSendGoodsTime" />
					<uni-countdown v-if="state[info.status]['value'] == 'yth'"  color="#9B9B9B" splitorColor="#9B9B9B" :font-size="11" :second="sellerConfirmTime" />
				</view>
			</view>
				
			<view v-if="info != '' && state[info.status]['value'] == 'dth'" class="bg-color-w b-radius-10 padding-12 margin-b12">
				<view class="flex f-a-c  f15-size f-w-b margin-b10">{{i18n['退货信息']}}</view>
				<view class="flex h-40">
					<text class="flex f-a-c f-s-0 f12-size margin-r12">{{i18n['寄件地址']}}</text>
					<view @click="copy(address)" class="f13-size flex f-j-e" style="text-align: right;">
						<text class=" f13-size">{{address}}</text>
						<text class=" t-color-9 padding-lr4 flex f-s-0">|</text>
						<text class="t-color-y flex f-s-0">{{i18n['复制']}}</text>
					</view>
				</view>
				<view @click="$refs.wuliu.open()" class="flex h-40">
					<text class="flex f-a-c f-s-0 f12-size">{{i18n['快递类型']}}</text>
					<view class="flex f-a-c f-j-e flex-1">
						<text v-if="type == ''" class="margin-r4 f12-size t-color-9">{{i18n['请选择']}}</text>
						<text v-else class="margin-r4 f12-size ">{{type.name}}</text>
						<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 margin-t2"></text>
					</view>
				</view>
				<view class="flex h-40">
					<text class="flex f-a-c f-s-0 f12-size">{{i18n['快递单号']}}</text>
					<view class="flex f-a-c f-j-e flex-1">
						<input v-model="deliveryNo" class="w100 h100 f12-size input" type="text" value="" :placeholder="i18n['请输入']" />
					</view>
				</view>
				<view class="flex f-j-e margin-t12">
					<view @click="tuihuo" class="flex f-a-c f-j-c b-radius-30 t-color-y b-color-y w-80 h-26 f12-size">{{i18n['确认发货']}}</view>
				</view>
			</view>	
			<view class="bg-color-w b-radius-10 padding-12 margin-b12">
				<view class="flex f-a-c  f15-size f-w-b margin-b10">{{i18n['退款商品']}}</view>
				<view class="">
					<view @click="go('/pages/shops/detail?id='+info.goodsId)" class="flex margin-b10">
						<view class="flex f-s-0 w-70 h-70 b-radius-5 bg-img  margin-r10" :style="info.goodsMainImg | bgimg(300)+''"></view>
						<view class="flex flex-1 f-c margin-r8">
							<view class="line2 f12-size">{{info.goodsName}}</view>
							<view v-if="info.goodsParamName" class="flex f-a-c margin-t6">
								<view class="flex f-a-c f-j-c padding-lr6 bg-color-f7 f12-size t-color-9 b-radius-2 h-20">{{info.goodsParamName}}</view>
							</view>
						</view>
					</view>
					<view class="padding-tb6 flex">
						<text class="flex f-s-0 f12-size">{{i18n['退款原因']}}</text>
						<view class="flex flex-1 f-c">
							<view class="flex  f-j-e f12-size t-color-9">{{info.reason}}</view>
							<view class="flex f-w f-j-e">
								<view @click="previewImg(item)" v-for="(item,index) in imgs" :style="item | bgimg(300)+''" class="bg-img flex f-s-0 w-60 h-60 b-radius-5 bg-color-f7 margin-t10 margin-l6"></view>
							</view>
						</view>
					</view>
					<view class="padding-tb6 flex">
						<text class="flex f-s-0 f12-size">{{i18n['退款金额']}}</text>
						<view class="flex flex-1 f-j-e f12-size t-color-9 text-price">{{info.refundAmount}}</view>
					</view>
					<view v-if="info.deliveryType" class="padding-tb6 flex">
						<text class="flex f-s-0 f12-size">{{i18n['快递类型']}}</text>
						<view class="flex flex-1 f-j-e f12-size t-color-9 ">{{typeList[info.deliveryType]['name']}}</view>
					</view>
					<view v-if="info.deliveryNo" class="padding-tb6 flex">
						<text class="flex f-s-0 f12-size">{{i18n['快递单号']}}</text>
						<view class="flex flex-1 f-j-e f12-size t-color-9 ">{{info.deliveryNo}}</view>
					</view>
					<view class="padding-tb6 flex">
						<text class="flex f-s-0 f12-size">{{i18n['退款编号']}}</text>
						<view @click="copy(info.refundNo)" class="flex flex-1 f-j-e f12-size t-color-9">
							<text>{{info.refundNo}}</text>
							<text class="padding-lr4">|</text>
							<text class="t-color-y">{{i18n['复制']}}</text>
						</view>
					</view>
				</view>
			</view>	
			<view class="padding-lr12 bg-shadow-0 b-radius-8 bg-color-w margin-b12">
				<view class="flex f-a-c h-44 f-w-b b-bottom">{{i18n['退款日志']}}</view>
				<view class="padding-tb12">
					<view class="flex" v-for="(item,index) in list">
					<view class="flex f-c f-a-c f-s-0 padding-lr12" >
						<view v-if="index == 0" style="padding: 3px;"></view>
							<view class="w-10 h-10 b-radius-10 bg-color-linear-g"></view>
							<view v-if="index < list.length-1" class="bg-color-linear-g flex flex-1" style="width: 1px;"></view>
							<view v-if="index >= list.length-1" class=" flex flex-1" style="width: 1px;"></view>
					</view>
					<view class="flex flex-1 f-c">
							<view class="f12-size f-w-b ">{{item.content}}</view>
							<view class="f11-size t-color-9 margin-t2">{{item.addTime | time}}</view>
							<view v-if="index < list.length-1" class="padding-15"></view>
					</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="wuliu" type="bottom">
			<view class="bg-color-w padding-12 wrap-popup-radius">
				<view class="f15-size margin-b10 flex f-j-c">{{i18n['退款类型']}}</view>
				<scroll-view scroll-y="true" style='height: 60vh;'>
					<view @click="choose(item)" v-for="(item,index) in typeList" class="flex f-a-c f-j-c b-bottom h-50">{{item.name}}</view>
					<view class="padding-20"></view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
.input {
	text-align: right;
}
</style>
<script>
	const state = require('../../utils/api/state.js').default.refundListSatus;
	const api = require('../../utils/validate.js');
	const API = require('../../utils/api/order.js').default;
	const $ = require('../../utils/api.js');
	let self;
	export default {
		data() {
			return {
				detailId: '',
				id: '',
				info: '',
				list: [],
				typeList: [],
				type: '',
				imgs: [],
				address: '',
				deliveryNo: '',
				state: state,
				autoCheckTime: 0,
				buyerSendGoodsTime: 0,
				sellerConfirmTime: 0,
			};
		},
		onLoad: function(options) {
			self = this;
			this.id = options.id ? options.id : '';
			this.detailId = options.detailId ? options.detailId : '';
			this.init();
		},
		methods: {
			tuihuo() {
				let check = api.validate([
					{
						value: this.type,
						text:this.i18n['请选择快递类型'],
						rules: ''
					},
					{
						value: this.deliveryNo,
						text:this.i18n['请填写快递单号'],
						rules: ''
					},
				]);
				if(!check){return};
				$.ajax({
					url: API.tuihuoApi,
					data: {
						detailId: self.detailId,
						refundId: self.id,
						deliveryType: self.type.value,
						deliveryNo: self.deliveryNo,
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						self.back(1,2000);
					}
				})
			},
			choose(item) {
				this.type = item;
				this.$refs.wuliu.close();
			},
			getDetail() {
				$.ajax({
					url: API.refundDetailApi,
					data: {
						refundId: self.id,
						detailId: self.detailId
					},
					method: 'GET',
					success(res) {
						let info = res.data ? res.data : '';
						if(info == ''){return}
						self.id = info.refund.id;
						self.info = info.refund;
						self.list = info.refundLogList ? info.refundLogList : [];
						self.imgs = self.info.img != '' ? self.info.img.split('|') : [];
						if(self.info.autoAgreeTime) {
							self.autoCheckTime = Number(self.info.autoAgreeTime - res.now)/1000;
						}
						if(self.info.buyerSendGoodsTime) {
							self.buyerSendGoodsTime = Number(self.info.buyerSendGoodsTime - res.now)/1000;
						}
						if(self.info.sellerConfirmTime) {
							self.sellerConfirmTime = Number(self.info.sellerConfirmTime - res.now)/1000;
						}
						if(self.info.returnName) {
							self.address = self.info.returnName + ' ' + self.info.returnPhone+ ' ' + self.info.returnAddress;
						}
					}
				})
			},
			init() {
				this.getDetail();
				this.typeList = {
					'shunfeng': {name: '顺丰速运',value: 'shunfeng'},
					'youzhengguonei': {name: '邮政快递包裹',value: 'youzhengguonei'},
					'jd': {name: '京东物流',value: 'jd'},
					'yunda': {name: '韵达快递',value: 'yunda'},
					'ems': {name: 'EMS',value: 'ems'},
					'yuantong': {name: '圆通速递',value: 'yuantong'},
					'zhongtong': {name: '中通快递',value: 'zhongtong'},
					'huitongkuaidi': {name: '百世快递',value: 'huitongkuaidi'},
					'shentong': {name: '申通快递',value: 'shentong'},
					'youzhengbk': {name: '邮政标准快递',value: 'youzhengbk'},
					'zhaijisong': {name: '宅急送',value: 'zhaijisong'},
					'tiantian': {name: '天天快递',value: 'tiantian'},
					'transrush': {name: 'TransRush',value: 'transrush'},
					'debangwuliu': {name: '德邦物流',value: 'debangwuliu'},
					'baishiwuliu': {name: '百世快运',value: 'baishiwuliu'},
					'youzhengguoji': {name: '国际包裹',value: 'youzhengguoji'},
					'emsguoji': {name: 'EMS-国际件',value: 'emsguoji'},
					'danniao': {name: '丹鸟',value: 'danniao'},
					'quanfengkuaidi': {name: '全峰快递',value: 'quanfengkuaidi'},
					'suning': {name: '苏宁物流',value: 'suning'},
					'ewe': {name: 'EWE全球快递',value: 'ewe'},
					'usps': {name: 'USPS',value: 'usps'},
					'youshuwuliu': {name: '优速快递',value: 'youshuwuliu'},
					'debangkuaidi': {name: '德邦快递',value: 'debangkuaidi'},
				}
			},
		},
		computed: {
			i18n() {
				return this.$t('refund')
			},
			i18nState() {
				return this.$t('state')
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
