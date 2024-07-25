import { getCurrentInstance, onMounted, ref } from 'vue'
import { useSubPageProvide } from '../../../index/handlers'
import type { IndexPageOnLoadFunc, IndexPageOnScrollFunc } from '../../../types'

import QQMapWX from "@/tn/utils/qqmap-wx-jssdk.min.js";
import { MAP_KEY } from '@/api/constants';
import { useScrollTransparentNavbar } from '@/tn/hooks'
import { Msg } from '@/api/interfaces/msg'

export const useSubPage = () => {
    const instance = getCurrentInstance()

    const tabs = ref([
        { key: '1', title: '我推荐的' },
        { key: '2', title: '我收藏的' },
        { key: '3', title: '我去过的' }
    ])
    function goDetail(id: string) {
        uni.$tm.u.routerTo('/subpages/post/detail/detail?id=' + id);
    }
    const handleTabsChange = (key: string | number) => {
        console.log(key)
    }
    type NavbarRectInfo = {
        statusHeight: number
        height: number
    }
    function getData() {
        
    }

    const curLocation = ref({ latitude: 0, longitude: 0 });
    function getCurLocation() {
        uni.authorize({
            scope: 'scope.userLocation',
            success() {
                uni.getLocation({
                    type: 'gcj02',
                    success: function (res) {
                        curLocation.value.latitude = res.latitude;
                        curLocation.value.longitude = res.longitude;
                    },
                    fail: function (res) {
                        uni.$tm.u.toast('获取当前位置失败！')
                    }
                });
            }
        });
    }
    function getDistance(latitude:number, longitude:number) {
        const qqmapsdk = new QQMapWX({
            key: MAP_KEY
        });
        qqmapsdk.calculateDistance({
            mode: 'straight',
            from: {
                latitude:curLocation.value.latitude,
                longitude: curLocation.value.longitude
            },
            to: {
                latitude:latitude,
                longitude:longitude
            },
            success: function(res) {
                    let info = res.result;
                    let dis = [];
                    for (var i = 0; i < info.elements.length; i++) {
                      dis.push(res.elements[i].distance); //将返回数据存入dis数组
                    }
                },
        });
    }
    const onLoad: IndexPageOnLoadFunc = () => {
    }

    useSubPageProvide(0, {
        onLoad,
    })

    return {
        tabs,
        goDetail,
        handleTabsChange
    }
}
