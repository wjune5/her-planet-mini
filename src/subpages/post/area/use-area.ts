import { ref, ssrContextKey } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { SearchHistoryKey } from '@/api/constants'
import { Area } from '@/api/interfaces/post'

export const useArea = () => {

    const areaList = ref<Area[]>([]);
    const Alphabet = ref(['A']);
    const secondList = ref<Area[]>([]);
    onLoad(() => {
        areaList.value = [
            { name: "科研", id: '1' },
            { name: "餐食", id: '2' },
            { name: "住房", id: '3' },
            { name: "穿着", id: '4', extra: {icon:"tmicon-md-chatboxes"} },
            { name: "出行", id: '5' },
            { name: "动物", id: '6' },
        ]
    })

    const l1AreaHandle = (item) => {
        // second level
        // item.id
        secondList.value=[{
            id:'12',
            name:'导师'
        }, {
            id:'1',
            name:'学校'
        }]
        console.log(item)
    }
    return {
        l1AreaHandle,
        areaList,
        secondList
    }
}