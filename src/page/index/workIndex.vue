<!--猜猜猜首页-->
<template>
    <div class="">
		<!--banner-->
		<swiper :options="banner.bannerOption" class="m-banner g-layout">
		<swiper-slide v-for="items in banner.swiperSlides" :key="items">
			<img :src="items">
		</swiper-slide>
		<!-- <div class="swiper-pagination" slot="pagination"></div> -->
		</swiper>
		<!--banner end-->

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
          },
          autoplay:true,
          //loop:true
        },
        swiperSlides: this.$store.state.httpUrl.bannerImg
      },
      notice:{
        option:{
          autoplay:true,
          loop:true,
          direction:"vertical",
          slidesPerView: 2,
        },
        swiperSlides: []
      },
      isAdmin:undefined    //是否超级管理员
    }
  },
  created(){
    var vm = this; 
    //vm.isAdmin = localStorage.getItem('isAdmin');

    vm.checkIsAdmin();
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
      if (localStorage.getItem('isAdmin')) {     //如果检测到缓存有值
        vm.isAdmin = localStorage.getItem('isAdmin');
        return false
      }
      var url = vm.$store.state.httpUrl.login.checkIsLogin;
      vm.axios.post(url)
        .then((res) => {
          var data = res.data;
          if (data.code == 1) {
            vm.isAdmin = data.retval.isAdmin
          }else{
            vm.F['Hint'](vm,{
              ct:data.msg
            })
          }
        })
    }
  }//methods
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-banner{position: relative; border-bottom: 0.10rem solid #eaeaea;}
.m-banner .swiper-slide{height: 3.62rem;}
.m-banner .swiper-slide > img{height: 3.62rem; width: 100%;}

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
