<template>
  <tm-app>
    <tm-navbar title="选择城市" hide-home></tm-navbar>
    <tm-indexes>
      <tm-indexes-item title="热门热门" navTitle="热">
        <view class="my-10 flex flex-row flex-wrap" style="height: 150rpx">
          <tm-tag outlined label="北京"></tm-tag>
          <tm-tag outlined label="南昌"></tm-tag>
          <tm-tag outlined label="长沙"></tm-tag>
          <tm-tag outlined label="广东"></tm-tag>
          <tm-tag outlined label="福建"></tm-tag>
          <tm-tag outlined label="安徽"></tm-tag>
          <tm-tag outlined label="长沙"></tm-tag>
          <tm-tag outlined label="广东"></tm-tag>
          <tm-tag outlined label="福建"></tm-tag>
          <tm-tag label="安徽"></tm-tag>
        </view>
      </tm-indexes-item>
      <tm-indexes-item
        :title="index % 10 == 0 ? index : ''"
        :navTitle="index"
        v-for="(item, index) in 60"
        :key="index"
      >
        <view class="my-16">
          <tm-text :label="'想要什么的.-' + index"></tm-text>
        </view>
      </tm-indexes-item>
    </tm-indexes>
  </tm-app>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import tmIndexesItem from "@/tmui/components/tm-indexes-item/tm-indexes-item.vue";
import tmIndexes from "@/tmui/components/tm-indexes/tm-indexes.vue";
import { useWindowInfo } from "@/tmui/tool/useFun/useWindowInfo";
import { useArea } from "./use-area";
const { areaList, secondList, l1AreaHandle } = useArea();
const sysinfo = useWindowInfo();
const active = ref(0);
</script>
