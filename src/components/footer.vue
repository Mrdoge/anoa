<template>
  <div class="">
    <div class="m-forbotNav" style="height: 1.6rem;" :class="{'s-hide':!this.$store.state.isFooterShow}"></div>
    <div class="m-footer g-flex s-row" :class="{'s-hide':!this.$store.state.isFooterShow}">
      <router-link :disabled="items.disabled" :to="items.link" v-for="(items,index) in list" :key="items.title" class="btn" :class="{'z-cur':nowIndex == index}" @click.native="cur(index)">
        <i class="icon" :class="nowIndex == index?items.iconcur:items.icon"></i><br />
        {{items.title}}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'botNav',
  data () {
    return {
      list:this.$store.state.footerItem,
      nowIndex:this.$store.state.footerIndex
    }
  },
  created(){
    //console.log(this.$route.meta.index)
    var vm = this
    //console.log(vm.list)
    if(vm.$route.meta.index >= 1){  //是否显示
      vm.$store.state.isFooterShow = false
    }else{
      vm.$store.state.isFooterShow = true
    }

    vm.checkCur()
  },
  methods:{
    cur(index){
      //this.nowIndex = index
      this.$store.state.footerIndex = index
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
      return this.$store.state.isFooterShow
    },
    Index(){
      return this.$store.state.footerIndex
    }
  },
  watch:{
    'isShow'(){
      var vm = this;
      vm.checkCur();
    },
    'Index'(){
      var vm = this;
      vm.checkCur();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-footer{text-align: center; position: fixed; width: 100%; left: 0; bottom: 0; border-top: 0.01rem solid #c7c7c7;background-color:#fff; z-index: 4; transition: all 0.4s ease;}
.m-footer > .btn{padding: 0.14rem 0; text-align: center; line-height: 1.14; font-size: 0.24rem; color: #9c9ea5;}
.m-footer > .btn i{font-size: 0.42rem;}
.m-footer > .btn.z-cur{color: #3a86d9;}
.m-footer.s-hide{transform: translateY(100%);}
.m-forbotNav{position: relative;}
.m-forbotNav.s-hide{display: none;}
</style>
