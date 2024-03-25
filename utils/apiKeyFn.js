export const One_Api_Base_Url = "https://api.devin.ren";

export const User_Authorization = {
  sVip: "60f7747a9589465c803ecefcbb4bd270",
};

export const Two_quarter = {
  time: 2 * 15 * 60 * 1000, // 一刻钟(15min)
  msg: "30分钟",
};

export function timestampToDateTime(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  // 将年月日时分秒拼接为字符串形式的日期时间
  const dateTime = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  return dateTime;
}

// 生成 ApiKey
function generateApiKey(nowTimeStamp) {
  console.log("ggg: ", parseInt((nowTimeStamp + Two_quarter.time) / 1000));
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${One_Api_Base_Url}/api/token/`,
      method: "post",
      data: {
        name: String("mini_" + nowTimeStamp), // 当前时间戳 as 令牌名字
        expired_time: parseInt((nowTimeStamp + Two_quarter.time) / 1000), // 单位是秒
        is_edit: false, // 新建 or 编辑, false表示新建固定，即可
        unlimited_quota: true, // 无限额度开关, 固定即可
        remain_quota: 987654, // 额度, 固定即可
      },
      header: {
        Authorization: `Bearer ${User_Authorization.sVip}`,
      },
      success: (res) => {
        resolve(
          res?.data?.success ? "success" : "获取入营身份没有成功，请联系客服~"
        );
      },
      fail: (err) => {
        reject("获取入营身份没有成功，请联系客服~");
      },
    });
  });
}

// 通过令牌名称查找 ApiKey
function searchApiKey(ApiKey_Name) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${One_Api_Base_Url}/api/token/search?keyword=${ApiKey_Name}`,
      method: "get",
      header: {
        Authorization: `Bearer ${User_Authorization.sVip}`,
      },
      success: ({ data: response }) => {
        if (response.success && response.data.length > 0) {
          const ApiKey = "sk-" + response.data[0].key;
          resolve(ApiKey);
        } else {
          resolve("获取入营身份没有成功，请联系客服~");
        }
      },
      fail: (err) => {
        reject("获取入营身份没有成功，请联系客服~");
      },
    });
  });
}

// 入口文件
export async function getApiKey() {
  // 0. 时间戳作为令牌名字，保证令牌唯一性
  const nowTimeStamp = new Date().getTime();

  // 1. 生成 ApiKey. 这个接口返回体是{ message: '', success: true }，拿不到生成的ApiKey
  const resultString = await generateApiKey(nowTimeStamp);

  // 2. 通过令牌查找 ApiKey
  const ApiKey =
    resultString === "success"
      ? await searchApiKey("mini_" + nowTimeStamp)
      : resultString;

  return ApiKey;
}
