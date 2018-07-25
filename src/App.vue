<template>
  <div id="app" :class="{'z-show':isShowApp}">
    <!--顶部栏-->
    <top-bar :key="'topBar'"></top-bar>
    <!--顶部栏 end-->
    <transition :name="transitionName">
      <!--主页-->
      <router-view class="Router" :key="'router'"/>
      <!--主页 end-->
    </transition>
    
    <!--底部导航-->
    <bot-footer :key="'botFooter'"></bot-footer>
    <!--底部导航 end-->

    <!--打卡底部导航-->
    <footer-sign></footer-sign>
    <!--打卡底部导航 end-->

    <!--阴影-->
    <shade :key="'shade'"></shade>

    <!--提示-->
    <hint :key="'hint'"></hint>

    <!--登陆-->
    <login :key="'login'"></login>
  </div>
</template>

<script>
import '../static/css/animate.min.css';
import '../static/css/style.css';
import '../static/iconfont/iconfont.css';

//全局组件
import botFooter from '@/components/footer' //底部导航
import topBar from '@/components/topBar' //顶部导航
import shade from '@/components/shade' //全局阴影
import footerSign from '@/components/footerSign' //打卡底部导航
import hint from '@/components/hint' //全局提示插件

import login from '@/components/login' //登陆组件

var qs = require('qs');

export default {
  name: 'App',
  data(){
    return {
      transitionName:'slide-left',
      isShowApp:this.$store.state.isLogin
    }
  },
  created(){
    //判断是否登陆
    this.isLogin()

    //每个页面加载前的各种处理
    this.beforeEnterPage()

  },
  components:{
    botFooter,
    topBar,
    shade,
    footerSign,
    hint,
    login
  },
  methods:{
    beforeEnterPage(to,from){
      var vm = this;
      to = to || this.$route

      if(to.meta.index >= 1){ //判断是否是2级页面
        this.$store.state.isFooterShow = false; //底部是否显示
        this.$store.state.isTopBarShoow = true; //顶部是否显示
      }else{
        this.$store.state.isFooterShow = true; //底部是否显示
        this.$store.state.isTopBarShoow = false; //顶部是否显示
      }

      //改变头部标题
      this.$store.state.topBarTitle = to.meta.title

      //判断是否是打卡模块
      this.$store.state.isSign = to.path.indexOf('sign') > -1;

      //头部日历图标是否显示
      this.$store.state.isTopCalendarIconShow = to.meta.isTopCalendarIconShow

      //头部搜索图标是否显示
      this.$store.state.isTopSearchShow = to.meta.isTopSearchShow

      //每次转换页面都要隐藏日历
      this.$store.state.isTopCalendarShow = false

      //判断footer选中图片
      vm.checkCur()

      //判断是否从工作详情去到工作日报去工作日报首页
      if ((to.path.indexOf('daily/dailyIndex') > -1) && !(from.path.indexOf('daily/dailyDetalis') > -1) ) {
        localStorage.setItem('calendarDate','')
      }

      //判断是否从审批页面去到审批列表
      if ((to.path.indexOf('myIndex/myApplyList') > -1) && !(from.path.indexOf('myIndex/MyApplyCheck') > -1) ) {
        localStorage.setItem('ifFromCheck','');
      }

    },
    isLogin(){  //判断是否登陆
      var vm = this;
      this.axios.post(this.$store.state.httpUrl.login.checkIsLogin)
      .then(function (res) {
          //console.log(res)
          if (res.data.code == 1) {
              var isLogin = res.data.retval.isLogin == 1?true:false
              vm.$store.state.isLogin = isLogin

              //不管是否登陆都显示app
              vm.isShowApp = true

              //吧登陆信息写入缓存
              var userId = res.data.retval.userId;
              //var isAdmin = res.data.retval.isAdmin;
              localStorage.setItem('userId',userId)
              //localStorage.setItem('isAdmin',isAdmin)
              //vm.$store.state.isLogin = false
          }else{
              F['Hint'](vm,{
                ct:res.data.msg
              })
          }
      })
      .catch(function (err) {
          console.log(err);
      });
    },
    checkCur(){ //每次刷新判断选中效果
      var vm = this;
      var list = vm.$store.state.footerItem
      for (let i = 0; i < list.length; i++) {
        //console.log(vm.list[i].link,vm.$route.path)
        if(list[i].link == vm.$route.path){
          //vm.nowIndex = i;
          vm.$store.state.footerIndex = i
          break
        }
      }
    }
  },
　watch: {
    '$route'(to, from){
      //判断是否登陆
      var vm = this;
      if (!vm.$store.state.isLogin) {
        return false
      }

      //进入页面前的各种处理
      this.beforeEnterPage(to,from)

      //页面跳转动画
      this.transitionName = to.meta.index >= from.meta.index ? 'slide-left' : 'slide-right'
    }
　}
}
</script>

<style>
#app{visibility: hidden;}
#app.z-show{visibility: visible;}
/* #app .m-nav{visibility: hidden;}
#app .m-footer{visibility: hidden;}
#app .Router{visibility: hidden;}
#app.z-show .m-nav{visibility: visible;}
#app.z-show .Router{visibility: visible;}
#app .m-footer{visibility: visible;} */
.Router{width: 100%; min-height:100%; box-sizing: border-box; z-index: 2;}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.4s;
  position: absolute;
}

.slide-left-enter,.slide-right-leave-active{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}
.slide-left-leave-active,.slide-right-enter{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}
</style>



