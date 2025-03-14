import { getCurrentInstance, onMounted, ref, computed } from 'vue'
import type { Category, Tag } from '@/api/interfaces/category'

import * as dayjs from '@/tmui/tool/dayjs/esm/index'

export const useSubPage = () => {
	const instance = getCurrentInstance()
	const DayJs = dayjs.default
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
		id: '1',
		name: '女老板',
		color: 'primary'
	}]);
	const show = ref({
		categoryIndex: [],
		picker_category_show: false,
		city: false,
		biz_time_show: false
	})
	const modelForm = ref({
		title: '',
		category: '',
		tags: [],
		phone: '',
		city: [],
		address: '',
		latitude: 0,
		longitude: 0,
		other: '',
		description: '',
		businessTime: '',
		fileList: [],
		anonymous: false
	});
	// === business time BEGIN ===

	const dayList = ref<Array<Tag>>([{
		id: '1',
		name: '每日营业'
	},
	{
		id: '2',
		name: '选择营业日'
	}]);

	const dayList2 = ref<Array<Tag>>([{
		id: '1',
		name: '全天'
	},
	{
		id: '2',
		name: '选择时间段'
	}]);
	const week = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日'])
	const businessDayType = ref(1);
	const businessTimeType = ref(1);
	const businessDay = ref([1, 2, 3, 4, 5]);
	const businessTime = ref(['2024/07/21 8:00:00', '2024/07/21 18:00:00']);
	const businessTime_str_ar = ref(['2024/07/21 8:00:00', '2024/07/21 18:00:00']);
	const businessTime_str_format = computed(() => {

		// let time = [];
		// for (let i = 0; i < 2; i++) {
		// 	time[i] = businessTime_str_ar.value[i].substring(11,16);
		// }
		if (confirm_value.value) {
			return businessTime_str_ar.value.join('-');
		} else {
			return '08:00 - 18:00';
		}
	});
	const bizTimeStr = computed(() => {
		let tmp = [];
		for (let i = 0; i < businessDay.value.length; i++) {
			tmp[i] = week.value[businessDay.value[i]];
		}
		return tmp.join('、') + ' ' + businessTime_str_format.value;
	})

	const confirm_value = ref(false);
	function handleBusinessDayTypeChange(e: any) {
		console.log(e)
		console.log(modelForm.value)
	}
	// === business time END ===

	const success_show = ref(false);
	const confirm = (e) => {
		console.log(e)
		console.log(modelForm.value)
		success_show.value = true;

		modelForm.value = {
			title: '',
			category: '',
			tags: null,
			phone: '',
			city: [],
			address: '',
			latitude: 0,
			longitude: 0,
			other: '',
			description: '',
			businessTime: '',
			fileList: [],
			anonymous: false
		};
	}
	const cityStr = ref('');
	const handleSelectCity = () => {
		show.value.city = !show.value.city;
	}

	const openMap = () => {
		uni.getLocation({
			type: 'gcj02',
			success(res) {
				uni.chooseLocation({
					latitude: res.latitude,
					longitude: res.longitude,
					success: (res) => {
						let addr = getAddress(res.address);
						// console.log(addr)

						modelForm.value.address = addr.groups.village;
						modelForm.value.title = res.name;
						//提取地址中的城市
						modelForm.value.latitude = res.latitude;
						modelForm.value.longitude = res.longitude;
					},
					fail: (err) => {
						console.log(err)
						uni.showModal({
							content: '打开地图失败！'
						})
					},
				})
			},
		})

	}

	function getAddress(val: string) {
		// let reg = /.+?(省|市|自治区|自治州|县|区)/g;
		// let reg = /^(.*?省|.*?自治区)(.*?市)?(.*?区|.*?县)?(.*)/g;
		// return val.match(reg);
		var regex = "(?<province>[^省]+省|[^自治区]+自治区|.+市)(?<city>[^自治州]+自治州|.+区划|[^市]+市|.+区)?(?<county>[^市]+市|[^县]+县|[^旗]+旗|.+区)?(?<town>[^区]+区|.+镇)?(?<village>.*)";
		var address = val;
		return address.match(regex);
	}
	function handleAnonyChange(e) {
		// modelForm.value=e;
		console.log(e)
	}
	const checked = ref(false);
	return {
		show,
		modelForm,
		tagList,
		categoryList,
		handleSelectCity,
		cityStr,
		dayList,
		dayList2,
		businessDayType,
		businessTimeType,
		businessDay,
		businessTime,
		businessTime_str_ar,
		businessTime_str_format,
		bizTimeStr,
		confirm_value,
		handleBusinessDayTypeChange,
		openMap,
		week,
		confirm,
		success_show,
		handleAnonyChange,
		checked
	}
}
