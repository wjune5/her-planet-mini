import { defineStore} from 'pinia';
import themeColor from '../theme/theme'
import * as u from '../function/util'
import type { tmVuetify,wxshareConfig,colorThemeType,userInfo } from './interface'
let pdefault_cookies_color = u.getCookie('setTmVuetifyColor')||"";
let pdefault_cookies_black = u.getCookie('setTmVuetifyBlack')
let pdefault_cookies_local = u.getCookie('setTmVuetifyLocal')||'zh-Hans';

let pdefault_cookies_colorArrayList = u.getCookie('colorArrayList');
let dark = typeof pdefault_cookies_black === 'boolean' ? pdefault_cookies_black : false;

let themeObj = new themeColor.themeColors()
if(pdefault_cookies_colorArrayList){
	const result2 = pdefault_cookies_colorArrayList.filter((item:colorThemeType) => themeObj.colors.every(subItem => subItem.name !== item.name));
	themeObj = new themeColor.themeColors([...themeObj.colors,...result2])
}
const colorArray = themeObj.colors;
const os = uni.getSystemInfoSync()?.osName??""
u.setCookie('colorArrayList', colorArray)
// 为 store state 声明类型
export interface State {
	tmVuetify: tmVuetify
  }

export const useTmpiniaStore = defineStore('tmpinia', {
	state: () => {
		return {
			tmStore: {
				color: pdefault_cookies_color,
				dark: dark,
				tmVueTifly_pages: '',
				tmVueTifly_pagesIndex: '',
				os:os,
				//这里是微信小程序和微信H5的配置资料。
				wxshareConfig_miniMp: {
					title: '', // 分享标题
					desc: '', // 描述
					imageUrl: '', // 分享图片
					path: '', // 分享路径
					copyLink: '', // 复制链接
					query: {}, // 分享参数
				},
				//当前存储存的主题对象。
				colorList: colorArray,
				//当前的语言
				local:pdefault_cookies_local,
				userInfo:{
					token: '',
					userId: '',
					account: '',
					name: '',
					avatar:'',
					description: '',
					code:''
				}
			}
		}
	},

	actions: {
		setPageNow(url:string) {
            this.tmStore = {
				...this.tmStore,
				tmVueTifly_pages: url
			}
		},
		setPageNowIndex( index:string) {
			this.tmStore = {
				...this.tmStore,
				tmVueTifly_pagesIndex: index
			}
		},
		setTmVuetifyDark(dark:boolean) {
			dark = typeof dark !=='boolean'?false:dark;
			u.setCookie('setTmVuetifyBlack', dark)
			this.tmStore = {
				...this.tmStore,
				dark: dark
			}
			
		},
		setTmAutoDark(autoDark=false){
			u.setCookie('setTmVuetifyAutoDark',autoDark)
			this.tmuiConfig.autoDark = autoDark
			if(autoDark){
				let nowstrdark = ''
				// #ifdef H5
				if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
					nowstrdark = 'dark'
				} else {
					nowstrdark = 'light'
				}
				// #endif
			
				// #ifndef H5
				nowstrdark = uni.getSystemInfoSync()?.osTheme??''
				// #endif
				this.setTmVuetifyDark(nowstrdark=='dark'?true:false)
			}
		},
		setWxShare(cfg:wxshareConfig) {
			let pcf = cfg || {};
			if (typeof pcf !== 'object' || Array.isArray(cfg)) pcf = {};
			this.tmStore = {
				...this.tmStore,
				wxshareConfig_miniMp: {
					...this.tmStore.wxshareConfig_miniMp,
					...pcf
				}
			}
		},
		setTmVuetifyTheme(color:string) {
			let defaultColorName = color
			if (!defaultColorName || defaultColorName == ""||themeColor.isCssColor(defaultColorName)) {
				defaultColorName = '';
			}
			u.setCookie('setTmVuetifyColor', defaultColorName)
			this.tmStore = {...this.tmStore,color:defaultColorName};
		},
		//添加一个主题
		setTmVuetifyAddTheme(colorName:string,color:string,isSet=true) {
			this.tmStore = {
				...this.tmStore,
				colorList: themeObj.add(colorName,color)
			}
			u.setCookie('colorArrayList', this.tmStore.colorList);
			if(isSet){
				this.setTmVuetifyTheme(colorName)
			}
		},
		setTmLocal(language:string){
			language = language || 'zh-Hans';
			u.setCookie('setTmVuetifyLocal', language);
			this.tmStore = {
				...this.tmStore,
				local: language
			}
		},
		setUserLoginInfo(data:userInfo) {
			this.tmStore={
				...this.tmStore,
				userInfo:{
					token: data.token,
					userId:data.id,
					account:data.account,
					name:data.name,
					avatar: data.avatar,
					description: data.workDescribe
				}
			}
		  },
		  setUserInvitationCode(data:string) {
			this.tmStore.userInfo.code=data;
		  },
		  logout() {
			this.tmStore={
				...this.tmStore,
				userInfo:{
					token: '',
					userId: '',
					account: '',
					name: '',
					avatar:'',
					description: '',
				}
			}
		  },
	},
});

