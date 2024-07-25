<template>
  <tm-app>
    <tm-cell
      show-avatar
      :avatar="item.createUser.avatar"
      :title="item.createUser.name"
      :label="item.content"
      v-for="(item, index) in dataList"
      :key="index"
    ></tm-cell>
  </tm-app>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, computed, inject } from "vue";
import { onShow, onLoad, onInit } from "@dcloudio/uni-app";

import { useWindowInfo } from "@/tmui/tool/useFun/useWindowInfo";
import { useSubPage } from "./use-detail";
import { SettingConfig } from "@/api/constants/index.ts";
import { Post } from "@/api/interfaces/post";

const { dataList } = useSubPage();
</script>
