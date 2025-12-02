<script setup>
import { ref, computed, watch } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import uniIcon from '@dcloudio/uni-ui/lib/uni-icons/uni-icons'
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup'
import $http from '@/hooks/http'
import { getStorageSyncWithExpire, setStorageSyncWithExpire, toRouter } from '@/hooks/utils'

const loginPopupRef = ref(null)
const cancelPopupRef = ref(null)
let user = ref({})
const formState = ref({
  sms_code: '',
  sms_sign: ''
})
const cancelFormState = ref({
  sms_code: '',
  sms_sign: ''
})
const countdown = ref(0)
const shopInfo = ref({})

const disabled = computed(() => {
  return !!countdown.value;
})

const codeTip = computed(() => {
  if (countdown.value) {
    return `${countdown.value}S重新获取`;
  } else {
    return '获取验证码';
  }
})

onShow(() => {
  $http.get('api/user/auth/userauth/info?referch=1').then(res => {
    let vip_info = res.data.vip_info

    if (vip_info.vip_end_time) {
      vip_info.vip_end_time = `${vip_info.vip_end_time.slice(0, 4)}年${vip_info.vip_end_time.slice(5, 7)}月${vip_info.vip_end_time.slice(8, 10)}日`
    }

    user.value = {
      ...res.data,
      ...vip_info,
    };
  }).catch(() => {
    user.value = {}
  })

  getShopInfo()
})

watch(countdown, (value) => {
  setTimeout(() => {
    if (value > 0) {
      let cd = countdown.value - 1;

      if (cd < 0) {
        countdown.value = 0;
      } else {
        countdown.value--;
      }
    }
  }, 1000);
})

const getShopInfo = () => {
  $http.post('https://api.xiaoohui.com/api/microapp/order/query_user_order_sign', {
    appid: 'wxb4d3be7c67e1f69b',
  }, {
    hideLoginBox: true,
    token: getStorageSyncWithExpire('kdshToken'),
  }).then(res => {
    shopInfo.value = res.data.find(item => item.state === 2)
  }).catch(() => {
    loginPopupRef.value.open()
  })
}

const back = () => {
  uni.navigateBack();
}

/**
 * 发送验证码
 */
const sendCode = () => {
  if (disabled.value) return;

  if (!user.value.uname) {
    uni.showToast({
      title: '手机号错误',
      icon: 'none',
      mask: true,
    });

    return;
  }

  uni.showLoading({
    title: '加载中...',
    mask: true,
  });

  $http
      .post('https://api.xiaoohui.com/api/global/sms/send_code', {
        mobile: user.value.uname,
        appid: 'wxb4d3be7c67e1f69b',
      })
      .then((res) => {
        formState.value.sms_sign = res.data.sign;
        countdown.value = 60;
      })
      .finally(() => {
        uni.hideLoading();
      });
}

/**
 * 发送验证码
 */
const sendCode1 = () => {
  if (disabled.value) return;

  if (!user.value.uname) {
    uni.showToast({
      title: '手机号错误',
      icon: 'none',
      mask: true,
    });

    return;
  }

  uni.showLoading({
    title: '加载中...',
    mask: true,
  });

  $http
      .post('https://api.xiaoohui.com/api/sms/sendcode', {
        mobile: user.value.uname,
        item_type: shopInfo.value.businessType,
      })
      .then((res) => {
        cancelFormState.value.sms_sign = res.data.sign;
        countdown.value = 60;
      })
      .finally(() => {
        uni.hideLoading();
      });
}

const onSmsCodeInput = (event) => {
  setTimeout(() => {
    formState.value.sms_code = event.detail.value.slice(0, 6);
  }, 0);
}

const onSmsCodeInput1 = (event) => {
  setTimeout(() => {
    cancelFormState.value.sms_code = event.detail.value.slice(0, 6);
  }, 0);
}

