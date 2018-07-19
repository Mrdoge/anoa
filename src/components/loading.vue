<template>
    <div>
        <div class="loading" v-show="loadingShow">
            <div class="outer"></div>
            <div class="inner"></div>
        </div>
        <div class="botLine" v-show="botLineShow">—— 我是有底线的 ——</div>
        <div class="m-nolist" :class="{'z-show':noDataShow && !loadingShow}">
            <img :src="temp + '/wap/public/img/no_data.png'" alt=""><br/>
            暂无数据
        </div>
    </div>
</template>

<script>
export default {
  name: 'loading',
  data () {
    return {
      //loadingShow:true
      temp:this.$store.state.httpUrl.temp
    }
  },
  props:['loadingShow','botLineShow','noDataShow']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loading{margin: 0.1rem auto;}
.loading > .outer{
  border: 0.05rem solid #4f77aa;
  opacity: .9;
  width: 0.5rem;
  height: 0.5rem;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;

  -webkit-animation: spin-right 0.5s linear infinite normal;
  -moz-animation: spin-right 0.5s linear infinite normal;
  -ms-animation: spin-right 0.5s linear infinite normal;
  animation: spin-right 0.5s linear infinite normal;
  -webkit-animation-delay: 0;
  -moz-animation-delay: 0;
  -o-animation-delay: 0;
  animation-delay: 0;
  margin: 0 auto;
}
.loading > .inner{
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  border: 0.05rem solid #4f77aa;
  opacity: .9;
  border-radius: 50%;
  border-left-color: transparent;
  border-bottom-color: transparent;
  position: relative;
  top: -0.5rem;
  margin: 0 auto;
  -webkit-animation: spin-left 0.5s linear infinite normal;
  -moz-animation: spin-left 0.5s linear infinite normal;
  -ms-animation: spin-left 0.5s linear infinite normal;
  animation: spin-left 0.5s linear infinite normal;
  -webkit-animation-delay: 0;
  -moz-animation-delay: 0;
  -o-animation-delay: 0;
  animation-delay: 0;
}
.botLine{text-align: center; font-size: 0.20rem; height: 0.4rem; line-height: 0.4rem; color: #666;}
/*暂无数据*/
.m-nolist{text-align:center; font-size:0.24rem; color:#666; padding:0.2rem 0; display: none;}
.m-nolist.z-show{display: block;}
.m-nolist > img{width: 3rem;}
</style>
