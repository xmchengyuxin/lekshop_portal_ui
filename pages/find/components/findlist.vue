<template>
	<view>
	
		<custom-waterfalls-flow ref="waterfallsFlowRef" :value="list" @wapperClick="clickGood" @imageClick="clickGood"  :list="list" :columnSpace="offset":imageKey="imageSrcKey"
				:column="cols"  >
			<!--  #ifdef  MP-WEIXIN -->
			<!-- 微信小程序自定义内容 -->
			<view v-for="(item, index) of list" :key="index" slot="slot{{index}}">
				<text v-if="item.status == 0 && isSelf" class="flex f-a-c f-j-c padding-lr6 h-18 b-radius-5 t-color-w f11-size find-status bg-color-linear-y">审核中</text>
				<text v-if="item.status == 2 && isSelf" class="flex f-a-c f-j-c padding-lr6 h-18 b-radius-5 t-color-w f11-size find-status bg-color-linear-r">发布失败</text>
				<text v-if="isSelf || pages == 'user'"  @click.stop="show(index)" class="flex f-a-c f-j-c van-icon van-icon-weapp-nav find-menu-btn f15-size t-color-w"></text>
				<view @click.stop="show(index)" v-if="showMenu && index == showIndex" class="flex  f-a-c f-j-c wrap-layout">
					<view v-if="pages != 'user'&& item.status != 1" @click.stop="edit(item)" class="flex f-a-c f-j-c w-50 h-50 t-color-w f12-size b-radius-30 margin-r12">编辑</view>
					<view @click="del(index)" class="flex f-a-c f-j-c w-50 h-50 t-color-w f12-size b-radius-30">删除</view>
				</view>
				<view v-if="item.type == 1" class="play-role flex f-a-c f-j-c w-20 h-20 b-radius t-color-w van-icon van-icon-play f13-size"></view>
				<view class="padding-12 p-r">
					<view class="line2">
						<text v-if="item.type == 1" class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-r margin-r4">{{i18n['短视频']}}</text>
						<text v-if="item.type == 3"  class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-g margin-r4">{{i18n['种草']}}</text>
						<text v-if="item.type == 2"  class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-y margin-r4">{{i18n['上新']}}</text>
						<text class="line-h16">{{item.content}}</text>
					</view>
					<view class="flex f-a-c f-j-s margin-t8">
						<view class="flex f-a-c">
							<view class="flex f-s-0 w-20 h-20 b-radius margin-r4 bg-img" :style="item.walkMemberHeadImg | bgimg(300)+''"></view>
							<view class="flex f-a-c f12-size t-color-9 ">{{item.walkMemberName}}</view>
						</view>
						<view  @click.stop="like(item.index)"  class="t-color-8 f12-size flex f-a-c f-s-0">
							<text :class="item.collectTrends ? 'van-icon-like t-color-y' : 'van-icon-like-o t-color-6'" class="flex f-a-c f-j-c van-icon  f15-size margin-r4"></text>
							<text :class="item.collectTrends ? 't-color-y' : 't-color-6'" class="f15-size p-r flex f-a-c" style="top: 1px;"> {{item.collectionNum}}</text>
						</view>
				 </view>
				</view>
			</view>
			<!--  #endif -->

			<!-- #ifndef  MP-WEIXIN -->
			<!-- app、h5 自定义内容 -->
			
			<template v-slot:default="item">
				<text v-if="item.status == 0 && isSelf" class="flex f-a-c f-j-c padding-lr6 h-18 b-radius-5 t-color-w f11-size find-status bg-color-linear-y">审核中</text>
				<text v-if="item.status == 2 && isSelf" class="flex f-a-c f-j-c padding-lr6 h-18 b-radius-5 t-color-w f11-size find-status bg-color-linear-r">发布失败</text>
				<text v-if="isSelf || pages == 'user'"  @click.stop="show(item.index)" class="flex f-a-c f-j-c van-icon van-icon-weapp-nav find-menu-btn f15-size t-color-w"></text>
				<view @click.stop="show(item.index)" v-if="showMenu && item.index == showIndex" class="flex  f-a-c f-j-c wrap-layout">
					<view v-if="pages != 'user' && item.status != 1" @click.stop="edit(item)" class="flex f-a-c f-j-c w-50 h-50 t-color-w f12-size b-radius-30 margin-r12">编辑</view>
					<view @click="del(item.index)" class="flex f-a-c f-j-c w-50 h-50 t-color-w f12-size b-radius-30">删除</view>
				</view>
				<view v-if="item.type == 1" class="play-role flex f-a-c f-j-c w-20 h-20 b-radius t-color-w van-icon van-icon-play f13-size"></view>
				<view class="padding-12 p-r">
					<view class="line2">
						<text v-if="item.type == 1" class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-r margin-r4">{{i18n['短视频']}}</text>
						<text v-if="item.type == 3"  class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-g margin-r4">{{i18n['种草']}}</text>
						<text v-if="item.type == 2"  class="b-radius-2 h-16 padding-lr4 f10-size t-color-w bg-color-linear-y margin-r4">{{i18n['上新']}}</text>
						<text class="line-h16">{{item.content}}</text>
					</view>
					<view class="flex f-a-c f-j-s margin-t8">
						<view class="flex f-a-c">
							<view class="flex f-s-0 w-20 h-20 b-radius margin-r4 bg-img" :style="item.walkMemberHeadImg | bgimg(300)+''"></view>
							<view class="flex f-a-c f12-size t-color-9 ">{{item.walkMemberName}}</view>
						</view>
						<view  @click.stop="like(item.index)"  class="t-color-8 f12-size flex f-a-c f-s-0">
							<text :class="item.collectTrends ? 'van-icon-like t-color-y' : 'van-icon-like-o t-color-6'" class="flex f-a-c f-j-c van-icon  f15-size margin-r4"></text>
							<text :class="item.collectTrends ? 't-color-y' : 't-color-6'" class="f15-size p-r flex f-a-c" style="top: 1px;"> {{item.collectionNum}}</text>
						</view>
					</view>
				</view>
			</template>
			<!-- #endif -->
		</custom-waterfalls-flow>
	</view>
