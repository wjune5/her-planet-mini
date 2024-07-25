<template>
  <tm-app color="white">
    <!-- <tm-navbar title="" hide-home transparent> </tm-navbar> -->
    <!-- <view class="flex flex-col flex-col-center-center" style="height: 100vh"> -->
    <tm-sheet
      :margin="[16, 8]"
      :padding="[24, 12]"
      :round="12"
      text
      :width="sysinfo.width"
      color="grey-4"
      _style="transition:border 0.24s"
      @click="goSearch"
    >
      搜索
    </tm-sheet>
    <tm-segtab
      :round="24"
      :width="666"
      :list="list"
      defaultValue="1"
    ></tm-segtab>
    <!-- </view> -->
    <view
      class="flex flex-row flex-row-center-between ma-24 border-b-1"
      v-for="(item, index) in rankings"
      :key="index"
    >
      <view class="flex flex-row flex-row-center-start">
        <tm-text :label="index + 1"></tm-text>
        <tm-text _class="pl-24" :label="item.name"></tm-text>
      </view>
    </view>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, computed, inject } from "vue";
import { onShow, onLoad, onInit } from "@dcloudio/uni-app";
import { useWindowInfo } from "@/tmui/tool/useFun/useWindowInfo";
const sysinfo = useWindowInfo();

const list = ref([
  { text: "黑", id: "1" },
  { text: "白", id: "2" },
]);
const rankings = ref([
  {
    name: "你好",
  },{
    name: "你好",
  },{
    name: "你好",
  },{
    name: "你好",
  },{
    name: "你好",
  },{
    name: "你好",
  },
]);
const add_show = ref(false);
function openAdd() {
  add_show.value = true;
}

function goSearch() {
  uni.$tm.u.routerTo("/subpages/post/search/search");
}
</script>
