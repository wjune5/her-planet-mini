<template>
  <tm-app color="#F5F5F5">
    <tm-navbar hide-home hide-back title="她的地图"></tm-navbar>
    <block v-for="(item, index) in cards" :key="index">
      <tm-sheet
        :transparent="false"
        color="#ffffff"
        :round="8"
        :margin="[24, 24, 24,0]"
        :padding="[32, 32]"
        :shadow="4"
      >
        <tm-text
          :font-size="32"
          color="#1F1F1F"
          :label="item.title"
          _class="pb-12"
        ></tm-text>
        <tm-text :label="item.description" color="#767474"></tm-text>

        <view class="flex flex-end pt-32">
          <tm-button
            :round="20"
            icon="tmicon-plus"
            :font-color="item.state?'button-font-black':'white'"
            size="small"
            :disabled="!item.state"
            disabled-color="light-green"
            label="添加"
            @click="handleAdd(index)"
          ></tm-button>
        </view>
      </tm-sheet>
    </block>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance, computed, watch } from "vue";
import { onShow, onLoad, onInit } from "@dcloudio/uni-app";
import { language } from "@/tmui/tool/lib/language";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import { useSubPage } from "./handlers/index.ts";

const { cards,handleAdd } = useSubPage();
const list = ref([]);
const post = ref({
  rate: 0,
});
//===================
const properties = [
  {
    url: "../changyong/index",
    name: "评分",
    icon: "tmicon-layergroup-fill",
    title: "index.com.tongyong",
    type: "rate",
  },
];

const radiolist = ref(undefined);
function checkRate() {
  // return new Promise((res) => {
  if (radiolist._value == "black" && post.value.rate >= 3) {
    return false;
  } else if (radiolist._value == "white" && post.value.rate < 3) {
    return false;
    // res(false);
  }

  return true;
  // res(true);
  // });
}
// watch([() => props.color], () => {
// })
const area_show = ref(false);
function showArea() {
  area_show.value = true;
}
const areaList = ref([
  {
    name: "科研",
    id: "1",
    children: [
      {
        id: "12",
        name: "导师",
      },
      {
        id: "133",
        name: "学校",
      },
    ],
  },
  { name: "餐食", id: "2", children: [] },
  { name: "住房", id: "3", children: [] },
  {
    name: "穿着",
    id: "4",
    children: [],
    extra: { icon: "tmicon-md-chatboxes" },
  },
  { name: "出行", id: "5", children: [] },
  { name: "动物", id: "6", children: [] },
]);
const area = ref([]);
const areaStr = "";
const textCascader = ref<InstanceType<typeof tmCascader> | null>(null);
function loadL2Area(level: any) {
  let test = [
    // {
    //   name: "导师",
    // },
    // {
    //   name: "学校",
    // },
  ];
  if (!test) {
    return new Promise((res) => {
      areaList.value[level.index].children = test;
      // dlist.value =test
      uni.showLoading({ title: "..." });
      setTimeout(function () {
        uni.hideLoading();
        textCascader.value?.reFresh();
        res(true);
      }, 800);
    });
  } else {
    return;
  }
}
function onStart() {}
function completeFile() {}
</script>

// #ifdef MP-WEIXIN
<script lang="ts">
export default {
  options: {
    // 在微信小程序中将组件节点渲染为虚拟节点，更加接近Vue组件的表现(不会出现shadow节点下再去创建元素)
    virtualHost: true,
  },
};
</script>
// #endif
