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
import { onLoad, onShow } from '@dcloudio/uni-app'
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