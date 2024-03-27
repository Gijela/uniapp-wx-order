<template>
  <view class="container">
    <!-- video ad -->
    <ad unit-id="adunit-0209e9f2255ab890" ad-type="video" ad-theme="white"></ad>

    <!-- content -->
    <view class="content">
      <view v-if="curPage === 'home'" class="card-container">
        <!-- 预约报名(含按钮) -->
        <view class="card">
          <view class="msg">
            <view>聊天训练营 - 第 16 期</view>
            <view class="subTitle">
              {{
                !OneApi.ApiKey
                  ? "报名成功可体验 30 分钟"
                  : "加时成功可增加 30 分钟"
              }}
            </view>
          </view>
          <view class="punch-card-btn" @click="callExciteAd">
            {{ !OneApi.ApiKey ? "报名" : "加时" }}
          </view>
        </view>

        <!-- 往期 -->
        <view
          v-for="(item, idx) in data"
          :key="idx"
          class="card"
          @click="jumpPastTimePage(item)"
        >
          <view class="msg">
            <view>{{ item.title }}</view>
            <view class="subTitle">{{ item.subTitle }}</view>
          </view>
        </view>
      </view>
      <PastPage v-else-if="curPage === 'past'" :info="data"></PastPage>
      <view v-else-if="curPage === 'myInfo'">
        <view
          v-if="!OneApi.ApiKey && !OneApi.Expire_Time"
          class="no-have-apiKey"
        >
          暂无身份，快去报名吧~
        </view>
        <view v-else>
          <view class="token-property">身份名称：{{ OneApi.ApiKey_Name }}</view>
          <view class="token-property"
            >过期时间：{{ formatTimestamp(OneApi.Expire_Time * 1000) }}</view
          >
          <view class="token-property"
            >入营身份密码：<text class="token-ApiKey-value">{{
              OneApi.ApiKey
            }}</text>
          </view>
          <view class="btn-container">
            <button class="copyBtn" @click="copyText(OneApi.ApiKey)">
              复制密码
            </button>
            <button class="updateBtn" @click="callExciteAd">增加 30 min</button>
          </view>

          <view class="desc-text">
            加时规则：取当前时间与过期时间中的最大值，增加30分钟作为新的过期时间
          </view>
        </view>
      </view>
    </view>

    <!-- bottom btn -->
    <view class="btns">
      <view class="btn" @click="curPage = routerConfig.homePage">去报名</view>
      <view class="btn" @click="curPage = routerConfig.pastPage">查看往期</view>
      <view class="btn" @click="curPage = routerConfig.myInfo">我的</view>
    </view>
  </view>
</template>

<script>
import { generateToken, updateToken, searchApiKey } from "../utils/apiKeyFn";
import { copyText, showToast, formatTimestamp } from "../utils/index";
import { mockData } from "../service/config";
import PastPage from "./pastPage.vue";

