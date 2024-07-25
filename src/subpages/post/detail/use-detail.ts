import { getCurrentInstance, onMounted, ref } from 'vue'

import { Comment } from '@/api/interfaces/post'
import { PostDetail } from '@/api/interfaces/post'
import { onLoad } from '@dcloudio/uni-app'

export const useDetail = () => {
  const postData = ref<PostDetail>();

  const dataList = ref<Comment[]>([
    {
      id: '1',
      content: 'i like that',
      createUser: {
        id: '12',
        name: 'pilao',
        avatar: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
      },
      createTime: '2024-04-20 14:00',
      replyCount: 10,
      replies: [
        {
          id: '9',
          content: 'i like that this is a goood resturant!! its worthy of trying.',
          createTime: '2024-04-20 14:00',
          createUser: {
            id: '12',
            name: 'pilao',
            avatar: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
          },
        }
      ],
      isTop: true,
    },
    {
      id: '2',
      content: 'i like that this is a goood resturant!! its worthy of trying. I know I will spend a big amount of money. I have no choice. I do not have agood job.',
      createTime: '2024-04-20 14:00',
      createUser: {
        id: '42',
        name: 'pilao',
        avatar: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
      },
      replyCount: 10,
      replies: [
        {
          id: '4',
          content: 'i like that this is a goood resturant!! its worthy of trying. nyu extended my deposit deadline to june 1st. Thank you so much...',
          createTime: '2024-04-20 14:00',
          createUser: {
            id: '12',
            name: 'pilao',
            avatar: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
          },
        }
      ],
      isTop: false,
    }
  ])

  onMounted(() => {
  })
  onLoad((options) => {
    getData(options.id);
    console.log(postData.value)
  })
  const listimg = [
    "https://store.tmui.design/api_v2/public/random_picture?row=1&random=12",
    "https://store.tmui.design/api_v2/public/random_picture?row=1&random=13",
    "https://store.tmui.design/api_v2/public/random_picture?row=1&random=14",
  ];
  function getData(id: string) {
    postData.value = {
      id: '1',
      title: "餐厅测家餐厅家餐厅家餐厅家餐厅家餐厅家餐厅家餐厅评",
      content: "这家餐厅不错",
      imgs: listimg,
      tags: ["黑榜"],
      address:'北京市撒旦发射点',
      businessTime: '周一-周五',
      createUser: {
        id: '21',
        name: 'June123',
        avatar: 'https://resource.tuniaokj.com/images/blogger/content_1.jpeg',
        follow: 0,
        follower: 12,
        thumbs: 0
      }
    };
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

  return {
    dataList,
    postData,
    more_show,
    cmt_op_show,
    cmt_ops,
    goUser,
    goReport,
    showCommentOperation,
    handleCommentOperation
  }
}
