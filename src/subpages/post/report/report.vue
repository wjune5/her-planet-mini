<template>
  <tm-navbar :title="language('post.report')"> </tm-navbar>
  <tm-radio-group
    direction="customCol"
    v-model="radiolist"
    :defaultValue="radiolist"
  >
    <tm-radio
      v-for="(item, index) in dataList"
      outlined
      :value="item.id"
      :label="item.name"
    ></tm-radio>
  </tm-radio-group>
  <tm-input
    :margin="[24]"
    :inputPadding="[24]"
    :placeholder="language('report.other')"
    confirm-hold
    confirm-type="换行"
    showCharNumber
    :maxlength="100"
    autoHeight
    type="textarea"
  ></tm-input>
  <tm-button block :label="language('submit')" :margin="[24]"></tm-button>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, computed, inject } from "vue";
import { language } from "@/tmui/tool/lib/language";
import { useSubPage } from "./use-report.ts";
const { dataList,radio,radiolist, more_show, goUser, goReport } = useSubPage();

</script>
