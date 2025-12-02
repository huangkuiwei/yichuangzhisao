<template>
  <view class="global-m login">
    <!-- #ifndef H5 -->
    <view style="height: 54px;"></view>
    <!-- #endif -->
    <view class="logo">
      <wd-img
        width="99px"
        height="99px"
        src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/logo.png"
      ></wd-img>
    </view>
    <view style="margin-top: 2rem;">
      <wd-input v-model="username" :no-border="true" custom-class="login-input" size="large" placeholder="请输入手机号码"></wd-input>
    </view>
    <view style="margin-top: 1rem;">
      <wd-input :maxlength="6" v-model="vercode" :no-border="true" custom-class="login-input" size="large" placeholder="验证码">
        <template #suffix>
          <view v-show="verState">
            <!--<wd-button @click="getVercode" type="warning" custom-class="login-button" size="large">-->
            <!--  发送验证码-->
            <!--</wd-button>-->
            <button @click="getVercode" class="login-button">
              发送验证码
            </button>
          </view>
          <view v-show="!verState">
            <wd-count-down @finish="onFinish" ref="countDown" :auto-start="false" format="ss" :time="time" />
          </view>
        </template>
      </wd-input>
    </view>
    <view class="login-agree">
      <wd-checkbox checked-color="rgba(35, 156, 247, 1)" size="large" v-model="radio"></wd-checkbox>
      <view class="login-agree_text">
        已阅读并同意
        <view style="color: rgba(35, 156, 247, 1)" @click="toRouter(`/pages/vipProtocol/index`, `title=${encodeURIComponent('《用户服务及隐私协议》')}`)">《用户服务及隐私协议》</view>
      </view>
    </view>
    <view class="login-btn">
      <wd-button @click="toLogin(username, vercode, radio, sign)" custom-class="submit-btn" block size="large">
        登 录
      </wd-button>
    </view>
    <!-- <view class="login-weixin">
      <wd-divider style="width:200px">其他登录方式</wd-divider>
      <view style="height: 1rem;"></view>
      <wd-img
        width="50"
        height="50"
        src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/weixin.png"
      ></wd-img>
      <view style="height: 0.5rem;"></view>
      <view class="font-tip">微信</view>
    </view> -->
  </view>
</template>

<script setup>
import { toRouter, toSwich } from '@/hooks/utils'
import { ref } from 'vue'
import validator from 'validator'
import { toLogin, toVercode } from './login.ts'
import $http from '@/hooks/http'

const verState = ref(true), time = ref(60*1000)
const sign = ref(null)
const vercode = ref(null), username = ref(uni.getStorageSync('username_lg'))
const radio = ref( false ), countDown = ref(null)

const getVercode = () => {
  const isPhone = validator.isMobilePhone(username.value, 'zh-CN');

  if (isPhone) {
    verState.value = false
    countDown.value.start()

    $http.post('api/global/sms/send_code', {
      mobile: username.value
    }).then((res) => {
      sign.value = res.data.sign
    })
  } else {
    uni.showToast({
      title: '手机号码格式错误',
      icon: 'none',
      duration: 2000
    })
  }
}

const onFinish = () => {
  verState.value = true
  countDown.value.reset()
}

</script>

<style scoped lang="scss">
page {
  height: 100vh;
}
.login{
  background-image: linear-gradient(
    rgb(220, 232, 255),
    rgba(234, 243, 255, 1),
    #ffffff
  );
  --wot-button-primary-bg-color: rgba(35, 156, 247, 1);
  --wot-button-warning-bg-color: rgba(236, 245, 254, 1);
  --wot-button-warning-color: rgba(35, 156, 247, 1);
}
.logo{
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}
.login-button{
  height: 2.2rem !important;
  background: #E9F5FE;
  color: rgba(35, 156, 247, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40rpx;
  font-size: 28rpx;

  &:after {
    border: none;
    outline: 0;
  }
}
.login-agree{
  display: flex;
  margin-top: 1rem;
  align-items: center;
}
.login-agree_text{
  color: rgba(153, 153, 153, 1);
  font-size: 0.8rem;
  display: flex;
}
.login-btn{
  margin-top: 2.4rem;
}
.submit-btn{
  height: 3rem !important;
  font-size: 1.2rem !important;
}
.login-weixin{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
}
</style>