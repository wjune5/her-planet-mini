import { fetchConfig,fetchConfigMethod } from './interface';
import { useTmpiniaStore } from "@/tmui/tool/lib/tmpinia";
import {
    COOKIE_REFRESH_TOKEN_KEY,
    COOKIE_TOKEN_KEY,
    COOKIE_TOKEN_EXP_KEY,
  } from "@/api/constants/cookie-const";
let config:fetchConfig={
    url:"",
    data:{},
	statusCode:200,
    header:{
        // "content-type":"application/json"
    },
    method:"POST",
    timeout:60000,
    dataType:"json",
    responseType:"text",
    sslVerify:true,
    withCredentials:false,
    firstIpv4:false
}

function request(cog:fetchConfig = config,complete?:Function,beforeRequest?:Function,afterRequest?:Function):Promise<UniApp.GeneralCallbackResult|UniApp.RequestSuccessCallbackResult>{
    let newConfig = {...config,...cog}
    const store = useTmpiniaStore();
    return new Promise(async (resolve,reject)=>{
        if(typeof beforeRequest === 'function'){
            let opts = await beforeRequest(newConfig);
            if(typeof opts !=='object'){
                opts = {};
            }
            newConfig = {...newConfig,...opts};
        }
        uni.request({
            url:"http://127.0.0.1:8760/x"+newConfig.url||"",
            data:newConfig.data,
            header:newConfig.header,
            method:newConfig.method,
            timeout:newConfig.timeout,
            dataType:newConfig.dataType,
            responseType:newConfig.responseType,
            sslVerify:newConfig.sslVerify,
            withCredentials:newConfig.withCredentials,
            firstIpv4:newConfig.firstIpv4,
            async success(result) {
				
				if(result.statusCode !==newConfig?.statusCode){
                    if(result.statusCode===401||result.data.code==401||result.data.code == 40001 || result.data.code == 40008) {
                        store.logout();
                        uni.$tm.u.delCookie(COOKIE_TOKEN_KEY);
                        uni.$tm.u.delCookie(COOKIE_REFRESH_TOKEN_KEY);
                        uni.$tm.u.delCookie(COOKIE_TOKEN_EXP_KEY);
                        uni.redirectTo({url:'/pages/login/login'});
                    }
                    uni.$tm.u.toast(result.data.msg);
					reject(result)
					return;
				}
                if(typeof afterRequest === 'function'){
                    let opts = await afterRequest(result);
                    
					try{
						if(typeof opts !=='object'){
						    opts = result;
						}
						if(typeof opts ==='object' && Object.keys(opts)?.length==0){
						    opts = result;
						}
					}catch(e){
						console.error('tmui:',e)
					}
                    result = {...opts};
                }
                if(result.data.code==0) {
                    resolve(result.data);
                } else {
                    uni.$tm.u.toast(result.data.msg);
                    reject(result);
                }
            },
            fail(result) {
                reject(result)
            },
            complete(result) {
                if(typeof complete === "function"){
                    complete(result)
                }
            },
        })
    })
}
const CLIENT_HEADER = 'Authorization';
const TOKEN_HEADER = 'token';
var beforeRequest:Function = (val:fetchConfig)=>{
    // 在发送请求之前消息头加入token token
    const token = uni.$tm.u.getCookie(TOKEN_HEADER);
    if (token) {
      config.header[TOKEN_HEADER] = 'Bearer ' + token;
    } else {
      delete config.header[TOKEN_HEADER];
    }
    // const clientId = 'up_mini';
    // const clientSecret = 'up_mini_secret';
    // #ifdef MP-WEIXIN
    // config.header[CLIENT_HEADER] = `${encode(`${clientId}:${clientSecret}`)}`;
    // #endif
    // #ifndef MP-WEIXIN
    // config.header[CLIENT_HEADER] = `${window.btoa(`${clientId}:${clientSecret}`)}`;
    // #endif
    // 当前请求地址#号后的路径，需要用户后台判断该页面的数据权限

    // config.headers[PATH_HEADER] = (router && router.history && router.history.current) ? router.history.current.fullPath : '';
    return config;
};
var afterRequest:Function = (val:fetchConfig)=>val;
export class fetchNet {

    /**
     * 构建新的请求
     * @param cog 请示配置见：fetchConfig
     * @param beforeRequest 访问前执行的函数，可以是Promise,你可以对执行前的参数进行修改之类的，将以你最新的修改参数为准进行请求。
     * @param afterRequest 访问后执行的函数，可以是Promise,提供请示后的数据，你可以在这里修改，返回，这样所有请求的数据返回后都为返回你修改后的数据。
     */
    constructor(cog:fetchConfig,beforeRequestFun?:Function,afterRequesFunt?:Function){
        config = {...config,...(cog||{})};
        if(typeof beforeRequestFun == 'function'){
            beforeRequest = beforeRequestFun;
        }
        if(typeof afterRequesFunt == 'function'){
            afterRequest = afterRequesFunt;
        }
    }
    static get(url:string,data:object={},opts:fetchConfig={}){
        let cfg:fetchConfig =  {...config,...(opts||{}),url:url,method:"GET",data:data};
        return request(cfg)
    }
    static post(url:string,data:object={},opts:fetchConfig={}){
        let cfg:fetchConfig =  {...config,...(opts||{}),url:url,method:"POST",data:data};
        return request(cfg)
    }
    /**
     * 请求
     * @param cog 配置
     * @param complete 访问结束后执行的函数
     */
    static async request(cog:fetchConfig = config,beforeFun?:Function,afterFun?:Function,complete?:Function){
        let newConfig = {...config,...cog}
        if(typeof beforeFun == 'function'){
            let testFun = await beforeFun();
            let cb:UniApp.GeneralCallbackResult = {errMsg:"中止请求"}
            if(!testFun) return cb;
        }
        return request(newConfig,complete,(beforeFun||beforeRequest),(afterFun||afterRequest));
    }
}