const login = () => {
  if (!user.value.uname) {
    uni.showToast({
      title: '手机号错误',
      icon: 'none',
      mask: true,
    });

    return;
  }

  if (!formState.value.sms_code) {
    uni.showToast({
      title: '验证码错误',
      icon: 'none',
      mask: true,
    });

    return;
  }

  uni.showLoading({
    title: '正在登录',
    mask: true,
    icon: 'none',
  })

  $http
      .post('https://api.xiaoohui.com/api/user/auth/login', {
        ...formState.value,
        mobile: user.value.uname,
        appid: 'wxb4d3be7c67e1f69b',
      })
      .then((res) => {
        // 登录完成之后保存 token
        setStorageSyncWithExpire('kdshToken', res.data.token, 24 * 60);
        uni.hideLoading();
        loginPopupRef.value.close()
        getShopInfo()
      })
}

const close1 = () => {
  cancelPopupRef.value.close();
  countdown.value = 0
  cancelFormState.value.sms_code = ''
  cancelFormState.value.sms_sign = ''
}

const submit = () => {
  uni.showLoading({
    title: '加载中...',
    mask: true,
  })

  $http.post('https://api.xiaoohui.com/api/user/order/unsign', {
    external_agreement_no: shopInfo.external_agreement_no,
    mobile: user.value.uname,
    sms_sign: cancelFormState.value.sms_sign,
    sms_code: cancelFormState.value.sms_code,
  }, {
    hideLoginBox: true,
    token: getStorageSyncWithExpire('kdshToken'),
  }).then(() => {
    uni.hideLoading();
    cancelPopupRef.value.close()
    getShopInfo()
  }).catch(() => {
    cancelPopupRef.value.close()
    loginPopupRef.value.open()
  })
}
</script>

<template>
<view class="renew-page">
  <view class="banner">
    <view class="title">
      <text>管理自动续费</text>

      <view class="back" @click="back">
        <uniIcon class="back" color="#ffffff" type="left" size="22"></uniIcon>
      </view>
    </view>
  </view>

  <view class="container">
    <view class="info">
      <image
          class="head"
          style="height: 120rpx; border-radius: 50%"
          :src="user.avatar_url || `https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/my/WechatIMG1399.jpg`"
          mode="heightFix"
      />

      <view class="my-status">
        <view class="top">
          <view class="detail" v-if="user.uid">
            <view>{{ user.nickname || '微信用户' }}</view>
            <image v-if="user.vip_type" mode="widthFix" src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/vip-icon.png"></image>
          </view>

          <view class="login" v-else @click="toRouter('/pages/login/index')">
            登录/注册
          </view>
        </view>

        <view class="bottom" v-if="user.uid">ID:{{user.uid}}</view>
      </view>
    </view>

    <view class="renew-box">
      <template v-if="shopInfo && shopInfo.appid">
        <view class="title">易创智扫连续包月会员</view>
        <view class="tip">已开通自动续费</view>

        <view class="renew-info">
          <view>
            <text>下次续费时间</text>
            <text>{{ shopInfo.NextAutoPaidTime }}</text>
          </view>

          <view>
            <text>续费金额</text>
            <text>{{ Number((item.SingleAmount / 100).toFixed(2)) }}元</text>
          </view>

          <view>
            <text>支付方式</text>
            <text>微信支付</text>
          </view>
        </view>

        <view class="btn" @click="cancel">取消自动续费</view>
      </template>

      <template v-else>
        <view class="empty">暂无自动续费产品</view>
      </template>
    </view>
  </view>

  <uniPopup ref="loginPopupRef" :mask-click="false">
    <view class="login-dialog">
      <view class="tip">请先登录</view>

      <view class="login-box">
        <view class="phone">
          <input type="text" :disabled="true" :value="user.uname">
        </view>

        <view class="code">
          <input placeholder="请输入验证码" maxlength="6" v-model="formState.sms_code" @input="onSmsCodeInput" />
          <text class="get-code" @click="sendCode">{{ codeTip }}</text>
        </view>

        <view class="login" @click="login">
          登录
        </view>
      </view>
    </view>
  </uniPopup>

  <uniPopup ref="cancelPopupRef" :mask-click="false">
    <view class="login-dialog">
      <view class="tip">确认退订吗？</view>

      <view class="login-box">
        <view class="phone">
          <input type="text" :disabled="true" :value="user.uname">
        </view>

        <view class="code">
          <input placeholder="请输入验证码" maxlength="6" v-model="cancelFormState.sms_code" @input="onSmsCodeInput1" />
          <text class="get-code" @click="sendCode1">{{ codeTip }}</text>
        </view>

        <view class="options">
          <text @click="close1">取消</text>
          <text @click="submit">确定</text>
        </view>
      </view>
    </view>
  </uniPopup>
