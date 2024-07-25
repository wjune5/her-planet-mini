<template>
  <tm-app>

    <tm-input
    text
      :searchWidth="120"
      :round="12"
      :margin="[12]"
      @search="searchConfirmHandle"
      prefix="tmicon-search"
      searchLabel="搜索"
      v-model.lazy="searchValue"
    ></tm-input>
    <!-- 最近搜索 -->
    <view v-if="historyList.length > 0" class="mx-24 my-12">
      <view class="flex flex-row flex-row-center-between">
        <tm-text
          :font-size="24"
          _class="text-weight-b"
          label="最近搜索"
        ></tm-text>
        <tm-icon
          :font-size="24"
          name="tmicon-delete-fill"
          @click="clearHistory"
        ></tm-icon>
      </view>

      <view class="flex flex-wrap">
        <tm-tag
          font-color="grey-4"
          :round="12"
          v-for="(item, index) in historyList"
          :key="index"
          :label="item"
          @tap.stop="historyClickHandle(item)"
        >
        </tm-tag>
      </view>
    </view>
  </tm-app>
</template>
<script lang="ts" setup>
import { useSearch } from "./use-search";

const {
  searchValue,
  historyList,
  searchConfirmHandle,
  historyClickHandle,
  clearHistory,
} = useSearch();
function search() {
  uni.$tm.u.routerTo("/subpages/post/list");
}
</script>
<style lang="scss" scoped>

</style>
