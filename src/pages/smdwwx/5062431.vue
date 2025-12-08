<template>
  <view class="thswwx2-page" ref="thswwx2" @scroll="onScroll">
    <view class="thswwx2-page-wrap">
      <view class="content-box">
        <!-- <view class="price-logo">标准资费：29.9元/月，指导价：35元/月 </view> -->
        <div class="phone-container">
          <span class="phone"><p>173****2736 抢到了</p></span>
          <span class="phone"><p>152****0942 抢到了</p></span>
          <span class="phone"><p>138****7545 抢到了</p></span>
          <span class="phone"><p>186****1001 抢到了</p></span>
          <span class="phone"><p>156****1712 抢到了</p></span>
        </div>

        <view id="ydrzCustomControls"></view>
        <view class="login-box" v-if="userAuthVisible">
          <image mode="widthFix" class="finger-icon" src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/5062432/first_step.png" />
          <input type="number" placeholder="请输入您的手机号" maxlength="11" v-model="paramsObj.mobile" />

          <view class="buy">
            <image
                class="btn"
                mode="widthFix"
                src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/5062432/order_btn.png"
                @click="loginBuy"
            />
          </view>

          <view class="agree">
            <checkbox-group @change="agree = $event.detail.value">
              <label>
                <checkbox value="1" :checked="agree.includes('1')" />
                <view class="agreement">
                  我已阅读并同意<text @click.capture.stop="$refs.privacyDialog.open()">《个人信息保护政策》</text
                >和<text @click.capture.stop="$refs.ruleDialog.open()">《订购规则》</text>
                </view>
              </label>
            </checkbox-group>
          </view>

          <!-- <view class="mobile">客服热线：<text>4009986958</text></view> -->
        </view>

        <!-- <radio-group class="check-type-box" @change="chooseOrderType">
          <radio value="1" :checked="checkedType == '1'" class="checked-item">
            <text class="item-text" :class="{ activeColor: checkedType === '1' }">
              连续包月
              <text class="price"> <text class="size"> 29.9</text>元/月 </text>
            </text>
          </radio>

          <image class="recommend" mode="widthFix" src="/static/sempages/xhkj/smdwzyb/503251/recommend.png" />

          <radio value="2" :checked="checkedType == '2'" class="checked-item">
            <text class="item-text" :class="{ activeColor: checkedType === '2' }">
              单次扣费
              <text class="price"> <text class="size"> 35</text>元/月 </text>
            </text>
          </radio>
        </radio-group> -->

        <!-- <view class="platform">
          <image mode="widthFix" src="/static/sempages/xhkj/smdwzyb/503251/platform_img.png" />
        </view>

        <view class="platform">
          <image mode="widthFix" src="/static/sempages/xhkj/smdwzyb/503251/platform_img1.png" />
        </view> -->

        <view class="platform-box">
          <view class="buy-tip-content">
            <view class="tip-title">一、订购须知</view>
            <view>1、本页面仅供客户购买权益，非用于鉴权登录等其他服务，老年及未成年人请谨慎消费，敬请知悉！</view>
            <view
            >2、为了您的权益保障，请注意核实订购规则及订单详情，不要轻信陌生人通过网络、电话、短信告知的信息，谨防网络电信诈骗。</view
            >

            <view class="tip-title">二、订购详情 </view>
            <view>1、产品名称：扫描大王专业版会员 </view>
            <view>2、计费方式：微信连续包月/月包</view>
            <view>3、资费：连续包月29.9元/月，月包35元</view>
            <view>4、首次在本页面成功开通扫描大王专业版会员服务（连续包月29.9元/月，月包35元）即可获赠以下权益：</view>
            <view
            >热门会员任选1；腾讯视频月卡、爱奇艺月卡、优酷月卡、芒果TV月卡、哔哩哔哩大会员月卡、埋堆堆视频月卡、搜狐视频月卡、网易云音乐月卡、酷我音乐月卡、酷狗豪华VIP月卡、喜马拉雅巅峰会员月卡、作业帮月卡、咪咕视频月卡、饿了么会员月卡、迅雷白金会员月卡、百度网盘超级月卡、夸克网盘月卡、WPS超级会员月卡、Keep会员月卡、七猫小说月卡、懒人听书月卡（可领取会员权益以实际开放为准）。
            </view>
            <view
            >注：“扫描大王专业版会员”每月自动发放。其他热门会员特权需登录【扫描大王会员服务】公众号领取。会员权益仅能领取到下单手机号，无法充值至其他账号；每个手机号每月同个权益只可领取一次。</view
            >
            <view class="tip-title">三、注意事项 </view>
            <view
            >1、每个手机号码仅限当月参与1次。权益领取成功后当月内不能进行退订、更改，视频、音频会员每月可领取，不可结转与转赠，当月不领取则视为自动放弃当月领取资格。
            </view>
            <view
            >2、本产品以及权益会根据实际运营情况适时调整，具体请以此权益领取页面实际显示及各权益提供方最新权益使用规则为准。</view
            >
            <view
            >3、如您需取消连续包月服务，即关闭自带续费功能步骤如下：点击微信右下角“我“-服务-钱包-支付设置-自动续费-点击对应项目
              -点击“关闭扣费服务”，即可进行退订解约，或关注微信【扫描大王会员服务】，联系客服进行退订处理。</view
            >
            <view> 4、本页面仅供客户购买权益，非用于鉴权登录等其他服务，老年及未成年人请谨慎消费，敬请知悉！</view>
            <view>
              5、为了您的权益保障，请注意核实订购规则及订单详情，不要轻信陌生人通过网络、电话、短信告知的信息，谨防网络电信诈骗。</view
            >
            <view>6、客服热线：4009986958</view>
          </view>
        </view>
      </view>
    </view>

    <!-- <view v-if="showLoginBoxVisible" class="bottom-login-box">
      <view class="buy" @click="showLoginBox">
        <image class="btn" mode="widthFix" src="/static/sempages/xhkj/smdwzyb/503251/order_btn.png" />
      </view>
    </view> -->

    <uni-popup ref="checkConfirmDialog" maskBackgroundColor="rgba(0, 0, 0, 0.5)">
      <button class="check-confirm-dialog" :phone-number-no-quota-toast="false"
              :open-type="agree.includes('1') ? 'getPhoneNumber' : null"
              @getphonenumber="getPhoneNumber"
              @click="!agree.includes('1') && onAgreeClick()"
      >
        <view class="check-content">
          <view class="agree-btn-box">
            <image
                class="agree-btn"
                mode="widthFix"
                src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/5062432/bg2.png"
            />

            <!--<image-->
            <!--    class="point"-->
            <!--    mode="widthFix"-->
            <!--    src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/5062432/finger.png"-->
            <!--/>-->
          </view>

          <view class="phone-tip">注意：请授权使用手机号用作登录领取</view>
          <view class="submit">本机一键登录</view>

          <view class="agree">
            <checkbox-group @change="agree = $event.detail.value">
              <label>
                <checkbox value="1" :checked="agree.includes('1')" />
                <view class="agreement">
                  我已阅读并同意<text @click.capture.stop="$refs.privacyDialog.open()">《个人信息保护政策》</text
                >和<text @click.capture.stop="$refs.ruleDialog.open()">《订购规则》</text>
                </view>
              </label>
            </checkbox-group>

            <image
                v-show="agree.includes('1')"
                class="checked"
                mode="widthFix"
                src="https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/smdwzyb/503251/dialog-checked.png"
                @click="agree = []"
            />
          </view>
        </view>

        <image
            class="close"
            mode="widthFix"
            src="https://yz-cache.oss-cn-shanghai.aliyuncs.com/js/yz-enjoylife-app/qyhywx/08291/%E5%85%B3%E9%97%AD.png"
            @click="$refs.checkConfirmDialog.close()"
        />
      </button>
    </uni-popup>

    <protection-policy
        ref="privacyDialog"
        :companyInfo="contentObj.companyInfo"
        :serviceNumber="contentObj.serviceNumber"
    ></protection-policy>

    <uni-popup ref="ruleDialog">
      <view class="rule-dialog">
        <view class="content">
          <view class="title"> 订购规则 </view>
          <view class="tip-title">一、订购须知</view>
          <view>1、本页面仅供客户购买权益，非用于鉴权登录等其他服务，老年及未成年人请谨慎消费，敬请知悉！</view>
          <view
          >2、为了您的权益保障，请注意核实订购规则及订单详情，不要轻信陌生人通过网络、电话、短信告知的信息，谨防网络电信诈骗。</view
          >

          <view class="tip-title">二、订购详情 </view>
          <view>1、产品名称：扫描大王专业版会员 </view>
          <view>2、计费方式：微信连续包月/月包</view>
          <view>3、资费：连续包月29.9元/月，月包35元</view>
          <view>4、首次在本页面成功开通扫描大王专业版会员服务（连续包月29.9元/月，月包35元）即可获赠以下权益：</view>
          <view
          >热门会员任选1；腾讯视频月卡、爱奇艺月卡、优酷月卡、芒果TV月卡、哔哩哔哩大会员月卡、埋堆堆视频月卡、搜狐视频月卡、网易云音乐月卡、酷我音乐月卡、酷狗豪华VIP月卡、喜马拉雅巅峰会员月卡、作业帮月卡、咪咕视频月卡、饿了么会员月卡、迅雷白金会员月卡、百度网盘超级月卡、夸克网盘月卡、WPS超级会员月卡、Keep会员月卡、七猫小说月卡、懒人听书月卡（可领取会员权益以实际开放为准）。
          </view>
          <view
          >注：“扫描大王专业版会员”每月自动发放。其他热门会员特权需登录【扫描大王会员服务】公众号领取。会员权益仅能领取到下单手机号，无法充值至其他账号；每个手机号每月同个权益只可领取一次。</view
          >
          <view class="tip-title">三、注意事项 </view>
          <view
          >1、每个手机号码仅限当月参与1次。权益领取成功后当月内不能进行退订、更改，视频、音频会员每月可领取，不可结转与转赠，当月不领取则视为自动放弃当月领取资格。
          </view>
          <view
          >2、本产品以及权益会根据实际运营情况适时调整，具体请以此权益领取页面实际显示及各权益提供方最新权益使用规则为准。</view
          >
          <view
          >3、如您需取消连续包月服务，即关闭自带续费功能步骤如下：点击微信右下角“我“-服务-钱包-支付设置-自动续费-点击对应项目
            -点击“关闭扣费服务”，即可进行退订解约，或关注微信【扫描大王会员服务】，联系客服进行退订处理。</view
          >
          <view> 4、本页面仅供客户购买权益，非用于鉴权登录等其他服务，老年及未成年人请谨慎消费，敬请知悉！</view>
          <view>
            5、为了您的权益保障，请注意核实订购规则及订单详情，不要轻信陌生人通过网络、电话、短信告知的信息，谨防网络电信诈骗。</view
          >
          <view>6、客服热线：4009986958</view>
        </view>

        <view class="close">
          <uni-icons color="#666666" type="closeempty" size="20" @click="$refs.ruleDialog.close()" />
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import protectionPolicy from '../../components/protectionPolicy.vue'
import $http from '@/hooks/http'
import { toSwich } from '@/hooks/utils'

