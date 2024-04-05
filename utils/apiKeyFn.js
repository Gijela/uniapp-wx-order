export const One_Api_Base_Url = "https://api.devin.ren";

export const User_Authorization = {
  sVip: "60f7747a9589465c803ecefcbb4bd270",
};

export const Two_quarter = 30 * 60 * 1000; // 一刻钟(15min)单位是ms

const tokenStatus = {
  effective: 1, // 开启状态
  invalid: 2, // 令牌禁用状态
};

// 生成 ApiKey
function generateApiKey(nowTimeStamp) {
  return new Promise((resolve) => {
    uni.request({
      url: `${One_Api_Base_Url}/api/token/`,
      method: "post",
      data: {
        name: String("mini_" + nowTimeStamp), // 当前时间戳 as 令牌名字
        expired_time: parseInt((nowTimeStamp + Two_quarter) / 1000), // 单位是秒
        is_edit: false, // 新建 or 编辑, false表示新建固定，即可
        unlimited_quota: true, // 无限额度开关, 固定即可
        remain_quota: 987654, // 额度, 固定即可
      },
      header: {
        Authorization: `Bearer ${User_Authorization.sVip}`,
      },
      success: (res) => {
        resolve(res?.data?.success);
      },
    });
  });
}

// 通过令牌名称查找 ApiKey
export function searchApiKey(ApiKey_Name) {
  return new Promise((resolve) => {
    uni.request({
      url: `${One_Api_Base_Url}/api/token/search?keyword=${ApiKey_Name}`,
      method: "get",
      header: {
        Authorization: `Bearer ${User_Authorization.sVip}`,
      },
      success: ({ data: response }) => {
        if (response.success && response.data.length > 0) {
          const { key, name, expired_time } = response.data[0];
          const OneApi = {
            ApiKey_Name: name,
            ApiKey: "sk-" + key,
            Expire_Time: expired_time,
          };
          wx.setStorageSync("oneApi", OneApi); // 项目中使用到的三个属性
          wx.setStorageSync("oneApi_RowData", response.data[0]); // 接口返回的令牌所有属性，更新令牌需要用到
          resolve(OneApi);
        }
      },
    });
  });
}

// 入口文件
/*
 * return { ApiKey_Name: string, ApiKey: string, Expire_Time: number单位是秒 }
 */
export async function generateToken() {
  // 1. 时间戳作为令牌名字，保证令牌唯一性
  const nowTimeStamp = new Date().getTime();

  // 2. 生成 ApiKey. 这个版本接口返回体是{ message: '', success: true }，拿不到生成的ApiKey
  const generateSuccessFlag = await generateApiKey(nowTimeStamp);

  let targetOneApi = {};
  if (generateSuccessFlag) {
    targetOneApi = await searchApiKey("mini_" + nowTimeStamp);
  }

  return targetOneApi;
}

// 延迟过期时间
function updateExpiredTime(tokenRowData) {
  return new Promise((resolve) => {
    uni.request({
      url: `${One_Api_Base_Url}/api/token/`,
      method: "put",
      data: {
        ...tokenRowData,
        is_edit: true,
      },
      header: {
        Authorization: `Bearer ${User_Authorization.sVip}`,
      },
      success: ({ data: response }) => {
        if (response.success && response.data) {
          const { key, name, expired_time } = response.data;
          const OneApi = {
            ApiKey_Name: name,
            ApiKey: "sk-" + key,
            Expire_Time: expired_time,
          };
          wx.setStorageSync("oneApi", OneApi); // 项目中使用到的三个属性
          wx.setStorageSync("oneApi_RowData", response.data); // 接口返回的令牌所有属性，更新令牌需要用到
          resolve(OneApi);
        }
      },
    });
  });
}

function changeTokenStatus(token_id) {
  return new Promise((resolve) => {
    uni.request({
      url: `${One_Api_Base_Url}/api/token/?status_only=true`,
      method: "put",
      data: {
        id: token_id,
        status: tokenStatus.effective,
      },
      header: {
        Authorization: `Bearer ${User_Authorization.sVip}`,
      },
      success: ({ data: response }) => {
        if (response.success && response.data) {
          resolve(true);
        }
      },
    });
  });
}

/*
 * @OneApi: { ApiKey_Name: string, ApiKey: string, Expire_Time: number单位是秒 }
 * return 同@OneApi
 */
export async function updateToken() {
  const tokenRowData = wx.getStorageSync("oneApi_RowData"),
    curTimeStamp = new Date().getTime();
  // 过期时间逻辑：未到过期time就直接加上延长时间，已过期就基于当前时间再加上延长的时间
  if (tokenRowData.expired_time >= curTimeStamp / 1000) {
    tokenRowData.expired_time = parseInt(
      tokenRowData.expired_time + Two_quarter / 1000
    );
  } else {
    tokenRowData.expired_time = parseInt((curTimeStamp + Two_quarter) / 1000);
  }

  const targetOneApi = await updateExpiredTime(tokenRowData);

  // 边界：如果令牌处于禁用状态, 则需要设置为开启状态
  const oneApi_RowData = wx.getStorageSync("oneApi_RowData");
  if (oneApi_RowData.status === tokenStatus.invalid) {
    await changeTokenStatus(oneApi_RowData.id);
  }

  return targetOneApi;
}
