/*
 * 帐户
 *
 * @Author:    wjune
 * @Date:      2024-08-06 23:41
 */
export const accountApi = {
    delete: (param:Array<string>) => {
      return uni.$tm.fetch.request({url:'/member',method:'DELETE',data:param});
    },
    add: (param:object={}) => {
      return uni.$tm.fetch.post('/member', param);
    },
    detail: (id:string) => {
      return uni.$tm.fetch.get(`/member/${id}`);
    },
    update: (params:object) => {
      return uni.$tm.fetch.request({url:'/member',method:'PUT',data:params});
    },
    updatePassword: (params:object) => {
      return uni.$tm.fetch.request({url:'/member-auth/reset',method:'PUT',data:params});
    },
    login:(params:object) => {
      return uni.$tm.fetch.get('/member/anyTenant/wx/login',{id:params});
    },
};
  