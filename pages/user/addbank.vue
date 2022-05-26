<template>
	<view class="contain bg-color-w">
			<view class="padding-lr15">
				<view @click="$refs.bank.open()" class="flex h-50 b-bottom">
					<view class="f-w-b flex f-a-c">{{i18n['银行类型']}}</view>
					<view class="flex flex-1 f-j-e">
						<input v-model="bank.bankName" disabled="true" type="text" class="f12-size margin-r6" value="" :placeholder="i18n['请选择银行类型']" />
						<view class="flex f-a-c">
							<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f13-size"></text>
						</view>
					</view>
				</view>
				<view v-if="bank.bank != 'ZFB' && bank.bank != 'WX'" class="flex h-50 b-bottom">
					<view class="f-w-b flex f-a-c">{{i18n['银行卡号']}}</view>
					<view class="flex flex-1 f-j-e">
						<input v-model="bankNo" type="number" class="f12-size" value="" :placeholder="i18n['请填写银行卡号']" />
					</view>
				</view>
				<view v-if="bank.bank == 'ZFB'" class="flex h-50 b-bottom">
					<view class="f-w-b flex f-a-c">{{i18n['支付宝账号']}}</view>
					<view class="flex flex-1 f-j-e">
						<input v-model="zfbNo" type="text" class="f12-size" value="" :placeholder="i18n['请填写支付宝账号']" />
					</view>
				</view>
				<view v-if="bank != '' && bank.bank == 'WX'" class="flex padding-tb10 b-bottom">
					<view class="f-w-b flex f-a-c">{{i18n['微信收款码']}}</view>
					<view class="flex flex-1 f-j-e">
						<view @click="addImg" class="flex f-a-c f-j-c w-80 h-80 b-color-e bg-img" :style="wxNo | bgimg(300)+''">
							<text v-if="wxNo == ''" class="flex f-a-c f-j-c van-icon van-icon-plus t-color-9 f18-size"></text>
						</view>
					</view>
				</view>
				<view class="flex h-50 b-bottom">
					<view class="f-w-b flex f-a-c">{{i18n['持卡姓名']}}</view>
					<view class="flex flex-1 f-j-e">
						<input v-model="name" type="text" class="f12-size" value="" :placeholder="i18n['请填写持卡姓名']" />
					</view>
				</view>
				<view class="padding-15 margin-t15">
					<view @click="save" class="flex f-a-c f-j-c bg-color-linear-y t-color-w f-w-500 b-radius-30 h-40">{{id != '' ? i18n['编辑'] : i18n['保存']}}</view>
					<view v-if="id != ''" @click="del" class="flex f-a-c f-j-c b-color-y t-color-y margin-t12 f-w-500 b-radius-30 h-40">{{i18n['删除']}}</view>
				</view>
			</view>
		<uni-popup ref="bank" type="bottom">
			<view class="bg-color-w safe-area wrap-popup-radius padding-12">
				<view class="flex f-a-c f-j-c f-w-b margin-b12">{{i18n['选择银行']}}</view>
				<scroll-view scroll-y="true" style="height: 60vh;">
					<view @click="chooseBank(item)" class="h-40 flex f-a-c f-j-c b-bottom" v-for="item in bankList">{{item.bankName}}</view>
					<no-data v-if="bankList.length <= 0"></no-data>
				</scroll-view>
			</view>
		</uni-popup>	
	</view>
</template>
<style scoped>
@import url('../../static/css/user/address.css');
</style>
<script>
	const API = require('../../utils/api/user.js').default;
	const $ = require('../../utils/api.js');
	const api = require('../../utils/validate.js');
	let self;
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				name: '',
				phone: '',
				bankNo: '',
				bank: '',
				id: '',
				bankList :[],
				wxNo: '',
				zfbNo: '',
			};
		},
		onLoad: function(options) {
			self = this;
			this.id = options.id ? options.id : '';
			this.init();
			$.setTitle(self.i18n['银行卡']);
		},
		methods: {
			addImg() {
				$.uploadimg({
					count: 1,
					success(res) {
						self.wxNo = res.imgUrl;
					}
				})
			},
			del() {
				const self = this;
				$.showModal({
					content: '是否确认删除',
					success (res) {
						$.ajax({
							url: API.delBankApi,
							data: {id: self.id},
							method: 'POST',
							success(res) {
								$.$toast(self.i18n['操作成功']);
								$.back(1,2000);
							}
						})
					}
				},this);
			},
			chooseBank(info) {
				this.bank = info;
				this.$refs.bank.close();
			},
			
			save() {
				const self = this;
				let check = api.validate([{
						value: this.name,
						text: self.i18n['请输入真实姓名'],
						rules: ''
					},
					{
						value: this.bank,
						text: self.i18n['请选择银行类型'],
						rules: ''
					},
					
				]);
				if (!check) {
					return
				};
				let url = API.bindBankApi;
				let postData = {
					id: self.id,
					accountName: self.name,
					bank: self.bank.bankName,
				} 
				if(self.bank.bank == 'ZFB') {
					if(self.zfbNo == '') {
						$.$toast(self.i18n['请填写支付宝账号']);return
					}
					postData['zfbAccount'] = self.zfbNo;
				}else if(self.bank.bank == 'WX') {
					if(self.wxNo == '') {
						$.$toast(self.i18n['请上传微信收款码']);return
					}
					postData['wxErweima'] = self.wxNo;
				}else{
					if(self.bankNo == '') {
						$.$toast(self.i18n['请填写银行卡号']);return
					}
					postData['bankAccount'] = self.bankNo;
				}
				$.ajax({
					url: url,
					data: postData,
					method: 'POST',
					success(res) {
						$.$toast(self.i18n['操作成功']);
						self.back(1,2000);
					}
				})
			},
			getBankList() {
				const self = this;
				$.ajax({
					url: API.bankConfigApi,
					data: {},
					method: 'GET',
					success(res) {
						self.bankList = res.data ? res.data : [];
						self.getData();
						
					}
				})
			},
			getData() {
				let info = uni.getStorageSync('bankInfo') ? uni.getStorageSync('bankInfo') : '';
				if(self.id != '' && self.bankList.length > 0) {
					self.bankList.forEach((ele,index) => {
						if(ele.bankName == info.bank) {
							self.bank = ele;
						}
					})
					self.name = info.accountName;
					self.bankNo = info.bankAccount ? info.bankAccount : '';
					self.wxNo = info.wxErweima ? info.wxErweima : '';
					self.zfbNo = info.zfbAccount ? info.zfbAccount : '';
 				}
			},
			init() {
				this.getBankList();
			},
		},
		computed: {
			i18n() {
				return this.$t('bank')
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
