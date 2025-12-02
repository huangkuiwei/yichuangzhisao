<template>
  <view class="member-top">
    <view style="display: flex; align-items: center; padding: 10rpx 20rpx 0">
      <image
          style="height: 150rpx; border-radius: 50%"
          :src="user.avatar_url || `https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/my/WechatIMG1399.jpg`"
          mode="heightFix"
      />

      <view style="display: flex; flex-direction: column; justify-content: center; gap: 10rpx; flex-grow: 1">
        <view :style="{ fontWeight: 'bold', paddingLeft: '10rpx' }">
          <view v-if="!user.uid">未登录</view>
          <view v-else>{{user.nickname || '微信用户'}}</view>
        </view>

        <view style="font-size: 0.8rem; padding-left: 10rpx; align-self: self-start">
          <view v-if="!user.uid && platform !== 'ios'">
            低至每天<text style="color: rgba(246, 225, 177, 1); font-size: 1rem;">0.35</text>元，畅享全部权益
          </view>
          <view
              v-if="user.uid"
              style="display: flex; align-items: center; align-self: self-start; color: #B09D6D; background: #FCF0D1; padding: 0 12rpx; font-size: 0.6rem; border-radius: 5px; height: 20px;"
          >
            <wd-icon v-if="user.vip_type" custom-class="iconfont" class-prefix="icon" name="Silver" color="#BF932A" size="14"></wd-icon>
            <view style="margin-left: 0.2rem;">
              <text v-if="user.vip_type === 0">免费用户</text>
              <text v-if="user.vip_type === 1">日会员</text>
              <text v-if="user.vip_type === 5">月会员</text>
              <text v-if="user.vip_type === 8">年会员</text>
              <text v-if="user.vip_type === 15">高级月会员</text>
              <text v-if="user.vip_type === 18">高级年会员</text>
            </view>
          </view>
        </view>
      </view>

      <wd-button v-if="!user.uid" @click="login" type="primary" size="small" custom-class="padding-x_medium">登录</wd-button>
    </view>
  </view>
  
  <view class="member-content">
    <view class="global-m" style="padding: 1rem 0.5rem 450rpx">
      <view style="height: 0.5rem;"></view>
      <view class="member-grid" v-if="platform !== 'ios'">
        <view @click="memberSelect(item)" class="member-grid_li" :class="{'active': item.select}" v-for="(item,index) in lists" :key="index">
          <view class="hot" v-if="item.id === 10003">推荐</view>

          <view style="font-size: 22rpx; color: #854E12; padding: 42rpx 0 10rpx 0">{{item.name}}</view>
          <view class="member-price">
            <view class="price">{{ item.forever }}</view>
            <view class="tip">{{item.unit}}</view>
          </view>
          <!--<view class="proto" style="margin-top: 0.3rem; font-size: 0.7rem;">-->
          <!--  原价¥{{item.proto}}-->
          <!--</view>-->
          <view class="forever" v-if="item.showTip">
            低至{{item.price}}元/天
          </view>

          <view class="day-forever" v-if="item.id === 10002">
            <text>限时抢购</text>
            <text>仅限一次</text>
          </view>
        </view>
      </view>
      <view class="member-t">
        <view style="color: rgba(243, 188, 121, 1); font-weight: bold;">20+</view>
        <view style="font-weight: bold;">会员特权</view>
      </view>
      <wd-grid :column="4" custom-class="member-icons">
        <wd-grid-item v-for="(item,index) in icons" :key="index" icon="picture" text="文字" use-text-slot use-icon-slot>
          <template #icon>
            <view style="margin-top: 0.8rem;">
              <image style="width: 40px; height: 40px;" :src="item.src"></image>
            </view>
          </template>
          <template #text>
            <view style="margin-top: 0.4rem;">
              {{ item.name }}
            </view>
          </template>
        </wd-grid-item>
      </wd-grid>

      <view class="vip-detail">
        <view class="title">
          <text>会员权益</text>
          <text>对比</text>
        </view>

        <view class="table">
          <view class="line1">
            <view>特权</view>
            <view>文件扫描</view>
            <view>文字提取</view>
            <view>证件扫描</view>
            <view>拍照计数</view>
            <view>手写文字识别</view>
            <view>拍照翻译</view>
            <view>试卷去手写</view>
            <view>识别公式</view>
            <view>图片加水印</view>
            <view>图片去水印</view>
            <view>图片转Word</view>
            <view>图片转Excel</view>
            <view>图片转PPT</view>
            <view>图片转PDF</view>
            <view>拼图</view>
            <view>PDF转Word</view>
            <view>PDF转Excel</view>
            <view>PDF转图片</view>
            <view>PDF转长图</view>
          </view>

          <view class="line2">
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
            <view></view>
          </view>

          <view class="line3">
            <view>普通用户</view>
            <view>10次/月</view>
            <view>10次/月</view>
            <view>3次/月</view>
            <view>1次/月</view>
            <view>/</view>
            <view>3次/月</view>
            <view>/</view>
            <view>/</view>
            <view>/</view>
            <view>/</view>
            <view>免费试用1次</view>
            <view>免费试用1次</view>
            <view>/</view>
            <view>10次/月</view>
            <view>3次/月</view>
            <view>/</view>
            <view>/</view>
            <view>/</view>
            <view>/</view>
          </view>

          <view class="line4">
            <view>会员</view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
            <view><image src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/gou.png" mode="widthFix"/></view>
          </view>
        </view>
      </view>
    </view>
  </view>

  <wd-popup :close-on-click-modal="false" :modal="false" v-model="show" position="bottom" custom-style="height: 200px; box-shadow: 0 -5px 5px #eee;">
    <view class="global-m" v-if="platform !== 'ios'">
      <view class="d-flex-center">
        <view class="d-flex-center">
          <wd-icon :name="radio==1?'check-circle-filled':'circle1'" size="26px" :color="radio==1?'rgba(92, 155, 244, 1)':'rgba(153, 153, 153, 1)'"></wd-icon>
          <image style="height: 40px; margin-left: 0.5rem;" mode="heightFix" src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/wx_icon.png"></image>
          <view style="color: rgba(153, 153, 153, 1); margin-left: 0.5rem;">微信支付</view>
        </view>
        <!-- <view class="d-flex-center" style="margin-left: 1.5rem;">
          <wd-icon :name="radio==2?'check-circle-filled':'circle1'" size="26px" :color="radio==2?'rgba(92, 155, 244, 1)':'rgba(153, 153, 153, 1)'"></wd-icon>
          <image style="height: 40px; margin-left: 0.5rem;" mode="heightFix" src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/zhifubao.png"></image>
          <view style="color: rgba(153, 153, 153, 1); margin-left: 0.5rem;">微信支付</view>
        </view> -->
      </view>
      <view style="height: 1.5rem;"></view>
      <wd-button @click="onPay(price, openid, user.uname)" type="error" block size="large">立即开通</wd-button>
      <view class="d-flex-center member-xieyi">
        请阅读并同意 <text style="color: rgba(35, 156, 247, 1); margin-left: 3px;" @click="toRouter(`/pages/vipProtocol/index`, `title=${encodeURIComponent('会员协议')}`)">会员协议</text>
      </view>
    </view>

    <view class="global-m contact-btn-m" v-else>
      <button class="contact-btn" @click="openContact">联系客服</button>
    </view>
    
  </wd-popup>
  
