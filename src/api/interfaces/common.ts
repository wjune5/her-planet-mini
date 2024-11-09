export interface PageParams<T> {
    model: T;
    size: number;
    current: number;
    sort?: string;
    order?: string;
    extra?: any;
  }
  
  export interface PageResult<T> {
    records: T[];
    offset: number;
    pages: number;
    current: number;
    total: number;
    size: number;
    orders: any[];
  }
  const SORT_FIELD = 'sort';
 const ORDER_FIELD = 'order';
  const PAGE_PARAMS = Object.values({
    // 传给后台的当前页字段
    pageField: 'current',
    // 传给后台的每页显示多少条的字段
    sizeField: 'size',
    // 接口返回表格数据的字段
    listField: 'records',
    // 接口返回表格总数的字段
    totalField: 'total',
    // 传给后台用于排序的字段
    sortField: SORT_FIELD,
    // 传给后台用于排序指定asc/desc的字段
    orderField: ORDER_FIELD,
  })

export const handleFetchParams = (data: any) => {
    const tempData = { model: {}, extra: {} };
    const model = {};
    for (const key in data) {
      if (PAGE_PARAMS.includes(key)) {
        tempData[key] = data[key];
        if (key === SORT_FIELD && Array.isArray(data[SORT_FIELD])) {
          if (data[SORT_FIELD][0] === 'echoMap') {
            tempData[key] = data[SORT_FIELD][1];
          } else {
            tempData[key] = data[SORT_FIELD][0];
          }
        }
      } else if (key.endsWith(',desc')) {
        model[key.split(',desc')[0]] = data[key];
      } else if (key.startsWith('echoMap,')) {
        const tempK = key.split('echoMap,')[1];
        model[tempK.split(',')[0]] = data[key];
      } else if (key === 'createTimeRange') {
      } else {
        model[key] = data[key];
      }
    }
    if (data?.createTimeRange) {
      tempData.extra = {
        createdTime_st: data.createTimeRange[0],
        createdTime_ed: data.createTimeRange[1],
      };
    }
    tempData.model = model;
    return tempData;
  };