<template>
  <tm-app>
    <view class="page">
      <view
        v-if="pageStatus[0]"
        class="page__container"
        :style="pageContainerStyle(0)"
      >
        <scroll-view
          class="scroll-view"
          scroll-y
          @scroll="scrollViewScrollHandle"
          ><Home placeholderBottom />
        </scroll-view>
      </view>
      <view
        v-if="pageStatus[1]"
        class="page__container"
        :style="pageContainerStyle(1)"
      >
        <scroll-view
          class="scroll-view"
          scroll-y
          @scroll="scrollViewScrollHandle"
        >
          <Square placeholderBottom />
        </scroll-view>
      </view>
      <view
        v-if="pageStatus[2]"
        class="page__container"
        :style="pageContainerStyle(2)"
      >
        <scroll-view
          class="scroll-view"
          scroll-y
          @scroll="scrollViewScrollHandle"
        >
          <Add placeholderBottom />
        </scroll-view>
      </view>
      <view
        v-if="pageStatus[3]"
        class="page__container"
        :style="pageContainerStyle(3)"
      >
        <scroll-view
          class="scroll-view"
          scroll-y
          @scroll="scrollViewScrollHandle"
        >
          <Messages placeholderBottom />
        </scroll-view>
      </view>
      <view
        v-if="pageStatus[4]"
        class="page__container"
        :style="pageContainerStyle(4)"
      >
        <scroll-view
          class="scroll-view"
          scroll-y
          @scroll="scrollViewScrollHandle"
        >
          <Accounts placeholderBottom />
        </scroll-view>
      </view>
    </view>

    <tm-tabbar
      transparent
      :autoSelect="false"
      v-model:active="currentTabbarIndex"
      @change="onTabbarChange"
    >
      <tm-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :btn-top="index==2"
        :icon-size="index!=2?48:120"
        :text="item.text"
        :icon="item.icon"
        :unicon="item.unicon"
        active-color="#1F1F1F"
        @click="currentTabbarIndex = index"
      ></tm-tabbar-item>
    </tm-tabbar>
  </tm-app>
</template>

<script lang="ts" setup>
import {
  ref,
  getCurrentInstance,
  computed,
  provide,
  reactive,
  inject,
  nextTick,
} from "vue";
import { onShow, onLoad, onInit } from "@dcloudio/uni-app";
import { language } from "@/tmui/tool/lib/language";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { useOrderedChildren } from "@/tn/hooks/use-ordered-children";
import { indexPageContextKey } from "../tokens";
import type { IndexSubPageContext } from "../tokens";

import Home from "../tab-pages/home/index.vue";
import Square from "../tab-pages/posts/index.vue";
import Add from "../tab-pages/add/index.vue";
import Accounts from "../tab-pages/accounts/index.vue";
import Messages from "../tab-pages/msg/index.vue";

const {
  children: items,
  addChild: addItem,
  removeChild: removeItem,
} = useOrderedChildren<IndexSubPageContext>();
const store = useTmpiniaStore();

store.setTmVuetifyTheme("green")

// 导航栏数据
const tabbarData: TabbarData = [
  {
    text: "地图",
    unicon: "/static/tabbar/icon-24-ditu-unsel2x.png",
    icon: "/static/tabbar/icon-24-ditu-se2x.png",
  },
  {
    text: "探索",
    unicon: "/static/tabbar/icon-24-tansuo-unsel2x.png",
    icon: "/static/tabbar/icon-24-tansuo-sel2x.png",
  },
  {
    text: '',
    icon: "/static/tabbar/Group314-2x.png"
  },
  {
    text: "信息",
    unicon: "/static/tabbar/icon-24-xinxi-unsel2x.png",
    icon: "/static/tabbar/icon-24-xinxi-sel2x.png",
  },
  {
    text: "我的",
    unicon: "/static/tabbar/icon-24-wode-unsel2x.png",
    icon: "/static/tabbar/icon-24-wode-sel2x.png",
  },
];
// 导航切换事件
const onTabbarChange = (index: string | number) => {
  if (!pageStatus.value?.[index as number]) {
    pageStatus.value[index as number] = true;
    nextTick(() => {
      items.value?.[index as number]?.onLoad?.();
    });
  }

  items.value?.[index as number]?.onShow?.();
};

// 记录每个子页面的状态
const pageStatus = ref(Array.from({ length: tabbarData.length }, () => false));

// 当前选中的子页面的索引
const currentTabbarIndex = ref<number>(-1);

// pageContainer的样式
const pageContainerStyle = computed<(index: number) => CSSProperties>(() => {
  return (index: number) => {
    const style: CSSProperties = {};

    if (index !== currentTabbarIndex.value) {
      style.display = "none";
    }

    return style;
  };
});

// 根据index查找对应的页面
const _findPageByIndex = (index: string | number) => {
  return items.value.find((item) => item.index === index);
};
// 处理页面对应scroll-view滚动事件
const scrollViewScrollHandle = (event: any) => {
  const { scrollTop, scrollLeft } = event.detail;
  _findPageByIndex(currentTabbarIndex.value)?.onScroll?.({
    top: scrollTop,
    left: scrollLeft,
  });
};

onLoad((options: any) => {
  // #ifdef MP-WEIXIN

  // 在页面中定义插屏广告
  let interstitialAd = null;

  // 在页面onLoad回调事件中创建插屏广告实例
  //   if (wx.createInterstitialAd) {
  //     interstitialAd = wx.createInterstitialAd({
  //       adUnitId: "adunit-197d1e1914ce88ec",
  //     });
  //     interstitialAd.onLoad(() => {});
  //     interstitialAd.onError((err) => {});
  //     interstitialAd.onClose(() => {});
  //   }
  //   // 在适合的场景显示插屏广告
  //   if (interstitialAd) {
  //     interstitialAd.show().catch((err) => {
  //       console.error(err);
  //     });
  //   }
  // #endif
  // 获取当前进入的子页面的索引
  const index = Number(options?.index || 0);
  // 设置当前子页面的状态为true
  pageStatus.value[index] = true;
  nextTick(() => {
    currentTabbarIndex.value = index;
    setTimeout(() => {
      // 执行子页面的onLoad钩子
      items.value?.[index]?.onLoad?.();
    }, 50);
  });
});

provide(
  indexPageContextKey,
  reactive({
    items,
    addItem,
    removeItem,
  })
);

const proxy = getCurrentInstance()?.proxy ?? null;
const proxyw = getCurrentInstance();

const msg = ref<InstanceType<typeof tmMessage> | null>(null);
const sysinfo = uni.$tm.u.getWindow();
const str = ref("");

const headerBgColor = computed(() => {
  if (store.tmStore.dark) {
    return [];
  }
  return store.tmStore.color ? [] : ["#f5f5f5", "#f5f5f5"];
});
const tmuiVer = "TMUI 3.1.09";

// ======== tabbar

//===================

function search() {
  if (str.value.trim() === "") {
    msg.value?.show({
      model: "error",
      text: "不能为空",
      mask: true,
    });
    return;
  }
  uni.navigateTo({
    url: "search?key=" + str.value,
  });
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
