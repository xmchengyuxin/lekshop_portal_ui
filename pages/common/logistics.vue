<template>
	<view class="">
		<uni-popup ref="wuliu" type="bottom">
			<view style="padding: 12px 15px 0px;border-top-right-radius: 15px;border-top-left-radius: 15px;"  class=" bg-color-w   f13-size f-w-b t-color-3">
				<view v-if="info != ''" class="flex f-a-c f-s-0">
					<image v-if="info.logo" class="w-50 margin-r12" :src="info.logo | img(400)" mode="widthFix"></image>
					<view v-else class="flex f-a-c f-j-c shops-icon shops-icon-wuliu f44-size margin-r12"></view>
					<view class="flex f-c">
						<text class="">{{info.deliveryType}}</text>
						<text class="f12-size t-color-b margin-t4">{{info.orderNo}}</text>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 60vh;">
					<view class="margin-t20" style="padding-bottom: 30px;">
						<view class="flex f-a-c f-j-c padding-30" v-if="list.length <= 0">{{i18n['暂无数据']}}</view>
						<view class="flex pro-item" :class="index <= 0 ? 'on': ''" v-for="(item,index) in list">
							<view class="flex f-c margin-r12">
								<view class="flex f-s-0 dot b-radius"></view>
								<view class="flex flex-1 f-j-c">
									<view class="line"></view>
								</view>
							</view>
							<view class="flex flex-1   pro-text f-c" :class="index <= 0 ? 't-color-3':'t-color-b'">
								<view>{{item.addTime | time}}</view>
								<view class="f12-size margin-t6 f-w-500">{{item.detail}}</view>
							</view>
						</view>
						
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>
<style scoped>
@import url('../../static/css/iconcolor.css');
</style>
<script>
import Vue from 'vue';
const API = require('../../utils/api/order.js').default;
const $ = require('../../utils/api.js');
export default {
	name: 'logistics',
	props: [],
	data() {
		var data = {
			info: '',
			list: [],
		};
		return data;
	},
	created() {
	},
	methods: {
		show(id) {
			const self = this;
			$.ajax({
				url: API.wuliuApi,
				data: {orderId: id},
				method: 'GET',
				success(res) {
					self.$refs.wuliu.open();
					self.info = res.data.orderFreight ?  res.data.orderFreight: '';
					self.list = res.data.freightDetailList ? res.data.freightDetailList : [];
				}
			})
		},
		init() {
		}
	},
	computed: {
		i18n() {
			return this.$t('nodata')
		},
	},
};
</script>
<style scoped="scoped">
	.dot {
		width: 14px;
		height: 14px;
		background: #EDEBEB;
	}
	.line {
		width: 2px;
		background-color: #E3ECEE;
	}
	.pro-text {
		position: relative;
		top: -2px;
		padding-bottom: 30px;
	}
	.pro-item.on .dot {
		background-color: #FBA51C;
	}
	.pro-item:last-child .line {
		background-color: #fff;
	}
	.pro-item:last-child .pro-text {
		padding-bottom: 0;
	}
</style>
