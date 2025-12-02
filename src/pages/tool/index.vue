<template>
  <view class="global-m">
    <view @click="buyVip">
      <image style="width: 100%" mode="widthFix" src="https://yonganpicture.oss-cn-shenzhen.aliyuncs.com/icons/huiyuan_add.png"></image>
    </view>
    <view class="d-flex" style="justify-content: center; margin-top: 1rem;">
      <wd-divider style="width: 140px;">
        <view style="font-size: 0.9rem;">- 扫描服务 -</view>
      </wd-divider>
    </view>
    <scroll-view scroll-y="true">
      <view class="tool-grid">
        <view @click="goPage(item)" class="tool-card" v-for="(item,index) in navs" :key="index">
          <wd-card custom-class="h-card mb-0">
            <view class="d-flex">
              <image style="height: 66rpx; width: 66rpx;" :src="item.src"></image>
              <view style="margin-left: 30rpx; font-size: 28rpx; color: #222; font-weight: bold;">
                {{ item.name }}
              </view>
              <image v-if="item.hot" class="hot" src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/hot.png" mode="widthFix"></image>
            </view>
          </wd-card>
        </view>
      </view>
      <view class="d-flex" style="justify-content: center; margin-top: 1rem;">
        <wd-divider style="width: 140px;">
          <view style="font-size: 0.9rem;">- 图片工具 -</view>
        </wd-divider>
      </view>
      <view class="tool-grid">
        <view @click="goPage(item)" class="tool-card" v-for="(item,index) in pictures" :key="index">
          <wd-card custom-class="h-card mb-0">
            <view class="d-flex">
              <image style="height: 66rpx; width: 66rpx;" :src="item.src"></image>
              <view style="margin-left: 30rpx; font-size: 28rpx; color: #222; font-weight: bold;">
                {{ item.name }}
              </view>
              <image v-if="item.hot" class="hot" src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/hot.png" mode="widthFix"></image>
            </view>
          </wd-card>
        </view>
        
      </view>
      <view class="d-flex" style="justify-content: center; margin-top: 1rem;">
        <wd-divider style="width: 140px;">
          <view style="font-size: 0.9rem;">- PDF转换 -</view>
        </wd-divider>
      </view>
      <view class="tool-grid">
        <view @click="goPdf(item)" class="tool-card" v-for="(item,index) in pdfs" :key="index">
          <wd-card custom-class="h-card mb-0">
            <view class="d-flex">
              <image style="height: 66rpx; width: 66rpx;" :src="item.src"></image>
              <view style="margin-left: 30rpx; font-size: 28rpx; color: #222; font-weight: bold;">
                {{ item.name }}
              </view>
              <image v-if="item.hot" class="hot" src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/hot.png" mode="widthFix"></image>
            </view>
          </wd-card>
        </view>
      </view>
      <view style="height: 3.8rem"></view>
    </scroll-view>
  </view>
  <NavBar :index="3"></NavBar>
</template>

<script setup>
import { ref } from 'vue'
import NavBar from '@/section/a-navbar.vue'
import { toRouter } from '@/hooks/utils'

const navs = ref([
  {
    name: '证件扫描',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/u1.png',
    index: 4,
    hot: true,
  },
  {
    name: '文字提取',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/u2.png',
    index: 5
  },
  {
    name: '文件扫描',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/u2.png',
    index: 6
  },
  {
    name: '拍照计数',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/u4.png',
    index: 7,
    hot: true,
  },
  {
    name: '手写文字识别',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/u5.png',
    index: 8
  },
  {
    name: '拍照翻译',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/u6.png',
    index: 9
  },
  {
    name: '试卷去手写',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/u7.png',
    index: 10
  },
  {
    name: '识别公式',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/u8.png',
    index: 11
  },
])

const pictures = ref([
  {
    name: '图片加水印',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/p1.png',
    index: 12
  },
  {
    name: '图片去水印',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/p2.png',
    index: 18,
    hot: true,
  },
  {
    name: '图片转Word',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/p3.png',
    index: 14
  },
  {
    name: '图片转Excel',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/p4.png',
    index: 15
  },
  {
    name: '图片转PPT',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/p5.png',
    index: 17
  },
  {
    name: '图片转PDF',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/p6.png',
    index: 16
  },
  {
    name: '拼图',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/p7.png',
    index: 13
  },
])

const pdfs = ref([
  {
    name: 'PDF转Word',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/d1.png',
    url: 'type=pdf&channel=word'
  },
  {
    name: 'PDF转Excel',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/d2.png',
    url: 'type=pdf&channel=excel'
  },
  {
    name: 'PDF转PPT',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/d3.png',
    url: 'type=pdf&channel=ppt'
  },
  {
    name: 'PDF转图片',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/d4.png',
    url: 'type=pdf&channel=pic',
    hot: true,
  },
  {
    name: 'PDF转长图',
    src: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/uimg3/d5.png',
    url: 'type=pdf&channel=longpic'
  },
])
const goPage = (item) => {
  // console.log(item);
  if (item.index === -1) {
    uni.showToast({
      title: '正在开发，敬请期待',
      icon: 'none'
    });
    return;
  }
  if( item.index === 18 ){
    toRouter('/pages/remove-watermark/index', 'type=pic&channel=18&from=tool')
    return;
  }
  toRouter('/pages/camera/index', 'tab=' + item.index + '&from=tool')
}
const goPdf = (item) => {
  toRouter('/pages/pdf-transform/index', item.url)
}

const buyVip = () => {
  toRouter('/pages/member/index')
}
</script>
<style>
page{
  background: rgba(246, 247, 251, 1);
}
</style>
<style scoped lang="scss">

.tool-grid{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 12px;
  margin-top: 0.8rem;

  .d-flex {
    position: relative;
  }

  .hot {
    position: absolute;
    top: -25rpx;
    right: -30rpx;
    width: 76rpx;
  }
}
.tool-card{
  --wot-card-padding: 0.4rem 0.6rem;
  --wot-card-margin: 0;
}
</style>