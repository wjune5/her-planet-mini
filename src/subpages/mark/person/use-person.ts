import { getCurrentInstance, onMounted, ref,computed } from 'vue'
import type { Category, Tag } from '@/api/interfaces/category'

import * as dayjs from '@/tmui/tool/dayjs/esm/index'

export const usePerson = () => {
  const instance = getCurrentInstance()
  const DayJs = dayjs.default
const showCal = ref(false)
const showCity = ref(false)
const picker_category_show = ref(false)
const picker_time_show = ref(false)
const city_show = ref(false)
const biz_time_show = ref(false)
const bizTimeStr = ref('')
const pickerStr = ref('')
const categoryList = ref<Array<Category>>([
	{
		name: '餐饮',
		id: 1
	},
	{
		name: '香蕉',
		id: 2
	},
	{
		name: '李子',
		id: 3
	}
])
const tagList = ref<Array<Tag>>([{
    id:'1',
    name:'女老板'
}]);
const show = ref({
	cale: [],
	caleStr: '',
	time: '',
	radio: '', //bonaer
	pickerIndex: [],
	pickerStr: '',
	checkbox: [],
	rate: 0,
	slider: [0, 0],
	segtab: '',
	switch: '',
	upload: [],
	city: [],
	cityStr: '',
	nameuser: {
		a: ''
	},
	testff: [],
	ha: false,
	stepper:1
})
const modelForm = ref({
    title: '',
    category:'',
    tags: [],
    phone:'',
    address: '',
    other:'',
    description:'',
    businessTime:''
});

const dayList = ref<Array<Tag>>([{
    id:'1',
    name:'每日营业'
},
{
    id:'2',
    name:'选择营业日'
}]);

const dayList2 = ref<Array<Tag>>([{
    id:'1',
    name:'全天'
},
{
    id:'2',
    name:'选择时间段'
}]);
const week = ref([{
	id:'1',
	name:'周一',

}])
const businessDayType = ref(1);
const businessTimeType = ref(1);
const fileList = ref([]);
const timeStr = computed(() => (!show.value.time ? '' : DayJs(show.value.time).format('DD日 HH时')))
const caleStr = computed(() => {
	if (!show.value.cale || !Array.isArray(show.value.cale)) return ''
	if (show.value.cale.length == 0) return ''
	return DayJs(show.value.cale[0]).format('YYYY年MM月DD日')
})

const success_show = ref(false);
const confirm = (e) => {
	modelForm.value = {
		title: '',
		category:'',
		tags: [],
		phone:'',
		address: '',
		other:'',
		description:'',
		businessTime:''
	};
	success_show.value = true;
	console.log(e)
}

const handleSelectCity = () => {
	showCity.value = !showCity.value
}

  return {
    picker_category_show,
    show,
    modelForm,
    tagList,
    fileList,
    categoryList,
    handleSelectCity,
	biz_time_show,
	dayList,
	dayList2,
	businessDayType,
	businessTimeType,
	bizTimeStr,
	city_show,
	picker_time_show,
	confirm,
	success_show
  }
}
