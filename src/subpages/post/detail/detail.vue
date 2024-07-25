<template>
  <tm-app color="#F5F5F5">
    <tm-navbar title="" transparent hide-home :is-place="false"> </tm-navbar>
    <tm-carousel
      :autoplay="false"
      :height="500"
      :list="postData?.imgs"
      align="right"
      dotPosition="bottom"
      imgModel="widthFix"
      indicatorDots
      model="dot"
      vertical
    ></tm-carousel>

    <!--  <view class="px-24">
      <view
        class="blogger__desc my-12 tn-text-justify tn-flex-col-center tn-flex-row-left"
        @click=""
      >
        <tm-text
          :font-size="32"
          _class="blogger__desc__content flex-1 tn-text-justify font-bold"
          >{{ postData.title }}</tm-text
        >
      </view> -->
    <view style="position: relative">
      <view style="position: absolute; top: -40px">
        <tm-sheet :round="8">
          <view class="flex flex-row">
            <tm-text
              :font-size="36"
              :label="postData?.title"
              _class="font-bold"
            ></tm-text>
            <view class="flex flex-row flex-row-center-start ml-8" style="width: 400rpx">
              <tm-text label="东城区" :font-size="24" color="grey-darken-1"></tm-text>
              <tm-divider vertical :height="20"></tm-divider>
              <tm-text label="住宿" :font-size="24" color="grey-darken-1"></tm-text>
            </view>
          </view>
          <view class="flex-row flex flex-wrap my-12">
            <tm-tag
              color="green"
              size="s"
              :label="item"
              v-for="(item, index) in postData?.tags"
            ></tm-tag>
          </view>
          <tm-text :label="postData?.address" :font-size="24"></tm-text>
          <tm-text
            label="距离"
            color="grey-darken-1"
            _class="mt-8"
            :font-size="24"
          ></tm-text>
          <view class="flex flex-row flex-row-center-start mt-24">
            <tm-text
              label="营业时间"
              :font-size="28"
              color="grey-darken-1"
              _class="mr-24"
            ></tm-text>
            <tm-text :label="postData?.businessTime" :font-size="28"></tm-text>
          </view>
          <view class="flex flex-row flex-row-top-start mt-12">
            <tm-text
              label="地点简介"
              :font-size="28"
              color="grey-darken-1"
              _class="mr-12"
            ></tm-text>

            <tm-text _class="pb-24">{{ postData?.content }}</tm-text>
          </view>
        </tm-sheet>
        <tm-divider :margin="[48, 0]" :border="4" show-label>
          <template v-slot:label>
            <tm-text
              :font-size="24"
              _class="text-weight-b px-32"
              label="本信息由 @xx 提供"
            ></tm-text>
          </template>
        </tm-divider>
        <view class="flex flex-row flex-row-center-between mb-24">
          <tm-text label="评论信息" :font-size="32" _class="font-bold"></tm-text>
        </view>
        <!-- comment -->
        <tm-virtual-list
          :load="getdata"
          :width="_widthRpx"
          :height="sysinfo.height - 44"
          :data="dataList"
          :itemHeight="300"
        >
          <template v-slot:default="{ data }">
            <view v-for="(item, index) in data" :key="index">
              <tm-comment
                :margin="[0]"
                :author="item.createUser.name"
                :avatar="item.createUser.avatar"
                :time="item.createTime"
                :content="item.content"
                @content-click="replyTo(item.id, item.createUser)"
                @content-long-click="showCommentOperation(item)"
                @author-click="goUser"
                @avatar-click="goUser"
              >
                <template v-slot:time>
                  <tm-tag
                    text
                    size="xs"
                    label="作者"
                    :margin="[10, 0]"
                    v-if="postData.createUser.id == item.createUser.id"
                  ></tm-tag>
                  <tm-tag
                    text
                    size="xs"
                    label="置顶"
                    :margin="[10, 0]"
                    v-if="item.isTop"
                  ></tm-tag>
                </template>
                <template v-slot:actions>
                  <view class="flex flex-row norwap">
                    <view class="flex flex-row flex-center pl-16">
                      <tm-icon :font-size="24" name="tmicon-md-heart-empty"></tm-icon>
                      <tm-text _class="pl-10" :font-size="24" label="125"></tm-text>
                    </view>
                  </view>
                </template>
              </tm-comment>
            </view>
          </template>
        </tm-virtual-list>
      </view>
    </view>

    <i-bottom-bar>
      <view class="flex flex-row flex-row-center-between ma-16" v-if="!focus_input">
        <!-- <tm-grid :width="638" :col="3">
          <tm-grid-item>
            <tm-text label="反馈"></tm-text>
          </tm-grid-item>
          <tm-grid-item>
            <tm-text label="来过"></tm-text>
          </tm-grid-item>
          <tm-grid-item :count="55">
            <tm-text label="收藏"></tm-text>
          </tm-grid-item>
        </tm-grid> -->
        <view class="flex flex-row flex-center px-16 flex-2">
          <view class="flex flex-col flex-col-center-center">
            <tm-icon :font-size="40" name="tmicon-collection"></tm-icon>
            <tm-text _class="pl-10 pr-24" :font-size="24" label="反馈"></tm-text>
          </view>
          <view class="flex flex-col flex-col-center-center">
            <tm-icon :font-size="40" name="tmicon-md-heart-empty"></tm-icon>
            <tm-text _class="pl-10" :font-size="24" label="来过"></tm-text>
          </view>
          <view class="flex flex-col flex-col-center-center">
            <tm-icon :font-size="40" name="tmicon-md-heart-empty"></tm-icon>
            <tm-text _class="pl-10" :font-size="24" label="收藏"></tm-text>
          </view>
        </view>
        <tm-button label="写评价" block :round="26" _class="flex-4"></tm-button>
      </view>
      <tm-input
        v-else
        v-model="comment"
        :focus="focus_input"
        text
        :round="16"
        :placeholder="cmt_ph"
        :margin="[16]"
        @focus="inputComment"
        @blur="unfocus"
        @confirm="submitComment"
      >
        <template v-slot:right>
          <tm-icon
            _class="pl-10 pr-24"
            :font-size="32"
            name="tmicon-picture-fill"
          ></tm-icon>
          <tm-icon _class="pl-10" :font-size="32" name="tmicon-smile-fill"></tm-icon>
        </template>
      </tm-input>
    </i-bottom-bar>

    <tm-drawer closeable :height="500" v-model:show="more_show">
      <tm-button :label="language('post.used')" @click=""></tm-button>
      <tm-button :label="language('post.not.agree')"></tm-button>
      <tm-button :label="language('post.report')" @click="goReport"></tm-button>
    </tm-drawer>
    <tm-action-menu
      :list="cmt_ops"
      v-model="cmt_op_show"
      @change="handleCommentOperation"
    >
    </tm-action-menu>
  </tm-app>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, computed } from "vue";
