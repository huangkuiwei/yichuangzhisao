<template>
  <!-- #ifndef H5 -->
  <view style="height: 44px"></view>
  <!-- #endif -->
  <view class="navbar">
    <wd-drop-menu custom-class="drop-menu">
      <wd-drop-menu-item
          custom-icon="drop-icon_style"
          icon-size="20"
          icon="arrow-down"
          v-model="value"
          @change="onSelectChange"
          :options="options"
      >
      </wd-drop-menu-item>
    </wd-drop-menu>
    <view class="icons">
      <image
          @click="addDic"
          style="width: 34px"
          mode="widthFix"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/images/document_add.png"
      ></image>
    </view>
  </view>
  <view class="global-m" style="padding-top: 0.5rem">
    <view class="search-document">
      <wd-input
          v-model="key"
          placeholder="搜索文件"
          :no-border="true"
          :use-prefix-slot="true"
          :clearable="true"
          @input="onInput"
          @change="onChange"
      >
        <template #prefix>
          <wd-icon
              size="20"
              name="search"
              style="margin-left: 0.3rem"
          ></wd-icon>
        </template>
      </wd-input>
    </view>
    <view style="margin-top: 1rem; text-align: center">最近文件</view>
    <view style="margin-top: 0.8rem">
      <image
          @click="tobackDict"
          v-show="fileUrl.length > 0"
          src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/my/back.png"
          style="width: 30px; height: 30px"
          mode=""
      />
      <view
          :class="{ 'd-active': item.id == tindex }"
          v-for="(item, index) in files"
          :key="index"
          :style="{ paddingLeft: item.file_formmat ? '24rpx' : '' }"
      >
        <wd-cell
            center
            value="内容"
            title-width="calc(100% - 30px)"
            custom-class="doc-cell overflow-title"
        >
          <template #title>
            <view @click="getNewFile(item)">
              {{ item.folder_name }}
            </view>
          </template>
          <template #icon>
            <view
                @click="getNewFile(item)"
                class="d-flex"
                :style="{ paddingRight: item.file_formmat ? '54rpx' : '20rpx' }"
            >
              <view style="position: relative">
                <view
                    style="position: absolute; left: -26rpx; "
                    :style="{ top: /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(item.folder_name) ? '-30rpx' : '-24rpx' }"
                >
                  <!--<wd-icon v-if="/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(item.folder_name)" class-prefix="icon" custom-class="iconfont" name="png" size="50" color="#005FAD"></wd-icon>-->
                  <image
                      v-if="
                          item.file_formmat &&
                          /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(item.folder_name)
                        "
                      style="width: 30px; height: 30px; border-radius: 8rpx"
                      mode="aspectFit"
                      :src="item.file_url"
                  ></image>
                  <wd-icon v-if="/\.(doc|docx)$/i.test(item.folder_name)" class-prefix="icon" custom-class="iconfont" name="word1" size="30" color="#0072FF"></wd-icon>
                  <wd-icon v-else-if="/\.(xls|xlsx)$/i.test(item.folder_name)" class-prefix="icon" custom-class="iconfont" name="excel" size="30" color="#00C650"></wd-icon>
                  <wd-icon v-else-if="/\.(ppt|pptx)$/i.test(item.folder_name)" class-prefix="icon" custom-class="iconfont" name="ppt" size="30" color="#FF3E4C"></wd-icon>
                  <wd-icon v-else-if="/\.(pdf)$/i.test(item.folder_name)" class-prefix="icon" custom-class="iconfont" name="pdf" size="30" color="#FF3E4C"></wd-icon>
                </view>

                <image
                    v-if="!item.file_formmat"
                    style="width: 30px"
                    mode="widthFix"
                    src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/document/dir.png"
                ></image>
              </view>
            </view>
          </template>
          <template #label>
            <view
                style="color: #999999; font-size: 0.8rem"
                v-if="item.create_at"
                @click="getNewFile(item)"
            >
              {{ item.create_at }}
            </view>
          </template>
          <template #>
            <view
                @click.stop="(tindex = (tindex === item.id ? -1 : item.id)), (currentItem = (currentItem === item ? null : item))"
                class="doc-more"
            >
              <wd-icon name="more" size="20"></wd-icon>
            </view>
          </template>
        </wd-cell>
        <view class="d-grid" :class="{ 'd-grid-3': !item.file_formmat }">
          <view @click="toMove(item)" class="d-grid_li" v-if="item.file_formmat">
            <image
                style="height: 16px; width: 16px"
                src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/document/d1.png"
            ></image>
            <view style="margin-top: 0.3rem"> 移动</view>
          </view>
          <view @click="toEdit(item)" class="d-grid_li">
            <image
                style="height: 16px; width: 16px"
                src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/document/d2.png"
            ></image>
            <view style="margin-top: 0.3rem"> 编辑</view>
          </view>
          <view
              @click="toShareFile(item)"
              v-if="item.file_formmat"
              class="d-grid_li"
          >
            <image
                style="height: 16px; width: 16px"
                src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/document/d3.png"
            ></image>
            <view style="margin-top: 0.3rem"> 分享</view>
          </view>
          <view @click.stop="toDelete(item)" class="d-grid_li">
            <image
                style="height: 16px; width: 16px"
                src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/document/d4.png"
            ></image>
            <view style="margin-top: 0.3rem"> 删除</view>
          </view>
        </view>
      </view>
    </view>
  </view>
  <wd-message-box selector="wd-delete-box-slot"></wd-message-box>
  <wd-message-box selector="wd-add-box-slot">
    <view>
      <wd-input v-model="fileName" placeholder="请输入文件夹名称"></wd-input>
    </view>
  </wd-message-box>
  <wd-gap height="3rem"></wd-gap>
  <NavBar :index="2"></NavBar>
  <wd-popup custom-class="move-class" v-model="moveShow">
    <Move
        v-if="moveShow"
        ref="moveRef"
        @update="onUpdate"
        :fileId="fileId"
    ></Move>
  </wd-popup>
  <wd-message-box selector="wd-edit-box-slot"></wd-message-box>
  <Share :show="shareShow"></Share>
