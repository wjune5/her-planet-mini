<template>
  <tm-app color="#F5F5F5">
    <tm-navbar title="" transparent hide-home :is-place="false"> </tm-navbar>
    <view v-if="!postData" :style="`margin-top:${sysinfo.navigatorBar}px`">
      <tm-skeleton-line :height="500"></tm-skeleton-line>
      <tm-skeleton-line :height="500"></tm-skeleton-line>
      <view style="width: 300rpx">
        <tm-skeleton-line :height="50"></tm-skeleton-line>
      </view>
    </view>
    <block v-else>
      <tm-carousel
        :autoplay="true"
        :height="500"
        :list="postData.imgs"
        align="right"
        dotPosition="bottom"
        imgModel="widthFix"
        indicatorDots
        model="dot"
        @click="handlePreview"
      ></tm-carousel>
      <view style="position: relative">
        <view style="position: absolute; top: -86rpx">
          <tm-sheet :round="8">
            <view class="flex flex-row">
              <tm-text
                :font-size="36"
                :label="postData?.title"
                _class="font-bold"
              ></tm-text>
              <view
                class="flex flex-row flex-row-center-start ml-8"
                style="width: 300rpx"
              >
                <tm-text label="东城区" :font-size="24" color="grey-darken-1"></tm-text>
                <tm-divider vertical :height="20"></tm-divider>
                <tm-text label="住宿" :font-size="24" color="grey-darken-1"></tm-text>
              </view>
            </view>
            <view class="flex-row flex flex-wrap my-12">
              <tm-tag
                color="green"
                text
                size="s"
                :label="item"
                :key="index"
                v-for="(item, index) in postData.tags"
              ></tm-tag>
            </view>
            <tm-text :label="postData?.address" :font-size="24"></tm-text>
            <tm-text
              label="距离"
              color="grey-darken-1"
              _class="mt-8"
              :font-size="24"
            ></tm-text>
            <view class="flex flex-row flex-row-center-between mt-24">
              <view class="flex flex-row flex-row-center-start">
                <tm-text
                  label="营业时间"
                  :font-size="28"
                  color="grey-darken-1"
                  _class="mr-24"
                  _style="width:112rpx;"
                ></tm-text>
                <tm-text :label="postData?.businessTime" :font-size="28"></tm-text>
              </view>
              <view class="flex flex-row flex-row-center-end">
                <tm-image
                  :width="48"
                  :height="48"
                  src="https://alipic.lanhuapp.com/MasterSlicePNG205a050151c4a6b2796a2a935ca91e55.png"
                ></tm-image>
                <tm-image
                  :width="48"
                  :height="48"
                  src="https://alipic.lanhuapp.com/MasterSlicePNGea8ad47e7ac98b0a78b0a41ab2facf7d.png"
                ></tm-image>
              </view>
            </view>
            <view class="flex flex-row flex-row-top-start mt-12">
              <tm-text
                label="地点简介"
                :font-size="28"
                color="grey-darken-1"
                _style="width:112rpx;"
                _class="mr-12"
              ></tm-text>
              <tm-text _class="pb-24">{{ postData.content }}</tm-text>
            </view>
          </tm-sheet>
          <tm-divider :margin="[48, 0]" :border="4" show-label color="#F0F0F0">
            <template v-slot:label>
              <tm-text
                :font-size="24"
                _class="text-weight-b px-32"
                :label="`本信息由 @${postData?.createUser.name} 提供`"
              ></tm-text>
            </template>
          </tm-divider>
          <!-- <view class="round-8 my-12 white pa-24"> -->
          <view
            class="flex flex-row flex-row-center-between mx-24 mt-24 pa-24 white"
            style="border-radius: 32rpx 32rpx 0 0"
          >
            <tm-text label="评论信息" :font-size="32" _class="font-bold"></tm-text>
          </view>
          <!-- comment -->

          <view class="mx-24 pb-24 white" style="border-radius: 0 0 32rpx 32rpx">
            <tm-comment
              border-bottom
              :margin="[0, 0]"
              :padding="[24, 24, 24, 0]"
              :author="item.createUser?.name"
              author-color="grey-darken-1"
              :avatar="item.createUser?.avatar"
              :time="item.createTime"
              :content="item.content"
              @content-click="replyTo(item.id, item.createUser)"
              @content-long-click="showCommentOperation(item)"
              @author-click="goUser"
              @avatar-click="goUser"
              :round="0"
              v-for="(item, index) in cmtlist"
              :key="index"
            >
              <template v-slot:time>
                <tm-tag
                  text
                  size="xs"
                  label="作者"
                  :margin="[10, 0]"
                  v-if="postData?.createUser.id == item.createUser.id"
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
                <!-- <view class="flex flex-row flex-row-center-between fulled"> -->
                <!-- <tm-text label="6分钟前" color="#767474"></tm-text> -->

                <view
                  class="flex flex-row flex-center pl-16"
                  @click="handleThumbsUp(item.id)"
                >
                  <tm-icon
                    :font-size="36"
                    :name="item.like ? 'tmicon-md-heart-empty' : 'tmicon-md-heart'"
                    :color="item.like ? '#767474' : '#FF6B30'"
                  ></tm-icon>
                  <tm-text
                    _class="pl-10"
                    color="#767474"
                    :font-size="24"
                    :label="item.actions.like"
                  ></tm-text>
                </view>
                <!-- </view> -->
              </template>
            </tm-comment>
          </view>
        </view>
      </view>

      <i-bottom-bar :width="sysinfo.width" show-safe :shadow="3">
        <view class="flex flex-row flex-row-center-between flex-1 mx-24 my-16">
          <view class="flex flex-row flex-center">
            <view class="flex flex-col ml-24">
              <tm-icon name="tmicon-ios-star-outline" :size="20"></tm-icon>
              <tm-text :font-size="24" _class="mt-8">反馈(123)</tm-text>
            </view>
            <view class="flex flex-col flex-col-center-center ml-24">
              <tm-icon name="tmicon-ios-star-outline" :size="20"></tm-icon>
              <tm-text :font-size="24" _class="mt-8">来过(1)</tm-text>
            </view>
            <view class="flex flex-col ml-24">
              <tm-icon name="tmicon-ios-star-outline" :size="20"></tm-icon>
              <tm-text :font-size="24" _class="mt-8">收藏(99)</tm-text>
            </view>
          </view>
          <tm-button
            label="写评价"
            :round="20"
            :width="300"
            @click="goComment(postData.id)"
          ></tm-button>
        </view>
      </i-bottom-bar>
      <!-- <tm-action-menu
      :list="cmt_ops"
      v-model="cmt_op_show"
      @change="handleCommentOperation"
    >
    </tm-action-menu> -->
    </block>
  </tm-app>
