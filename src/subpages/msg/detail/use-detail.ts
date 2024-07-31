import { getCurrentInstance, onMounted, ref } from 'vue'

import { useScrollTransparentNavbar } from '@/tn/hooks'
import { onLoad } from '@dcloudio/uni-app'
import { MsgDetail } from '@/api/interfaces/msg'

export const useSubPage = () => {
  const instance = getCurrentInstance();
  const postData= ref<PostDetail>();
  
  const dataList = ref<MsgDetail[]>([
    {
        id:'1',
        content: 'i like that',
        createUser: {
            id:'12',
            name:'pilao',
            avatar:'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
        },
        createTime:'2024-04-20 14:00'
    },
    {
        id:'2',
        content: '我喜欢这个，不错 I know I will spend a big amount of money. I have no choice. I do not have agood job.',
        createTime:'2024-04-20 14:00',
        createUser: {
            id:'42',
            name:'pilao',
            avatar:'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
        }
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
  function getData(id:string) {
    postData.value= {
      id:'1',
      title: "餐厅测家餐厅家餐厅家餐厅家餐厅家餐厅家餐厅家餐厅评",
      content: "这家餐厅不错",
      imgs:listimg,
      properties: [
        {
          id:'1',
          name: "价格",
          value: "24",
          type: "price",
        },
        {
          id:'2',
          name: "属性",
          value: "牛蛙套餐",
          type: "text",
        },
        {
          id:'5',
          name: "评分",
          value: "4.0",
          type: "rate",
        },
      ],
      tag: ["黑榜"],
      createUser: {
        id:'21',
        name:'June123',
        avatar:'https://resource.tuniaokj.com/images/blogger/content_1.jpeg',
        follow:0,
        follower:12,
        thumbs:0
      }
    };
  }

  return {
    dataList,
    postData
  }
}
