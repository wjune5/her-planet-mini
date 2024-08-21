<template>
  <tm-app>
    <tm-navbar
      color="white"
      :followTheme="false"
      :transparent="false"
      hide-home
      title="标记地点"
    >
    </tm-navbar>
    <tm-form
      :margin="[12]"
      :padding="[0, 0]"
      @submit="confirm"
      ref="form"
      v-model="show"
      :label-width="210"
    >
      <tm-form-item
        label="服务类型"
        field="pickerStr"
        :rules="[{ required: true, message: '请选择个人从业者服务类型' }]"
      >
        <view
          @click="show.picker_category_show = !show.picker_category_show"
          class="flex flex-row flex-row-center-end"
        >
          <tm-text
            color="grey-1"
            :follow-theme="modelForm.category != ''"
            :userInteractionEnabled="false"
            :label="modelForm.category || '请选择个人从业者服务类型'"
          ></tm-text>
          <tm-icon
            :userInteractionEnabled="false"
            :font-size="20"
            color="grey-1"
            name="tmicon-angle-right"
          ></tm-icon>
        </view>
      </tm-form-item>
      <tm-form-item
        label="地区"
        field="modelForm.city"
        :rules="[{ required: true, message: '请选择从业者服务的城市' }]"
      >
        <view @click="show.city = !show.city" class="flex flex-row flex-row-center-end">
          <tm-text
            color="grey-1"
            :follow-theme="cityStr != ''"
            :userInteractionEnabled="false"
            :label="cityStr || '请选择从业者服务的城市'"
          ></tm-text>
          <tm-icon
            :userInteractionEnabled="false"
            :font-size="20"
            color="grey-1"
            name="tmicon-angle-right"
          ></tm-icon>
        </view>
      </tm-form-item>
      <tm-form-item
        label="详细地址"
        field="modelForm.address"
        :rules="[
          {
            required: true,
            message: '不能为空',
            validator: (val) => val.length > 0,
          },
        ]"
      >
        <view @click="openMap" class="flex flex-row flex-row-center-end">
          <tm-text
            :userInteractionEnabled="false"
            :label="modelForm.address || '请选择常驻地址(若无请选择市中心)'"
            color="grey-1"
            :follow-theme="modelForm.address != ''"
          ></tm-text>
          <tm-icon
            :userInteractionEnabled="false"
            :font-size="20"
            color="grey-1"
            name="tmicon-angle-right"
          ></tm-icon>
        </view>
      </tm-form-item>
      <tm-form-item label="个人从业者姓名">
        <tm-input
          :inputPadding="[0, 0]"
          v-model.lazy="modelForm.title"
          :showBottomBorder="false"
          :transparent="true"
          align="right"
          placeholder="名称"
          placeholder-style="color:#fff;"
        >
        </tm-input>
      </tm-form-item>
      <tm-form-item label="电话" field="modelForm.phone">
        <tm-input
          :inputPadding="[0, 0]"
          v-model.lazy="modelForm.phone"
          :transparent="true"
          :showBottomBorder="false"
          align="right"
          placeholder="请输入从业者工作电话"
          placeholder-style="color:#7B7B7B;"
        >
        </tm-input>
      </tm-form-item>
      <tm-form-item label="其他联系方式" field="nameuser.a">
        <tm-input
          :inputPadding="[0, 0]"
          v-model.lazy="modelForm.other"
          :transparent="true"
          :showBottomBorder="false"
          placeholder="请输入工作微信/小红书等联系方式"
          align="right"
          placeholder-style="color:#7B7B7B;"
        >
        </tm-input>
      </tm-form-item>
      <tm-form-item layout="vertical" label="从业者简介" field="modelForm.description">
        <tm-input
          :input-padding="[24, 24, 24, 40]"
          v-model.lazy="modelForm.description"
          :showBottomBorder="false"
          placeholder="请大致介绍从业者的技能、服务范围"
          type="textarea"
          :height="200"
          showCharNumber
          :maxlength="50"
          color="grey-1"
          :round="8"
        >
        </tm-input>
      </tm-form-item>

      <tm-form-item
        label="营业时间(选填)"
        field="modelForm.businessTime"
        layout="vertical"
        :rules="[{ required: true, message: '请输入从业者工作时间' }]"
      >
        <tm-sheet
          :margin="[0]"
          :padding="[40, 22]"
          :round="26"
          :width="0"
          :height="64"
          unit="px"
          text
          color="grey-4"
          _style="transition:border 0.24s;"
          _class="flex flex-row flex-row-center-start"
        >
          <tm-text
            :userInteractionEnabled="false"
            :label="bizTimeStr || '请输入从业者工作时间'"
            @click="show.biz_time_show = !show.biz_time_show"
          ></tm-text>
        </tm-sheet>
      </tm-form-item>

      <!-- <tm-form-item
        required
        label="评分"
        field="rate"
        :rules="[{ required: true, message: '请选择' }]"
      >
        <tm-rate v-model="show.rate" :default-value="show.rate"></tm-rate>
      </tm-form-item> -->
      <tm-form-item layout="vertical" label="添加图像(第一张图作为头图)">
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
      <tm-text label="添加人像照片请先征得从业者本人同意"></tm-text>
      <tm-form-item :border="false">
        <tm-radio-group>
          <tm-radio follow-theme>
            <template v-slot:default="{ checked }">
              <tm-text label="我希望在标记信息中展示我的头像和昵称"></tm-text>
            </template>
          </tm-radio>
        </tm-radio-group>
        <view class="flex flex-row">
          <view class="flex-1 mr-32">
            <tm-button form-type="submit" label="提交" :round="26" block></tm-button>
          </view>
        </view>
      </tm-form-item>
      <!-- <view class="fixed" style="bottom: 0px">
        <view class="flex flex-row flex-row-center-between ma-24">
          <tm-button label="发布"></tm-button>
        </view>
      </view> -->
    </tm-form>

    <tm-modal
      ref="modal"
      :height="500"
      :border="0"
      text
      linear="bottom"
      v-model:show="success_show"
    >
      <view class="flex flex-col flex-col-center-center">
        <tm-text label="提交成功"></tm-text>
        <tm-text
          label="您已成功提交标记，信息将在审核成功后向所有实名用户公开！"
          color="grey-4"
        ></tm-text>
        <tm-button
          :margin="[10]"
          size="mini"
          :shadow="0"
          label="再标记一个"
          block
        ></tm-button>
        <tm-image
          src="https://picsum.photos/450/150?id=36"
          :height="150"
          :width="450"
        ></tm-image>
        <tm-text label="查看信息" color="grey-4"></tm-text>
      </view>
    </tm-modal>
    <!-- <tm-calendar
      v-model="show.cale"
      v-model:show="showCal"
      :default-value="show.cale"
    ></tm-calendar> -->
    <tm-city-picker
      v-model="modelForm.city"
      v-model:model-str="cityStr"
      v-model:show="show.city"
      :default-value="modelForm.city"
    ></tm-city-picker>

    <tm-picker
      map-key="name"
      :columns="categoryList"
      v-model:model-str="modelForm.category"
      v-model:show="show.picker_category_show"
      :default-value="show.categoryIndex"
      v-model="show.categoryIndex"
    ></tm-picker>

    <tm-drawer
      ok-color="green"
      ref="calendarView"
      :height="900"
      v-model:show="show.biz_time_show"
    >
      <tm-cell label="营业日" :titleFontSize="32">
        <template v-slot:right>
          <tm-radio-group
            v-model="businessDayType"
            :defaultValue="businessDayType"
            @change="handleBusinessDayTypeChange"
          >
            <tm-radio
              follow-theme
              outlined
              :value="item.id"
              :label="item.name"
              v-for="(item, index) in dayList"
              :key="index"
            ></tm-radio>
          </tm-radio-group>
        </template>
      </tm-cell>
      <view v-if="businessDayType == 2">
        <tm-checkbox-group
          model="button"
          v-model="businessDay"
          :defaultValue="businessDay"
        >
          <tm-checkbox
            :value="index"
            :label="item"
            v-for="(item, index) in week"
            :key="index"
          ></tm-checkbox>
        </tm-checkbox-group>
      </view>
      <tm-cell label="营业时间" :titleFontSize="32">
        <template v-slot:right>
          <tm-radio-group v-model="businessTimeType" :defaultValue="businessTimeType">
            <tm-radio
              follow-theme
              outlined
              :value="item.id"
              :label="item.name"
              v-for="(item, index) in dayList2"
              :key="index"
            ></tm-radio>
          </tm-radio-group>
        </template>
      </tm-cell>

      <view v-if="businessTimeType == 2 && !confirm_value">
        <tm-time-between
          color="green"
          :follow-theme="true"
          :asyncModel="false"
          format="HH:mm"
          v-model="businessTime"
          v-model:model-str="businessTime_str_ar"
          :default-value="businessTime"
          :show-detail="{
            year: false,
            month: false,
            day: false,
            hour: true,
            minute: true,
            second: false,
          }"
          @confirm="confirm_value = true"
        ></tm-time-between>
      </view>
      <view class="ma-16" v-if="confirm_value">
        <tm-text :label="businessTime_str_format"></tm-text>
        <view @click="confirm_value = false"
          ><tm-text color="grey" label="重新选择"></tm-text
        ></view>
      </view>
      <!-- <tm-cascader
        ref="textCascader"
        @cell-click="loadL2Area"
        v-model="area"
        v-model:model-str="areaStr"
        :defaultValue="area"
        :data="areaList"
      ></tm-cascader> -->
    </tm-drawer>
  </tm-app>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import tmCheckbox from "@/tmui/components/tm-checkbox/tm-checkbox.vue";
import tmCheckboxGroup from "@/tmui/components/tm-checkbox-group/tm-checkbox-group.vue";
import { language } from "@/tmui/tool/lib/language";
import { useSubPage } from "./use-person";
const {
  show,
  tagList,
  categoryList,
  modelForm,
  handleSelectCity,
  cityStr,
  dayList,
  dayList2,
  week,
  businessDayType,
  businessTimeType,
  businessDay,
  businessTime,
  businessTime_str_ar,
  businessTime_str_format,
  bizTimeStr,
  confirm_value,
  handleBusinessDayTypeChange,
  openMap,
  confirm,
  success_show,
} = useSubPage();
function onStart() {}
function completeFile() {}
const dateStr = ref("");
const dateSAva = ref("2016-4-2 15:00:00");
const dateSar = ref("");
const dateTime = ref("2014-6-15 15:00:00");
const dateTimeStr = ref("");
const showdate = ref(false);
const modelvalue = ref("2024-3-20");
</script>
