<template>
	<view class="">
		<uni-popup type="center" ref="group">
			<view class="bg-color-w b-radius-5 padding-12" style="width: 90vw;">
				<view class=" flex f-a-c f-j-c ">{{i18n['拼团列表']}}</view>
				<view class="padding-6 b-bottom"></view>
				<scroll-view scroll-y="true" style="max-height: 60vh;">
					<block v-for="item in list">
					<view  class="flex margin-t12">
						<view class="flex f-s-0 w-30 h-30 b-radius bg-img margin-r12" :style="item.memberHeadImg | bgimg(300)+''"></view>
						<view class="flex f-s-0 f-c margin-r6">
							<view  class="flex f-s-0 f-a-c f10-size text-price t-color-y">{{item.groupPrice}}</view>
							<view class="flex f-s-0 f-a-c f12-size ">{{item.memberName | hideCenterText}}</view>
						</view>
						<view class="flex f-c f-j-s f-a-e flex-1 margin-r10">
							<text class="f10-size">{{i18n['差1人成团'] | i18n(item.groupNum-item.haveGroupNum)}}</text>
							<!-- <text class="f10-size t-color-9">{{i18n['倒计时']}} {{now | timeCount(item.endTime)}}</text> -->
						</view>
						<view v-if="item.haveGroupNum >= item.groupNum"  class="flex f-a-c f-j-c bg-color-e t-color-9 b-radius-5 h-30 w-60">{{i18n['已成团']}}</view>
						<view v-else @click="joinGroup(item)" class="flex f-a-c f-j-c bg-color-linear-y t-color-w b-radius-5 h-30 w-60">{{i18n['去拼单']}}</view>
					</view>
					</block>
					<no-data :list="list"></no-data>
				</scroll-view>
			</view>	
		</uni-popup>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	const API = require('../../../utils/api/shops.js').default;
	const $ = require('../../../utils/api.js');
	let self;
	export default {
		props: {
			goodsId: {
				required: true,
				default: '',
			}
		},
		emits: ['joinGroup'],
		data() {
			return {
				list: [],
				page: 1,
				pageSize: 20,
				totalPage: 1,
				now: 0,
			};
		},
		onLoad: function() {
			self = this;
			this.init();
		},
		methods: {
			joinGroup(info) {
				this.$emit('joinGroup',info);
				this.close();
			},
			open() {
				this.$refs.group.open();
				if(this.list.length <= 0) {
					this.getList();
				}
			},
			close() {
				this.$refs.group.close();
			},
			getList() {
				const self = this;
				$.ajax({
					url: API.groupListApi,
					data: {
						page: self.page,
						pageSize: self.pageSize,
						goodsId: self.goodsId
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
						self.now = res.now;
					}
				})
			},
			init() {
				this.getList();
			},
		},
		created() {
			self = this;
		},
		computed: {
			i18n() {
				return this.$t('goodsdetail')
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
