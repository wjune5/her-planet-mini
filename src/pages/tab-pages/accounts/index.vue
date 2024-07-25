<template>
  <tm-app>
    <view class="fixed top-bg">
      <tm-image
        src="/static/me/header.png"
        model="widthFix"
        :width="sysinfo.width"
        :height="400"
        unit="px"
        _class="background-image"
      ></tm-image>
    </view>
    <!-- 用户信息 -->
    <view class="user-info my-24" @tap.stop="goUserInfoPage">
      <view class="info-content">
        <view class="info-avatar">
          <tm-avatar
            :round="26"
            outlined
            :border="4"
            color="#ffffff"
            :size="160"
            :margin="[80, 0, 0, 0]"
            :img="userInfo?.avatar || '/static/me/default-avatar.png'"
          ></tm-avatar>
        </view>

        <view class="content">
          <tm-text :font-size="38" _class="mb-12 font-bold-light">{{
            userInfo?.name || "Hey"
          }}</tm-text>
          <view class="uid">
            <tm-text :font-size="28" color="#979797">uid: {{ userInfo?.id }}</tm-text>
          </view>
        </view>
      </view>
      <!-- 列表 -->
      <view class="ma-16">
        <tm-cell
          :margin="[0, 0]"
          showAvatar
          :avatar="item.icon"
          :avatar-size="40"
          :avatar-round="0"
          title-color="#202020"
          :titleFontSize="28"
          :title="item.title"
          v-for="(item, index) in tabs"
          :key="index"
        ></tm-cell>
      </view>
    </view>

    <view class="footer">
      <!-- <tm-text label="提供技术支持" /> -->
    </view>
  </tm-app>
</template>
<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { language } from "@/tmui/tool/lib/language";
import { useSubPage } from "./handlers";
import { useWindowInfo } from "@/tmui/tool/useFun/useWindowInfo";
const {
  tabs,
  userInfo,
  navbarHeight,
  loginHandle,
  goUserInfoPage,
  goCommonProblemPage,
  goMemberRightsPage,
  goOrderListPage,
  navbarInitFinishHandle,
  goSetting,
} = useSubPage();
const sysinfo = useWindowInfo();

const left_show = ref(false);
function showLeft() {
  left_show.value = true;
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
/* 顶部背景图 start */
.top-bg {
  top: 0px;
  z-index: 0;
  left: 0rpx;
  height: 400rpx;

  .background-image {
    width: 100%;
    height: 100%;
  }
}

/* 顶部背景图 end */
.font-bold-light {
  font-weight: 400;
}
</style>
