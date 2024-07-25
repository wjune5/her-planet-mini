import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { SearchHistoryKey } from '@/api/constants'

export const useSearch = () => {
    // 输入框的值
    const searchValue = ref<string>('');
    // 最近搜索历史记录
    const historyList = ref<string[]>([]);
    onLoad(() => {
        const historyData = uni.$tm.u.getCookie(SearchHistoryKey);
        if (historyData) {
            historyList.value = historyData
        }
    })
    // 搜索提交事件
  const searchConfirmHandle = () => {
    if (!searchValue.value) return
    addHistory(searchValue.value)
    uni.$tm.u.routerTo("/subpages/post/list/list?s="+searchValue.value);
  }

  // 历史记录点击事件
  const historyClickHandle = (value: string) => {
    searchValue.value = value
    searchConfirmHandle();
  }

  // 添加记录到搜索历史
  const addHistory = (value: string) => {
    // 如果已经存在，则不进行操作
    if (historyList.value.includes(value)) {
      return
    }
    // 最大只能存储 10 条记录，超过则删除最后一条
    if (historyList.value.length >= 10) {
      historyList.value.pop()
    }
    // 添加到第一条
    historyList.value.unshift(value)
    // 保存到本地
    uni.$tm.u.setCookie(SearchHistoryKey, historyList.value)
  }

  // 清除全部搜索历史
  const clearHistory = () => {
    uni.showModal({
      title: '提示',
      content: '确认清除搜索历史记录吗?',
      showCancel: true,
      success: ({ confirm }) => {
        if (confirm) {
          historyList.value = []
          uni.$tm.u.delCookie(SearchHistoryKey)
        }
      },
    })
  }
  return {
    searchValue,
    historyList,
    searchConfirmHandle,
    historyClickHandle,
    clearHistory,
  }
}