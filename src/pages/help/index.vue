<template>
  <view class="help" style="margin-top: 0.4rem;">
    <wd-card custom-class="h-card" type="rectangle">
      <view class="help-title">
        常见问题
      </view>
      <view class="help-li" v-for="(item,index) in lists" :key="index">
        <view class="help-li_title">
          {{index+1}}.{{item.title}}
        </view>
        <view class="help-li_tip">{{ item.describe }}</view>
      </view>
    </wd-card>
  </view>
</template>

<script setup>
import { reactive } from 'vue';
import { onShareAppMessage } from '@dcloudio/uni-app'

onShareAppMessage(() => {
  return {
    title: '高清电子文档一键转换',
    imageUrl: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/yichuangzhisao/share.png',
    path: '/pages/index/index',
  }
})

const lists = reactive([
  {
    title: '更换手机后是否需要重新缴费开通？',
    describe: '不需要，新手机上登录原来的账号即可继续使用。'
  },
  {
    title: '提示未开启相机权限怎么办？',
    describe: '使用本软件需要您的手机对本软件开启相机权限，若未开启，请点击本软件我的-权限设置中，允许相机权限'
  },
  {
    title: '付款后是否可以开发票',
    describe: '可以开发票，请点击联系客服，将您的账号ID、开票信息、邮箱发送给客服，客服回为您开具增值税普通电子发票'
  },
  {
    title: '同一个账号可以同时给不同的手机使用吗？',
    describe: '同一个账号可以在不同的手机上登录，但不能同时登录'
  }
])

</script>
<style>
page{
  background: rgba(246, 247, 251, 1);
}
</style>
<style scoped lang="scss">
.help{
  --wot-card-padding: 0.6rem;
  --wot-card-margin: 0;
  --wot-card-content-border-color: #fff;
}
.help-title{
  color: #222;
  font-size: 1rem;
}
.help-li{
  margin-top: 1.2rem;
}
.help-li_title{
  font-size: 0.9rem;
  color: #222;
}
.help-li_tip{
  margin-top: 0.3rem;
}
</style>