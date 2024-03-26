<template>
  <view class="detail" :key="info.key">
    <!-- banner ad -->
    <ad unit-id="adunit-acc844a59d4586eb"></ad>

    <view class="header-container">
      <view class="header">{{ info.title }}</view>
      <view class="state">{{ info.subTitle }}</view>
    </view>
    <view class="msg">只展示前 30 名</view>

    <view class="content">
      <view
        v-for="(item, idx) in info.pastTimeData"
        :key="idx"
        class="past-item"
      >
        {{ item }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      info: {},
    };
  },
  onLoad(query) {
    this.insertAd();
    this.info = JSON.parse(query?.info);
  },
  methods: {
    insertAd() {
      // 在页面中定义插屏广告
      let interstitialAd = null;

      // 在页面onLoad回调事件中创建插屏广告实例
      if (wx.createInterstitialAd) {
        interstitialAd = wx.createInterstitialAd({
          adUnitId: "adunit-fba3ca5266a2bae2",
        });
        interstitialAd.onLoad(() => {});
        interstitialAd.onError((err) => {
          console.error("插屏广告加载失败", err);
        });
        interstitialAd.onClose(() => {});
      }

      // 在适合的场景显示插屏广告
      if (interstitialAd) {
        interstitialAd.show().catch((err) => {
          console.error("插屏广告显示失败", err);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  padding: 10px 20px;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header {
    font-size: 20px;
    font-weight: 500;
  }
  .msg {
    color: red;
  }
  .content {
    .past-item {
      text-align: center;
      height: 30px;
      line-height: 30px;
    }
  }
}
</style>
