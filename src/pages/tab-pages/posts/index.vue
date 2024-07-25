<template>
  <tm-app>
    <tm-navbar title="探索" hide-home hide-back> </tm-navbar>
    <view
      class="flex flex-col flex-col-center-center"
      :style="`height:${sysinfo.height - 100}px`"
    >
      <tm-image src="/static/nothing.png" :width="240"></tm-image>

      <tm-text label="敬请期待"></tm-text>
      <tm-text label="功能正在开发中..." color="#767474"></tm-text>
    </view>
  </tm-app>
</template>
<script lang="ts" setup>
import { useWindowInfo } from "@/tmui/tool/useFun/useWindowInfo";

const sysinfo = useWindowInfo();
</script>