</template>
<style scoped>
	.van-icon-play::before {
		/* #ifdef MP-WEIXIN */
		position: relative;
		top: -1px;
		left: 1px;
		/* #endif */
	}
	.find-menu-btn {
		position: absolute;
		right: 4px;
		top: 4px;
		padding: 6px;
		border-radius: 50%;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}
	.wrap-layout {
		position: absolute;
	}
	.wrap-layout view {
		background-color: rgba(0,0,0,0.3);
	}
	.find-status {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 11;
	}
	.play-role {
		position: absolute;
		top: 10px;
		left: 10px;
		background-color: rgba(0,0,0,0.3);
	}
	.line-h16 {
		position: relative;
		top: 1px;
	}
</style>
<script>
	const API = require('@/utils/api/find.js').default;
	const $ = require('../../../utils/api.js');
	export default {
		props: {
			list: {
				type: Array,
				required: true
			},
			// offset 间距，单位为 px
			offset: {
				type: Number,
				default: 1.2
			},
			// 列表渲染的 key 的键名，值必须唯一，默认为 id
			idKey: {
				type: String,
				default: "id"
			},
			// 图片 src 的键名
			imageSrcKey: {
				type: String,
				default: "mainImg"
			},
			// 列数
			cols: {
				type: Number,
				default: 2,
				validator: (num) => num >= 2
			},
			imageStyle: {
				type: Object
			},

			// 是否是单独的渲染图片的样子，只控制图片圆角而已
			single: {
				type: Boolean,
				default: false
			},

			// #ifndef MP-WEIXIN
			listStyle: {
				type: Object
			},
			// #endif
			isSelf: {
				type: Boolean,
				default: false
			},
			userId: {
				default: ''
			},
			pages: {
				default: ''
			}
		},
		data() {
			return {
				showMenu: false,
				showIndex: '',
			};
		},
		onLoad: function() {
			this.init();
		},
		methods: {
			refresh() {
				this.$refs.waterfallsFlowRef.refresh();
			},
			edit(info) {
				uni.setStorageSync('findDetail',info);
				this.go('/pages/find/issue?type='+info.type+'&id='+info.id);
			},
			like(index) {
				const self = this;
				let info = self.list[index];
				$.ajax({
					url: API.likeFindApi,
					data: {
						trendsId: info.id
					},
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						info.collectTrends = !info.collectTrends;
						if(info.collectTrends){
							info.collectionNum += 1;
						}else{
							info.collectionNum -= 1;
						}
						self.list[index] = info;
					}
				})
			},
			del(index) {
				const self = this;
				let info = this.list[index];
				$.showModal({
					content: '是否确认删除',
					success() {
						let url = 'member/trends/delete';
						let postData = {ids: info.id}
						if(self.pages == 'user') {
							url = 'member/trends/deleteMyCollection';
							postData = {id: info.id}
						}
						$.ajax({
							url: url,
							data: postData,
							method: 'POST',
							success(res) {
								self.$emit('del',index)
							}
						})
					}
				},this)
			},
			show(index) {
				this.showIndex = index;
				this.showMenu = !this.showMenu;
			},
			clickGood(data) {
				let isSelf = this.isSelf ? 1 : 0;
				if(data.type == 1) {
					$.go('/pages/find/video?id='+data.id+'&isSelf='+isSelf+'&userId='+this.userId);
				}else{
					if(this.pages == 'user') {
						$.go('/pages/user/finddetail?id='+data.id);
					}else{
						$.go('/pages/find/detail?id='+data.id+'&isSelf='+isSelf+'&userId='+this.userId);
					}
				}
			},
			init() {},


		},
		computed: {
			i18n() {
				return this.$t('find')
			},
		},
		created() {},
		mounted() {},
		destroyed() {},
		components: {
			
		},
		onPullDownRefresh() {},
		onReachBottom() {}
	}
</script>
