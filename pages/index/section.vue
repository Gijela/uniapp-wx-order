<template>
	<view>
		<view 
			v-for="(pdf, idx) in pdfList" 
			:key="idx" 
			:class="['pdfDemo', {'bt': idx === 0}]" 
			@click="openPdf(pdf.url)"
		>
			{{pdf.name}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pdfList: []
			}
		},
		onLoad(options) {
			this.pdfList = JSON.parse(options.info)
		},
		methods: {
			openPdf(url) {
			  const platform = uni.getSystemInfoSync().platform
			  if (platform === 'ios') {
				  uni.navigateTo({ url: "/pages/common/webview?webUrl=" + url });
			  } else {
				  uni.showLoading({
					title: '加载中',
					mask: true,
				  })
				  uni.downloadFile({
					url: url,
					success: function (res) {
					  var filePath = res.tempFilePath;
					  uni.hideLoading()
					  uni.openDocument({
						filePath: filePath,
						success: function (res) {
						},
					  });
					},
					fail: function(err) {
					  uni.hideLoading()
					}
				  });
			  }
			},
		}
	}
</script>

<style scoped>
.pdfDemo {
	width: 100vw;
	padding: 12px;
	border-bottom: 1px solid #eaecef;
	color: #409eff;
}
.bt {
	border-top: 1px solid #eaecef;
}
</style>