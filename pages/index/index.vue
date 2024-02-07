<template>
	<view class="container">
		<view 
			v-for="(item, index) in skylineData" 
			:key="index" 
			class="category" 
			@click="jumpDetail(item.categoryInfo)"
		>
			{{item.categoryName}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				skylineData: [],
			}
		},
		onLoad() {
			console.log('xxxx: ', uni.getSystemInfoSync().platform)
			uni.request({
			  url: 'https://imgfuse.devin.ren/tianya/config.json',
			  method: 'GET',
			  success: (res) => {
				const arr = []
				for (let prop in res.data) {
					arr.push({
						"categoryName": prop,
						"categoryInfo": res.data[prop]
					})
				}
				this.skylineData = arr
			  },
			  fail: (err) => {
			    console.log('json 数据获取Error:', err);
			  }
			});
		},
		methods: {
			jumpDetail(info) {
				uni.navigateTo({ url: "/pages/index/section?info=" + JSON.stringify(info) });
			},
		}
	}
</script>

<style scoped>
.container {
	width: 100vw;
	height: 100vh;
	max-height: 100vh;
	background-color: #F8F8F8;
	padding-bottom: 50px;
	box-sizing: border-box;
	overflow-y: auto;
	
	display: flex;
	justify-content: space-evenly;
	flex-wrap: wrap;
	align-content: flex-start;
}
.category {
	width: 29vw;
	height: 135px;
	padding: 12px;
	margin-top: 16px;
	text-align: center;
	overflow-y: auto;
	
	box-sizing: border-box;
	background-color: bisque;
	
	border: 1px solid mistyrose;
	border-radius: 8px;
	box-shadow: 0 20px 25px -5px #0000001a, 0 8px 10px -6px #0000001a;
}
</style>
