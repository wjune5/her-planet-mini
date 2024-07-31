import { getCurrentInstance, onMounted, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { Comment } from '@/api/interfaces/post'
import { PostDetail } from '@/api/interfaces/post'

export const useDetail = () => {
  const postData = ref<PostDetail>();

  const cmtlist = ref<Comment[]>([]);

  function mock() {
    cmtlist.value = [{
      id: '1',
      content: '非常好，值得一去',
      createUser: {
        id: '12',
        name: 'pilao',
        avatar: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
      },
      createTime: '2024-04-20 14:00',
      isTop: true,
      like: true,
      actions: {
        like: 154
      }
    },
    {
      id: '2',
      content: '我喜欢这个，不错 的的.',
      createTime: '2024-04-20 14:00',
      createUser: {
        id: '42',
        name: 'pilao',
        avatar: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
      },
      isTop: false,
      like: false,
      actions: {
        like: 99
      }
    }]
    // replies: [
    //   {
    //     id: '9',
    //     content: '我喜欢这个，不错撒谎发的咖啡哈库的是的萨芬工卡第三个发的的快感哈克的苏共i有大功i阿骨打比较好是的噶话发噶的角色',
    //     createTime: '2024-04-20 14:00',
    //     createUser: {
    //       id: '12',
    //       name: 'pilao',
    //       avatar: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
    //     },
    //   }
    // ],
  }
  onMounted(() => {

  })
  onLoad((options) => {
    getData(options.id);

  })
  function getData(id: string) {
    postData.value = {
      id: '1',
      title: "餐厅测家餐厅家餐厅家餐厅家餐厅家餐厅家餐厅家餐厅评",
      content: "这家餐厅不错，简介这家餐厅不错，简介这家餐厅不错，简介这家餐厅不错，简介这家餐厅不错，简介",
      imgs: [
        "https://img1.wallspic.com/previews/5/8/5/8/7/178585/178585-xun_yang_jian-mo_tuo_che_tou_kui-xin_bao_maag-ya_ma_ha_fa_dong_ji_gong_si-lun_tai-500x.jpg",
        "https://img3.wallspic.com/previews/7/7/4/8/7/178477/178477-hua_shuo_rog_shou_ji_5-hua_shuo-hua_shuo_rog_shou_ji_5s-an_zhuo-tao-500x.jpg",
        "https://img1.wallspic.com/previews/8/3/1/8/7/178138/178138-ka_tong-shi_jue_yi_shu-lu_se_de-xing_zhi-zi_ran_huan_jing-500x.jpg",
      ],
      tags: ["女老板"],
      address: '东城区文化潮汕博览园创客小街113号（合正汇一城东北门斜对面）',
      businessTime: '周一至周日 8:00-18:00',
      createUser: {
        id: '21',
        name: 'J123',
        avatar: 'https://resource.tuniaokj.com/images/blogger/content_1.jpeg',
        follow: 0,
        follower: 12,
        thumbs: 0
      }
    };
    mock();
  }

  function goUser() {
    uni.$tm.u.routerTo('/subpages/account');
  }
  const more_show = ref(false);

  function goReport() {
    more_show.value = false;
    uni.$tm.u.routerTo('/subpages/post/report/report');
  }
  const cmt_op_show = ref(false);
  const cmt_ops = ref([{
    id: '1',
    text: '回复'
  }, {
    id: '2',
    text: '分享'
  }, {
    id: '3',
    text: '复制'
  }, {
    id: '4',
    text: '举报'
  }]);
  function showCommentOperation() {
    cmt_op_show.value = true;

  }
  function handleCommentOperation(item: any, index: number) {
    console.log(item, index)
  }

  function goComment(id: string) {
    uni.$tm.u.routerTo('/subpages/post/comment/comment?id=' + id)
  }
  function handleThumbsUp(id: string) {
    cmtlist.value.forEach(item => {
      if (item.id == id) {
        if (item.like) {
          item.like = false;
          item.actions.like++;
        } else {
          item.like = true;
          item.actions.like--;
        }

      }
    })
  }
  function handlePreview(e: number) {
    // uni.$tm.u.preview({url:postData.value?.imgs[e],list:postData.value?.imgs})
    console.log(postData.value?.imgs)
    uni.previewImage({
			urls: postData.value?.imgs,
			current: postData.value?.imgs[e]
		})
  }
  return {
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
  }
}
