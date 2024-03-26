<template>
  <view class="past-page">
    <view class="head-time">截止时间点</view>
    <view v-for="(item, index) in info" :key="index" class="card">
      <view class="title">{{ item.title }}</view>
      <view class="endTime">{{ item.endTime }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
.past-page {
  .head-time {
    font-size: 20px;
    height: 50px;
    line-height: 50px;
  }
  .card {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: 1px solid gainsboro;

    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
