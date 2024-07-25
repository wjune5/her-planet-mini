<template>
    <tm-app>
      <tm-navbar hide-home title="推荐个人从业者"> </tm-navbar>
      <tm-form
        :margin="[24, 24]"
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
            @click="picker_category_show = !picker_category_show"
            class="flex flex-row flex-row-center-end"
          >
            <tm-text
              :userInteractionEnabled="false"
              :label="modelForm.category || '请选择地点类型'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
              name="tmicon-angle-right"
            ></tm-icon>
          </view>
        </tm-form-item>
        <tm-form-item
          label="地区"
          field="modelForm.city"
          :rules="[{ required: true, message: '请选择从业者服务的城市' }]"
        >
          <view
            @click="handleSelectCity"
            class="flex flex-row flex-row-center-end"
          >
            <tm-text
              :userInteractionEnabled="false"
              :label="show.cityStr || '请选择地点所在城市'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
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
          <tm-input
            :inputPadding="[0, 0]"
            v-model.lazy="modelForm.address"
            :transparent="true"
            align="right"
            placeholder="请选择常驻地址(若无请选择市中心)"
            :showBottomBorder="false"
          >
          </tm-input>
        </tm-form-item>
        <tm-form-item label="店名">
          <tm-input
            :inputPadding="[0, 0]"
            v-model.lazy="modelForm.title"
            :showBottomBorder="false"
            :transparent="true"
            align="right"
            placeholder="店铺名称"
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
            placeholder="请输入"
          >
          </tm-input>
        </tm-form-item>
        <tm-form-item label="其他联系方式" field="nameuser.a">
          <tm-input
            :inputPadding="[0, 0]"
            v-model.lazy="modelForm.other"
            :transparent="true"
            :showBottomBorder="false"
            placeholder="请输入"
            align="right"
          >
          </tm-input>
        </tm-form-item>
  
        <tm-form-item
          layout="vertical"
          label="从业者简介"
          field="modelForm.description"
        >
          <tm-input
            :input-padding="[24,24,24,40]"
            v-model.lazy="modelForm.description"
            :showBottomBorder="false"
            placeholder="技能、服务范围"
            type="textarea"
            :height="360"
            showCharNumber
            :maxlength="100"
          >
          </tm-input>
        </tm-form-item>
  
        <tm-form-item
          label="营业时间(选填)"
          field="modelForm.businessTime"
        >
          <view
            @click="biz_time_show = !biz_time_show"
            class="flex flex-row flex-row-center-end"
          >
            <tm-text
              :userInteractionEnabled="false"
              :label="bizTimeStr || '请选择有效日期'"
            ></tm-text>
            <tm-icon
              :userInteractionEnabled="false"
              :font-size="24"
              name="tmicon-angle-right"
            ></tm-icon>
          </view>
        </tm-form-item>
  
        <!-- <tm-form-item
          required
          label="评分"
          field="rate"
          :rules="[{ required: true, message: '请选择' }]"
        >
          <tm-rate v-model="show.rate" :default-value="show.rate"></tm-rate>
        </tm-form-item> -->
        <tm-form-item layout="vertical" label="添加图像(第一张图作为头图)" desc="添加人像照片请先征得从业者本人同意">
          <tm-upload
            showSort
            :onStart="onStart"
            v-model="fileList"
            ref="up"
            :width="636"
            :rows="4"
            url="https://mockapi.eolink.com/tNYKNA7ac71aa90bcbe83c5815871a5b419601e96a5524d/upload"
            @complete="completeFile"
          ></tm-upload>
        </tm-form-item>
        <tm-form-item :border="false">
          <tm-radio-group>
            <tm-radio>
              <template v-slot:default="{ checked }">
                <!-- <view class="flex flex-row"> -->
                <tm-text label="我希望在标记信息中展示我的头像和昵称"></tm-text>
                <!-- </view> -->
              </template>
            </tm-radio>
          </tm-radio-group>
          <!-- <tm-checkbox
            outlined
            :round="10"
            label="我希望在标记信息中展示我的头像和昵称"
          ></tm-checkbox> -->
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
        v-model="show.city"
        v-model:model-str="show.cityStr"
        v-model:show="city_show"
        :default-value="show.city"
      ></tm-city-picker>
      <tm-time-picker
        v-model="show.time"
        v-model:show="picker_time_show"
        :show-detail="{ year: false, month: false, day: true, hour: true }"
      ></tm-time-picker>
  
      <tm-picker
        map-key="name"
        :columns="categoryList"
        v-model:model-str="show.pickerStr"
        v-model:show="picker_category_show"
        :default-value="show.pickerIndex"
        v-model="show.pickerIndex"
      ></tm-picker>
  
      <tm-drawer ref="calendarView" v-model:show="biz_time_show">
        <tm-cell label="营业日">
          <template v-slot:right>
            <tm-radio-group
              v-model="businessDayType"
              :defaultValue="businessDayType"
            >
              <tm-radio
                outlined
                :value="item.id"
                :label="item.name"
                v-for="(item, index) in dayList"
                :key="index"
              ></tm-radio>
            </tm-radio-group>
          </template>
          <template v-slot:label>
            <tm-radio-group model="button" v-model="radio"  :defaultValue="radio">
                  <tm-radio :value="true" label="选我呀"></tm-radio>
                  <tm-radio :value="false" label="不要选我呀"></tm-radio>
                  <tm-radio :value="false" label="不要选我呀"></tm-radio>
                  <tm-radio :value="false" label="选我"></tm-radio>
                  <tm-radio :value="false" label="不要选我呀"></tm-radio>
                  <tm-radio :value="false" label="不要选我呀"></tm-radio>
              </tm-radio-group>
          </template>
        </tm-cell>
        <tm-cell label="营业时间">
          <template v-slot:right>
            <tm-radio-group
              v-model="businessTimeType"
              :defaultValue="businessTimeType"
            >
              <tm-radio
                outlined
                :value="item.id"
                :label="item.name"
                v-for="(item, index) in dayList2"
                :key="index"
              ></tm-radio>
            </tm-radio-group>
          </template>
        </tm-cell>
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
  import { language } from "@/tmui/tool/lib/language";
  import { usePerson } from "./use-person";
  
  const {
    show,
    picker_category_show,
    tagList,
    fileList,
    categoryList,
    modelForm,
    handleSelectCity,
    biz_time_show,
    dayList,
    dayList2,
    businessDayType,
    businessTimeType,
    bizTimeStr,
    city_show,
    picker_time_show,
    confirm,
    success_show
  } = usePerson();
  const radiolist = ref(undefined);
  function onStart() {}
  function completeFile() {}
  </script>
  