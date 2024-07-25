import { getCurrentInstance, onMounted, ref } from 'vue'
import { useSubPageProvide } from '../../../index/handlers'
import type { IndexPageOnLoadFunc, IndexPageOnScrollFunc } from '../../../types'
import type { Category } from '@/api/interfaces/category'

import { useScrollTransparentNavbar } from '@/tn/hooks'
import { Post } from '@/api/interfaces/post'

export const useSubPage = () => {
  const instance = getCurrentInstance()
  
  const cards = ref([
    { key: '1', title: '地点', description:'标记令你感到舒适的女性友好空间，如全女民宿，全女酒吧，女性友好健身房、女性主义书店', state:true },
    { key: '2', title: '个人从业者',description:'推荐令你信任的女性从业者，例如司机、维修工、理发师、健身教练、驾校陪练…', state:true },
    { key: '3', title: '活动',description:'（暂不开放）分享身边的女性友好活动，例如全女观音、读书会、徒步旅行团…', state:false },
    { key: '4', title: '商家入驻',description:'（暂不开放）女性经营者信息认证', state:false },
  ])
  const explore_show = ref(false);
  function handleAdd(index: number) {
    if(index ==0) {
      uni.$tm.u.routerTo('/subpages/mark/store/index')

    } else if (index == 1) {
      uni.$tm.u.routerTo('/subpages/mark/person/index')

    }
  }
  const {
    triggerElementId,
    navbarOpacity,
    init: initTransparentScroll,
    updateTargetTriggerValue,
    opacityScrollHandle,
  } = useScrollTransparentNavbar(instance)

  onMounted(() => {
    initTransparentScroll()
  })


  const handleTabsChange = (key: string | number) => {
    console.log(key)
  }


  const onLoad: IndexPageOnLoadFunc = () => {
    // eslint-disable-next-line no-console
    console.log('pageA onLoad')
  }


  return {
    triggerElementId,
    navbarOpacity,
    cards,
    explore_show,
    handleAdd
  }
}
