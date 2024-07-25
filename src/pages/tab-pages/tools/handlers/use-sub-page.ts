// import { getCurrentInstance, onMounted, ref } from 'vue'
// import { tnNavPage } from '@tuniao/tnui-vue3-uniapp/utils'
// import { useSubPageProvide } from '../../../composables'
// import type { NavbarRectInfo } from '@tuniao/tnui-vue3-uniapp/components/navbar'
// import type { IndexPageOnLoadFunc, IndexPageOnScrollFunc } from '../../../types'
// import type { Task } from '@/api/interfaces/task'

// import { useScrollTransparentNavbar } from '@tn-/hooks'

// export const useSubPage = () => {
//   const instance = getCurrentInstance()

//   // 任务列表
//   const list = ref<Task[]>();


//   // 顶部轮播图
//   const swiperData = ref<string[]>([
//     'https://resource.tuniaokj.com/images/swiper/ad2.jpg',
//     'https://resource.tuniaokj.com/images/swiper/ad3.jpg',
//     'https://resource.tuniaokj.com/images/swiper/ad4.jpg',
//     'https://resource.tuniaokj.com/images/swiper/ad5.jpg',
//   ])

//   // 热门案例
//   const hotCaseData = ref<string[]>([
//     'https://resource.tuniaokj.com/images/blogger/content_1.jpeg',
//     'https://resource.tuniaokj.com/images/blogger/onepiece-1.jpg',
//     'https://resource.tuniaokj.com/images/blogger/onepiece-2.jpg',
//   ])

//   const {
//     triggerElementId,
//     navbarOpacity,
//     init: initTransparentScroll,
//     updateTargetTriggerValue,
//     opacityScrollHandle,
//   } = useScrollTransparentNavbar(instance)

//   onMounted(() => {
//     initTransparentScroll()
//   })

//   // 顶部导航栏初始化完成事件
//   const navbarInitFinishHandle = (info: NavbarRectInfo) => {
//     updateTargetTriggerValue(info.height)
//   }

//   // 跳转到关于图鸟页面
//   const navAboutPage = () => {
//     tnNavPage('/tuniao/about/index')
//   }

//   // 跳转到搜索页面
//   const navSearchPage = () => {
//     tnNavPage('/home-page/search/index')
//   }

//   const onLoad: IndexPageOnLoadFunc = () => {
//     // eslint-disable-next-line no-console
//     // uni.$tm.fetch.post();
//     list.value = [
//       {
        
//       }
//     ];
//   }
//   const onScroll: IndexPageOnScrollFunc = ({ top }) => {
//     opacityScrollHandle(top)
//   }

//   useSubPageProvide(0, {
//     onLoad,
//     onScroll,
//   })

//   return {
//     triggerElementId,
//     navbarOpacity,
//     swiperData,
//     hotCaseData,
//     tnNavPage,
//     navbarInitFinishHandle,
//     navAboutPage,
//     navSearchPage,
//   }
// }