</view>
</template>

<style>
page {
  height: 100%;
}
</style>

<style scoped lang="scss">
.renew-page {
  height: 100%;
  background: url("https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/renew/bg.png") left top/100% 100% no-repeat;

  .banner {
    padding: calc(var(--status-bar-height) + 60rpx) 0 0;
    margin-bottom: 50rpx;

    .title {
      text-align: center;
      font-size: 34rpx;
      color: #FFFFFF;
      position: relative;

      text {
        font-weight: bold;
      }

      .back {
        position: absolute;
        top: -2rpx;
        left: 15rpx;
      }
    }
  }

  .container {
    padding: 0 34rpx;

    .info {
      display: flex;
      align-items: center;
      margin-bottom: 38rpx;

      .head {
        margin-right: 20rpx;
      }

      .my-status {
        display: flex;
        flex-direction: column;
        gap: 20rpx;

        .top {
          .detail {
            display: flex;
            align-items: center;

            view {
              font-weight: bold;
              font-size: 35rpx;
              color: #FFFFFF;
              margin-right: 20rpx;
            }

            image {
              width: 34rpx;
            }
          }

          .login {
            font-weight: bold;
            font-size: 35rpx;
            color: #FFFFFF;
          }
        }

        .bottom {
          font-size: 22rpx;
          color: #FFFFFF;
        }
      }
    }

    .renew-box {
      background: linear-gradient(90deg, #F8F8F8 0%, #FFFFFF 100%);
      border-radius: 20rpx;
      padding: 47rpx 42rpx 200rpx;
      position: relative;

      .title {
        font-weight: bold;
        font-size: 30rpx;
        color: #333333;
        margin-bottom: 30rpx;
      }

      .tip {
        font-size: 24rpx;
        color: #999999;
        margin-bottom: 38rpx;
      }

      .renew-info {
        background: #F1F7FF;
        border-radius: 20rpx;
        padding: 40rpx 22rpx;
        display: flex;
        flex-direction: column;
        gap: 54rpx;
        margin-bottom: 68rpx;

        view {
          display: flex;
          align-items: center;
          justify-content: space-between;

          text {
            &:nth-child(1) {
              font-weight: bold;
              font-size: 28rpx;
              color: #333333;
            }

            &:nth-child(2) {
              font-size: 28rpx;
              color: #999999;
            }
          }
        }
      }

      .btn {
        height: 90rpx;
        background: #239CF7;
        border-radius: 45rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        font-size: 30rpx;
        color: #FFFFFF;
      }

      .empty {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28rpx;
        color: #999;
      }
    }
  }
}

.login-dialog {
  width: 500rpx;
  background: #ffffff;
  border-radius: 20rpx;
  padding: 40rpx 50rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .tip {
    font-size: 36rpx;
    font-weight: 500;
    color: #333333;
    margin-bottom: 50rpx;
  }

  .login-box {
    display: flex;
    flex-direction: column;
    gap: 40rpx;

    .phone {
      background: #eeeeee;
      border-radius: 40rpx;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        width: 100%;
        padding: 0 20px;
      }
    }

    .code {
      border-radius: 40rpx;
      height: 80rpx;
      border: 2rpx solid #cccccc;
      display: flex;
      align-items: center;

      input {
        height: 100%;
        flex-grow: 1;
        padding: 0 20px;
      }

      text {
        flex-shrink: 0;
        padding: 0 20rpx;
        font-size: 24rpx;
        color: #333333;
      }
    }

    .login {
      width: 100%;
      height: 80rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #229BF7;
      border-radius: 40rpx;
      color: #ffffff;
    }

    .options {
      display: flex;
      align-items: center;
      justify-content: space-between;

      text {
        height: 80rpx;
        width: 45%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:nth-child(1) {
          background: #ffffff;
          border: 2rpx solid #229BF7;
          border-radius: 40rpx;
        }

        &:nth-child(2) {
          background: #229BF7;
          border-radius: 40rpx;
          color: #ffffff;
        }
      }
    }
  }
}
</style>