export default {
  components: {
    PastPage,
  },
  data() {
    return {
      curPage: "home",
      routerConfig: {
        homePage: "home",
        pastPage: "past",
        myInfo: "myInfo",
      },
      data: [],
      videoAd: null,
      OneApi: {
        ApiKey_Name: "",
        ApiKey: "",
        Expire_Time: 0,
      },
    };
  },
  async onLoad() {
    // mock
    // const res1 = await this.generateToken();
    // console.log("🚀 ~ onLoad ~  this.generateToken:", res1);
    // await this.searchApiKey("mini_1711525349882");
    // const res2 = await this.updateToken();
    // console.log("🚀 ~ onLoad - updateToken ~ res2:", res2);

    // wx.removeStorageSync("oneApi");
    // wx.clearStorageSync();
    // console.log("all: ", wx.getStorageInfoSync());

    // console.log("fore: ", wx.getStorageInfoSync());
    // wx.clearStorageSync();
    // console.log("back: ", wx.getStorageInfoSync());
    // wx.setStorageSync("oneApi", {
    //   ApiKey_Name: "test",
    //   ApiKey: "sk-dhapsdhasndpqwjupoqwfopqenvo[nqo[nv[qobenvq[ovbnq[eob]]]]]",
    //   Expire_Time: 666,
    // });

    // real
    this.data = this.mockData();
    const result = wx.getStorageSync("oneApi");
    if (result && typeof result === "object") this.OneApi = result;
    this.initExciteVideoAd();
  },
  methods: {
    searchApiKey,
    updateToken,
    generateToken,
    mockData,
    copyText,
    formatTimestamp,
    initExciteVideoAd() {
      // 在页面 onLoad 回调事件中创建激励视频广告实例
      if (wx.createRewardedVideoAd) {
        this.videoAd = wx.createRewardedVideoAd({
          adUnitId: "adunit-585a8e725bc2bdf8",
        });
        this.videoAd.onLoad(() => {});
        this.videoAd.onError((err) => {
          showToast("激励视频广告加载失败", false);
        });
        this.videoAd.onClose(async (res) => {
          if (res && res.isEnded) {
            // 额外做的操作: 新建令牌 or 更新令牌
            if (!this.OneApi.ApiKey && !this.OneApi.ApiKey_Name) {
              this.OneApi = await generateToken();
              showToast("奖励已下发, 请在「我的」页面查收~", true);
            } else {
              this.OneApi = await updateToken();
              showToast("已为您更新时间", true);
            }
          } else {
            showToast("未获得奖励, 继续加油~", false);
          }
        });
      }
    },
    callExciteAd() {
      if (!this.videoAd) {
        showToast("激励视频显示失败", false);
        return;
      }
      console.log("触发调用激励视频广告~~");
      // 用户触发广告后，显示激励视频广告
      this.videoAd.show().catch(() => {
        // 失败重试
        this.videoAd
          .load()
          .then(() => this.videoAd.show())
          .catch((err) => {
            showToast("激励视频显示失败，请联系客服", false);
          });
      });
    },
    jumpPastTimePage(item) {
      uni.navigateTo({ url: `/pages/detail?info=${JSON.stringify(item)}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background-color: #f8f8f8;

  display: flex;
  flex-direction: column;

  .content {
    flex: 1;
    padding: 10px;
    box-sizing: border-box;
    overflow-y: auto;

    .card-container {
      overflow-y: auto;
    }

    .card {
      height: 70px;
      border-radius: 10px;
      border: 1px solid rgb(222, 222, 222);
      background-color: rgba(28, 126, 195, 0.05);

      padding: 5px 10px;
      margin-bottom: 10px;
      font-size: 17px;

      display: flex;
      justify-content: space-between;
      align-items: center;

      .msg {
        display: flex;
        flex-direction: column;
        .subTitle {
          font-size: 14px;
          color: grey;
        }
      }

      .punch-card-btn {
        width: 70px;
        height: 40px;
        line-height: 40px;
        text-align: center;

        border-radius: 8px;
        background-color: rgb(29, 147, 171);
        color: white;
      }
    }

    .no-have-apiKey {
      margin-top: 50px;
      font-size: 20px;
      text-align: center;
    }
    .token-property {
      margin-top: 10px;
      font-size: 17px;
      line-height: 17px;
    }
    .token-ApiKey-value {
      word-break: break-all;
      color: #f86;
      font-size: 20px;
      height: 20px;
      line-height: 20px;
    }

    .btn-container {
      display: flex;
      justify-content: space-evenly;
      margin: 20px 0;

      .copyBtn,
      .updateBtn {
        background-color: rgb(29, 147, 171);
        color: white;
        width: 40%;
      }
    }
    .desc-text {
      color: rgb(174, 181, 188);
      font-size: 14px;
    }
  }
  .btns {
    display: flex;
    height: 55px;
    line-height: 55px;
    font-size: 18px;

    .btn {
      flex: 1;
      text-align: center;

      background-color: rgb(72, 69, 69);
      color: white;
    }
  }
}
</style>
