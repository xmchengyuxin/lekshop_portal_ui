<template>
	<view class="flex f-a-c f-j-c t-color-9">
		<text>{{text}}</text>
	</view>
</template>
<style scoped>
</style>
<script>
	export default {
		components: {},
		data() {
			return {
				text: ''
			};
		},
		onShow() {
		},
		methods: {
			init() {},
			encode(str) {
			    // 首先，我们使用 encodeURIComponent 来获得百分比编码的UTF-8，然后我们将百分比编码转换为原始字节，最后存储到btoa里面
			    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
			        function toSolidBytes(match, p1) {
			            return String.fromCharCode(Number('0x' + p1));
			        }));
			},
			decode(str) {
			    // 过程：从字节流到百分比编码，再到原始字符串
			    return decodeURIComponent(atob(str).split('').map(function (c) {
			        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
			    }).join(''));
			}
			
		},
		computed: {},
		created() {
			// let encoded = this.encode("");
			let endcode = 'TEVLU0hPUOaPkOS+m+aKgOacr+aUr+aMgQ==';
			let decoded = this.decode(endcode);
			this.text = decoded;
		},
		mounted() {},
		destroyed() {},
		onPullDownRefresh() {
		},
		onReachBottom() {
			
		}
	}
</script>