import { language } from "@/tmui/tool/lib/language";
import iBottomBar from "@/tn/components/i-bottom-bar.vue";
import { useWindowInfo } from "@/tmui/tool/useFun/useWindowInfo";
import { useDetail } from "./use-detail";
import { User } from "@/api/interfaces/user";

const sysinfo = useWindowInfo();
const _widthRpx = computed(() => uni.$tm.u.torpx(sysinfo.width));

const list = ref([
  { text: "最新", id: "1" },
  { text: "最热", id: "2" },
]);
const cmtlist = ref([]);
const {
  dataList,
  postData,
  more_show,
  cmt_op_show,
  cmt_ops,
  goUser,
  goReport,
  showCommentOperation,
  handleCommentOperation,
} = useDetail();

const getdata = (e: string) => {
  return new Promise((res, rej) => {
    setTimeout(function () {
      if (e == "top") {
        dataList.value = dataList.value;
        // for (let i = 0; i < 10; i++) {
        //   imglist.value.push({
        //     src: "https://i0.pickpik.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg",
        //     index: i,
        //   });
        // }
      }
      // else if (e == "bottom") {
      //   let len = imglist.value.length;
      //   for (let i = len; i < 10 + len; i++) {
      //     imglist.value.push({
      //       src: "https://i0.pickpik.com/photos/298/434/513/beach-dawn-dusk-ocean-thumb.jpg",
      //       index: i,
      //     });
      //   }
      // }
      res(true);
    }, 2500);
  });
};
const comment = ref();
const cmt_ph = ref("友好评论~");
function replyTo(commentId: string, createUser: User) {
  cmt_ph.value = "@" + createUser.name;
  // is_input.value = true;
  focus_input.value = true;
}
const expandReply = ref(false);
const reply_show = ref(false);
const curReply = ref({});
function expand(comment: Comment) {
  // get replies by commentId page 10
  curReply.value = comment;
  reply_show.value = true;
}
const focus_input = ref(false);
// const is_input = ref(false);
function inputComment() {
  // is_input.value = true;
  focus_input.value = true;
  // uni.onKeyboardHeightChange((res) => {
  //   console.log(res.height);
  // });
}
function unfocus() {
  // is_input.value = false;
  focus_input.value = false;
}
function submitComment() {
  unfocus();
  // TODO submit
}
</script>
<style lang="scss" scoped>
/* 文章内容 start*/
.blogger {
  &__item {
    padding: 30rpx;
  }

  &__author {
    &__btn {
      margin-right: -12rpx;
      opacity: 0.5;
    }
  }

  &__desc {
    line-height: 30rpx;

    &__label {
      color: #f3f2f7;
      background-color: #1d2541;
      border-radius: 10rpx;
      font-size: 22rpx;

      padding: 5rpx 15rpx;
      margin: 5rpx 18rpx 0 0;

      &--prefix {
        font-size: 24rpx;
        color: #1d2541;
        padding-right: 10rpx;
      }
    }
    &__content {
      line-height: 50rpx;
    }
  }

  &__content {
    margin-top: 18rpx;
    padding-right: 18rpx;

    &__data {
      line-height: 46rpx;
      text-align: justify;
      overflow: hidden;
      transition: all 0.25s ease-in-out;
    }

    &__status {
      margin-top: 10rpx;
      font-size: 26rpx;
      color: #82b2ff;
    }
  }
}
/* 文章内容 end*/

.tn-flex-row-left {
  justify-content: flex-start;
}
.tn-flex-col-center {
  align-items: center;
}

.tn-text-justify {
  text-align: justify;
}

.tn-float-left {
  float: left;
}
</style>
