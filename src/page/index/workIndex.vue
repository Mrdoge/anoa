<!--猜猜猜首页-->
<template>
    <div class="">
		<!--banner-->
    <div class="m-banner g-layout" :class="{'z-loading':bannerLoading}">
      <swiper ref="mySwiper" :options="banner.bannerOption"  v-if="banner.swiperSlides.length > 1">
        <swiper-slide v-for="items in banner.swiperSlides" :key="items">
          <img :src="items">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
		
		<!--banner end-->
    <!-- <swiper :options="swiperOption" v-if="images.length>1"> 
      <swiper-slide v-for="(image, index) in images" :key="index">
        <img :src="image"> 
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper> -->
    <!--频道-->
    <div class="m-channel">
      <router-link :to="'/sign/signindex'">
        <i class="icon-daqiajilu icon"></i><br/>
        打卡签到
      </router-link>
      <router-link :to="(+isAdmin == 0)?'/daily/dailyAdd':'/daily/dailyIndex'">
        <i class="icon-gongzuoribao icon s-pink"></i><br/>
        工作日报
      </router-link>
      <!-- <router-link to="/apply/ApplyVacation">
        <i class="icon-qingjiashenqing icon"></i><br/>
        请假申请
      </router-link> -->
    
      <router-link to="/apply/ApplyPersonnelList">
        <i class="icon-renshishenqing icon s-yellow"></i><br/>
        人事申请
      </router-link>
      <router-link to="/project/projectList">
        <i class="icon-xinjianxiangmu icon s-pink"></i><br/>
        项目管理
      </router-link>
      <router-link to="/question/questionList">
        <i class="icon-wentizhongxin icon"></i><br/>
        问题中心
      </router-link>
      <router-link to="/contract/contractList">
        <i class="icon-hetongguanli icon s-purpose"></i><br/>
        合同管理
      </router-link>
      <router-link to="/task/taskIndex">
        <i class="icon-renwuguanli icon s-blue"></i><br/>
        任务管理
      </router-link>
      <router-link to="/myIndex/myApplyIndex">
        <i class="icon-shenqing icon s-yellow"></i><br/>
        申请管理
      </router-link>
    </div>
    <!--频道 end-->
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';

var qs = require('qs');

export default {
  name: 'Index',
  data () {
    return {
      banner:{
        bannerOption: {
          pagination: {
            el: '.swiper-pagination',
            clickable :true
          },
          loop:true,
          autoplay:true,
          slidesPerView: "auto",
          centeredSlides: true,
        },
        swiperSlides: []
      },

      isAdmin:undefined,    //是否超级管理员
      host:this.$store.state.httpUrl.HOST,
      bannerLoading:false
    }
  },
  created(){
    var vm = this; 
    //vm.isAdmin = localStorage.getItem('isAdmin');

    vm.checkIsAdmin();

    vm.getBanner();

  },
  destroyed(){ //离开页面
    
  },
  components:{
    swiper,
    swiperSlide,
  },
  methods:{
    checkIsAdmin(){
      var vm = this;
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      if (userInfo) {     //如果检测到缓存有值
        vm.isAdmin = userInfo.is_admin;
        return false
      }
    },
    getBanner(){
      var vm = this;
      var url = vm.$store.state.httpUrl.banner;
      var postData = {
        type:1
      }

      //默认banner图片
      var defaultImg = vm.$store.state.httpUrl.bannerImg

      vm.bannerLoading = true;
      vm.ajax.post(url,postData)
      .then((res) => {
        var data = res;
        vm.bannerLoading = false
        if (data.code == 1) {
          var _data = data.retval.list

          //先清空
          vm.banner.swiperSlides.splice(0,vm.banner.swiperSlides.length)
          if (_data.length) {
            for (let i = 0; i < _data.length; i++) {
              vm.banner.swiperSlides.push(vm.host + '/' + _data[i].image_url)
            }  
          }else{
            vm.banner.swiperSlides.push(defaultImg)
          }

        }else{

        }
      })
    }
  },//methods
  computed:{
    isLogin(){
      var vm = this;
      return vm.$store.state.isLogin;
    }
  },
  watch:{
    'isLogin'(){
      var vm = this;
      vm.checkIsAdmin();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-banner{position: relative; border-bottom: 0.10rem solid #eaeaea; height: 3.62rem;}
.m-banner .swiper-slide{height: 3.62rem;}
.m-banner .swiper-slide > img{height: 3.62rem; width: 100%;}
.m-banner.z-loading{background-image: url('../../assets/img/loading.gif'); background-position: center center; background-size: 0.6rem 0.6rem; background-repeat: no-repeat;}
.m-banner.z-loading img{display: none;}

.m-channel{position: relative; display: flex; display: -webkit-flex; flex-wrap: wrap; border-top: 0.01rem solid #e1e1e1;}
.m-channel > a{flex: 0 0 33.33%; -webkit-flex: 0 0 33.33%; text-align: center; color: #686868; font-size: 0.28rem; line-height: 1.4; padding: 0.4rem 0; box-sizing: border-box; border-bottom: 0.01rem solid #e1e1e1; border-right: 0.01rem solid #e1e1e1; background-color: #fff;}
.m-channel > a:nth-child(3){border-right: none;}
.m-channel > a:nth-child(6){border-right: none;}
.m-channel > a:nth-child(9){border-right: none;}
.m-channel > a > i{font-size: 0.68rem;color:#55b6fe;}
.m-channel > a > i.s-pink{color: #fe5585;}
.m-channel > a > i.s-yellow{color:#fec055;}
.m-channel > a > i.s-purpose{color: #a47dc1;}

</style>
