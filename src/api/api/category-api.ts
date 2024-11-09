import { commonApi } from "./common-api";

/*
 * category
 *
 * @Author:    wjune
 * @Date:      2024-10-17
 */
export const categoryApi = {
    delete: (param:Array<string>) => {
      return commonApi.delete('/category', param);
    },
    add: (param:object={}) => {
      return commonApi.add('/category', param);
    },
    detail: (id:string) => {
      return commonApi.detail('/category', id);
    },
    list: (param:object={}) => {
      return commonApi.page('/category', param);
    },
    update: (params:object) => {
      return commonApi.update('/category', params);
    }
};
  