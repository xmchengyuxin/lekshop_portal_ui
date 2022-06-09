<template>
	<view class="contain padding-12">
		<rich-text :nodes="info.detail | html"></rich-text>
	</view>
</template>
<style scoped>
</style>
<script>
	const $ = require('../../utils/api.js');
	export default {
		data() {
			return {
				type: '',
				info: '',
			};
		},
		onLoad: function(options) {
			this.type = options.type ? options.type : '';
			this.init();
		},
		methods: {
			getInfo() {
				const self = this;
				$.ajax({
					url: 'common/agreement/get',
					data: {cate: this.type},
					method: 'GET',
					success(res) {
						self.info = res.data ? res.data : '';
						uni.setNavigationBarTitle({
							title: res.data.title
						})
					}
				})
			},
			init() {
				this.getInfo();
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