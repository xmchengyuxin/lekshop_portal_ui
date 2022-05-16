<template>
	<view @click="getCode()">
		<image v-if="code != '' && code.img" class="h100" :src="'data:image/png;base64,'+code.img" mode="heightFix"></image>
	</view>
</template>
<style scoped>
/* @import url('../../static/css/index/index.css'); */
</style>
<script>
	const $ = require('../../utils/api.js');
	const API = require('../../utils/api/common.js').default;
	let self;
	export default {
		props: {},	
		data() {
			return {
				code: '',
			};
		},
		onLoad: function() {
		},
		methods: {
			getCode() {
				self = this;
				$.ajax({
					url: API.imgCodeApi,
					data: {},
					method: 'GET',
					success(res) {
						self.code = res.data;
						self.$emit('imgSuc',self.code);
					}
				});
			},
			init() {
				this.getCode();
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
