<template>
	<view
		class="flex"
		:class="[props.direction == 'row' ? 'flex-row' : 'flex-col', props.direction == 'customCol' ? '' : _align]"
		:style="{ flexWrap: props.direction == 'customCol' ? 'nowrap' : 'wrap' }"
	>
		<slot></slot>
	</view>
</template>
<script lang="ts" setup>
import { computed, nextTick, provide, ref, watch, getCurrentInstance, inject, toRaw, PropType, reactive, Ref } from 'vue'
import { inputPushItem, rulesItem } from './../tm-form-item/interface'
const emits = defineEmits(['update:modelValue', 'change'])
const proxy = getCurrentInstance()?.proxy ?? null
const props = defineProps({
	disabled: {
		type: Boolean,
		default: false
	},
	//最大选中数量。
	max: {
		type: Number,
		default: 999
	},
	defaultValue: {
		type: Array,
		default: () => []
	},
	align: {
		type: String as PropType<'left' | 'center' | 'right'>,
		default: 'left'
	},
	modelValue: {
		type: Array,
		default: () => []
	},
	direction: {
		type: String as PropType<'row' | 'col' | 'customCol'>,
		default: 'row' //row横排，col为竖排。customCol
	},
	//模式
	/**
	 * checkbox:正常的多选样式。
	 * button:按钮单选模式
	 */
	 model: {
		type: String,
		default: 'checkbox' // checkbox,button
	},
	sort: {
        type: Boolean,
        default:false
  }
})
let _cacheBoxList: Ref<Array<string | number | boolean>> = ref([])
//去重
const _mValue = ref([...new Set([...props.defaultValue, ...props.modelValue])])
const _align = computed(() => {
	let list = {
		left: 'flex-row-center-start',
		center: 'flex-row-center-center',
		right: 'flex-row-center-end'
	}
	let listCol = {
		left: 'flex-col-center-start',
		center: 'flex-col-center-center',
		right: 'flex-col-center-end'
	}
	return props.direction == 'row' ? list[props.align] : listCol[props.align]
})
//组件唯一标识。
const checkBoxkeyId = 'tmCheckBoxGroup'
watch(
	() => props.modelValue,
	() => {
		_mValue.value = props.modelValue
	},
	{ deep: true }
)
const _maxChecked = computed(() => _mValue.value.length >= props.max ?? 0)
function pushKey(key: string | number | boolean) {
	_cacheBoxList.value.push(key)
}
function addKey(key: string | number | boolean) {
	if (_mValue.value.includes(key)) return
		// for(let i = 0; i<_mValue.value.length;i++) {
		// 	if(_mValue.value[i]>key){
		// 		_mValue.value
		// 	}
		// }
	_mValue.value.push(key)
	if(props.sort) {
	    _mValue.value.sort(function(a, b){return a-b})
	}
	emits('update:modelValue', _mValue.value)
	nextTick(() => {
		emits('change', _mValue.value)
	})
}
function delKey(key: string | number | boolean) {
	_cacheBoxList.value = _cacheBoxList.value.filter((el) => el !== key)
	_mValue.value = _mValue.value.filter((el) => el !== key)
	emits('update:modelValue', _mValue.value)
	nextTick(() => {
		emits('change', _mValue.value)
	})
}

provide(
	'tmCheckedBoxDisabled',
	computed(() => props.disabled)
)
provide('tmCheckedBoxVal', _mValue)
provide('tmCheckedBoxMax', _maxChecked)
provide('tmCheckedBoxListChildren', _cacheBoxList)
provide(
	'tmCheckboxModel',
	computed(() => props.model == 'checkbox')
)
provide('tmCheckedBoxDir', props.direction)
defineExpose({
	pushKey: pushKey,
	addKey: addKey,
	delKey: delKey,
	checkBoxkeyId: checkBoxkeyId
})
</script>
