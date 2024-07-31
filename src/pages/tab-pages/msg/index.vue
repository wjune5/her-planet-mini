<template>
  <tm-app>
    <view class="fixed top-bg">
      <tm-image
        src="/static/msg/collection.png"
        model="widthFix"
        :width="sysinfo.width"
        :height="400"
        unit="px"
        _class="background-image"
      ></tm-image>
    </view>
    <view class="info-content">
      <tm-tabs
        transparent
        showTabsLineAni
        :showTabsLine="false"
        align="center"
        :list="tabs"
        :item-width="180"
        :width="_widthRpx"
        :item-font-size="32"
        :active-font-size="32"
        default-name="2"
        color="#ffffff"
        tabsLineAniColor="#FF6B30"
        activeFontColor="#1F1F1F"
        unSelectedColor="#767676"
      ></tm-tabs>
      <tm-virtual-list
        :load="getdata"
        :width="_widthRpx"
        :height="_heightRpx"
        :data="imglist"
        :itemHeight="200"
      >
        <template v-slot:default="{ data }">
          <view
            style="height: 200rpx; width: 100%"
            v-for="(item, index) in data"
            :key="index"
          >
            <tm-sheet
              :round="12"
              color="#F8F8F8"
              :width="_widthRpx - 112"
              :height="130"
              :padding="[24, 32]"
              :margin="[28, 12]"
              @click="goDetail(item.id)"
            >
              <view class="flex flex-row flex-row-center-start">
                <tm-image
                  :width="130"
                  :height="130"
                  :src="item.src"
                  :round="8"
                  _class="flex-1"
                ></tm-image>
                <view
                  class="flex flex-col flex-4 pl-24 flex-col-top-start"
                  style="position: relative"
                >
                  <tm-text
                    label="水水水水发的风格哈"
                    :font-size="28"
                    color="#3D3D3D"
                  ></tm-text>
                  <view style="min-height: 60rpx">
                    <tm-tag
                      v-for="(titem, tidx) in item.tags"
                      :key="tidx"
                      size="xs"
                      text
                      :label="`hello${tidx}`"
                    ></tm-tag>
                  </view>
                  <view class="flex flex-row flex-row-center-between" style="width: 100%">
                    <view class="flex flex-row flex-row-center-start">
                      <tm-text label="东城区" :font-size="28" color="#767474"></tm-text>
                      <tm-divider vertical :height="20"></tm-divider>
                      <tm-text label="住宿" :font-size="28" color="#767474"></tm-text>
                    </view>
                    <view class="flex flex-row flex-row-center-end flex-1">
                      <tm-image
                        src="/static/msg/distance.png"
                        :height="24"
                        :width="24"
                      ></tm-image>
                      <tm-text label="距离" :font-size="28" color="#767474"></tm-text>
                    </view>
                  </view>
                </view>
              </view>
            </tm-sheet>
          </view>
        </template>
      </tm-virtual-list>
    </view>
  </tm-app>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
1;
import { useWindowInfo } from "@/tmui/tool/useFun/useWindowInfo";
import { useSubPage } from "./handlers/index.ts";

const sysinfo = useWindowInfo();
const { tabs, goDetail, handleTabsChange } = useSubPage();
const _widthRpx = computed(() => uni.$tm.u.torpx(sysinfo.width));
const _heightRpx = computed(() => uni.$tm.u.torpx(sysinfo.height - 300));

const imglist = ref([]);
const test = ref("");
const getdata = (e: string) => {
  return new Promise((res, rej) => {
    setTimeout(function () {
      if (e == "top") {
        imglist.value = [];
        for (let i = 0; i < 10; i++) {
          imglist.value.push({
            src:
              "https://i0.pickpik.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg",
            tags: ["hello"],
            index: i,
          });
        }
      } else if (e == "bottom") {
        let len = imglist.value.length;
        for (let i = len; i < 10 + len; i++) {
          imglist.value.push({
            src:
              "https://i0.pickpik.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg",
            tags: [],
            index: i,
          });
        }
      }
      res(true);
    }, 1000);
  });
};
</script>
<style lang="scss" scoped>
/* 顶部背景 start */
.top-bg {
  position: fixed;
  top: 0rpx;
  left: 0rpx;
  .background-image {
    width: 100%;
    height: 100%;
    // z-index: -1;
  }
}
/* 顶部背景 end */
.info-content {
  position: relative;
  margin-top: 300rpx;
  padding-top: 40rpx;
  border-radius: 40rpx 40rpx 0rpx 0rpx;
  background-color: #ffffff;
  width: 100%;
  height: 1180rpx;
}
.flex-col-center-between {
  justify-content: space-between !important;
  align-items: center !important;
  /* #ifndef APP-PLUS-NVUE */
  align-content: center;
  /* #endif */
  display: flex !important;
}
</style>
