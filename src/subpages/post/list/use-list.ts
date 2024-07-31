import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

export const useList = () => {
    // 输入框的值
    const searchValue = ref<string>('');
    onLoad((options) => {
        searchValue.value = options.s;
    })

    // 历史记录点击事件
    const historyClickHandle = (value: string) => {
        searchValue.value = value
    }

    function goDetail(id:string) {
        uni.$tm.u.routerTo('/subpages/post/detail/detail?id='+id)
    }
    return {
        searchValue,
        historyClickHandle,
        goDetail
    }
}