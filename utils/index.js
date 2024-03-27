/*
 * @text: string 被复制的文本
 */
export function copyText(text) {
  uni.setClipboardData({
    data: text, // 需要复制的文本内容
    success: function () {
      wx.showToast({
        title: "复制成功",
        icon: "success",
        duration: 2000, // 提示的延迟时间，单位毫秒
      });
    },
    fail: function () {
      wx.showToast({
        title: "复制失败",
        icon: "none",
        duration: 2000, // 提示的延迟时间，单位毫秒
      });
    },
  });
}

/*
 * @msg: string 显示的 toast 文案
 * @successFlag 是否为成功的 toast
 */
export function showToast(msg, successFlag) {
  wx.showToast({
    title: msg,
    icon: successFlag ? "success" : "none",
    duration: 2000, // 提示的延迟时间，单位毫秒
  });
}

/*
 * @timestamp 时间戳
 * return 年-月-日 时:分:秒
 */
export function formatTimestamp(timestamp) {
  const date = new Date(timestamp),
    year = date.getFullYear();
  let month = date.getMonth() + 1; // 获取当前月份(0-11,0代表1月)
  month = month < 10 ? "0" + month : month; // 补零
  let day = date.getDate(); // 获取当前日(1-31)
  day = day < 10 ? "0" + day : day; // 补零
  let hour = date.getHours(); // 获取当前小时数(0-23)
  hour = hour < 10 ? "0" + hour : hour; // 补零
  let minute = date.getMinutes(); // 获取当前分钟数(0-59)
  minute = minute < 10 ? "0" + minute : minute; // 补零
  let second = date.getSeconds(); // 获取当前秒数(0-59)
  second = second < 10 ? "0" + second : second; // 补零
  return (
    year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
  );
}
