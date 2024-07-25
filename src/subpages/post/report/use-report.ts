import { getCurrentInstance, onMounted, ref } from 'vue'

import { Category } from '@/api/interfaces/category'
import { onLoad } from '@dcloudio/uni-app'

export const useSubPage = () => {
  const instance = getCurrentInstance();
  const radio = ref(null);

  const radiolist = ref(undefined);
  const dataList = ref<Category[]>([
    {
      id: '1',
      name: 'i like that'
    },
    {
      id: '2',
      name: 'i like that thve agood job.'
    }
  ])

  onMounted(() => {
  })
  onLoad((options) => {
    getData(options.id);
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
      properties: [
        {
          id: '1',
          name: "价格",
          value: "24",
          type: "price",
        },
        {
          id: '2',
          name: "属性",
          value: "牛蛙套餐",
          type: "text",
        },
        {
          id: '5',
          name: "评分",
          value: "4.0",
          type: "rate",
        },
        {
          id: '6',
          name: "人数",
          value: "4",
          type: "text",
        },
      ],
      tag: ["黑榜"],
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
  type NavbarRectInfo = {
    statusHeight: number
    height: number
  }

  return {
    dataList,
    more_show,
    goUser,
    goReport
  }
}
