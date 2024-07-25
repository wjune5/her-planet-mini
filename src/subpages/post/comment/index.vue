<template>
  <tm-app>
    <tm-navbar hide-home title="添加评论"> </tm-navbar>
    <tm-form
      :margin="[24, 24]"
      :padding="[0, 0]"
      @submit="confirm"
      ref="form"
      v-model="modelForm"
      :label-width="210"
    >
      <tm-text label="写评价"></tm-text>
      <tm-input
        :input-padding="[24, 24, 24, 40]"
        v-model.lazy="modelForm.comment"
        :showBottomBorder="false"
        placeholder="请分享你的体验供其她姐妹参考~"
        type="textarea"
        :height="360"
        showCharNumber
        :maxlength="100"
      >
      </tm-input>
      <tm-form-item layout="vertical" label="上传图片">
        <tm-upload
          showSort
          :onStart="onStart"
          v-model="modelForm.fileList"
          ref="up"
          :width="636"
          :rows="4"
          url="https://mockapi.eolink.com/tNYKNA7ac71aa90bcbe83c5815871a5b419601e96a5524d/upload"
          @complete="completeFile"
        ></tm-upload>
      </tm-form-item>
      <tm-form-item :border="false">
        <view class="flex flex-row">
          <view class="flex-1 mr-32">
            <tm-button form-type="submit" label="提交" block></tm-button>
          </view>
        </view>
      </tm-form-item>
    </tm-form>
  </tm-app>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, computed, inject } from "vue";
// const { cards } = useSubPage();
import { useWindowInfo } from "@/tmui/tool/useFun/useWindowInfo";
const sysinfo = useWindowInfo();
const _widthRpx = computed(() => uni.$tm.u.torpx(sysinfo.width));
const _heightRpx = computed(() => uni.$tm.u.torpx(sysinfo.height - 40));

import { useComment } from "./use-comment";

const { modelForm,confirm, onStart,completeFile } = useComment();
</script>
