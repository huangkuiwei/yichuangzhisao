<template>
  <view class="ca-tip">
    <view class="ca-tip-box">
      <view class="ca-tip-content">
        <view class="ca-tip-title">
          <wd-button size="small">
            A4纸实例
          </wd-button>
        </view>
        <view style="margin: 0 1rem;">
          <image :src="imgSrc" style="width: 100%" mode="widthFix" />
        </view>
      </view>
      <view class="tip-text">
        为保护您的信息安全，证件图像仅保留在本地， 不会上传服务端
      </view>
    </view>
    <view @click="startPic" class="d-flex-center tip-action" style="margin: 1rem 1.5rem 0 1.5rem;">
      <wd-button block>开始制作</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { cerIndex, tState, imgSrc, masterState } from './camera'

const startPic = () => {
  tState.value = false;
  masterState.value = true
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
  width: 190px;
  position: relative;
}
.ca-tip-content{
  border-radius: 5px 5px 0 0;
  padding: 0.5rem;
  background: #fff;
}
.ca-tip-title{
  text-align: right;
  --wot-button-small-height: 20px;
  --wot-button-primary-bg-color: rgba(128, 128, 128, 1);
}
.tip-action{
  --wot-button-primary-bg-color: rgba(35, 156, 247, 1);
}
.tip-text{
  background: #EBEBEB;
  padding: 0.5rem;
  color: #888;
  font-size: 0.71rem;
  border-radius: 0 0 5px 5px;
}
</style>