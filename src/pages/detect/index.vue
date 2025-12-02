<template>
  <view class="global-m">
    <view style="margin-bottom:10px; font-weight: bold">工地计数</view>
    <view class="detect-m">
      <view @click="tocheck(item)" class="detect-li" v-for="item in list1" :key="item.name">
        <image :src="item.url" style="width: 100%;" mode="widthFix" />
        <view class="d-flex-center">
          {{item.name}}
        </view>
        <view class="detect-count">
          <view v-if="item.checked">
            <wd-icon color="#229CF7" name="check-circle-filled" size="22px"></wd-icon>
          </view>
        </view>
      </view>
    </view>
    <view style="margin:10px 0; font-weight: bold">通用计数</view>
    <view class="detect-m">
      <view @click="tocheck(item)" class="detect-li" v-for="item in list2" :key="item.name">
        <image :src="item.url" style="width: 100%;" mode="widthFix" />
        <view class="d-flex-center">
          {{item.name}}
        </view>
        <view class="detect-count">
          <view v-if="item.checked">
            <wd-icon color="#229CF7" name="check-circle-filled" size="22px"></wd-icon>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const list1 = ref([
  { name: '钢管', checked: false, count: 0, url: 'https://yonganpicture.oss-cn-shenzhen.aliyuncs.com/icons/detect1.png' },
  { name: '方管', checked: false, count: 0, url: 'https://yonganpicture.oss-cn-shenzhen.aliyuncs.com/icons/detect2.png' },
  { name: '钢筋', checked: false, count: 0, url: 'https://yonganpicture.oss-cn-shenzhen.aliyuncs.com/icons/detect3.png' },
  { name: '圆木', checked: false, count: 0, url: 'https://yonganpicture.oss-cn-shenzhen.aliyuncs.com/icons/detect4.png' },
  { name: '方木', checked: false, count: 0, url: 'https://yonganpicture.oss-cn-shenzhen.aliyuncs.com/icons/detect5.png' }
])
const list2 = ref([
  { name: '水果', checked: false, count: 0, url: 'https://yonganpicture.oss-cn-shenzhen.aliyuncs.com/icons/tongyong1.png' },
  { name: '颗粒', checked: false, count: 0, url: 'https://yonganpicture.oss-cn-shenzhen.aliyuncs.com/icons/tongyong2.png' },
  { name: '卷', checked: false, count: 0, url: 'https://yonganpicture.oss-cn-shenzhen.aliyuncs.com/icons/tongyong2.png' },
  { name: '瓶子', checked: false, count: 0, url: 'https://yonganpicture.oss-cn-shenzhen.aliyuncs.com/icons/tongyong4.png' },
  { name: '药丸', checked: false, count: 0, url: 'https://yonganpicture.oss-cn-shenzhen.aliyuncs.com/icons/tongyong5.png' }
])

const tocheck = (item) => {
  item.checked =!item.checked
  const arr1 = list1.value.filter(i => i.checked)
  const arr2 = list2.value.filter(i => i.checked)
  getApp().globalData.detects = [...arr1,...arr2]

  setTimeout(() => {
    uni.navigateBack()
  }, 500)
}
</script>

<style scoped lang="scss">
.detect-m{
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}
.detect-li{
  position: relative;
}
.detect-count{
  position: absolute;
  right: 5px;
  bottom: 30px;
}
</style>