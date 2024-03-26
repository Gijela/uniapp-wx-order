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
            <view class="subTitle">报名成功可体验 30 分钟</view>
          </view>
          <view class="punch-card-btn" @click="callExciteAd">
            {{ ApiKey === "暂无" ? "报名" : "已报名" }}
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
        <view class="headTitle">您获得的身份密码如下：</view>
        <view class="key"
          >聊天训练营 - 入营身份：{{ ApiKey }}
          <button
            v-if="ApiKey !== '暂无'"
            @click="copyText(ApiKey)"
            class="copyBtn"
          >
            复制
          </button>
        </view>
        <view class="key">图片训练营 - 入营身份：暂未开放</view>
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
import { getApiKey } from "../utils/apiKeyFn";
import { copyText, showToast } from "../utils/index";
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
      ApiKey: "暂无",
      videoAd: null,
    };
  },
  onLoad() {
    this.mockData();
    this.exciteVideoAd();
  },
  methods: {
    copyText,
    generateWeChatIDs() {
      let weChatIDs = [];
      for (let i = 0; i < 30; i++) {
        let weChatID =
          Math.random().toString(36).substr(2, 3) +
          "*****" +
          Math.random().toString(36).substr(2, 3);
        weChatIDs.push(weChatID);
      }
      return weChatIDs;
    },
    mockData() {
      const tempArr = [
        {
          title: `聊天训练营 - 第 15 期`,
          subTitle: "已结束",
          key: 15,
          pastTimeData: this.generateWeChatIDs(),
          endTime: `2024.3.20`,
        },
        {
          title: `聊天训练营 - 第 14 期`,
          subTitle: "已结束",
          key: 14,
          pastTimeData: this.generateWeChatIDs(),
          endTime: `2024.2.20`,
        },
        {
          title: `聊天训练营 - 第 13 期`,
          subTitle: "已结束",
          key: 13,
          pastTimeData: this.generateWeChatIDs(),
          endTime: `2024.1.20`,
        },
      ];
      for (let i = 12; i > 0; i--) {
        tempArr.push({
          title: `聊天训练营 - 第 ${i} 期`,
          subTitle: "已结束",
          key: i,
          pastTimeData: this.generateWeChatIDs(),
          endTime: `2023.${i}.20`,
        });
      }
      this.data = tempArr;
    },
    exciteVideoAd() {
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
            // 额外做的操作
            const ApiKey = await getApiKey();
            this.ApiKey = ApiKey;
            showToast("奖励已下发, 请在「我的」页面查收~", true);
          } else {
            showToast("未获得奖励, 继续加油~", false);
          }
        });
      }
    },
    callExciteAd() {
      // 用户触发广告后，显示激励视频广告
      if (this.videoAd) {
        this.videoAd.show().catch(() => {
          // 失败重试
          this.videoAd
            .load()
            .then(() => this.videoAd.show())
            .catch((err) => {
              showToast("激励视频 广告显示失败", false);
            });
        });
      } else {
        this.ApiKey = "临时钥匙";
      }
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

    // border: 2px solid red;

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
  }
  .headTitle {
    font-size: 20px;
    background-color: yellow;
    color: red;
  }
  .key {
    margin-top: 10px;
    font-size: 17px;
    line-height: 20px;
    word-break: break-all;

    .copyBtn {
      background-color: rgb(29, 147, 171);
      color: white;
      margin-top: 10px;
      margin-bottom: 40px;
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
