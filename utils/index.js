/*
 * @text: string 被复制的文本
 */
export function copyText(text) {
  uni.setClipboardData({
    data: text, // 需要复制的文本内容
    success: function () {
      wx.showToast({
        title: "复制成功~",
        icon: "success",
        duration: 2000, // 提示的延迟时间，单位毫秒
      });
    },
    fail: function () {
      wx.showToast({
        title: "复制失败~",
        icon: "none",
        duration: 2000, // 提示的延迟时间，单位毫秒
      });
    },
  });
}