</template>

<script setup>
import { ref, computed } from 'vue'
import { onPay } from './member'
import { onLoad } from '@dcloudio/uni-app'
import $http from '@/hooks/http'
import { toRouter } from '@/hooks/utils'

const show = ref(true)
const radio = ref(1),user = ref({})
const openid = ref(null)

const platform = uni.getDeviceInfo().platform

onLoad(() => {
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

  // const username = uni.getStorageSync('username')
  // uni.request({
  //   url: '/api/user/username?username=' + username,
  //   method: 'GET',
  //   success: (res) => {
  //     user.value = res.data
  //   },
  //   fail: (res) => {}
  // })
  uni.login({
    success: (res) => {
      console.log('res.code', res.code)

      $http.post('api/user/auth/userauth/get_openid', {
        code: res.code,
        micro_appid: uni.getAccountInfoSync().miniProgram.appId
      }).then((res) => {
        openid.value = res.data
      })
    }
  })

  getProductList()
})

const lists = ref([])
// price.value = lists.value[0]

const price = computed(() => {
  return lists.value.find(item => item.select)
})

const openContact = () => {
  uni.openCustomerServiceChat({
    corpId: 'ww9b91dac1fa1f137d',
    extInfo: {
      url: 'https://work.weixin.qq.com/kfid/kfca3f4d636ce007f72'
    }
  })
}