</template>

<script setup>
import { ref, computed } from 'vue'
import NavBar from '@/section/a-navbar.vue'
import { shareShow, shareUrl, state } from '@/section/share'
import Share from '@/section/share.vue'
import { toRouter } from '@/hooks/utils'
import {
  onLoad,
  onPullDownRefresh,
  onShareAppMessage,
  onShow
} from '@dcloudio/uni-app'
import {
  initDictionary,
  deleteFile,
  toAddDict, moveShow
} from './document'
import { useMessage } from '/node_modules/wot-design-uni'
import $http from '@/hooks/http'
import Move from './move.vue'

const addMessage = useMessage('wd-add-box-slot')
const deleteMessage = useMessage('wd-delete-box-slot')
const editMessage = useMessage('wd-edit-box-slot')

const value = ref(0),
    tindex = ref(-1),
    files = ref([]),
    fileUrl = ref([]),
    currentItem = ref(null)
const fileName = ref(null)
const options = ref([
  { label: '全部', value: 0 }
])
const fileId = ref('')
const key = ref(null)

const lastFolderInfo = computed(() => {
  return fileUrl.value[fileUrl.value.length - 1] || {}
})

onLoad(() => {
  uni.startPullDownRefresh()

  initDictionary().then((res) => {
    res.forEach(item => {
      options.value.push({ label: item.folder_name, value: item.folder_path_id, ...item })
    })
  })
})

onShareAppMessage(() => {
  return {
    title: '高清电子文档一键转换',
    imageUrl: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/yichuangzhisao/share.png',
    path: '/pages/index/index',
  }
})

