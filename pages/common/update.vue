<template>
	<view class="">
		<div v-if="show" class="wrap-up-layout flex f-a-c f-j-c">
			<div class="wrap-up-info">
				<p class="up-num">发现新版本<br>v{{version}}</p>
				<div style="height: 30px;"></div>
				<div style="background: #fff;padding: 0px 20px 0;">
					<p class="up-title">{{pro < 100 ? '更新进度': '安装中'}}：</p>
					 <view class="progress-box">
					                <progress :percent="pro" show-info stroke-width="3" />
					            </view>
					<div style="height: 40px;"></div>
				</div>
				<div class="flex wrap-up-info-btn">
					<div class="up-info-btn t-color-r flex flex-1 f-a-c f-j-c" @click="reStart">{{!isSuc ? '更新中…' :'更新成功,立即重启'}}</div>
				</div>
			</div>
		</div>
		<!-- <div class="up-info-btn flex flex-1 f-a-c f-j-c" @click="close">残忍拒绝</div> -->
	</view>
</template>

<script>
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				pro: 0,
				config: '',
				isIos: uni.getStorageSync('isIos') ? uni.getStorageSync('isIos') : '',
				version: getApp().globalData.version,
				show: false,
				isSuc: false,
			};
		},
		onLoad: function() {
		},
		methods: {
			reStart() {
				if(this.isSuc) {
					plus.runtime.restart();
				}
			},
			down() {
				const self = this;
				let wgt = getApp().globalData.hot;
				if(wgt == '') {return;}
				const downloadTask = uni.downloadFile({
				    url: wgt, //仅为示例，并非真实的资源
				    success: (downloadResult) => { 
						console.log(downloadResult,plus.runtime.version)
				        if (downloadResult.statusCode === 200) {
				        	plus.runtime.install(
				        		downloadResult.tempFilePath,
				        		{
				        			force: false
				        		},
				        		function() {
				        			console.log('install success...');
									self.isSuc = true;
				        		},
				        		function(e) {
				        			console.error('install fail...',e);
									self.show = false;
									uni.showModal({
										title: '更新失败',
										content: e,
									})
				        		}
				        	);
				        }else{
							self.show = false;
						}
				    }
				});
				
				downloadTask.onProgressUpdate((res) => {
				    // console.log('下载进度' + res.progress);
				    // console.log('已经下载的数据长度' + res.totalBytesWritten);
				    // console.log('预期需要下载的数据总长度' + res.totalBytesExpectedToWrite);
					self.pro = res.progress;
				});
				//downloadTask.abort();
				
			},
			isInstall() {
				if(this.isIos) {
					if(Number(this.config.ios_version) > Number(this.version)) {
						this.show = true;
						this.down();
					}
				}else{
					if(Number(this.config.android_version) > Number(this.version)) {
						this.show = true;
						this.down();
					}
				}
			},
			init() {
				this.config = uni.getStorageSync('config') ? uni.getStorageSync('config') : '';
				if(this.config != '') {
					// #ifdef APP-PLUS
					this.isInstall();
					// #endif
				}
			},


		},
		created() {
			this.init();
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
<style scoped>
	.wrap-up-layout {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 9999;
	}
	
	.wrap-up-info {
		width: 260px;
		background: url(../../static/images/up-bg.png) center top 20px no-repeat;
		background-size: 100%;
	
	}
	
	.up-num {
		color: #fff;
		font-size: 15px;
		font-weight: bold;
		padding: 40px 20px 30px;
	}
	
	.up-title {
		font-size: 16px;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		margin: 30px 0 10px 0;
	}
	
	.up-info-text {
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		white-space: pre-wrap;
	}
	
	.up-info-btn {
		height: 50px;
		background: #fff;
		font-weight: 500;
		color: rgba(102, 102, 102, 1);
		font-size: 16px;
		border-top: 1px solid #D5D5D5;
	}
	
	.up-info-btn:last-child {
		border-left: 1px solid #D5D5D5;
		color: #0E94FC;
	}
	
	.wrap-up-info-btn {
		background-color: #fff;
		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		overflow: hidden;
	}
</style>