export default {
  name: 'thswwx2Page',

  components: {
    protectionPolicy
  },

  data() {
    return {
      agree: ['1'],
      paramsObj: {
        mobile: '',
        url: '',
        user_agent: '',
        pt: null,
      },
      rid: undefined,
      hasRecodeWriteMobile: false,
      showLoginBoxVisible: false,
      checkedType: '1',
      contentObj: {
        companyInfo: {
          companyName: '长沙逍辉科技有限公司',
          companyAddress: '湖南省长沙市开福区浏阳河街道福元西路96号润和商业广场1栋-11栋及地下室5-15020',
          companyEmail: 'csxiaohui@163.com',
          updateDate: '2024年1月',
        },
        serviceNumber: '4009986958',
      },
      userAuthVisible: true,
      ph_a: '',
      spSign: {
        ChinaMobile: {
          APPID: '',
          SPSign: '',
          TraceID: '',
          TimeStamp: '',
        },
        ChinaTelecom: {
          APPID: '',
          SPSign: '',
          TraceID: '',
          TimeStamp: '',
        },
        ChinaUnicom: {
          APPID: '',
          SPSign: '',
          TraceID: '',
          TimeStamp: '',
        },
      },
      openid: null,
      networkType: 'mobile'
    };
  },

  onShareAppMessage() {
    return {
      title: '高清电子文档一键转换',
      imageUrl: 'https://hnenjoy.oss-cn-shanghai.aliyuncs.com/yichuangzhisao/share.png',
      path: '/pages/index/index',
    }
  },

  watch: {
    'paramsObj.mobile': {
      handler(value) {
        if (/^1[3456789]\d{9}$/.test(value)) {
          if (!this.hasRecodeWriteMobile) {
            this.recodeWriteMobileLog();
            this.hasRecodeWriteMobile = true;
          }
          //输入号码后直接拉起支付
          this.loginBuy();
        }
      },
    },
  },

  async onLoad(options) {
    this.$refs.checkConfirmDialog.open()
    this.getNetType()

    uni.showLoading({
      title: '加载中...',
      mask: true,
    })

    uni.login({
      success: (res) => {
        $http.post('api/user/auth/userauth/get_openid', {
          code: res.code,
          micro_appid: uni.getAccountInfoSync().miniProgram.appId,
          only_auth: true,
        }).then((res) => {
          this.openid = res.data
        })
      }
    })

    if (options?.rid) {
      this.rid = options.rid

      $http.post('https://api.xiaoohui.com/api/logs/enjoy/log', {
        rid: options.rid,
      }).then((res) => {
        this.paramsObj.user_agent = res.data.user_agent
        this.paramsObj.pt = res.data.pt
        this.paramsObj.url = res.data.url

        let pt = this.paramsObj.pt

        // 修改默认选择产品
        if (pt === 10 || pt === 12 || pt === 20 || pt === 40) {
          this.checkedType = '2';
        } else if (pt === 13 || pt === 14 || pt === 15 || pt === 23 || pt === 53 || pt === 43) {
          this.checkedType = '1';
        }

        $http.post('https://api.xiaoohui.com/api/logs/enjoy/log', {
          url: this.paramsObj.url,
          user_agent: this.paramsObj.user_agent,
          action: 'open_micro_app',
          network: this.networkType,
          rid: this.rid
        })
      }).finally(() => {
        uni.hideLoading()
      })
    } else {
      uni.hideLoading()

      uni.showModal({
        title: '提示',
        content: '缺少rid参数',
        showCancel: false
      })
    }
  },

  onUnload() {
  },

  methods: {
    recodeWriteMobileLog() {
      $http.post('https://api.xiaoohui.com/api/logs/enjoy/log', {
        url: this.paramsObj.url,
        user_agent: this.paramsObj.user_agent,
        action: 'write_mobile',
        mobile: this.paramsObj.mobile,
        network: this.networkType,
        rid: this.rid
      })
    },

    recodeMbAuthLog(log_data) {
      $http.post('https://api.xiaoohui.com/api/logs/enjoy/log', {
        url: this.paramsObj.url,
        user_agent: this.paramsObj.user_agent,
        action: 'mb_auth',
        mobile: this.paramsObj.mobile,
        network: this.networkType,
        log_data,
        rid: this.rid
      })
    },

    getNetType() {
      uni.getNetworkType({
        success: (res) => {
          if (res.networkType === 'wifi') {
            this.networkType = 'wifi'
          } else {
            this.networkType = 'mobile'
          }
        }
      })
    },

    loginBuy() {
      if (!this.agree.includes('1')) {
        uni.showToast({
          title: '请先阅读并同意协议',
          icon: 'none',
          mask: true,
        });

        return
      }

      if (!/^1[3456789]\d{9}$/.test(this.paramsObj.mobile)) {
        uni.showToast({
          title: '请输入正确的手机号码',
          icon: 'none',
          mask: true,
        });

        return;
      }

      uni.showLoading({
        title: '订购中...',
        mask: true
      })

      this.onPay()
    },

    onAgreeClick() {
      uni.showToast({
        title: '请先阅读并同意协议',
        icon: 'none',
        mask: true,
      });
    },

    getPhoneNumber(event) {
      this.$refs.checkConfirmDialog.close()

      if (event.detail.errMsg === 'getPhoneNumber:fail user deny') {
        this.recodeMbAuthLog('getPhoneNumber:fail user deny')
      } else if (event.detail.errMsg === 'getPhoneNumber:ok') {
        $http.post('https://api.xiaoohui.com/api/microapp/auth/getphone', {
          code: event.detail.code,
          appid: uni.getAccountInfoSync().miniProgram.appId
        }).then(res => {
          this.paramsObj.mobile = res.data
          this.recodeMbAuthLog('获取号码成功')
        })
      } else if (event.detail.errno === 1400001) {
        this.recodeMbAuthLog(event.detail.errMsg || '该功能使用次数已达当前小程序上限')
        uni.showModal({
          title: '提示',
          content: '该功能使用次数已达当前小程序上限，暂时无法使用，请手动填写手机号',
          showCancel: false,
          success: res => {
            if (res.confirm) {
            }
          }
        })
      }
    },

    getQueryParam(url, paramName) {
      // 定义正则表达式，用于匹配参数值
      const re = new RegExp('[?&]' + paramName + '=([^&#]*)', 'i');

      // 在 url 的 search 部分查找
      let match = url.replace(/^[^?]+/, '').match(re); // 提取 ? 后的部分再匹配

      // 如果没找到，在 hash 部分查找
      if (!match) {
        const hashMatch = url.match(/#.*$/);
        if (hashMatch) {
          match = hashMatch[0].replace(/\?.*$/, '').replace(/^#/, '?').match(re);
        }
      }

      // 返回解码后的结果或 null
      return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : null;
    },

    onPay() {
      if (this.checkedType === '1') {
        $http
            .post('https://api.xiaoohui.com/api/business/ali_sign/create_sign', {
              mobile: this.paramsObj.mobile,
              pt: this.paramsObj.pt,
              url: this.paramsObj.url,
              appid: uni.getAccountInfoSync().miniProgram.appId,
              system_type: uni.getDeviceInfo().platform === 'ios' ? 'ios' : 'android',
              openid: this.openid,
              user_agent: this.paramsObj.user_agent,
            })
            .then((res) => {
              let udata = this.getQueryParam(res.data, 'udata')
              let query = this.getQueryParam(udata, 'query')
              let orderNo = query.split('=')[1]

              uni.request({
                method: 'GET',
                url: `https://api.xiaoohui.com/api/business/ali_sign/au_order/${orderNo}`,
                success: (res) => {
                  uni.hideLoading()

                  if (res.data.code === 0 || res.data.Code === 0) {
                    let sign_order_no = res.header.sign_order_no

                    if (sign_order_no) {
                      uni.setStorageSync("sign_order_no", sign_order_no);
                    }

                    if (res.data.data.startsWith('http')) {
                      uni.navigateTo({
                        url: `/pages/webview/webview?src=${encodeURIComponent(res.data.data)}`,
                      });
                    } else {
                      let params = JSON.parse(res.data.data);
                      console.log(params, 'params');

                      uni.navigateToMiniProgram({
                        appId: 'wxbd687630cd02ce1d',
                        path: 'pages/index/index',
                        extraData: {
                          appid: params.appid,
                          contract_code: params.contract_code,
                          contract_display_account: params.contract_display_account,
                          mch_id: params.mch_id,
                          notify_url: params.notify_url,
                          plan_id: params.plan_id,
                          request_serial: params.request_serial,
                          timestamp: Number(params.timestamp),
                          sign: params.sign,
                          // return_web: params.return_web,
                          // version: params.version,
                        },
                        success(res) {
                          // 成功跳转到签约小程序
                          console.log(params, res, 'success');
                        },
                        fail(res) {
                          // 未成功跳转到签约小程序
                          console.log(res, 'fail');
                        },
                      });
                    }
                  } else {
                    uni.showToast({
                      title: res.data.msg || res.data.Msg,
                      icon: 'none',
                      mask: true
                    })
                  }
                },
                complete: () => {
                  uni.hideLoading();
                }
              })
            })
      } else {
        $http.post('api/user/order/pay/create', {
          product_id: 10000, // 单次包月
          pay_type: 12,
          system_type: uni.getDeviceInfo().platform === 'ios' ? 'ios' : 'android',
          micro_appid: uni.getAccountInfoSync().miniProgram.appId,
          openid: this.openid
        }).then((res) => {
          uni.hideLoading()
          let payInfo = JSON.parse(res.data)

          uni.requestPayment({
            ...payInfo,
            success: async (res) => {
              console.log('支付成功:', res);
              uni.showToast({
                title: '支付成功',
                icon: 'success',
                duration: 1500
              })

              await $http.get('api/user/auth/userauth/info?referch=1').catch(() => {})
              uni.hideLoading()

              setTimeout(() => {
                toSwich('/pages/my/index')
              }, 1500)
            },
            fail: (err) => {
              uni.hideLoading()
              uni.showToast({
                title: '支付取消',
                icon: 'none',
                duration: 1500
              })
              console.error('支付失败:', err);
            },
          })
        })
      }
    }
  },
};
</script>

<style lang="scss">
page {
  height: 100%;
  overflow: hidden;
}

.thswwx2-page {
  height: 100%;
  overflow: auto;

  .thswwx2-page-wrap {
    background: #fff url('https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/5062432/home_bg.png') top left/100% auto no-repeat;
    position: relative;

    .content-box {
      padding-top: 800rpx;
      padding-bottom: 80rpx;
      position: relative;
      z-index: 1;
      .phone-container {
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        display: flex;
        justify-content: space-around;
        margin-bottom: 40rpx;
      }

      @keyframes scrolling {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-100%);
        }
      }

      .phone {
        width: 600rpx;
        margin-right: 50rpx;
        padding: 0 20rpx;
        line-height: 42rpx;
        background: rgba(101, 12, 0, 0.6);
        opacity: 1;
        border-radius: 21rpx;
        font-size: 25rpx;
        color: #fff;
        text-align: center;
        display: inline-block; /* 水平排列 */
        animation: scrolling 10s linear infinite; /* 应用滚动动画，持续时间为10秒，线性变化无限次重复 */
      }

      .price-logo {
        text-align: center;
        padding: 0 0 22rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #fff;
        letter-spacing: 2rpx;
      }

      .login-box {
        width: 600rpx;
        margin: 0 auto;

        .finger-icon {
          width: 275rpx;
          height: 62rpx;
          margin: 0 0 -24rpx 36rpx;
        }

        input {
          height: 110rpx;
          width: 561rpx;
          margin: 0 auto 20rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff;
          border-radius: 70rpx;
          padding: 0 50rpx;
          font-size: 32rpx;

          .uni-input-placeholder {
            color: #999;
          }
        }

        .buy {
          position: relative;
          margin-bottom: 35rpx;

          .btn {
            width: 598rpx;
            height: 128rpx;
            animation: zoom 1s linear infinite;

            @keyframes zoom {
              0% {
                transform: scale(0.7);
              }

              50% {
                transform: scale(1);
              }

              100% {
                transform: scale(0.7);
              }
            }
          }

          .point {
            position: absolute;
            width: 168rpx;
            right: -40rpx;
            top: 60rpx;
            animation: zoom 1s linear infinite;

            @keyframes zoom {
              0% {
                transform: scale(0.7);
              }

              50% {
                transform: scale(1);
              }

              100% {
                transform: scale(0.7);
              }
            }
          }
        }

        .agree {
          font-size: 20rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #000;

          label {
            display: flex;

            checkbox {
              transform: scale(0.6);
              margin-top: -8rpx;

              // /deep/ .uni-checkbox-input {
              //   width: 21rpx;
              //   height: 21rpx;
              //   background: #ffc9bd;
              //   border-radius: 50%;
              //   border: 1px solid #000;
              //
              //   &:before {
              //     color: #ff434d;
              //   }
              // }
            }

            .agreement {
              text {
                // font-weight: bold;
              }
            }
          }
        }

        .mobile {
          padding-top: 15rpx;
          font-size: 24rpx;
          color: #fff;
          text-align: center;
        }
      }
      .check-type-box {
        position: relative;
        display: flex;
        justify-content: space-around;
        margin: 46rpx 0 0;
        // /deep/uni-radio {
        //   .uni-radio-input {
        //     background-color: rgba(255, 255, 255, 0.75) !important;
        //     border-color: rgba(255, 255, 255, 0.75) !important;
        //   }
        //   .uni-radio-input-checked {
        //     border: 1px solid #fff;
        //   }
        //   .uni-radio-input.uni-radio-input-checked {
        //     background-color: rgba(255, 255, 255, 1) !important;
        //     border-color: rgba(255, 255, 255, 1) !important;
        //   }
        //   .uni-radio-input.uni-radio-input-checked::before {
        //     color: rgba(255, 145, 95, 1) !important;
        //     font-size: 36rpx;
        //   }
        // }

        // /deep/ .checked-item {
        //   display: flex;
        //   align-items: center;
        //
        //   .uni-radio-input {
        //     width: 22rpx;
        //     height: 22rpx;
        //     position: relative;
        //     top: 2rpx;
        //   }
        //
        //   .item-text {
        //     color: rgba(255, 255, 255, 0.75);
        //     font-size: 26rpx;
        //     font-weight: 500;
        //     letter-spacing: 2rpx;
        //     background: none;
        //
        //     .price {
        //       font-weight: bold;
        //
        //       .size {
        //         font-size: 32rpx;
        //       }
        //     }
        //   }
        //   .activeColor {
        //     color: rgba(255, 255, 255, 1);
        //   }
        // }

        .recommend {
          position: absolute;
          top: -24rpx;
          left: 288rpx;
          width: 46rpx;
          height: 33rpx;
        }
      }
      .platform {
        padding: 0 20rpx;
        margin-top: 45rpx;
        text-align: center;

        image {
          width: 100%;
          display: block;
        }
      }

      .platform-box {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 0 30rpx;
        margin: 60rpx auto 0;
        position: relative;

        .buy-tip-content {
          color: #be2711;
          font-size: 22rpx;
          line-height: 40rpx;
          text-align: justify;

          .tip-title {
            font-size: 26rpx;
            font-weight: 500;
            line-height: 46rpx;
          }
        }
      }
    }
  }

  .bottom-login-box {
    position: fixed;
    bottom: 30rpx;
    left: 65rpx;
    right: 65rpx;
    z-index: 9;

    .buy {
      position: relative;

      .btn {
        width: 100%;
        animation: zoom 1s linear infinite;

        @keyframes zoom {
          0% {
            transform: scale(0.7);
          }

          50% {
            transform: scale(1);
          }

          100% {
            transform: scale(0.7);
          }
        }
      }

      .point {
        position: absolute;
        width: 168rpx;
        right: -40rpx;
        top: 60rpx;
        animation: zoom 1s linear infinite;

        @keyframes zoom {
          0% {
            transform: scale(0.7);
          }

          50% {
            transform: scale(1);
          }

          100% {
            transform: scale(0.7);
          }
        }
      }
    }
  }

  .privacy-dialog,
  .rule-dialog {
    .content {
      width: 590rpx;
      background: #ffffff;
      border-radius: 20rpx;
      padding: 40rpx;
      font-size: 24rpx;
      color: #333333;
      max-height: 80vh;
      overflow: auto;
      line-height: 1.8;

      .title {
        text-align: center;
        font-size: 32rpx;
        font-weight: bold;
        margin-bottom: 10rpx;
      }
    }

    .close {
      position: absolute;
      top: 5rpx;
      right: 10rpx;
    }
  }

  .check-confirm-dialog {
    position: relative;
    width: 680rpx;
    height: 880rpx;
    background: transparent;
    border: none;
    outline: none;

    &:after {
      display: none;
    }

    .check-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 680rpx;
      height: 580rpx;
      // background: url('https://hnenjoy.oss-cn-shanghai.aliyuncs.com/scantool/static/assets/5062432/bg1.png') left top/100% 100% no-repeat;
      background: #ffffff;
      border-radius: 20rpx;
      padding-top: 0;

      .agree-btn-box {
        position: relative;
        .agree-btn {
          width: 406rpx;
          height: 154rpx;
          margin: 60rpx 0 0;
          // animation: btn 1s linear infinite;

          @keyframes btn {
            0% {
              transform: scale(0.8);
            }

            50% {
              transform: scale(1);
            }

            100% {
              transform: scale(0.8);
            }
          }
        }
        .point {
          position: absolute;
          width: 88rpx;
          height: 88rpx;
          right: 20rpx;
          top: 100rpx;
          animation: btn 1s linear infinite;

          @keyframes btn {
            0% {
              transform: scale(0.8);
            }

            50% {
              transform: scale(1);
            }

            100% {
              transform: scale(0.8);
            }
          }
        }
      }

      .phone-tip {
        margin-top: 20rpx;
        font-size: 34rpx;
        line-height: 1;
      }

      .submit {
        width: 379rpx;
        height: 80rpx;
        background: #009BF4;
        border-radius: 15rpx;
        font-weight: 500;
        font-size: 40rpx;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 40rpx;
      }

      .agree {
        display: flex;
        align-items: center;
        color: #ffffff;
        margin-top: 70rpx;

        label {
          display: flex;

          checkbox {
            transform: scale(0.6);
            margin-right: 0;
            margin-top: -22rpx;
            // /deep/ .uni-checkbox-input {
            //   width: 36rpx;
            //   height: 36rpx;
            //   border: 2px solid #fff;
            //   background: #ef0927;
            //   border-radius: 50%;
            // }
          }

          .agreement {
            font-weight: 400;
            font-size: 20rpx;
            color: #111111;
          }
        }
      }
    }

    .close {
      position: absolute;
      top: 14rpx;
      right: 20rpx;
      width: 42rpx;
    }
  }
}
</style>

<style>
page {
  line-height: 1.4;
}

view,
scroll-view,
swiper,
swiper-item,
movable-area,
movable-view,
cover-view,
cover-image,
icon,
text,
rich-text,
progress,
button,
checkbox-group,
checkbox,
form,
input,
label,
picker,
picker-view,
radio-group,
radio,
slider,
switch,
textarea,
navigator,
functional-page-navigator,
image,
video,
camera,
live-player,
live-pusher,
map,
canvas,
open-data,
web-view,
ad {
  box-sizing: border-box;
}

button:after {
  border: none;
}

input,
textarea {
  text-align: justify;
  font-size: 24rpx;
}

textarea {
  width: 100%;
  overflow: auto;
}

image {
  width: auto;
  height: auto;
}
</style>