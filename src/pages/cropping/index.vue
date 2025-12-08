<template>
  <view>
    <view class="water-mark" v-show="false">
      <wd-watermark
          ref="waterRef"
          image="data:image/png;base64,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"
          :width="100"
          :height="100"
          :imageWidth="60"
          :imageHeight="43"
          :rotate="0"
      ></wd-watermark>
    </view>

   <template v-if="showCropper && resultList.length">
     <jp-cropper-watermark
         ref="cropperRef"
         @cancel="oncancel"
         @ok="onok"
         :watermarkType="1"
         mode="free"
         :width="width"
         :height="height"
         :maxWidth="1024"
         :maxHeight="1024"
         :url="resultList[currentIndex].url"
         v-model:showCropBox="showCropBox"
         @submit1="submit1"
         @submit2="submit2"
         @reAdd="reAdd"
     />

     <view class="toggle">
       <view class="left" @click="toggleIndex('decrease')" :class="{ disabled: resultList.length === 1 ||currentIndex === 0 }">▲</view>
       <view class="number">
         <view>{{ currentIndex + 1 }}</view>
         <view>/</view>
         <view >{{ resultList.length }}</view>
       </view>
       <view class="right" @click="toggleIndex('add')" :class="{ disabled: resultList.length === 1 ||currentIndex === resultList.length - 1 }">▲</view>
     </view>
   </template>

    <template v-if="!showCropper">
      <view class="img-list">
        <view class="img-item" v-for="item of resultList" :key="item.url">
          <image :src="item.url" mode="aspectFit" />
        </view>
      </view>

      <view class="cropping-fixed">
        <view style="padding: 0 2rem; height: 50px; display: flex; align-items: center">
          <view @click="reAdd" style="flex-grow: 1; display: flex">
            <view style="display: flex; flex-direction: column; align-items: center; gap: 6rpx">
              <image
                  src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/xiangji.png"
                  style="height: 16px; width: 16px"
                  mode="heightFix"
              />
              <view style="font-size: 22rpx; ">重新拍摄</view>
            </view>
          </view>

          <view style="display: flex; align-items: center; gap: 20rpx;">
            <button class="submit" @click="submit">{{ submitText }}</button>
            <button class="share" @click="onShare">分享</button>
          </view>
        </view>
      </view>
    </template>
  </view>

  <Share :show="shareShow"></Share>

  <id-card ref="idCardRef" :propUrls="urls"/>
  <bank-card ref="bankCardRef" :propUrls="urls"/>
  <hukou ref="hukouRef" :propUrls="urls"/>
  <passport ref="passportRef" :propUrls="urls"/>
  <driver ref="driverRef" :propUrls="urls"/>
  <certificate ref="certificateRef" :propUrls="urls"/>
  <license ref="licenseRef" :propUrls="urls"/>
  <fileScan ref="fileScanRef" :propUrls="urls"/>
  <test-paper ref="testPaperRef" :propUrls="urls"/>
  <Jigsaw ref="jigsawRef" :propUrls="urls"/>
  <PicTransform ref="picTransformRef" :propsChannel="tab" :propUrls="urls"/>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import JpCropperWatermark from './jp-cropper-watermark.vue'
import { onLoad, onShareAppMessage, onShow } from '@dcloudio/uni-app'
import { toRouter, toSwich } from '@/hooks/utils'
import $http from '@/hooks/http'
import IdCard from '../camera/certificate/idCard.vue'
import BankCard from '../camera/certificate/bankCard.vue'
import Hukou from '../camera/certificate/hukou.vue'
import Passport from '../camera/certificate/passport.vue'
import Driver from '../camera/certificate/driver.vue'
import Certificate from '../camera/certificate/certificate.vue'
import License from '../camera/certificate/license.vue'
import FileScan from '../camera/fileScan/index.vue'
import TestPaper from '../test-paper/index.vue'
import Jigsaw from '../camera/jigsaw/index.vue'
import PicTransform from '../pic-transform/index.vue'
import { shareShow, shareUrl, taskId } from '@/section/share'
import Share from '@/section/share.vue'

onShareAppMessage(() => {
  return {
    title: '高清电子文档一键转换',
    imageUrl: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/yichuangzhisao/share.png',
    path: '/pages/index/index',
  }
})

const user = ref({})

const tab = ref(null);
const cerIndex = ref(null);

