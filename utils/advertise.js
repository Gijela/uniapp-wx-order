/*
  在页面中定义激励视频广告
  @adUnitId: string 激励广告位ID
  @successCb: 看完视频，下发奖励的接口
  @setReactiveVar: 更新响应式变量的值
  return void
 */
export function callExciteAd(adUnitId, successCb, setReactiveVar) {
  let videoAd = null;

  // 在页面onLoad回调事件中创建激励视频广告实例
  if (wx.createRewardedVideoAd) {
    videoAd = wx.createRewardedVideoAd({
      adUnitId: adUnitId,
    });
    videoAd.onLoad(() => {});
    videoAd.onError((err) => {
      console.error("激励视频光告加载失败", err);
    });
    videoAd.onClose(async (res) => {
      if (res && res.isEnded) {
        console.log("激励正常播放结束，下发奖励");

        // 额外做的操作
        const ApiKey = await successCb();
        setReactiveVar(ApiKey);

        wx.showToast({
          title: "奖励已下发, 请在「我的」页面查收~",
          icon: "success",
          duration: 2000, // 提示的延迟时间，单位毫秒
        });
      } else {
        console.log("播放中途退出，不下发奖励");
        wx.showToast({
          title: "未获得奖励, 继续加油~",
          icon: "none",
          duration: 2000, // 提示的延迟时间，单位毫秒
        });
      }
    });
  }

  // 用户触发广告后，显示激励视频广告
  if (videoAd) {
    videoAd.show().catch(() => {
      // 失败重试
      videoAd
        .load()
        .then(() => videoAd.show())
        .catch((err) => {
          console.error("激励视频 广告显示失败", err);
        });
    });
  }
}

/*
  在页面中定义插屏广告  
  @adUnitId: string 插屏广告位ID
  return void
 */
export function callScreenAd(adUnitId) {
  let interstitialAd = null;

  // 在页面onLoad回调事件中创建插屏广告实例
  if (wx.createInterstitialAd) {
    interstitialAd = wx.createInterstitialAd({
      adUnitId: adUnitId,
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
}

// request demo
// export function req_demo() {
//   uni.request({
//     url: "https://imgfuse.devin.ren/tianya/config.json",
//     method: "GET",
//     data: {},
//     header: {},
//     success: (res) => {},
//     fail: (err) => {},
//   });
// }