const getProductList = async () => {
  $http.get('api/global/product/get').then(res => {
    res.data.splice(1, 0, {
      price: 2990,
      product_name: '扫描大王连续包月',
      id: 10003
    })

    // 调整顺序
    let index = res.data.findIndex(item => item.product_name === '扫描大王日会员')

    if (index !== -1) {
      let item = res.data[index]
      res.data.splice(index, 1)
      res.data.splice(2, 0, item)
    }

    res.data.forEach((item, index) => {
      item.forever = Number((item.price / 100).toFixed(2))

      let unit = ''
      let showTip = false

      if (item.product_name.includes('月会员')){
        unit = '元'
        showTip = true
        item.product_name = '月会员'
        item.price = (item.forever / 30).toFixed(2)
      } else if (item.product_name.includes('日会员')){
        unit = '元'
        item.product_name = '一日体验会员'
      } else if (item.product_name.includes('连续包月')){
        unit = '元/月'
        showTip = true
        item.product_name = '连续包月'
        item.price = (item.forever / 30).toFixed(2)
      } else if (item.product_name.includes('年会员')){
        unit = '元'
        showTip = true
        item.product_name = '年会员'
        item.price = (item.forever / 366).toFixed(2)
      } else if (item.product_name.includes('终身')){
        unit = '/终身'
      }

      item.name = item.product_name
      item.proto = item.forever
      item.unit = unit
      item.showTip = showTip
      // item.select = (index === 0)
    })

    lists.value = res.data
  })
}

const icons = ref([
  {
    name: '证件扫描',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/m1.png'
  },
  {
    name: '文字提取',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/m2.png'
  },
  {
    name: '拍照翻译',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/m3.png'
  },
  {
    name: '试卷去手写',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/m4.png'
  },
  {
    name: '图片加水印',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/m5.png'
  },
  {
    name: '图片转Word',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/m6.png'
  },
  {
    name: '图片转PPT',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/m7.png'
  },
  {
    name: '拼图',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/m8.png'
  }
])

const memberSelect = (item) => {
  lists.value.forEach(item => {
    item.select = false
  })
  price.value = item
  console.log(item);
  item.select = !item.select;
}

const login = () => {
  toRouter('/pages/login/index')
}
</script>