const width = ref(100);
const height = ref(100);
const urls = ref([]);
const currentIndex = ref(0);
const showCropper = ref(true);
const idCardRef = ref(null);
const bankCardRef = ref(null);
const hukouRef = ref(null);
const passportRef = ref(null);
const driverRef = ref(null);
const certificateRef = ref(null);
const licenseRef = ref(null);
const fileScanRef = ref(null);
const testPaperRef = ref(null);
const jigsawRef = ref(null);
const picTransformRef = ref(null);
const submitText = ref('完成');
const cropperRef = ref(null)
const waterRef = ref(null)
const showCropBox = ref(false);

onLoad(async (options) => {
  tab.value = options.tab;
  cerIndex.value = options.cerIndex;

  if (options.urls) {
    urls.value = options.urls.split(',')
  }

  $http.get('api/user/auth/userauth/info?referch=1').then(res => {
    let vip_info = res.data.vip_info

    user.value = {
      ...res.data,
      ...vip_info,
    };
  })
})

onMounted(() => {
  setTimeout(async () => {
    if (tab.value === '14' || tab.value === '15' || tab.value === '16' || tab.value === '17') {
      submitText.value = '正在转换'
      await picTransformRef.value.setResultList(urls.value)
    }

    width.value = resultList.value[currentIndex.value].width
    height.value = resultList.value[currentIndex.value].height
  }, 100)
})

onShow(() => {
  let globalData = getApp().globalData

  if (globalData.watermarkImg) {
    resultList.value[currentIndex.value].url = globalData.watermarkImg
    globalData.watermarkImg = undefined
  }
})

const resultList = computed(() => {
  if (tab.value === '4') {
    if (cerIndex.value === '1') {
      return idCardRef?.value?.resultList || []
    } else if (cerIndex.value === '2') {
      return bankCardRef?.value?.resultList || []
    } else if (cerIndex.value === '3') {
      return hukouRef?.value?.resultList || []
    } else if (cerIndex.value === '4') {
      return passportRef?.value?.resultList || []
    } else if (cerIndex.value === '5') {
      return driverRef?.value?.resultList || []
    } else if (cerIndex.value === '6') {
      return certificateRef?.value?.resultList || []
    } else if (cerIndex.value === '7') {
      return licenseRef?.value?.resultList || []
    }
  } else if (tab.value === '6') {
    return fileScanRef?.value?.resultList || []
  } else if (tab.value === '10') {
    return testPaperRef?.value?.resultList || []
  } else if (tab.value === '13') {
    return jigsawRef?.value?.resultList || []
  } else if (tab.value === '14' || tab.value === '15' || tab.value === '16' || tab.value === '17') {
    return picTransformRef?.value?.resultList || []
  }

  return []
})

const submit1 = async () => {
  uni.setNavigationBarTitle({
    title: ''
  })

  currentIndex.value = 0

  if (tab.value === '4') {
    if (cerIndex.value === '1') {
      await idCardRef.value.submit()
    } else if (cerIndex.value === '2') {
      await bankCardRef.value.submit()
    } else if (cerIndex.value === '3') {
      await hukouRef.value.submit()
    } else if (cerIndex.value === '4') {
      await passportRef.value.submit()
    } else if (cerIndex.value === '5') {
      await driverRef.value.submit()
    } else if (cerIndex.value === '6') {
      await certificateRef.value.submit()
    } else if (cerIndex.value === '7') {
      await licenseRef.value.submit()
    }
  } else if (tab.value === '6') {
    await fileScanRef.value.submit()
  } else if (tab.value === '10') {
    await testPaperRef.value.submit()
  } else if (tab.value === '13') {
    await jigsawRef.value.submit()
  }

  cropperRef.value.step = 2
}

const submit2 = async () => {
  if (tab.value === '14' || tab.value === '15' || tab.value === '16' || tab.value === '17') {
    await picTransformRef.value.submit()
    submitText.value = '预览'
  } else {
    uni.showLoading({
      title: '加载中...',
      mask: true,
    })

    let saveUrlItem = resultList.value[0]

    if (tab.value === '6') {
      await fileScanRef.value.mergePic()
      saveUrlItem = fileScanRef.value.mergePicUrl[0]
    }

    // 非VIP加水印分享
    if (!user.value.vip_type) {
      let watermarkPicInfo = await toTransformPics(saveUrlItem).catch(() => {})

      if (watermarkPicInfo) {
        saveUrlItem = watermarkPicInfo
      }
    }

    let file_url = saveUrlItem.url

    // 文件未上传就先进行上传处理
    if (!saveUrlItem.url.includes('hnenjoy.oss-cn-shanghai.aliyuncs.com')) {
      let res = await $http.upload('api/global/fileupload/upload', saveUrlItem.url).catch(() => {})

      if (res?.data) {
        file_url = res.data
      } else {
        uni.showToast({
          title: '图片上传失败',
          icon: 'none',
        })
      }
    }

    // 合成长图
    if (tab.value === '13') {
      let res = await $http.post('api/user/tools/pic/composite_long_image', {
        img_urls: [file_url]
      })

      if (res?.data) {
        taskId.value = res.data.task_id
      }
    }

    // 保存结果
    await $http.post('api/global/fileupload/save_result_file', {
      file_url: file_url,
      taskid: taskId.value
    }).catch(() => {})

    shareUrl.value = file_url
  }

  uni.hideLoading()
  showCropper.value = false
}

