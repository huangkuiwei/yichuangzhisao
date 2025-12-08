<template>
  <view class="index-top">
    <!-- #ifndef H5 -->
    <view style="height: 44px"></view>
    <!-- #endif -->
    <view>
      <view class="ad" @click="toRouter('/pages/camera/index', 'tab=4')">
        <image
            class="vip"
            mode="widthFix"
            src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/home/VIP.png"
        />

        <image
            class="btn"
            mode="widthFix"
            src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/home/btn.png"
        />

        <image
            class="banner"
            mode="widthFix"
            src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/home/banner.png"
        />
      </view>
    </view>
  </view>
  <view class="index-content" style="position: relative; z-index: 10">
    <view class="box">
      <view class="grid">
        <view @click="toRouter('/pages/camera/index', 'tab=4')">
          <image
            style="width: 100%"
            mode="widthFix"
            src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/home/ad1.png"
          ></image>
        </view>

        <view>
          <view style="margin-bottom: 14rpx">
            <image
                @click="show = true"
                style="width: 100%"
                mode="widthFix"
                src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/home/ad2.png"
            ></image>
          </view>
          <view>
            <image
                @click="pdfShow = true"
                style="width: 100%"
                mode="widthFix"
                src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/home/ad3.png"
            ></image>
          </view>
        </view>
      </view>
      <view class="index-card" style="margin-top: 0.6rem">
        <view style="width: calc(100vw - 100rpx); margin-left: -20rpx; position: relative; padding: 120rpx 40rpx 80rpx; background: url('https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/home/fun-bg.png') left top/100% 100% no-repeat;">
          <view class="card-grid">
            <view style="font-size: 24rpx; color: #999999; position: absolute; top: 50rpx; right: 50rpx" @click="toSwich('/pages/tool/index')">查看更多</view>

            <view @click="toRouter('/pages/camera/index', 'tab=4')">
              <view class="card-grid_li">
                <wd-img
                  height="36"
                  mode="heightFix"
                  src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/home/zj1.png"
                ></wd-img>
              </view>
              <view class="span"> 证件扫描 </view>
            </view>
            <view @click="toRouter('/pages/camera/index', 'tab=5')">
              <view class="card-grid_li">
                <wd-img
                  height="36"
                  mode="heightFix"
                  src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/home/zj2.png"
                ></wd-img>
              </view>
              <view class="span"> 提取文字 </view>
            </view>
            <view @click="pdfShow = true">
              <view class="card-grid_li">
                <wd-img
                  height="36"
                  mode="heightFix"
                  src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/home/zj3.png"
                ></wd-img>
              </view>
              <view class="span"> PDF转换 </view>
            </view>
            <view @click="toRouter('/pages/camera/index', 'tab=9')">
              <view class="card-grid_li">
                <wd-img
                  height="36"
                  mode="heightFix"
                  src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/home/zj4.png"
                ></wd-img>
              </view>
              <view class="span"> 拍照翻译 </view>
            </view>
          </view>
        </view>
        <wd-card>
          <template #title>
            <view class="card-title">
              <view style="font-size: 32rpx" class="name"> 最近文件 </view>
              <view style="font-size: 24rpx; color: #999999" @click="toSwich('/pages/document/index')">查看更多</view>
            </view>
          </template>
          <view class="card-content">
            <view
              :class="{ 'd-active': item.id == tindex }"
              v-for="(item, index) in files"
              :key="index"
            >
              <wd-cell
                center
                value="内容"
                title-width="calc(100% - 30px)"
                custom-class="doc-cell overflow-title"
              >
                <template #title>
                  <view @click="goPreview(item)">
                    {{ item.file_name }}
                  </view>
                </template>
                <template #icon>
                  <view
                    @click="goPreview(item)"
                    style="margin-right: 3rem"
                  >
                    <view style="position: relative">
                      <view
                          style="position: absolute; left: -26rpx; "
                          :style="{ top: /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(item.file_name) ? '0' : '24rpx' }"
                      >
                        <!--<wd-icon v-if="/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(item.file_name)" class-prefix="icon" custom-class="iconfont" name="png" size="50" color="#005FAD"></wd-icon>-->
                        <image
                            v-if="
                          item.file_name.includes('.') &&
                          /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(item.file_name)
                        "
                            style="width: 50px; height: 50px; border-radius: 8rpx"
                            mode="aspectFit"
                            :src="item.file_url"
                        ></image>
                        <wd-icon v-if="/\.(doc|docx)$/i.test(item.file_name)" class-prefix="icon" custom-class="iconfont" name="word1" size="50" color="#0072FF"></wd-icon>
                        <wd-icon v-else-if="/\.(xls|xlsx)$/i.test(item.file_name)" class-prefix="icon" custom-class="iconfont" name="excel" size="50" color="#00C650"></wd-icon>
                        <wd-icon v-else-if="/\.(ppt|pptx)$/i.test(item.file_name)" class-prefix="icon" custom-class="iconfont" name="ppt" size="50" color="#FF3E4C"></wd-icon>
                        <wd-icon v-else-if="/\.(pdf)$/i.test(item.file_name)" class-prefix="icon" custom-class="iconfont" name="pdf" size="50" color="#FF3E4C"></wd-icon>
                      </view>
                    </view>
                  </view>
                </template>
                <template #label>
                  <view
                    @click="goPreview(item)"
                    style="color: #999; font-size: 0.8rem"
                    v-if="item.create_at"
                  >
                    {{ item.create_at }}
                  </view>
                </template>
                <template #>
                  <view
                      @click.stop="(tindex = (tindex === item.id ? -1 : item.id)), (currentItem = (currentItem === item ? null : item))"
                      class="doc-more"
                  >
                    <wd-icon
                      name="more"
                      size="20"
                    ></wd-icon>
                  </view>
                </template>
              </wd-cell>
              <view class="d-grid">
                <view @click="toEdit(item)" class="d-grid_li">
                  <image
                    style="height: 16px; width: 16px"
                    src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/document/d2.png"
                  ></image>
                  <view style="margin-top: 0.3rem"> 编辑 </view>
                </view>
                <view @click="toShareFile(item)" class="d-grid_li">
                  <image
                    style="height: 16px; width: 16px"
                    src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/document/d3.png"
                  ></image>
                  <view style="margin-top: 0.3rem"> 分享 </view>
                </view>
                <view @click.stop="toDelete(item)" class="d-grid_li">
                  <image
                    style="height: 16px; width: 16px"
                    src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/document/d4.png"
                  ></image>
                  <view style="margin-top: 0.3rem"> 删除 </view>
                </view>
              </view>
            </view>
            <view class="empty" v-if="files.length === 0">
              <view class="empty-box">
                <image
                  style="width: 100%"
                  mode="widthFix"
                  src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/empty.png"
                ></image>
                <view style="margin-top: 0.3rem; text-align: center"
                  >暂无相关内容</view
                >
              </view>
            </view>
          </view>
        </wd-card>
      </view>
    </view>
  </view>
  <wd-gap height="2rem"></wd-gap>
  <wd-popup
    v-model="show"
    position="bottom"
    custom-style="height: 250px; z-index: 1000;"
    @close="show = false"
  >
    <view class="popup-close">
      <wd-icon
        @click="show = false"
        name="close-circle"
        size="24"
        color="#888"
      ></wd-icon>
    </view>
    <view class="popup-grid">
      <view @click="toRouter('/pages/pic-transform/index', 'type=pic&channel=15')"  class="popup-grid_li">
        <image
          style="width: 58rpx"
          mode="widthFix"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/icons5/excel.png"
        ></image>
        <view style="margin-top: 0.6rem; font-size: 28rpx">转Excel</view>
      </view>
      <view class="popup-grid_li">
        <image
          @click="toRouter('/pages/camera/index?tab=13&from=tool')"
          style="width: 58rpx"
          mode="widthFix"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/icons5/pintu.png"
        ></image>
        <view style="margin-top: 0.6rem; font-size: 28rpx">拼图</view>
      </view>
      <view @click="toRouter('/pages/pic-transform/index', 'type=pic&channel=17')" class="popup-grid_li">
        <image
          style="width: 58rpx"
          mode="widthFix"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/icons5/ppt.png"
        ></image>
        <view style="margin-top: 0.6rem; font-size: 28rpx">转PPT</view>
      </view>
      <view @click="toRouter('/pages/pic-transform/index', 'type=pic&channel=14')" class="popup-grid_li">
        <image
          style="width: 58rpx"
          mode="widthFix"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/icons5/word.png"
        ></image>
        <view style="margin-top: 0.6rem; font-size: 28rpx">转Word</view>
      </view>
      <view @click="toRouter('/pages/pic-transform/index', 'type=pic&channel=16')" class="popup-grid_li">
        <image
          style="width: 58rpx"
          mode="widthFix"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/icons5/pdf.png"
        ></image>
        <view style="margin-top: 0.6rem; font-size: 28rpx">转PDF</view>
      </view>
    </view>
  </wd-popup>

  <wd-popup
    v-model="pdfShow"
    position="bottom"
    custom-style="height: 260px; z-index: 1000;"
    @close="pdfShow = false"
  >
    <view class="popup-close">
      <wd-icon
        @click="pdfShow = false"
        name="close-circle"
        size="24"
        color="#888"
      ></wd-icon>
    </view>
    <view class="popup-grid">
      <view class="popup-grid_li" @click="toRouter('/pages/pdf-transform/index', 'type=pdf&channel=pic')">
        <image
          style="width: 58rpx"
          mode="widthFix"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/icons6/img.png"
        ></image>
        <view style="margin-top: 0.6rem; font-size: 28rpx">转图片</view>
      </view>
      <view class="popup-grid_li" @click="toRouter('/pages/pdf-transform/index', 'type=pdf&channel=longpic')">
        <image
          style="width: 58rpx"
          mode="widthFix"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/icons6/longimg.png"
        ></image>
        <view style="margin-top: 0.6rem; font-size: 28rpx">转长图</view>
      </view>
      <view @click="toRouter('/pages/pdf-transform/index', 'type=pdf&channel=ppt')" class="popup-grid_li">
        <image
          style="width: 58rpx"
          mode="widthFix"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/icons6/ppt.png"
        ></image>
        <view style="margin-top: 0.6rem; font-size: 28rpx">转PPT</view>
      </view>
      <view class="popup-grid_li" @click="toRouter('/pages/pdf-transform/index', 'type=pdf&channel=word')">
        <image
          style="width: 58rpx"
          mode="widthFix"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/icons6/word.png"
        ></image>
        <view style="margin-top: 0.6rem; font-size: 28rpx">转Word</view>
      </view>
      <view class="popup-grid_li" @click="toRouter('/pages/pdf-transform/index', 'type=pdf&channel=excel')">
        <image
          style="width: 58rpx"
          mode="widthFix"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/icons6/excel.png"
        ></image>
        <view style="margin-top: 0.6rem; font-size: 28rpx">转Excel</view>
      </view>
    </view>
  </wd-popup>
  <wd-message-box selector="wd-delete-box-slot"></wd-message-box>
  <wd-message-box selector="wd-add-box-slot">
    <view>
      <wd-input v-model="fileName" placeholder="请输入文件夹名称"></wd-input>
    </view>
  </wd-message-box>

  <wd-message-box selector="wd-edit-box-slot"></wd-message-box>
  <NavBar :index="1"></NavBar>
  <Share :show="shareShow"></Share>
