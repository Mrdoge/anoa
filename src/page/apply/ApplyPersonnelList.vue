<template>
    <div>
      <!-- list -->
      <div class="m-angelList">
        <div class="txt">
          选择申请单
        </div>
        <router-link to="/apply/ApplyVacation" class="list">
          <div class="part">请假申请
            <i class="icon-xiangyou icon"></i>
          </div>
        </router-link>
        <router-link to="/Apply/ApplyEntry" class="list">
          <div class="part">入职申请
            <i class="icon-xiangyou icon"></i>
          </div>
        </router-link>
        <router-link to="/Apply/ApplyTurnOfficial" class="list">
          <div class="part">转正申请
            <i class="icon-xiangyou icon"></i>
          </div>
        </router-link>
        <router-link to="/Apply/ApplyLeave" class="list">
          <div class="part">离职申请
            <i class="icon-xiangyou icon"></i>
          </div>
        </router-link>
        <router-link to="/Apply/Applytransfer" class="list">
          <div class="part">调动申请
            <i class="icon-xiangyou icon"></i>
          </div>
        </router-link>
        <router-link to="/Apply/ApplySalaryAdjust" class="list">
          <div class="part">调薪申请
            <i class="icon-xiangyou icon"></i>
          </div>
        </router-link>
      </div>
      <!-- list end-->
    </div>
</template>

<script>
export default {
  name: 'ApplyPersonnelList',
  data () {
    return {
      
    }
  },
  created(){
    document.body.style.backgroundColor = "#fff";
  },
  destroyed(){ //离开页面
    document.body.style.backgroundColor = "";
   // this.$store.state.isFooterShow = true;
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-angelList{padding: 0;}
.m-angelList > .txt{background-color: #f0f4f7;height: 0.56rem;line-height: 0.56rem;padding-left: 0.32rem;border-bottom: 0.01rem solid #e4e4e5;color: #ababab;} 
.m-angelList > .list > .part{height:1.16rem;line-height: 1.16rem;border-bottom: 0.01rem solid #e9e9e9;margin-left: 0.32rem;font-size: 0.32rem;color:#000;position: relative;}
.m-angelList > .list > .part i{position: absolute;right: 0.32rem;}
.m-angelList a{display: block;}
</style>
