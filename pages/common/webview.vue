<template>
	<view>
		<web-view :src="webUrl"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webUrl: ''
			}
		},
		onLoad(options) {
			this.webUrl = options.webUrl
		},
	}
</script>

<style>

</style>
