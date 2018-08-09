// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload'
import F from './assets/js/tools.js' //全局F方法
import preview from 'vue-photo-preview' //图片预览
import 'vue-photo-preview/dist/skin.css'
import lrz from 'lrz'               //图片压缩转base64，带自动纠正ios拍照正反问题

//import imageClipper  from './components/imageClipper/index' //图片裁剪
//console.log(imageClipper)

//ajax请求
import axios from 'axios'
import VueAxios from 'vue-axios'
import ajax from './assets/js/ajax'   //自己封装的axios方法

//所有接口
import httpUrl from './assets/js/http_url.js'

//更新缓存方法
import storageUpdate from './assets/js/storageUpdate'

Vue.config.productionTip = false
Vue.use(VueAxios,axios)
Vue.use(Vuex)
Vue.use(preview)
Vue.use(VueLazyLoad,{
  error:httpUrl.temp + '/wap/public/img/error.png',
  //loading:'./assets/img.loading.png'
})
//Vue.use(imageClipper)
Vue.prototype.F = F
Vue.prototype.ajax = ajax
Vue.prototype.storageUpdate = storageUpdate
window.lrz = lrz

//个人中心我的申请图标
const myApplyIndex = [
  {
    class:"icon icon-yuangongruzhi",
    txt:"入职申请",
    link:"/myIndex/myApplyList",
    detailsUrl:"/wap/myIndex/myApplyEntryDetails",    //详情数据请求接口
    editUrl:"/Apply/ApplyEntryEdit",
    type:1
  },
  {
    class:"icon icon-shangsheng s-pink",
    txt:"转正申请",
    link:"/myIndex/myApplyList",
    detailsUrl:"/wap/myIndex/myApplyOfficialDetails", //详情数据请求接口
    editUrl:"/Apply/ApplyTurnOfficialEdit",
    type:2
  },
  {
    class:"icon icon-xueshengqingjia s-blue",
    txt:"请假申请",
    link:"/myIndex/myApplyList",
    detailsUrl:"/wap/myIndex/myApplyVacationDetails", //详情数据请求接口
    editUrl:"/Apply/ApplyVacationEdit",
    type:3
  },
  {
    class:"icon icon-yuangonglizhi s-yellow",
    txt:"离职申请",
    link:"/myIndex/myApplyList",
    detailsUrl:"/wap/myIndex/myApplyDimissionDetails",  //详情数据请求接口
    editUrl:"/Apply/ApplyLeaveEdit",
    type:4
  },
  {
    class:"icon icon-zanwuzhuanrangzhongdingdan s-green", 
    txt:"调动申请",
    link:"/myIndex/myApplyList",
    detailsUrl:"/wap/myIndex/myApplyTransferDetails", //详情数据请求接口
    editUrl:"/Apply/ApplytransferEdit",
    type:5
  },
  {
    class:"icon icon-gerenzijin s-purpose",
    txt:"调薪申请",
    link:"/myIndex/myApplyList",
    detailsUrl:"/wap/myIndex/myApplySalaryDetails", //详情数据请求接口
    editUrl:"/Apply/ApplySalaryAdjustEdit",
    type:6
  },
]

const footerItem = [
  {
    title:"消息",
    icon:"icon-xiaoxi",
    iconcur:"icon-xiaoxi1",
    link:"/info/infoIndex"
  },
  {
    title:"工作台",
    icon:"icon-yingyong",
    iconcur:"icon-yingyong1",
    link:"/index/workIndex"
  },
  {
    title:"通讯录",
    icon:"icon-tongxunlu",
    iconcur:"icon-tongxunlu1",
    link:"/index/memberListIndex",
    disabled:true
  },
  {
    title:"个人中心",
    icon:"icon-gerenzhongxin",
    iconcur:"icon-gerenzhongxin1",
    link:"/myIndex/myIndex"
  }
]


const hint = {
  isShow:false,  //是否显示提示框
  type:0,        //提示类型0感叹号,1正确，2错误
  time:2000,      //停留时间
  ct:"错误"       //提示语
}

const store = new Vuex.Store({
  state: {
    topBarTitle:'安顺OA', //顶部标题
    isTopBarShoow:false, //顶部栏是否显示
    isFooterShow:true, //底部是否显示
    isShadeShow:false, //是否显示阴影
    isTopCalendarIconShow:false, //顶部日历图标图标是否显示
    isTopCalendarShow:false, //顶部日历图标图标是否显示
    isSign:false, //是否是打卡模块（用于控制打卡模块底部footer显示
    footerItem,     //底部图标
    footerIndex:0,
    hint,          //提示组件
    myApplyIndex,  // 个人中心我的申请图标
    httpUrl,
    isLogin:undefined//是否登陆状态（一定要等于true才会出现）
    //isLogin:true//是否登陆状态（一定要等于true才会出现）
  },
  mutations: {
    changeTitle (state,title) { //改变标题
      state.topBarTitle = title.title
    }
  }
})


/* eslint-disable no-new */
/*把vue给到一个全局变量，方便控制app（封装ajax用到）*/
window.vueApp = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
