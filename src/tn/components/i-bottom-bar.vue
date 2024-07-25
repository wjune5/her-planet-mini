<template>
  <view>
    <view
      class="fixed l-0 b-0 flex tabbar"
      :style="{
        width: _width + 'px',
        height: _BarHeight + 'px',
        transform: `translateY(${props.bottom}rpx)`,
        zIndex: props.zIndex,
      }"
    >
      <view class="relative" style="top: 0px">
        <tm-sheet
          :blur="_blur"
          :color="props.color"
          parenClass="relative"
          class="relative"
          :followTheme="props.followTheme"
          :dark="props.dark"
          :round="props.round"
          :shadow="props.shadow"
          :outlined="props.outlined"
          :border="0"
          borderDirection="top"
          :text="props.text"
          :transparent="false"
          :linear="props.linear"
          :linearDeep="props.linearDeep"
          :margin="[0, 0]"
          :padding="[0, 0]"
          :height="_BarHeight"
          :width="_width"
          unit="px"
          hunit="px"
        ></tm-sheet>
      </view>
      <view
        class="absolute flex flex-col l-0"
        :style="{ width: _width + 'px', height: _BarHeight + 'px' }"
      >
        <view
          class="relative barcont"
          :style="{ width: _width + 'px' }"
          ><slot></slot
        ></view>
      </view>
    </view>
    <!-- <view flex flex-row flex-row-center-between flex-1
      v-if="_place"
      :style="{
        height: _totalBarHeight + 'px',
      }"
    ></view> -->
  </view>
</template>
<script lang="ts" setup>
import {
  getCurrentInstance,
  computed,
  Ref,
  ref,
  provide,
  inject,
  onUpdated,
  onMounted,
  onUnmounted,
  nextTick,
  watch,
  PropType,
} from "vue";
import {
  custom_props,
  computedTheme,
  computedClass,
  computedStyle,
  computedDark,
} from "../../tmui/tool/lib/minxs";
const props = defineProps({
  ...custom_props,
  color: {
    type: [String],
    default: "white",
  },
  text: {
    type: [Boolean],
    default: false,
  },
  round: {
    type: [Number],
    default: 0,
  },
  shadow: {
    type: [Number],
    default: 0,
  },
  //如果为0取当前窗口宽度。
  width: {
    type: [Number],
    default: 0,
  },
  //底部偏移
  bottom: {
    type: [Number],
    default: 0,
  },
  //是否显示安全区域
  showSafe: {
    type: [Boolean],
    default: false,
  },
  //动态激活项的索引-1表示不激活任何项。
  active: {
    type: Number,
    default: -1,
  },
  /** 在nvue上没有用处，请自行放到最尾部的地方。 */
  zIndex: {
    type: [Number],
    default: 200,
  },
});
let sys = uni.getSystemInfoSync();

const _width = computed(
  () => uni.upx2px(props.width) || sys?.windowWidth || 750
);
const _blur = computed(() => props.blur);
const _showSafe = ref(props.showSafe);
const win_bottom = sys?.safeAreaInsets?.bottom ?? 0;
if (win_bottom > 0) {
  _showSafe.value = true;
}

const _BarHeight = computed(() => {
  if (_showSafe.value) return 75;
  return 60;
});
</script>
