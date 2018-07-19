<template>
    <div>
        <router-link :to="'/sign/addsignRule'" class="m-rule">
            <span class="title">技术部打卡</span><br/>
            <div class="ct">
                <div class="txt">
                    <span class="grey">日期</span>周一、周二
                </div>
                <div class="txt">
                    <span class="grey">时间</span>09:00 - 06:00
                </div>
                <div class="txt">
                    <span class="grey">位置</span>广东省惠州市惠城区东湖西路72号客应龙
                </div>
            </div>
        </router-link>

        <router-link to="/sign/addsignRule" class="m-btn">
            <i class="icon-tianjia1 icon"></i>&nbsp;添加规则
        </router-link>
    </div>
</template>

<script>

export default {
  name: 'signIndex',
  data () {
    return {
      msg: ''
    }
  },
  created(){
       this.$store.state.isSign = true
  },
  components:{
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-rule{height: 2.92rem;background-color: #fff;font-size: 0.28rem;color: #000000;position: relative;margin-top: 0.46rem;box-sizing: border-box;padding-top: 0.42rem;padding-left: 0.38rem; display: block;}
.m-rule > .title{font-weight: bold;}
.m-rule > .ct {bottom:0.44rem;left: 0.38rem;}
.m-rule > .ct > .txt >.grey{color:#656565;margin-right: 0.30rem;}
.m-rule > .ct > .txt{margin-top:0.3rem;}
.m-btn{height: 0.9rem;background-color: #fff;margin-top: 0.44rem;text-align: center;line-height: 0.9rem;font-size: 0.32rem;cursor: pointer; display: block; color: #000;}
.m-btn i{font-size: 0.35rem;}
</style>
