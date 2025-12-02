export const toRouter = (url, params) => {
  params ? url = url + '?' + params : ''
  uni.navigateTo({
    url,
  })
}

export const toSwich = (url) => {
  uni.switchTab({
    url
  })
}

export const uploadBase64 = (toast, base64) => {
  uni.request({
    url: '/api/oss/uploadBase64ToOSS',
    method: 'POST',
    data: {
      username: uni.getStorageSync('username'),
      base64: base64
    },
    success: () => {
      toast.close()
      toast.success('上传成功')
    }
  })
}

export const goView = (shareUrl) => {
  uni.downloadFile({
    url: shareUrl,
    success: (res) => {
      uni.openDocument({
        filePath: res.tempFilePath,
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
};

export function setStorageSyncWithExpire(key, data, expireInMinutes) {
  // 获取当前时间的时间戳（毫秒）
  const now = Date.now();
  // 计算过期时间的时间戳
  const expireTime = now + (expireInMinutes * 60 * 1000);

  // 将数据和过期时间一起存储
  uni.setStorageSync(key, { data: data, expireTime: expireTime });
}

export function getStorageSyncWithExpire(key) {
  // 从本地缓存中同步获取指定 key 的内容
  const cache = uni.getStorageSync(key);

  if (!cache) {
    return null; // 如果没有找到对应key的数据，返回null
  }

  const now = Date.now();

  // 检查是否已过期
  if (cache.expireTime < now) {
    // 数据已过期，可以在这里进行清理等操作
    console.log('缓存已过期');
    uni.removeStorageSync(key); // 移除过期数据
    return null;
  } else {
    // 数据未过期，返回数据
    return cache.data;
  }
}
