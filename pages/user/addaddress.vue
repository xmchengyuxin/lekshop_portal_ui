<template>
	<view class="contain bg-color-w">
			<view class="padding-lr15">
				<view class="flex h-50 b-bottom">
					<view class="f-w-b flex f-a-c">{{i18n['联系人']}}</view>
					<view class="flex flex-1 f-j-e">
						<input v-model="name" type="text" class="f15-size" value="" :placeholder="i18n['请输入']" />
					</view>
				</view>
				<view class="flex h-50 b-bottom">
					<view class="f-w-b flex f-a-c">{{i18n['手机号']}}</view>
					<view class="flex flex-1 f-j-e">
						<input v-model="phone" type="number" class="f15-size" value="" :placeholder="i18n['请输入']" />
					</view>
				</view>
				<view @click="show=true" class="flex h-50 b-bottom">
					<view class="f-w-b flex f-a-c">{{i18n['所在地址']}}</view>
					<view class="flex flex-1 f-j-e">
						<input v-model="address" disabled="true" type="text" class="f15-size margin-r6" value="" :placeholder="i18n['请输入']" />
						<view class="flex f-a-c">
							<text class="flex f-a-c f-j-c van-icon van-icon-arrow t-color-9 f13-size"></text>
						</view>
					</view>
				</view>
				<view class="flex h-50 b-bottom">
					<view class="f-w-b flex f-a-c">{{i18n['详细地址']}}</view>
					<view class="flex flex-1 f-j-e">
						<input v-model="addressDetail" type="text" class="f15-size margin-r6" value="" :placeholder="i18n['请输入']" />
					</view>
				</view>
				<view class="flex h-50 ">
					<view class="f-w-b flex f-a-c">{{i18n['设置为默认地址']}}</view>
					<view class="flex flex-1 f-a-c f-j-e">
						<switch @change="switchChange" class="switch" color="#2EB37E" :checked="isDefault" />
					</view>
				</view>
				<!-- <view class="f15-size t-color-b">每次打开App会优先定位至该地址，方便您轻松下单享受服务</view> -->
				<view class="padding-15 margin-t15">
					<view @click="save" class="flex f-a-c f-j-c bg-color-linear-y t-color-w f-w-500 b-radius-30 h-40">{{id != '' ? i18n['编辑'] : i18n['保存']}}</view>
					<view v-if="id != ''" @click="del" class="flex f-a-c f-j-c b-color-y t-color-y margin-t12 f-w-500 b-radius-30 h-40">{{i18n['删除']}}</view>
				</view>
			</view>
			<uni-popup ref="region" type="bottom">
				<w-picker mode="region" :value="address"></w-picker>
			</uni-popup>
			<w-picker :visible.sync="show" mode="region" :value="address" default-type="value" :hide-area="false" @confirm="onConfirm($event, 'region')" ref="region"></w-picker>
	</view>
</template>
<style scoped>
@import url('../../static/css/user/address.css');
</style>
<script>
	const $ = require('../../utils/api.js');
	const api = require('../../utils/validate.js');
	export default {
		data() {
			return {
				top: uni.getStorageSync('bartop') ? uni.getStorageSync('bartop') : 0,
				name: '',
				phone: '',
				address: '',
				addressDetail: '',
				isDefault: false,
				id: '',
				province: '',
				city: '',
				area: '',
				provinceCode: '',
				cityCode: '',
				areaCode: '',
				lat: '',
				lng: '',
				show: false
			};
		},
		onLoad: function(options) {
			this.id = options.id ? options.id : '';
			if (options.id) {
				this.getData();
			}
			this.init();
		},
		methods: {
			onConfirm(e) {
				let info = e.obj;
				this.province = info.province.label;
				this.city = info.city.label;
				this.area = info.area.label;
				this.provinceCode = info.province.value;
				this.cityCode = info.city.value;
				this.areaCode = info.area.value;
				this.address = e.result;
			},
			del() {
				const self = this;
				
				$.showModal({
					content: '是否确认删除',
					success (res) {
						$.ajax({
							url: 'member/address/delete',
							data: {id: self.id},
							method: 'POST',
							success(res) {
								$.$toast(self.i18n['操作成功']);
								$.back(1,2000);
							}
						})
					}
				},this)
			},
			getAddress(map) {
				this.province = map.ad_info ? map.ad_info.province : map.province;
				this.city = map.ad_info ? map.ad_info.city : map.city;
				this.area = map.ad_info ? map.ad_info.district : map.district;
				this.provinceCode = map.ad_info ? String(map.ad_info.adcode).slice(0, 2) + '0000' : String(map.adcode).slice(0, 2) + '0000';
				this.cityCode = map.ad_info ? String(map.ad_info.adcode).slice(0, 4) + '00' : String(map.adcode).slice(0, 4) + '00';
				this.areaCode = map.ad_info ? String(map.ad_info.adcode) : map.adcode;
				this.lat = map.location.lat;
				this.lng = map.location.lng;
				this.address = map.title;
			},
			getData() {
				let info = uni.getStorageSync('addressinfo');
					this.name = info.realname;
					this.gender = info.gender;
					this.phone = info.phone;
					this.provinceCode = info.provinceCode;
					this.cityCode = info.cityCode;
					this.areaCode = info.areaCode;
					this.province = info.province;
					this.city = info.city;
					this.area = info.area;
					this.address = info.province+info.city+info.area;
					this.addressDetail = info.addressDetail;
					this.target = info.target;
					this.isDefault = info.status == 1 ? true : false;
					this.lng = info.coordinate? info.coordinate.split(',')[0] : '';
					this.lat =info.coordinate ? info.coordinate.split(',')[1] : '';
				uni.removeStorageSync('addressinfo');
			},
			save() {
				const self = this;
				let check = api.validate([{
						value: this.name,
						text: self.i18n['请输入您的称呼'],
						rules: ''
					},
					{
						value: this.phone,
						text: self.i18n['请输入正确手机号码'],
						rules: 'phone'
					},
					{
						value: this.address,
						text: self.i18n['请选择地址'],
						rules: ''
					},
					{
						value: this.addressDetail,
						text: self.i18n['请输入具体地址'],
						rules: ''
					},
							
				]);
				if (!check) {
					return
				};
				let url = 'member/address/save';
				if(self.id != '') {
					url = 'member/address/update';
				}
				let postData = {
					id: self.id,
					realname: self.name,
					phone: self.phone,
					provinceCode: self.provinceCode,
					cityCode: self.cityCode,
					areaCode: self.areaCode,
					province: self.province,
					city: self.city,
					area: self.area,
					address: self.addressDetail,
					status: self.isDefault ? '1' : '0',
					
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
			switchChange(e) {
				this.isDefault = e.detail.value;
			},
			init() {},


		},
		computed: {
			i18n() {
				return this.$t('address')
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
