import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

export const useComment = () => {
    const modelForm = ref({comment:'',fileList:''});
    onLoad((options) => {
    })

    // 历史记录点击事件
    const historyClickHandle = (value: string) => {
    }

    function confirm() {

    }
    return {
        onStart,completeFile
        confirm,modelForm
    }
}