onShow(() => {
  tindex.value = -1
  fileUrl.value = []

  uni.showLoading({
    title: '正在加载'
  })

  initDictionary().then((data) => {
    $http.post('api/user/hdfs/file/file/list', {
      folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
      key: key.value || null
    }).then((res) => {
      res.data.forEach(item => {
        if (!key.value) {
          files.value = data
        } else {
          files.value = []
        }

        files.value.push({
          ...item,
          folder_name: item.file_name
        })
      })
    }).finally(() => {
      uni.hideLoading()
    })
  }).catch((err) => {
    if (err.Code === -100) {
      files.value = []
    }
    uni.hideLoading()
  })
})

onPullDownRefresh(() => {
  initDictionary(lastFolderInfo.value.id).then((data) => {
    tindex.value = -1

    // if (!fileUrl.value.length) {
    $http.post('api/user/hdfs/file/file/list', {
      folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
      key: key.value || null
    }).then((res) => {
      res.data.forEach(item => {
        if (!key.value) {
          files.value = data
        } else {
          files.value = []
        }
        files.value.push({
          ...item,
          folder_name: item.file_name
        })
      })
    })
    // }
  }).finally(() => {
    uni.stopPullDownRefresh()
  })
})

const onInput = () => {
  tindex.value = -1
  fileUrl.value = []

  uni.showLoading({
    title: '正在加载'
  })

  initDictionary().then((data) => {
    $http.post('api/user/hdfs/file/file/list', {
      folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
      key: key.value || null
    }).then((res) => {
      if (!key.value) {
        files.value = data
      } else {
        files.value = []
      }

      res.data.forEach(item => {
        files.value.push({
          ...item,
          folder_name: item.file_name
        })
      })
    }).finally(() => {
      uni.hideLoading()
    })
  }).catch(() => {
    uni.hideLoading()
  })
}

const onChange = () => {
  tindex.value = -1
  fileUrl.value = []

  uni.showLoading({
    title: '正在加载'
  })

  initDictionary().then((data) => {
    $http.post('api/user/hdfs/file/file/list', {
      folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
      key: key.value || null
    }).then((res) => {
      if (!key.value) {
        files.value = data
      } else {
        files.value = []
      }
      res.data.forEach(item => {
        files.value.push({
          ...item,
          folder_name: item.file_name
        })
      })
    }).finally(() => {
      uni.hideLoading()
    })
  }).catch(() => {
    uni.hideLoading()
  })
}

const onSelectChange = ($event) => {
  if ($event.value === 0) {
    tindex.value = -1
    fileUrl.value = []

    uni.showLoading({
      title: '正在加载'
    })

    initDictionary().then((data) => {
      $http.post('api/user/hdfs/file/file/list', {
        folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
        key: key.value || null
      }).then((res) => {
        if (!key.value) {
          files.value = data
        } else {
          files.value = []
        }
        res.data.forEach(item => {
          files.value.push({
            ...item,
            folder_name: item.file_name
          })
        })
      }).finally(() => {
        uni.hideLoading()
      })
    }).catch(() => {
      uni.hideLoading()
    })
  } else {
    getNewFile($event.selectedItem)
  }
}