</template>

<script setup>
import { ref } from "vue";
import NavBar from "@/section/a-navbar.vue";
import { toRouter, toSwich } from "@/hooks/utils";
import { deleteFile } from '../document/document'
import { useMessage } from '/node_modules/wot-design-uni'
import { onShow } from '@dcloudio/uni-app'
import { onLoad, onShareAppMessage } from '@dcloudio/uni-app'
import { shareShow, shareUrl, state, docUrl} from '@/section/share'
import Share from '@/section/share.vue'
import $http from '@/hooks/http'
const addMessage = useMessage('wd-add-box-slot')
const deleteMessage = useMessage('wd-delete-box-slot')
const editMessage = useMessage('wd-edit-box-slot')

const files = ref([]), tindex = ref(-1), currentItem = ref(null), fileUrl = ref(uni.getStorageSync('username'));
const show = ref(false), dictMitem = ref(null), fileName = ref('');
const pdfShow = ref(false),editValue = ref('');

onLoad(() => {
  $http.get('api/user/auth/userauth/info?referch=1', {}, {
    hideLoginBox: true
  })
})

onShow(() => {
  initFile()
})

onShareAppMessage(() => {
  return {
    title: '高清电子文档一键转换',
    imageUrl: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/yichuangzhisao/share.png',
    path: '/pages/index/index',
  }
})

