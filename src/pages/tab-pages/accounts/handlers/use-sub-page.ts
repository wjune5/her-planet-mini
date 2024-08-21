import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { useSubPageProvide } from '../../../index/handlers'

import type { User } from '@/api/interfaces/user'
import { accountApi } from '@/api/api/account';

export const useSubPage = () => {
  // 导航栏顶部的高度
  const navbarHeight = ref<number>(0);
  // 用户信息
  const userInfo = ref<User>()

  // 点击获取用户信息
  const loginHandle = () => {
    uni.showLoading({
      title: '登录中...',
      mask: true,
    })
    setTimeout(() => {
      uni.hideLoading()
      userInfo.value = {
        id: uni.$tm.u.getUid(100000, 6).toString(),
        name: '不吖',
        avatar: '',
        gender: 0,
        desc: '一个人',
        follower: 11,
        follow: 453,
        thumbs: 1456
      }
    }, 1500)
  }

  const tabs = ref([
    { key: '1', icon:'/static/me/icon-identity.png',title: '实名认证(暂不支持)' },
    { key: '2', icon:'/static/me/icon-security.png', title: '安全提示'},
    { key: '3', icon:'/static/me/icon-follow.png', title: '关注我们'},
    { key: '4',  icon:'/static/me/icon-agreement.png',title: '用户协议'},
    { key: '5', icon:'/static/me/icon-collaboration.png', title: '合作'},
    { key: '6', icon:'/static/me/icon-account.png', title: '账号管理'},
  ])
  // 跳转到个人信息页面
  const goUserInfoPage = () => {
    console.log(userInfo.value)
    if(!userInfo.value||!userInfo.value.id) {
      loginHandle();
      return;
    }
    uni.$tm.u.routerTo('/subpages/user-info/index')
  }

  // 跳转到常见问题页面
  const goCommonProblemPage = () => {
    uni.$tm.u.routerTo('/subpages/common-problem/index')
  }

  const goSetting = () => {
    uni.$tm.u.routerTo('/subpages/account/setting/setting')
  }

  const handleWxLogin = () => {
    uni.login({
      provider: 'weixin',
      onlyAuthorize:true,
      success: function (loginRes) {
        console.log(loginRes.code);
        // uni.getUserProfile({
        //   desc:'用于设置头像、昵称',
        //   lang: 'zh_CN',
        //   success: (userRes) => {
        //     console.log(userRes)
        //     // 登录后台
        //   }
        // })
        accountApi.login({code:loginRes.code});
      },
      fail:function (err) {
        uni.$tm.u.toast('获取登录code失败，请稍后再试~');
      }
    });
  }
  onLoad(() => {
    userInfo.value = {
      name: '授权登录',
      avatar: 'https://resource.tuniaokj.com/images/avatar/xiong.jpg',
      gender: 0,
      follower: 0,
      follow: 0,
      thumbs: 0
    }
  })
  // 顶到导航栏初始化完毕
  const navbarInitFinishHandle = (barHeight: number) => {
    navbarHeight.value = barHeight
  }
  useSubPageProvide(4)

  return {
    tabs,
    userInfo,
    navbarHeight,
    loginHandle,
    goUserInfoPage,
    goCommonProblemPage,
    navbarInitFinishHandle,
    goSetting,
    handleWxLogin
  }
}