const submit = async () => {
  if (tab.value === '14' || tab.value === '15' || tab.value === '16' || tab.value === '17') {
    let url = picTransformRef.value.previewUrl
    let filesuffix = url.split('.')[url.split('.').length - 1]

    let filename = url.split('/')[url.split('/').length - 1]
    let newFilePath = `${uni.env.USER_DATA_PATH}/${filename}`

    if (url) {
      if (filesuffix.toLowerCase() === 'pdf' && uni.getDeviceInfo().platform === 'android') {
        uni.downloadFile({
          url: url,
          filePath: newFilePath,
          success: (res) => {
            uni.openDocument({
              filePath: newFilePath,
              showMenu: true,
              success: (res) => {
                console.log('打开成功', res)
              },
              fail: (res) => {
                console.log('打开失败', res)
              }
            })
            console.log('下载成功', res)
          },
          fail: (res) => {
            console.log('下载失败', res)
          }
        })
      } else {
        toRouter('/pages/ai-view/index', 'url=' + encodeURIComponent(picTransformRef.value.previewUrl))
      }
    } else {
      uni.showToast({
        title: '无转换内容',
        icon: 'none'
      })
    }
    return
  }

  toSwich('/pages/document/index')
}

const reAdd = () => {
  uni.navigateBack()
}

const onok = (ev) => {
  resultList.value[currentIndex.value].url = ev.path
};

const onShare = async () => {
  let url = ''

  if (tab.value === '4') {
    if (cerIndex.value === '1') {
      url = idCardRef?.value?.resultList?.[0]?.url
    } else if (cerIndex.value === '2') {
      url = bankCardRef?.value?.resultList?.[0]?.url
    } else if (cerIndex.value === '3') {
      url = hukouRef?.value?.resultList?.[0]?.url
    } else if (cerIndex.value === '4') {
      url = passportRef?.value?.resultList?.[0]?.url
    } else if (cerIndex.value === '5') {
      url = driverRef?.value?.resultList?.[0]?.url
    } else if (cerIndex.value === '6') {
      url = certificateRef?.value?.resultList?.[0]?.url
    } else if (cerIndex.value === '7') {
      url = licenseRef?.value?.resultList?.[0]?.url
    }
  } else if (tab.value === '6') {
    url = fileScanRef?.value?.resultList?.[0]?.url
  } else if (tab.value === '10') {
    url = testPaperRef?.value?.resultList?.[0]?.url
  } else if (tab.value === '13') {
    url = jigsawRef?.value?.resultList?.[0]?.url
  } else if (tab.value === '14' || tab.value === '15' || tab.value === '16' || tab.value === '17') {
    url = picTransformRef.value.previewUrl
  }

  if (tab.value === '14' || tab.value === '15' || tab.value === '16' || tab.value === '17') {
    uni.showLoading({
      title: '正在加载...'
    })

    let filename = url.split('/')[url.split('/').length - 1]
    let newFilePath = `${uni.env.USER_DATA_PATH}/${filename}`

    uni.downloadFile({
      url: url,
      filePath: newFilePath,
      success: () => {
        uni.shareFileMessage({
          filePath: newFilePath,
          success() {
            console.log('文件转发成功');
          },
          fail(res) {
            console.log('文件转发失败', res);
          },
          complete() {
            uni.hideLoading();
          }
        });
      },
      fail(res) {
        console.log('文件下载失败', res);
        uni.hideLoading();
      },
      complete: () => {
        uni.hideLoading();
      }
    });
  } else {
    shareShow.value = true
  }
}

const oncancel = () => {};

