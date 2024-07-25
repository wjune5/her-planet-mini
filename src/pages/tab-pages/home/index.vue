<template>
  <tm-app>
    <view class="fixed top-bg">
      <tm-image
        src="/static/home/home-header.png"
        model="widthFix"
        :width="sysinfo.width"
        :height="400"
        unit="px"
        _class="background-image"
      ></tm-image>
    </view>
    <view style="margin-top: 202rpx; z-index: 99">
      <tm-sheet
        :margin="[16, 24]"
        :padding="[40, 22]"
        :round="26"
        :width="sysinfo.width - 96"
        :height="64"
        unit="px"
        text
        color="grey-4"
        _style="transition:border 0.24s;"
        _class="flex flex-row"
      >
        <view class="flex flex-row flex-row-center-start" style="line-height: 40rpx">
          <view class="flex flex-row flex-row-center-start" @click="handleCitySelect">
            <tm-text
              :label="selectedArea"
              :font-size="28"
              color="#3D3D3D"
              _class="mr-24"
            ></tm-text>
            <tm-icon name="tmicon-angle-down" :font-size="24" color="#959494"></tm-icon>
          </view>

          <tm-icon
            name="tmicon-search"
            :font-size="24"
            _class="ml-24"
            color="#959494"
          ></tm-icon>
          <tm-text
            @click="goSearch"
            label="搜索身边的女性友好空间"
            color="#959494"
            _class="ml-24"
          ></tm-text>
        </view>
      </tm-sheet>
      <tm-tabs
        transparent
        @change="handleTabsChange"
        :list="tabs"
        :width="_widthRpx"
        :height="56"
        :item-height="56"
        :item-round="26"
        :item-margin="16"
        default-name="1"
        color="#FFFFFF"
        itemModel="card"
        activeColor="#9EEA40"
        activeFontColor="#36590B"
        unSelectedColor="#979797"
      >
      </tm-tabs>
    </view>
    <map
      class="fixed"
      style="top: 0; left: 0; height: 100vh; z-index: 2"
      :style="`width:${sysinfo.width}px`"
      :latitude="curLocation.latitude"
      :longitude="curLocation.longitude"
      :markers="markers"
      show-location
      @regionchange="handleRegionChange"
    >
      <view class="absolute" style="right: 20px; bottom: 550rpx">
        <tm-image :width="80" :height="80" src="/static/home/locate.png"></tm-image>
      </view>
    </map>
    <view class="fixed bottom-bg" @click="explore_show = true">
      <tm-image
        src="/static/home/go.png"
        model="widthFix"
        :width="sysinfo.width"
        :height="400"
        unit="px"
        _class="background-image"
      ></tm-image>
    </view>
    <tm-drawer
      ref="calendarView"
      placement="bottom"
      :height="_height"
      closeable
      v-model:show="explore_show"
    >
      <tm-tabs
        rang-key="label"
        @change="handleTypeChange"
        :list="typeTabs"
        align="around"
        :width="_widthRpx"
        :height="56"
        default-name="1"
        :item-round="26"
        transparent
        itemModel="card"
        activeColor="sec-tab"
        activeFontColor="white"
      >
      </tm-tabs>
      <tm-virtual-list
        :load="getdata"
        :width="_widthRpx"
        :height="_height"
        :data="dataList"
        :itemHeight="160"
      >
        <template v-slot:default="{ data }">
          <tm-sheet
            :round="12"
            color="#F8F8F8"
            :width="_widthRpx - 112"
            :padding="[24, 32]"
            :margin="[28, 12]"
            v-for="(item, index) in data"
            :key="index"
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
                <tm-text label="大米旗舰店" :font-size="28" color="#3D3D3D"></tm-text>
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
        </template>
      </tm-virtual-list>
    </tm-drawer>

    <tm-city-picker
      v-model:show="city_show"
      v-model="selectedCity.arr"
      v-model:model-str="selectedCity.str"
    ></tm-city-picker>
  </tm-app>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, computed, inject } from "vue";
import { onShow } from "@dcloudio/uni-app";

import { useWindowInfo } from "@/tmui/tool/useFun/useWindowInfo";
import { useSubPage } from "./handlers/index.ts";
import { SettingConfig, Area } from "@/api/constants/index.ts";
import { Post } from "@/api/interfaces/post";

const {
  dataList,
  tabs,
  explore_show,
  city_show,
  handleTabsChange,
  goDetail,
  handleCitySelect,
  typeTabs,
  handleTypeChange,
  curLocation,
  selectedArea,
  markers,
  handleRegionChange,
  selectedCity,
} = useSubPage();

const _widthRpx = computed(() => uni.$tm.u.torpx(sysinfo.width));
const _height = computed(() => uni.$tm.u.torpx(sysinfo.height - 180));

