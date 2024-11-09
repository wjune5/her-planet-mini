import { commonApi, urlPrefix } from "./common-api";

/*
 * tag
 *
 * @Author:    wjune
 * @Date:      2024-08-23
 */
function set() {}
export const tagApi = {
    ...commonApi,urlPrefix,
    delete: (param:Array<string>) => {
      return uni.$tm.fetch.request({url:'/tag',method:'DELETE',data:param});
    },
    add: (param:object={}) => {
      return uni.$tm.fetch.post('/tag', param);
    },
    detail: (id:string) => {
      return uni.$tm.fetch.get(`/tag/${id}`);
    },
    update: (params:object) => {
      return uni.$tm.fetch.request({url:'/tag',method:'PUT',data:params});
    }
};
  