<template>
  <view class="ca-tip">
    <view class="ca-tip-box">
      <view class="ca-tip-content">
        <view style="margin: 0 2rem;">
          <image :src="fileSrc" style="width: 100%" mode="widthFix" />
        </view>
        <view style="height: 30px;" class="d-flex-center">
          {{fileTipName}}
        </view>
        <view style="font-size: 0.7rem;" class="d-flex-center">
          {{ fileTip }}
        </view>
        <view class="d-flex-center alert-btn">
          <wd-button @click="close" size="large">{{fileText}}</wd-button>
        </view>
        <view @click="onLocalSet" style="font-size: 0.8rem; margin-bottom: 0.6rem;" class="d-flex-center">
          不再提醒
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { fileSrc, fileTipName, fileTip, fileText, tab, localSet, wState } from './camera'
import { toRouter } from '@/hooks/utils'

const onLocalSet = () => {
  // console.log( tab.value );
  wState.value = false
  localSet.value['tab' + tab.value] = true
  uni.setStorageSync('identify', JSON.stringify( localSet.value ))
}

const close = () => {
  // 拍照计数，点击选择技术类型
  if (tab.value === 7) {
    toRouter('/pages/detect/index')
  }

  wState.value = false
}
</script>

<style scoped lang="scss">
.ca-tip{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.ca-tip-box{
  width: 260px;
  background: #fff;
  border-radius: 5px;
  position: relative;
}
.ca-tip-content{
  padding: 0.5rem;
}
.alert-btn{
  padding: 1rem 0;
  --wot-button-primary-bg-color: rgba(35, 156, 247, 1);
}
</style>