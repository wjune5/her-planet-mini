import { commonApi } from "./common-api";

/*
 * post
 *
 * @Author:    wjune
 * @Date:      2024-10-16
 */
export const postsApi = {
    delete: (param:Array<string>) => {
      return commonApi.delete('/tag', param);
    },
    add: (param:object={}) => {
      return commonApi.add('/tag', param);
    },
    detail: (id:string) => {
      return commonApi.detail('/tag', id);
    },
    update: (params:object) => {
      return commonApi.update('/tag', params);
    }
};
  