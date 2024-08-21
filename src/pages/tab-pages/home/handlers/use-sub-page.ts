import { getCurrentInstance, onMounted, ref, nextTick } from 'vue'
import { useSubPageProvide } from '../../../index/handlers'
import type { IndexPageOnLoadFunc, IndexPageOnScrollFunc, IndexPageOnShowFunc } from '../../../types'
import QQMapWX from "@/tn/utils/qqmap-wx-jssdk.min.js";
import { MAP_KEY } from '@/api/constants';
import { SettingConfig, Area } from "@/api/constants/index.ts";
import type { Category } from '@/api/interfaces/category'
import { Post } from '@/api/interfaces/post'

export const useSubPage = () => {
  const instance = getCurrentInstance()
  const qqmapsdk = new QQMapWX({
    key: MAP_KEY
  });
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
      content: '我喜欢这个，不错',
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
      content: '我喜欢这个，不错',
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
      content: '我喜欢这个，不错',
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
    uni.$tm.u.routerTo('/subpages/post/detail/detail?id=' + id)
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

  const curLocation = ref({ latitude: 0, longitude: 0 });
  const meLocation = ref('北京市');
  // uni.$tm.u.getCookie(Area) || 
  const selectedArea = ref("北京市");
  const selectedCity = ref({ str: '', arr: [] });
  function handleCityPick() {
    selectedArea.value = selectedCity.value.arr[1];
    console.log(selectedCity.value)
    qqmapsdk.geocoder({
      address: selectedCity.value.str, //地址参数，例：固定地址，address: '北京市海淀区彩和坊路海淀西大街74号'
      success: function (res) {
        var res = res.result;
        var latitude = res.location.lat;
        var longitude = res.location.lng;
        //根据地址解析在地图上标记解析地址位置
        uni.createMapContext("map", instance).moveToLocation({
          latitude: latitude,
          longitude: longitude
        });
        // let markers = [{
        //   id: 0,
        //   title: res.title,
        //   latitude: latitude,
        //   longitude: longitude,
        //   width: 20,
        //   height: 20,
        //   callout: { //可根据需求是否展示经纬度
        //     content: latitude + ',' + longitude,
        //     color: '#000',
        //     display: 'ALWAYS'
        //   }
        // }]

        // console.log(markers)
      },
      fail: function (error) {
        console.error(error);
      }
    })

    // uni.$tm.u.setCookie(Area, selectedCity.value.arr[1])
  }
  const city_show = ref(false);

  const onLoad: IndexPageOnLoadFunc = () => {

    // mock();
  }

  const onShow: IndexPageOnShowFunc = () => {
    uni.getSetting({
      success: (res) => {
        if (!res.authSetting['scope.userLocation']) {
          uni.authorize({
            scope: 'scope.userLocation',
            success() {
              getLoc();
            },
            fail: () => {
              uni.showModal({
                title: '提示',
                content: '若不授权，将无法使用地图功能',
                cancelText: '不授权',
                confirmText: '授权',
                success(result) {
                  if (result.confirm) {
                    uni.openSetting({
                      success(res) {
                        getLoc();
                      }
                    }
                    )
                  }
                },
                fail(err) {
                  // TODO 不授权
                }
              })
            }
          });
        } else {
          getLoc();
        }
      },
      fail(err) {
        uni.showModal({
          title: '提示',
          content: '若不授权，将无法使用地图功能',
          cancelText: '不授权',
          confirmText: '授权',
          success(result) {
            if (result.confirm) {
              uni.openSetting({
                success(res) {
                  getLoc();

                }
              }
              )
            }
          },
        })
      }
    })

  }

  function getLoc() {
    uni.getLocation({
      type: 'gcj02',
      success: function (lres) {
        curLocation.value.latitude = lres.latitude;
        curLocation.value.longitude = lres.longitude;
        getGeocoder(lres.latitude, lres.longitude);
        nextTick(() => {
          meLocation.value = selectedArea.value;
        })
      },
      fail: function (res) {
        uni.$tm.u.toast('获取当前位置失败！')
      }
    });

  }

  function getGeocoder(latitude: number, longitude: number) {
    qqmapsdk.reverseGeocoder({
      location: { latitude: latitude, longitude: longitude },
      fail: function (qqErr: any) {
        // console.log(qqErr)
      },
      success: function (mapRes) {
        // console.log(mapRes)
        let info = mapRes.result;
        // console.log(info)
        selectedArea.value = info.ad_info.city;
        // curLocation.value.latitude = info.location.lat;
        // curLocation.value.longitude = info.location.lng;
        // meLocation.value.latitude = info.location.lat;
        // meLocation.value.longitude = info.location.lng;
        loading_show.value=false
      },
    });
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

  const loading_show=ref(false);
  function handleRegionChange(e) {
    if (e.type == 'end' && selectedCity.value.str!='') {
      loading_show.value=true;
      uni.createMapContext("map", instance).getCenterLocation({
        success(result) {
          uni.$tm.u.throttle(()=>getGeocoder(result.latitude, result.longitude),2000);
        },
      });
    }
  }

  function locateMe() {
    uni.createMapContext("map", instance).moveToLocation({
      latitude: curLocation.value.latitude,
      longitude: curLocation.value.longitude
    });
    selectedArea.value = meLocation.value;
  }
  useSubPageProvide(0, {
    onLoad,
    onShow,
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
    handleTypeChange,
    handleCityPick,
    locateMe,
    loading_show
  }
}
