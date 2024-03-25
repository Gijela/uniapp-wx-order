<template>
  <view class="container">
    <!-- banner ad -->
    <ad unit-id="adunit-acc844a59d4586eb"></ad>

    <!-- content -->
    <view class="content">
      <view v-if="curPage === 'home'">
        <view v-for="(item, idx) in data" :key="idx" class="card">
          <view class="msg">
            <view>{{ item.title }}</view>
            <view class="subTitle">{{ item.subTitle }}</view>
          </view>
          <view
            :key="idx"
            class="punch-card-btn"
            @click="
              callExciteAd(
                `adunit-585a8e725bc2bdf8`,
                getApiKey,
                handleReactiveVar
              )
            "
          >
            报名
          </view>
        </view>
      </view>
      <view v-else>
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

    <!-- video ad -->
    <ad unit-id="adunit-0209e9f2255ab890" ad-type="video" ad-theme="white"></ad>

    <!-- bottom btn -->
    <view class="btns">
      <view class="btn" @click="curPage = 'home'">去报名</view>
      <view class="btn" @click="curPage = 'myInfo'">我的</view>
    </view>
  </view>
</template>

<script>
import { callExciteAd, callScreenAd } from "../utils/advertise";
import { getApiKey } from "../utils/apiKeyFn";
import { copyText } from "../utils/index";

export default {
  data() {
    return {
      curPage: "home",
      data: [
        {
          title: "聊天训练营预约报名",
          subTitle: "报名成功可体验 30 分钟",
        },
        {
          title: "图片训练营预约报名",
          subTitle: "报名成功可体验一次",
        },
      ],
      ApiKey: "暂无",
    };
  },
  onLoad() {
    callScreenAd("adunit-fba3ca5266a2bae2");
  },
  methods: {
    callExciteAd,
    getApiKey,
    copyText,
    handleReactiveVar(ApiKey) {
      this.ApiKey = ApiKey;
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
    overflow-y: auto;
    box-sizing: border-box;
    border: 2px solid red;

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
      width: 50%;
      text-align: center;

      background-color: rgb(72, 69, 69);
      color: white;
    }
  }
}
</style>
