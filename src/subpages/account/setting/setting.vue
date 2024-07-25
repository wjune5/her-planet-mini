<template>
  <tm-app ref="app">
    <tm-cell
      :margin="[0, 0]"
      :titleFontSize="30"
      :title="language('setting.place')"
    >
      <template v-slot:right>
        <tm-switch
          barIcon="tmicon-menu"
          offIcon="tmicon-times"
          size="mini"
          :default-value="isList"
          @click="setPlacement"
        ></tm-switch>
      </template>
    </tm-cell>
    <tm-cell
      :margin="[0, 0]"
      :titleFontSize="30"
      :title="language('setting.theme.dark')"
    >
      <template v-slot:right>
        <tm-switch
          offIcon="tmicon-times"
          size="mini"
          :default-value="store.tmStore.dark"
          @click="setDarkMode"
        ></tm-switch>
      </template>
    </tm-cell>
    <tm-cell
      :margin="[0, 0]"
      :titleFontSize="30"
      :title="language('setting.language.open')"
    >
      <template v-slot:right>
        <tm-switch
          offIcon="tmicon-times"
          size="mini"
          :default-value="store.tmStore.dark"
          @click="seLocal"
        ></tm-switch>
      </template>
    </tm-cell>
  </tm-app>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { language } from "@/tmui/tool/lib/language";
import { SettingConfig } from "@/api/constants/index.ts";
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
const store = useTmpiniaStore();

function setDarkMode() {
  //方法一：调用pinia方法
  store.setTmVuetifyDark(!store.tmStore.dark);
}
const isList = ref(uni.$tm.u.getCookie(SettingConfig));
function setPlacement() {
  isList.value = !isList.value;
  uni.$tm.u.setCookie(SettingConfig, isList.value);
}
function seLocal() {
  if (language("language") == "English-US") {
    uni.setLocale("zh-Hans");
  } else {
    uni.setLocale("en");
  }
}

</script>