const toDelete = (item) => {
  deleteMessage
      .confirm({
        title: '提示',
        msg: '您要删除该文件吗?'
      })
      .then((type) => {
        type.action == 'confirm'
            ? deleteFile(item.file_formmat ? 'api/user/hdfs/file/file/delete' : 'api/user/hdfs/file/folder/delete',
                item.file_formmat ? {
                  folder_id: lastFolderInfo.value.id || 0,
                  id: item.id
                } : {
                  id: item.id
                }).then(() => {
              tindex.value = -1

              uni.showLoading({
                title: '正在加载'
              })

              tindex.value = -1
              initDictionary(lastFolderInfo.value.id).then((data) => {
                options.value = [{ label: '全部', value: 0 }]

                data.forEach(item => {
                  options.value.push({ label: item.folder_name, value: item.folder_path_id, ...item })
                })

                // if (!fileUrl.value.length) {
                $http.post('api/user/hdfs/file/file/list', {
                  folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
                  key: key.value || null
                }).then((res) => {
                  if (!key.value) {
                    files.value = data
                  } else {
                    files.value = []
                  }
                  res.data.forEach(item => {
                    files.value.push({
                      ...item,
                      folder_name: item.file_name
                    })
                  })
                }).finally(() => {
                  uni.hideLoading()
                })
                // }
              }).catch(() => {
                uni.hideLoading()
              })
            })
            : ''
      })
      .catch(() => {
        console.log('点击了取消按钮')
      })
}

const getNewFile = (item) => {
  if (!item.file_formmat) {
    fileUrl.value.push(item)
    uni.showLoading({
      title: '正在加载'
    })

    initDictionary(lastFolderInfo.value.id).then((data) => {
      $http.post('api/user/hdfs/file/file/list', {
        folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
        key: key.value || null
      }).then((res) => {
        if (!key.value) {
          files.value = data
        } else {
          files.value = []
        }
        res.data.forEach(item => {
          files.value.push({
            ...item,
            folder_name: item.file_name
          })
        })
      }).finally(() => {
        uni.hideLoading()
      })

      uni.hideToast()
      tindex.value = -1
    }).finally(() => {
      uni.hideLoading()
    })
  } else {
    if (/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(item.file_name)) {
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
        toRouter('/pages/ai-view/index', 'url=' + encodeURIComponent(item.file_url))
      }
    }
  }
}

const addDic = () => {
  fileName.value = null
  addMessage
      .confirm({
        title: '新建文件夹'
      })
      .then(() => {
        if (!fileName.value) {
          uni.showToast({ title: '文件夹名称不能为空', icon: 'none' })
          return
        }
        toAddDict(lastFolderInfo.value.id, fileName.value).then(() => {
          uni.showLoading({
            title: '正在加载'
          })

          initDictionary(lastFolderInfo.value.id).then((data) => {
            // if (!fileUrl.value.length) {
            options.value = [{ label: '全部', value: 0 }]

            data.forEach(item => {
              options.value.push({ label: item.folder_name, value: item.folder_path_id, ...item })
            })

            $http.post('api/user/hdfs/file/file/list', {
              folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
              key: key.value || null
            }).then((res) => {
              if (!key.value) {
                files.value = data
              } else {
                files.value = []
              }

              res.data.forEach(item => {
                files.value.push({
                  ...item,
                  folder_name: item.file_name
                })
              })
            }).finally(() => {
              uni.hideLoading()
            })
            // }
          }).catch(() => {
            uni.hideLoading()
          })
        })
      })
      .catch(() => {
      })
}

const tobackDict = () => {
  fileUrl.value.pop()

  uni.showLoading({
    title: '正在加载'
  })

  initDictionary(lastFolderInfo.value.id).then((data) => {
    // if (!fileUrl.value.length) {
    $http.post('api/user/hdfs/file/file/list', {
      folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
      key: key.value || null
    }).then((res) => {
      if (!key.value) {
        files.value = data
      } else {
        files.value = []
      }
      res.data.forEach(item => {
        files.value.push({
          ...item,
          folder_name: item.file_name
        })
      })
    }).finally(() => {
      uni.hideLoading()
    })
    // }
  }).catch(() => {
    uni.hideLoading()
  })
}

const toMove = (item) => {
  moveShow.value = true
  fileId.value = item.id
}

