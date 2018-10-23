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
//import storageUpdate from './assets/js/storageUpdate'

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
//Vue.prototype.storageUpdate = storageUpdate
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
  beforeCreate(){
    var vm = this;
    var _href = window.location.href;
    //如果来自小程序
    if (_href.indexOf('fromType=miniProgram')) {
      localStorage.setItem('fromType','miniProgram');
      _href = _href.split('#')[0]
      //var _obj = vm.F['UrlVars']("https://192.168.1.230:8080?fromType=miniProgram&locationData=eyJzdGF0dXMiOjAsIm1lc3NhZ2UiOiJxdWVyeSBvayIsInJlcXVlc3RfaWQiOiIzYmU1NjEyMC1kNWNmLTExZTgtODIyZS02YzkyYmY5NTg3YjkiLCJyZXN1bHQiOnsibG9jYXRpb24iOnsibGF0IjoyMy4wODQ1NDMsImxuZyI6MTE0LjQyNTQ2OH0sImFkZHJlc3MiOiLlub/kuJznnIHmg6Dlt57luILmg6Dln47ljLrkuJzmuZbopb/ot68iLCJmb3JtYXR0ZWRfYWRkcmVzc2VzIjp7InJlY29tbWVuZCI6IuaDoOWfjuWMuuS4nOW5s+S4nOa5luWwj+WMuuS4nDUw57GzIiwicm91Z2giOiLmg6Dln47ljLrkuJzlubPkuJzmuZblsI/ljLrkuJw1MOexsyJ9LCJhZGRyZXNzX2NvbXBvbmVudCI6eyJuYXRpb24iOiLkuK3lm70iLCJwcm92aW5jZSI6IuW5v+S4nOecgSIsImNpdHkiOiLmg6Dlt57luIIiLCJkaXN0cmljdCI6IuaDoOWfjuWMuiIsInN0cmVldCI6IuS4nOa5luilv+i3ryIsInN0cmVldF9udW1iZXIiOiLkuJzmuZbopb/ot68ifSwiYWRfaW5mbyI6eyJuYXRpb25fY29kZSI6IjE1NiIsImFkY29kZSI6IjQ0MTMwMiIsImNpdHlfY29kZSI6IjE1NjQ0MTMwMCIsIm5hbWUiOiLkuK3lm70s5bm/5Lic55yBLOaDoOW3nuW4gizmg6Dln47ljLoiLCJsb2NhdGlvbiI6eyJsYXQiOjIzLjA4NDU0MywibG5nIjoxMTQuNDI1NDY4fSwibmF0aW9uIjoi5Lit5Zu9IiwicHJvdmluY2UiOiLlub/kuJznnIEiLCJjaXR5Ijoi5oOg5bee5biCIiwiZGlzdHJpY3QiOiLmg6Dln47ljLoifSwiYWRkcmVzc19yZWZlcmVuY2UiOnsic3RyZWV0X251bWJlciI6eyJpZCI6IiIsInRpdGxlIjoiIiwibG9jYXRpb24iOnsibGF0IjoyMy4wODQ0LCJsbmciOjExNC40MjYxN30sIl9kaXN0YW5jZSI6NjgsIl9kaXJfZGVzYyI6IuilvyJ9LCJidXNpbmVzc19hcmVhIjp7ImlkIjoiNzM1ODAzNTMwNzgxMSIsInRpdGxlIjoi5Lic5bmzIiwibG9jYXRpb24iOnsibGF0IjoyMy4wODQ1NDMsImxuZyI6MTE0LjQyNTQ2OH0sIl9kaXN0YW5jZSI6MCwiX2Rpcl9kZXNjIjoi5YaFIn0sImZhbW91c19hcmVhIjp7ImlkIjoiNzM1ODAzNTMwNzgxMSIsInRpdGxlIjoi5Lic5bmzIiwibG9jYXRpb24iOnsibGF0IjoyMy4wODQ1NDMsImxuZyI6MTE0LjQyNTQ2OH0sIl9kaXN0YW5jZSI6MCwiX2Rpcl9kZXNjIjoi5YaFIn0sImNyb3Nzcm9hZCI6eyJpZCI6IjgzMjgzNCIsInRpdGxlIjoi5Lic5rmW6KW/6LevL+S4nOa5luS4ieihlyjot6/lj6MpIiwibG9jYXRpb24iOnsibGF0IjoyMy4wODU4OTksImxuZyI6MTE0LjQyNTg0Mn0sIl9kaXN0YW5jZSI6MTUwLjIsIl9kaXJfZGVzYyI6IuWNlyJ9LCJ0b3duIjp7ImlkIjoiNDQxMzAyMDAxIiwidGl0bGUiOiLmoaXkuJzooZfpgZMiLCJsb2NhdGlvbiI6eyJsYXQiOjIzLjA4NDU0MywibG5nIjoxMTQuNDI1NDY4fSwiX2Rpc3RhbmNlIjowLCJfZGlyX2Rlc2MiOiLlhoUifSwic3RyZWV0Ijp7ImlkIjoiMTcwNDg3NzgyNzM3MDE4NDEzMTgiLCJ0aXRsZSI6IuS4nOa5luilv+i3ryIsImxvY2F0aW9uIjp7ImxhdCI6MjMuMDg1NTE4LCJsbmciOjExNC40MjQ5OH0sIl9kaXN0YW5jZSI6MTEzLjUsIl9kaXJfZGVzYyI6IuWNlyJ9LCJsYW5kbWFya19sMiI6eyJpZCI6IjE4MjI0NDUxODI0MzMzNzUzMjY4IiwidGl0bGUiOiLkuJzmuZblsI/ljLoiLCJsb2NhdGlvbiI6eyJsYXQiOjIzLjA4NDUzOSwibG5nIjoxMTQuNDI0NTA3fSwiX2Rpc3RhbmNlIjo2MS43LCJfZGlyX2Rlc2MiOiLkuJwifX19fQ==")
      var _obj = vm.F['UrlVars'](_href)
      localStorage.setItem('location',JSON.stringify(_obj.locationData));

      //修一下链接（无刷新）
      history.replaceState('',null,'/');
    }else{
      localStorage.setItem('fromType','');
    }
  }
})