</template>
<script lang="ts" setup>
import { ref, getCurrentInstance, computed } from "vue";
import { language } from "@/tmui/tool/lib/language";
import iBottomBar from "@/tn/components/i-bottom-bar.vue";
import tmComment from "@/tmui/components/tm-comment/tm-comment.vue";
import { useWindowInfo } from "@/tmui/tool/useFun/useWindowInfo";
import { useDetail } from "./use-detail";
import { User } from "@/api/interfaces/user";

const sysinfo = useWindowInfo();
const _widthRpx = computed(() => uni.$tm.u.torpx(sysinfo.width));

const list = ref([
  { text: "最新", id: "1" },
  { text: "最热", id: "2" },
]);
const {
  cmtlist,
  postData,
  more_show,
  cmt_op_show,
  cmt_ops,
  goUser,
  goReport,
  showCommentOperation,
  handleCommentOperation,
  goComment,
  handleThumbsUp,
  handlePreview
} = useDetail();

const getdata = (e: string) => {
  return new Promise((res, rej) => {
    setTimeout(function () {
      if (e == "top") {
        let len = dataList.value.length;
        for (let i = len; i < 10 + len; i++) {
          dataList.value.push({
            id: `${i}`,
            content: "非常好，值得一去" + i,
            createUser: {
              id: "12",
              name: "pilao",
              avatar:
                "https://img2.wallspic.com/previews/8/5/0/8/7/178058/178058-cao-kuai_le_de-yi_shu-lu_de_shang_de_zhi_wu-ren_men_zai_zi_ran_jie-500x.jpg",
            },
            createTime: "2024-04-20 14:00",
            replyCount: 10,
            isTop: false,
          });
        }
      } else if (e == "bottom") {
        let len = dataList.value.length;
        for (let i = len; i < 10 + len; i++) {
          dataList.value.push({
            id: "1541",
            content: "非常好，值得一去" + i,
            createUser: {
              id: "12",
              name: "pilao",
              avatar:
                "https://img1.wallspic.com/previews/8/4/0/8/7/178048/178048-feng-li_qing-luo_ye-cao-he_yin_ying_de_se_cai-500x.jpg",
            },
            createTime: "2024-04-20 14:00",
            replyCount: 10,
            isTop: false,
          });
        }
      }
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
</style>