const toShareFile = (item) => {
  uni.showLoading({
    title: '正在分享...'
  })

  let newFilePath = `${uni.env.USER_DATA_PATH}/${item.file_name}`

  console.log('newFilePath', newFilePath)

  uni.downloadFile({
    url: item.file_url,
    filePath: newFilePath,
    success: () => {
      uni.shareFileMessage({
        filePath: newFilePath,
        success() {
          tindex.value = -1
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
    }
  });
}

const initFile = () => {
  uni.showLoading({
    title: '正在加载'
  })

  $http.post('api/user/hdfs/file/file/list', {
    folder_id: 0
  }, {
    hideLoginBox: true
  }).then((res) => {
    files.value = res.data?.slice(0, 6);
  }).catch((err) => {
    if (err.Code === -100) {
      files.value = []
    }
  }).finally(() => {
    uni.hideLoading()
  })
}

const toDelete = (item) => {
  deleteMessage.confirm({
    title: '提示',
    msg: '您要删除该文件吗?',
  }).then((type) => {
      type.action == 'confirm'
      ? deleteFile('api/user/hdfs/file/file/delete', {
            folder_id: 0,
            id: item.file_path_id
          }).then(() => {
            tindex.value = -1
            initFile()
      })
      :''
    })
    .catch(() => {
      console.log('点击了取消按钮')
    })
}

const toEdit = (item) => {
  editMessage
      .prompt({
        title: "请输入文件名",
        inputValue: item.file_name,
        inputPattern: !item.file_name.includes('.')
            ? /^(?!\s*$).+/
            : /^[^\\\/:*?"<>|\r\n]+$$/,
        inputError: "文件名格式不正确(文件需要后缀名)",
      })
      .then((resp) => {
        if (resp.action == "confirm") {
          tindex.value = -1

          if (!item.file_name.includes('.')) {
            $http.post('api/user/hdfs/file/folder/rename', {
              id: item.file_path_id,
              folder_name: resp.value
            }).then(() => {
              initFile()
            })
          } else {
            $http.post('api/user/hdfs/file/file/rename', {
              id: item.file_path_id,
              file_name: resp.value
            }).then(() => {
              initFile()
            })
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
};

const goPreview = (item) => {
  if( /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(item.file_name) ){
    toRouter('/pages/preview/index', `previewFileUrl=${encodeURIComponent(item.file_url)}&type=img&title=${item.file_name}`)
  } else {
    if (item.file_formmat === '.pdf' && uni.getDeviceInfo().platform === 'android') {
      let filename = item.file_url.split('/')[item.file_url.split('/').length - 1]
      let newFilePath = `${uni.env.USER_DATA_PATH}/${filename}`

      uni.downloadFile({
        url: item.file_url,
        filePath: newFilePath,
        success: (res) => {
          uni.openDocument({
            filePath: newFilePath,
            showMenu: true,
            success: (res) => {
              console.log("打开成功", res);
            },
            fail: (res) => {
              console.log("打开失败", res);
            },
          });
          console.log("下载成功", res);
        },
        fail: (res) => {
          console.log("下载失败", res);
        },
      });
    } else {
      toRouter('/pages/ai-view/index', 'url=' + encodeURIComponent(item.file_url))
    }
  }
}
</script>

<style lang="scss" scoped>
page {
}
.index-card {
  --wot-card-margin: 0;
}
.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 200rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}
.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.index-top {
  background: linear-gradient(to right, #BAD2FA, #BAD2FA);
  // padding: 0.8rem;
  --wot-card-margin: 0;
}
.search {
  display: flex;

  :deep(.wd-input) {
    flex: 1;
    height: 2.5rem;
    border-radius: 2rem;
    display: flex;
    padding-left: 0.5rem;
    align-items: center;
  }
}
.vip {
  display: flex;
  align-items: center;
  margin: 0 0 0 0.8rem;
}
.ad {
  display: flex;
  position: relative;

  .vip {
    position: absolute;
    width: 98rpx;
    top: 50rpx;
    left: 0;
  }

  .btn {
    position: absolute;
    width: 160rpx;
    bottom: 150rpx;
    left: 30rpx;
  }

  .banner {
    width: 100%;
  }
}
.index-content {
  margin-top: -4rem;
  border-radius: 2rem 2rem 0 0;
  .box {
    padding: 1rem;
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 0.6rem;
      margin-top: 0.3rem;
    }
  }
}
.card-title {
  display: flex;
  .name {
    flex: 1;
    font-weight: bold;
    font-size: 1rem;
  }
}
.card-grid {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  .card-grid_li {
    display: flex;
    justify-content: center;
  }
  .span {
    display: flex;
    justify-content: center;
    font-size: 0.9rem;
    color: #222;
    margin-top: 0.5rem;
  }
}
.card-content {
  min-height: 200px;
  .empty {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    .empty-box {
      width: 180px;
    }
  }
}
.ad-right {
  position: relative;
  .vip-point {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.popup-close {
  display: flex;
  height: 40px;
  align-items: center;
  justify-content: flex-end;
  padding: 0 1rem;
}
.popup-grid {
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40rpx;
  margin-top: 1rem;
}
.popup-grid_li {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.d-active {
  background: rgba(247, 248, 252, 1);
  border-radius: 8px;
  overflow: hidden;
  padding-bottom: 0.5rem;
}
.d-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  display: none;
}
.d-grid_li {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 0.8rem;
  color: rgba(51, 51, 51, 1);
}
.d-active .d-grid {
  display: grid;
}
.doc-more{
  padding: 0.6rem;
}
</style>
