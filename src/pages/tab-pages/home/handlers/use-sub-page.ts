import { getCurrentInstance, onMounted, ref } from 'vue'
import { useSubPageProvide } from '../../../index/handlers'
import type { IndexPageOnLoadFunc, IndexPageOnScrollFunc } from '../../../types'
import QQMapWX from "@/tn/utils/qqmap-wx-jssdk.min.js";
import { MAP_KEY } from '@/api/constants';
import { SettingConfig, Area } from "@/api/constants/index.ts";
import type { Category } from '@/api/interfaces/category'
import { Post } from '@/api/interfaces/post'

export const useSubPage = () => {
  const instance = getCurrentInstance()
  // 顶部轮播图
  const swiperData = ref<string[]>([
    'https://resource.tuniaokj.com/images/swiper/ad2.jpg',
    'https://resource.tuniaokj.com/images/swiper/ad3.jpg',
    '',
    '',
  ])
  const dataList = ref<Post[]>([
    {
      id: '1',
      title: 'pictu',
      content: 'i like that',
      imgs: ['https://resource.tuniaokj.com/images/swiper/ad1.jpg'],
      action: {
        likes: 23,
        comments: 23,
      },
      createUser: {
        id: '12',
        name: 'pilao',
        avatar: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
      }
    },
    {
      id: '2',
      title: 'pict顶顶顶u',
      content: 'i like that this is a goood resturant!! its worthy of trying.',
      imgs: ['https://resource.tuniaokj.com/images/swiper/ad3.jpg'],
      action: {
        likes: 0,
        comments: 10,
      },
      createUser: {
        id: '42',
        name: 'pilao',
        avatar: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
      }
    },
    {
      id: '3',
      title: '杨大爷麻辣香肠腊肠500克四川特产烟熏肉农家自制川味烤腊肉辣肠',
      content: 'i like that this is a goood resturant!! its worthy of trying.',
      imgs: ['https://gw.alicdn.com/bao/uploaded/i2/1848622920/O1CN018zBHJ91XRPJ4bHW78_!!0-item_pic.jpg_320x320q90.jpg'],
      action: {
        likes: 0,
        comments: 10,
      },
      createUser: {
        id: '42',
        name: 'pilao',
        avatar: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
      }
    },
    {
      id: '4',
      title: '带盖 酸奶杯一次性塑料布丁杯胖胖pp果冻杯慕斯甜品杯双皮奶100套',
      content: 'i like that this is a goood resturant!! its worthy of trying.',
      imgs: ["https://gw.alicdn.com/imgextra/i4/2207613550143/O1CN01hPpOvy1CvXQdlZLeC_!!2207613550143-0-alimamacc.jpg_q90.jpg"],
      action: {
        likes: 0,
        comments: 10,
      },
      createUser: {
        id: '42',
        name: 'pilao',
        avatar: 'https://resource.tuniaokj.com/images/swiper/ad5.jpg'
      }
    }
  ])

  const tabs = ref([
    { key: '1', title: '选项1' },
    { key: '2', title: '选项2' },
    { key: '3', title: '选项3' },
    { key: '4', title: '选项4' },
    { key: '5', title: '选项4' },
    { key: '6', title: '选项4' },
    { key: '7', title: '选项4' },
    { key: '8', title: '选项4' },
    { key: '9', title: '选项4' },
    { key: '10', title: '选项4' },
    { key: '72', title: '选项4' },
  ])
  const explore_show = ref(false);

  const typeTabs = ref([
    {
      id: '1',
      label: '商家'
    }, {
      id: '2',
      label: '个人'
    }, {
      id: '3',
      label: '活动'
    }
  ]);
  const handleTypeChange = (key: string | number) => {
    console.log(key)
  }
  function goDetail(id: string) {

  }

  function handleCitySelect() {
    city_show.value = !city_show.value
    // uni.$tm.u.routerTo('/subpages/post/area/area');    
  }

  const queryForm = ref({
    model: {
      // categoryId: uni.$tm.u.getCookie(localstorageKeyConst.CUR_CATEGORY).id,
    },
    size: 10,
    current: 1,
  });

  onMounted(() => {
  })

  const handleTabsChange = (key: string | number) => {
    console.log(key)
  }

  const curLocation = ref({ latitude: 0, longitude: 0});
const selectedArea = ref(uni.$tm.u.getCookie(Area) || "北京市");
const selectedCity = ref({str:'',arr:[]});
const city_show = ref(false);

  const onLoad: IndexPageOnLoadFunc = () => {
    uni.authorize({
      scope: 'scope.userLocation',
      success() {
        const qqmapsdk = new QQMapWX({
          key: MAP_KEY
        });
        qqmapsdk.reverseGeocoder({
          location: "",
          fail: function (res) {
            console.log(res)
          },
          success: function (res) {
            let info = res.result;
            selectedArea.value=info.ad_info.city;
            curLocation.value.latitude = info.location.latitude;
            curLocation.value.longitude = info.location.longitude;
          },
        });
        // uni.getLocation({
        //   type: 'gcj02',
        //   success: function (res) {
        //     curLocation.value.latitude = res.latitude;
        //     curLocation.value.longitude = res.longitude;
        //     console.log('当前位置的经度：' + res.longitude);
        //     console.log('当前位置的纬度：' + res.latitude);

          

        //   },
        //   fail: function (res) {
        //     uni.$tm.u.toast('获取当前位置失败！')
        //   }
        // });
      }
    });
    // mock();
  }

  const markers = ref([]);
  function mock() {
    markers.value = [{
      distance: 0.05828283926096898,
      id: 27595,
      latitude: "22.568887404083515",
      longitude: "113.88770606927332",
      title: '玄妙的',
      width: 35,
      height: 35,
    },
    {
      distance: 0.05828283926096898,
      id: 27595,
      latitude: "22.568382855230592",
      longitude: "113.8894362439249",
      title: '玄妙的',
      width: 35,
      height: 35,
    }
    ];
    curLocation.value.latitude = 22.568887404083515
    curLocation.value.longitude = 113.88770606927332
  }

  function handleRegionChange(e) {

  }
  useSubPageProvide(0, {
    onLoad,
  })

  return {
    curLocation,
    markers,
    city_show,
    handleRegionChange,
    selectedCity,
    swiperData,
    dataList,
    tabs,
    explore_show,
    handleTabsChange,
    goDetail,
    handleCitySelect,
    selectedArea,
    typeTabs,
    handleTypeChange
  }
}