const sysinfo = useWindowInfo();
const isList = ref(uni.$tm.u.getCookie(SettingConfig));

onShow(() => {
  isList.value = uni.$tm.u.getCookie(SettingConfig);
});
// const imglist = ref([]);
const getdata = (e: string) => {
  return new Promise((res, rej) => {
    setTimeout(function () {
      if (e == "top") {
        dataList.value = dataList.value;
        // for (let i = 0; i < 10; i++) {
        //   imglist.value.push({
        //     src: "https://i0.pickpik.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg",
        //     index: i,
        //   });
        // }
      }
      // else if (e == "bottom") {
      //   let len = imglist.value.length;
      //   for (let i = len; i < 10 + len; i++) {
      //     imglist.value.push({
      //       src: "https://i0.pickpik.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg",
      //       index: i,
      //     });
      //   }
      // }
      res(true);
    }, 2500);
  });
};
const wall = ref<InstanceType<typeof tmWaterfall> | null>(null);
const imglist = ref([
  {
    img:
      "https://images.pexels.com/photos/12640459/pexels-photo-12640459.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    text: "带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套",
    price: "12.8",
    num: "1500+",
  },
  {
    img:
      "https://gw.alicdn.com/bao/uploaded/i4/1026973813/O1CN014Kirba1e2OrHg7gwN_!!1026973813.jpg_320x320q90.jpg",
    text: "带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套",
    price: "12.8",
    num: "1500+",
  },
  {
    img:
      "https://gw.alicdn.com/imgextra/i3/23844911/O1CN01N1UxMS1m9Hs6gGu6E_!!23844911-0-alimamacc.jpg",
    text: "",
    price: "200",
    num: "3000+",
  },
  {
    img:
      "https://gw.alicdn.com/bao/uploaded/i4/2418392409/O1CN01zT4JbA1TfMoU30Uub_!!2418392409.jpg_320x320q90.jpg",
    text: "50枚挂耳咖啡滤袋日本材质手冲咖啡滤纸咖啡粉滤袋挂耳咖啡袋包邮",
    price: "12.8",
    num: "1500+",
  },
  {
    img:
      "https://gw.alicdn.com/bao/uploaded/i2/6000000001207/O1CN016TztFg1Kmqqrtarb0_!!6000000001207-0-picassoopen.jpg_320x320q90.jpg",
    text: "带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套",
    price: "12.8",
    num: "1500+",
  },
  {
    img:
      "https://gw.alicdn.com/bao/uploaded/i3/2200531292142/O1CN01gFUdOw1Rh4vjN44sB_!!0-item_pic.jpg_320x320q90.jpg",
    text: "带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套",
    price: "12.8",
    num: "1500+",
  },
]);

function itemClick() {
  uni.navigateTo({
    url: "tree",
  });
}
function goArea() {
  uni.$tm.u.routerTo("/subpages/post/area/area");
}
function goSearch() {
  uni.$tm.u.routerTo("/subpages/post/search/search");
}
function goPostDetail(id: string) {
  uni.$tm.u.routerTo("/subpages/post/detail?id=" + id);
}
const operations = ref([
  {
    key: "report",
    text: "举报",
  },
  {
    key: "hate",
    text: "拉黑",
  },
]);
const operation_show = ref(false);
function showOperation(item: Post) {
  operation_show.value = true;
  operation_obj.value = item;
}
const operation_obj = ref();
function doOperation(e) {
  console.log(e);
  if (e.key == "report") {
    // report
  }
}
</script>
<style lang="scss" scoped>
/* 顶部背景 start */
.top-bg {
  top: 0rpx;
  left: 0rpx;
  height: 400rpx;
  z-index: 9;
  .background-image {
    width: 100%;
    height: 100%;
    // z-index: -1;
  }
  // width: 100%;
  // z-index: 0;
  // background: url("/static/home/home-header.png") no-repeat;
  // background-size: 100% auto;
  // &::before {
  //   content: "";
  //   display: block;
  //   padding-top: 100%;
  // }
}
/* 顶部背景 end */
// .bottom-bg {
//   position: fixed;
//   bottom: 0rpx;
//   left: 0rpx;
//   width: 100%;
//   z-index: 0;
//   background: url("/static/home/go.png") no-repeat;
//   background-size: 100% auto;
//   &::before {
//     content: "";
//     display: block;
//     padding-top: 100%;
//   }
//   .backgroud-image {
//     width: 100%;
//     height: 450rpx;
//     // z-index: -1;
//   }
// }

.bottom-bg {
  height: 400rpx;
  bottom: 100rpx;
  z-index: 9;

  .background-image {
    width: 100%;
    height: 100%;
    // z-index: -1;
  }
}
</style>