const onUpdate = () => {
  tindex.value = -1
  initDictionary(lastFolderInfo.value.id).then((data) => {
    // if (!fileUrl.value.length) {
    $http.post('api/user/hdfs/file/file/list', {
      folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
      key: key.value || null
    }).then((res) => {
      if (!key.value) {
        files.value = data
      } else {
        files.value = []
      }
      res.data.forEach(item => {
        files.value.push({
          ...item,
          folder_name: item.file_name
        })
      })
    }).finally(() => {
      uni.hideLoading()
    })
    // }
  }).catch(() => {
    uni.hideLoading()
  })
}

const toEdit = (item) => {
  editMessage
      .prompt({
        title: '请输入文件名',
        inputValue: item.folder_name,
        inputPattern: !item.file_formmat
            ? /^(?!\s*$).+/
            : /^[^\\\/:*?"<>|\r\n]+$$/,
        inputError: '文件名格式不正确(文件需要后缀名)'
      })
      .then((resp) => {
        if (resp.action == 'confirm') {
          tindex.value = -1

          if (!item.file_formmat) {
            $http.post('api/user/hdfs/file/folder/rename', {
              id: item.id,
              folder_name: resp.value
            }).then(() => {
              uni.showLoading({
                title: '正在加载'
              })

              initDictionary(lastFolderInfo.value.id).then((data) => {
                // if (!fileUrl.value.length) {
                $http.post('api/user/hdfs/file/file/list', {
                  folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
                  key: key.value || null
                }).then((res) => {
                  if (!key.value) {
                    files.value = data
                  } else {
                    files.value = []
                  }
                  res.data.forEach(item => {
                    files.value.push({
                      ...item,
                      folder_name: item.file_name
                    })
                  })
                }).finally(() => {
                  uni.hideLoading()
                })
                // }
              }).catch(() => {
                uni.hideLoading()
              })
            })
          } else {
            $http.post('api/user/hdfs/file/file/rename', {
              id: item.id,
              file_name: resp.value
            }).then(() => {
              uni.showLoading({
                title: '正在加载'
              })

              initDictionary(lastFolderInfo.value.id).then((data) => {
                // if (!fileUrl.value.length) {
                $http.post('api/user/hdfs/file/file/list', {
                  folder_id: key.value ? null : (lastFolderInfo.value.id || 0),
                  key: key.value || null
                }).then((res) => {
                  if (!key.value) {
                    files.value = data
                  } else {
                    files.value = []
                  }
                  res.data.forEach(item => {
                    files.value.push({
                      ...item,
                      folder_name: item.file_name
                    })
                  })
                }).finally(() => {
                  uni.hideLoading()
                })
                // }
              }).catch(() => {
                uni.hideLoading()
              })
            })
          }
        }
      })
      .catch((error) => {
        console.log(error)
      })
}

const toShareFile = (item) => {
  uni.showLoading({
    title: '正在分享...'
  })

  let newFilePath = `${uni.env.USER_DATA_PATH}/${item.folder_name}`

  uni.downloadFile({
    url: item.file_url,
    filePath: newFilePath,
    success: () => {
      uni.shareFileMessage({
        filePath: newFilePath,
        success() {
          tindex.value = -1
          console.log('文件转发成功')
        },
        fail(res) {
          console.log('文件转发失败', res)
        },
        complete() {
          uni.hideLoading()
        }
      })
    },
    fail(res) {
      console.log('文件下载失败', res)
      uni.hideLoading()
    }
  })
}
</script>
<style>
page {
  --wot-drop-menu-fs: 1rem;
  background: #ffffff;
}

.wd-input__suffix {
  padding-right: 20rpx;
}
</style>
<style scoped lang="scss">
.navbar {
  display: flex;
  align-items: center;
}

.icons {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1rem;
  margin-left: 50px;
}

.doc-cell {
  --wot-cell-padding: 0;
  --wot-cell-title-fs: 1rem;
  --wot-cell-label-fs: 0.8rem;
}

.doc-more {
  display: flex;
  align-items: center;
  padding: 0.6rem;
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

.d-grid-3 {
  grid-template-columns: repeat(3, 1fr);
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
</style>