<template>
    <div>
        <transition name="hint" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
            <div class="m-FU_hint s-0" v-if="this.$store.state.hint.isShow">
                <div class="ico iconfont" :class="{'icon-quxiao':this.$store.state.hint.type == 2,'icon-weibiaoti14':this.$store.state.hint.type == 1,'icon-jinggao':this.$store.state.hint.type == 0}"></div>
                <div class="ct">
                    <div>{{this.$store.state.hint.ct}}</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  name: 'hint',
  data () {
    return {

    }
  },
  created(){

  },
  computed:{
      hintData(){
          return this.$store.state.hint
      }
  },
  watch:{
      'hintData.isShow'(val){
          var vm = this;
          //console.log(vm.$store.state.hint)
          if (val) {
              setTimeout(() => {    //充值hint
                  vm.$store.state.hint.isShow = false;
                  vm.$store.state.hint.type = "错误";
                  vm.$store.state.hint.type = 0;
                  vm.$store.state.hint.time = 2000;
              },vm.$store.state.hint.time);
          }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-FU_hint{border-radius:10px}
.m-FU_hint > .ct{font-size:16px;line-height:24px;padding:10px;min-width:120px;max-width:180px;padding-top:0}
.m-FU_hint > .ico{height:70px;line-height:70px;font-size:50px}
.m-FU_hint{text-align:center;position:fixed;background-color:rgba(0,0,0,0.7);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#B2000000,endColorstr=#B2000000);top:38.2%;left:50%;z-index:9999;-webkit-will-change:transform,opacity;will-change:transform,opacity; width: 3.4rem; margin-left: -1.7rem;-webkit-transform:translateZ(0);transform:translateZ(0)}
.m-FU_hint > .ct{text-align:center;color:#fff}
.m-FU_hint > .ct > div{display:inline-block;text-align:left;*zoom:1;*display:inline}
.m-FU_hint > .ico{text-align:center;color:#fff}
</style>
