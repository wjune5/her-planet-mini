import { commonApi } from "./common-api";

/*
 * file
 *
 * @Author:    wjune
 * @Date:      2024-10-17
 */
export const fileApi = {
    delete: (param:Array<string>) => {
      return commonApi.delete('/file', param);
    },
    add: (param:object={}) => {
      return commonApi.add('/file', param);
    },
    detail: (id:string) => {
      return commonApi.detail('/file', id);
    },
    update: (params:object) => {
      return commonApi.update('/file', params);
    }
};
  