<style scoped lang="scss">
page{
  --wot-button-error-bg-color: rgba(229, 22, 22, 1);
  --wot-button-large-height: 3rem;
  --wot-button-large-fs: 1.4rem;
}
.member-top{
  height: 140px;
  background: rgba(67, 72, 98, 1);
  --wot-color-white: none;
  color: #fff;
  padding-top: 1rem;
  --wot-cell-title-fs: 1rem;
  --wot-cell-title-color: #fff;
  --wot-button-primary-bg-color: rgba(238, 204, 145, 1);
  --wot-button-primary-color: rgba(83, 45, 23, 1);
}
.member-content{
  border-radius: 2rem 2rem 0 0;
  margin-top: -1.8rem;
  background: #fff;
}
.member-grid{
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  gap: 8rpx;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .forever{
    margin-top: 30rpx;
    font-weight: 500;
    font-size: 22rpx;
    color: #854E12;
  }

  .day-forever {
    margin-top: 10rpx;
    display: flex;
    flex-direction: column;
    font-weight: 500;
    font-size: 22rpx;
    color: #FD502C;
  }

  .active{
    background: #FFF2DF;
    border: 2px solid #FCA351;

    .price{
      color: #FD502C;
    }
    .tip{
      color: #FD502C;
    }
  }
}
.member-grid_li{
  flex-shrink: 0;
  background: #F5F5F5;
  width: 185rpx;
  height: 230rpx;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid transparent;
  position: relative;

  .hot {
    position: absolute;
    left: 0;
    top: 0;
    width: 70rpx;
    height: 30rpx;
    background: linear-gradient(90deg, #FD7F2A 0%, #FD502F 100%);
    border-radius: 20rpx 0rpx 20rpx 0rpx;
    font-weight: bold;
    font-size: 20rpx;
    color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.member-price{
  display: flex;
  align-items: center;
  justify-content: center;

  .price{
    font-size: 60rpx;
    color: #854E12;
    font-weight: bold;
    padding: 0;
    line-height: 1;
  }
  .tip{
    font-size: 20rpx;
    color: #824A11;
    position: relative;
    top: 14rpx;
  }
}
.member-t{
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem 0.2rem 0.5rem;
}
.member-xieyi{
  margin-top: 0.8rem;
  font-size: 0.85rem;
  color: rgba(153, 153, 153, 1);
}

.vip-detail {
  .title {
    padding: 40rpx 0.5rem 40rpx;
    font-weight: bold;

    text {
      &:nth-child(1) {
        color:rgba(243, 188, 121, 1);
      }

      &:nth-child(2) {
      }
    }
  }

  .table {
    display: flex;
    position: relative;
    box-shadow: 0 3px 3px #eee;

    .line1, .line2, .line3, .line4 {
      width: 33%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      color: #555555;

      &.line1 {
        view {
          &:nth-child(1) {
            border-top-left-radius: 16rpx;
          }

          &:last-child {
            border-bottom-left-radius: 16rpx;
          }

          &:nth-child(2n - 1) {
            background: #F6F6F6;
          }
        }
      }

      &.line2 {
        view {
          &:nth-child(2n - 1) {
            background: #F6F6F6;
          }
        }
      }

      &.line3 {
        view {
          &:nth-child(1) {
            border-top-right-radius: 16rpx;
          }

          &:last-child {
            border-bottom-right-radius: 16rpx;
          }

          &:nth-child(2n - 1) {
            background: #F6F6F6;
          }
        }
      }

      &.line4 {
        position: absolute;
        width: 33%;
        left: 33%;
        top: -20rpx;
        bottom: -20rpx;
        background: linear-gradient(180deg, #FFECC190 0%, #FECF7390 100%) !important;
        border-radius: 16rpx;
        z-index: 9;

        view {
          display: flex;
          align-items: center;
          justify-content: center;

          &:nth-child(1) {
            font-weight: bold;
            font-size: 32rpx;
            height: 60rpx;
            border-top-left-radius: 16rpx;
            border-top-right-radius: 16rpx;
            color: #A85305;
          }

          &:last-child {
            height: 60rpx;
            border-bottom-left-radius: 16rpx;
            border-bottom-right-radius: 16rpx;
          }

          image {
            width: 26rpx;
          }
        }
      }

      view {
        font-size: 28rpx;
        text-align: center;
        height: 40rpx;
        padding: 10rpx 0;

        &:nth-child(1) {
          font-weight: bold;
          color: #111111;
        }
      }
    }
  }
}

.contact-btn-m {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 130rpx;

  .contact-btn {
    width: 100%;
    color: #ffffff;
    background: #FA4350;
    border-radius: 999px;
  }
}
</style>