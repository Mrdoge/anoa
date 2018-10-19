<template>
    <div>
        <!--导航条-->
        <div class="m-nav" :class="{'s-hide':!this.$store.state.isTopBarShoow}">
            <a href="javascript:;" class="back" @click="goback">
                <i class="icon-flow icon " ></i>
            </a>
            <span class="txt f-txtof">{{this.$store.state.topBarTitle?this.$store.state.topBarTitle:"安顺OA"}}</span>
            <a href="javascript:;"  class="cal" v-show="this.$store.state.isTopCalendarIconShow" @click="toggleCalendar">
                <i class="icon-riliriqi icon"></i>
            </a>
            <!-- <a href="javascript:;"  class="cal" v-show="this.$store.state.isTopSearchShow">
                <i class="icon-xiazai5 icon"></i>
            </a> -->
        </div>
        <div class="m-forNav" :class="{'s-hide':!this.$store.state.isTopBarShoow}"></div>
        <!--导航条 end-->

    </div>
</template>

<script>
//import shade from '@/components/shade' //阴影
export default {
    name: 'topBar',
    data () {
        return {

        }
    },
    created(){
        //console.log(this.$route.meta.index)
        //是否显示
        this.$store.state.isTopBarShoow = this.$route.meta.index >= 1   //如果是二级页面以上则显示
    },
    components:{
        //calendar,
    },
    methods:{
        goback(){
            var vm = this

            // if(vm.$store.state.isSign){
            //     if(vm.$route.path.indexOf('addsignRule') > -1){
            //         window.history.go(-1)
            //     }else{
            //         vm.$router.push('/index/workIndex');
            //     }
            // }else{
            //     window.history.go(-1)
            // }

            if (vm.$route.meta.lastUrl) {
                vm.$router.push(vm.$route.meta.lastUrl);
            }else{
                window.history.go(-1)
            }
        },
        toggleCalendar(){
            var vm = this;
            //vm.$store.state.calendarShow = !vm.$store.state.calendarShow
            //vm.calendarShow = !vm.calendarShow
            vm.$store.state.isTopCalendarShow = !vm.$store.state.isTopCalendarShow
            //vm.$store.commit('toggleCalendar')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 通用头部导航样式 */
.m-nav{height:1.1rem; background-color: #4f77aa; position: fixed; top:0; left: 0; color: #fff; font-size: 0.38rem; line-height: 1.1rem; box-sizing: border-box; width: 100%;z-index: 4; transition: all 0.4s ease;}
.m-nav > .back {color: #fff; position: absolute; left: 0.17rem;cursor: pointer;}
.m-nav > .back i{font-size: 0.42rem;}
.m-nav > .txt{position: absolute; left: 50%; transform: translateX(-50%); width: 5rem; display: block; text-align: center;}
.m-nav > .cal{font-size: 0.3rem;position: absolute; right: 0.26rem;color: #fff;}
.m-nav > .cal i{position: absolute; right: 0rem;color: #fff;font-size: 0.42rem;}
.m-nav.s-hide{transform: translateY(-100%);}
.m-forNav{height: 1.1rem; position: relative;}
.m-forNav.s-hide{transform: translateY(-100%); margin-top: -1.1rem;}

</style>