const toggleIndex = (type) => {
  if (type === 'add') {
    if (resultList.value.length === 1 ||currentIndex.value === resultList.value.length - 1) {
      uni.showToast({
        title: '已经是最后一张了',
        icon: 'none'
      })

      return
    }

    currentIndex.value += 1
  } else {
    if (resultList.value.length === 1 || currentIndex.value === 0) {
      uni.showToast({
        title: '已经是第一张了',
        icon: 'none'
      })

      return
    }

    currentIndex.value -= 1
    width.value = resultList.value[currentIndex.value].width
    height.value = resultList.value[currentIndex.value].height
  }
}

const toTransformPics = (imgInfo) => {
  return new Promise((resolve, reject) => {
    const waterMarkUrl = waterRef.value.waterMarkUrl;

    if (uni.createOffscreenCanvas) {
      const canvasImg = uni.createOffscreenCanvas({
        height: imgInfo.height,
        width: imgInfo.width,
        type: "2d",
      });

      canvasImg.id = 'water-canvas'

      const ctxImg = canvasImg.getContext("2d");
      const img = canvasImg.createImage();
      img.crossOrigin = "anonymous";
      img.referrerPolicy = "no-referrer";
      img.src = imgInfo.url

      img.onload = () => {
        ctxImg.drawImage(img, 0, 0, imgInfo.width, imgInfo.height);
        ctxImg.restore();

        const img2 = canvasImg.createImage();
        img2.src = waterMarkUrl;

        img2.onload = () => {
          const numRows = Math.ceil(imgInfo.height / img2.height);
          const numColumns = Math.ceil(imgInfo.width / img2.width);

          for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < numColumns; j++) {
              const x = j * img2.width;
              const y = i * img2.height;

              ctxImg.drawImage(img2, x, y, img2.width, img2.height);
            }
          }

          ctxImg.restore();

          let urlBase = canvasImg.toDataURL();

          const fs = uni.getFileSystemManager();
          const tempFilePath = `${uni.env.USER_DATA_PATH}/${new Date().getTime()}.png`;

          fs.writeFile({
            filePath: tempFilePath,
            data: urlBase.split(',')[1], // Remove the data URL prefix and decode Base64
            encoding: 'base64',
            success: async () => {
              let res = await $http.upload('api/global/fileupload/upload', tempFilePath).catch(() => {})

              if (res?.data) {
                resolve({
                  ...imgInfo,
                  url: res.data
                })
              } else {
                reject(res)
              }
            },
            fail: (error) => {
              reject(error)
            }
          });
        };
      };
    }
  })
};
</script>
<style>
page {
  background: #f7f8fc;
}
</style>
<style scoped lang="scss">
.cropping-img {
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
}
.cropping-fixed {
  height: 50px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9999;
  background: #fff;
  width: 100vw;
  border-top: 1px solid #eee;
  font-size: 0.85rem;
  --wot-button-primary-bg-color: #229cf7;
}
.cropping-jp{
  overflow: auto;
  display: flex;
  align-items: center;
  font-size: 26rpx;
}

.submit {
  background: #ffffff;
  border: 1px solid #229CF7;
  border-radius: 999px;
  font-size: 28rpx;
  color: #229CF7;
  width: 180rpx;
  margin: 0;
  padding: 0;
}

.share {
  background: #229CF7;
  border-radius: 999px;
  font-size: 28rpx;
  color: #ffffff;
  width: 180rpx;
  margin: 0;
  padding: 0;
}

.cropping-jp .d-flex-column-center{
  flex-shrink: 0;
  flex-grow: 1;
}

.step2 {
  padding: 0 20rpx;

  image {
    width: 100%;
  }
}

.toggle {
  position: fixed;
  bottom: 140rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  padding: 10rpx 40rpx;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999999;
  color: #2F2F46;

  .number {
    padding: 0 18rpx;
    flex-shrink: 0;
    white-space: nowrap;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .left {
    transform: rotate(-90deg);
  }

  .right {
    transform: rotate(90deg);
  }

  .disabled {
    color: #D9D9D9;
    border-radius: 10rpx;
  }
}

.img-list {
  display: flex;
  flex-wrap: wrap;
  padding: 40rpx;

  .img-item {
    background: #ffffff;
    width: 315rpx;
    box-shadow: 0 3px 3px #eee;
    height: 446rpx;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-radius: 20rpx;
    margin-bottom: 20rpx;

    &:nth-child(2n - 1) {
      margin-right: 40rpx;
    }

    image {
      height: 100%;
      border-radius: 20rpx;
    }
  }
}
</style>