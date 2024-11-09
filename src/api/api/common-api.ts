/*
 * common api - add, delete, detail, update
 *
 * @Author:    wjune
 * @Date:      2024-08-23
 */
export const commonApi = {
    delete: (urlPrefix:string, param:Array<string>) => {
      return uni.$tm.fetch.request({url:urlPrefix,method:'DELETE',data:param});
    },
    add: (urlPrefix:string,param:object={}) => {
      return uni.$tm.fetch.post(urlPrefix, param);
    },
    detail: (urlPrefix:string,id:string) => {
      return uni.$tm.fetch.get(`${urlPrefix}/${id}`);
    },
    page: (urlPrefix:string,param:object) => {
        return uni.$tm.fetch.post(`${urlPrefix}`);
    },
    update: (urlPrefix:string,params:object) => {
      return uni.$tm.fetch.request({url:urlPrefix,method:'PUT',data:params});
    }
};
  