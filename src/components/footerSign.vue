<template>
  <div class="">
    <div class="m-forbotNav" style="height: 1.6rem;" :class="{'s-show':this.$store.state.isSign}"></div>
    <div class="m-footer g-flex s-row" :class="{'s-show':this.$store.state.isSign}">
      <router-link :to="items.link" v-for="(items,index) in list" :key="items.title" class="btn" :class="{'z-cur':nowIndex == index}" @click.native="cur(index)">
        <i class="icon" :class="items.icon"></i><br />
        {{items.title}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footerSign',
  data () {
    return {
      list:[
        {
          title:"打卡",
          icon:"icon-dingwei",
          link:"/sign/signIndex"
        },
        {
          title:"统计",
          icon:"icon-tongjitu",
          link:"/sign/signCount"
        },
        {
          title:"规则",
          icon:"icon-shezhi",
          link:"/sign/signRuleList"
        }
      ],
      nowIndex:0
    }
  },
  created(){
    //console.log(this.$route.meta.index)
    this.checkCur()
  },
  methods:{
    cur(index){
      this.nowIndex = index
    },
    checkCur(){ //每次刷新判断选中效果
      var vm = this;
      for (let i = 0; i < vm.list.length; i++) {
        //console.log(vm.list[i].link,vm.$route.path)
        if(vm.list[i].link == vm.$route.path){
          vm.nowIndex = i;
          break
        }
      }
    }
  },
  computed:{
    isShow(){
      return this.$store.state.isSign
    }
  },
  watch:{
    'isShow'(data){
      if (!data) {  //如果退出了打卡模块，则重置
        this.nowIndex = 0
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-footer{text-align: center; position: fixed; width: 100%; left: 0; bottom: 0; border-top: 0.01rem solid #c7c7c7;background-color:#fff; z-index: 4; transition: all 0.4s ease; transform: translateY(100%);}
.m-footer > .btn{padding: 0.14rem 0; text-align: center; line-height: 1.14; font-size: 0.24rem; color: #9c9ea5;}
.m-footer > .btn i{font-size: 0.42rem;}
.m-footer > .btn.z-cur{color: #3a86d9;}
.m-footer.s-show{transform: translateY(0);}
.m-forbotNav{position: relative; display: none; transform: translateY(100%);}
.m-forbotNav.s-show{display: block; transform: translateY(0);}
</style>
