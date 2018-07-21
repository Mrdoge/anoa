<template>
    <div class="m-dailyWrap">
        <!-- 时间模块 -->
        <div class="m-time">
            <span>{{nowDate}}  &nbsp;总共{{dailyLength}}份</span>
        </div>
        <!-- 时间模块 end -->

        <!--展开list-->
        <div class="m-dropdown" v-if="list.length" v-for="(items,index) in list" :key="items.s_id" :class="{'s-show':items.isShow}">
            <div class="title" @click="setIndex(index)">
                <span class="txt">{{items.s_name}}（{{items.dailyList.length}}）</span>
                <div class="arrow3"><i class="icon-zhankai icon"></i></div>
            </div>
            <transition class="animated" name="fadeInLeft" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutLeft" v-for="items2 in items.dailyList" :key="items2.da_id">
                <div class="dailyList" v-if="items.isShow">
                    <router-link :to="'/daily/dailyDetalis/' + items2.da_id" class="list">
                        <div class="member f-clear">
                            <img :src="host + '/' + items2.avatar" class="avatar">
                            <div class="txt">
                                <span class="big">{{items2.nickname}}</span><br/>
                                {{items2.created_time}}
                            </div>
                        </div>
                        <!-- <div class="ct">
                            <div class="part f-txtof">今日工作：{{items2.today_desc}}</div>
                            <div class="part f-txtof">明日工作：{{items2.tomorrow_desc}}</div>
                            <div class="part f-txtof">其他事项：{{items2.comment_desc}}</div>
                        </div> -->
                        <div class="ct">
                            <div class="part f-txtof">今日工作：{{items2.today_desc}}明日工作：{{items2.tomorrow_desc}}其他事项：{{items2.comment_desc}}</div>
                        </div>
                        <i class="icon icon-xiangyou angel"></i>
                    </router-link>
                </div>
            </transition>
        </div>
        <!--展开list end-->
        <loading :loadingShow="loadingData.loadingShow" :botLineShow="loadingData.botLineShow" :noDataShow="loadingData.noDataShow"></loading>


        <!-- 底边 -->
        <div class="m-forbotNav" style="height: 3rem;"></div>
        <div class="m-bottom">
            <div class="block ">
                <!-- <a href="{:url('wap/daily/dailyadd')}" class="btn">写日报</a> -->
                <router-link to="/daily/dailyAdd" class="btn">写日报</router-link>
            </div>
        </div>
        <!-- 底边 end-->

        <!--日历-->
        <transition name="calendar" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
            <div class="m-calendarTop" v-if="this.$store.state.isTopCalendarShow">
                <calendar
                    ref="calendar"
                    :events="calendar.events" 
                    :lunar="calendar.lunar" 
                    :value="calendar.value" 
                    :begin="calendar.begin" 
                    :end="calendar.end" 
                    @select="calendarSelect"
                    @selectMonth="calendar.selectMonth"
                    @selectYear="calendar.selectYear"></calendar>
            </div>
        </transition>
        <!--日历 end-->

    </div>
</template>

<script>
import calendar from '@/components/calendar/calendar.vue' //日历组件
import loading from '@/components/loading'

var qs = require('qs');

export default {
    name: 'dailyIndex',
    data () {
        return {
            host:this.$store.state.httpUrl.HOST,
            list:[],
            nowDate:this.getNowDate(),
            dailyLength:0,
            calendar:{
                //value:[2017,7,20], //默认日期
                // lunar:true, //显示农历
                select(value){
                    console.log(value.toString().replace(/,/g,'-'));
                    return value.toString().replace(/,/g,'-')
                },
                selectMonth(month,year){
                    //console.log(year,month)
                },
                selectYear(year){
                    //console.log(year)
                },
                timestamp:Date.now()
            },
            loadingData:{
                loadingShow:false,  //是否显示加载效果
                botLineShow:false,   //是否显示到达底部,
                noDataShow:false     //是否显示没有数据
            },
        }
    },
    components:{
        calendar,
        loading
    },
    created(){
        document.body.style.backgroundColor = "#fff";
        this.getData();
        //console.log(this.calendar)
    },
    destroyed(){ //离开页面
        document.body.style.backgroundColor = "";
        // this.$store.state.isFooterShow = true;
    },
    methods:{
        getData(date){
            var vm = this;
            this.axios.post(this.$store.state.httpUrl.daily.dailyList,qs.stringify({
                eTime:vm.nowDate
            }))
            .then(function (res) {
                if(res.data.code == 1){
                    //先清除
                    vm.list.splice(0,vm.list.length)
                    const _data = res.data.retval.list;
                    //console.log(_data);
                    if (_data.length) {
                        vm.loadingData.noDataShow = false
                        for (let i = 0; i < _data.length; i++) {
                            vm.list.push(_data[i])
                        }
                        vm.setIndex(0)
                    }else{
                        vm.list.splice(0,vm.list.length)
                        vm.loadingData.noDataShow = true
                    }
                    
                }else{
                    //先清除
                    vm.list.splice(0,vm.list.length)
                    // vm.F['Hint'](vm,{
                    //     ct:data.msg
                    // })
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        calendarSelect(date){
            var vm = this;
            vm.nowDate = date.toString().replace(/,/g,'-')
            vm.getData();
            vm.$store.state.isTopCalendarShow = false
        },
        setIndex(index,e){
            //console.log(index)
            var vm = this;
            //console.log(vm.list[index].isShow)
            vm.$set(vm.list[index],'isShow',!vm.list[index].isShow)
        },
        getNowDate(){   //获取当前时间
            //vm.F['dateFormat'](new date)
            var vm = this;
            var nowDate = Date.parse(new Date())
            return vm.F['dateFormat'](nowDate).split(' ')[0]
        }
    },
    watch:{
        'list'(){
            var vm = this;
            vm.dailyLength = 0;
            for (let i = 0; i < vm.list.length; i++) {
                for (let j = 0; j < vm.list[i].dailyList.length; j++) {
                    vm.dailyLength ++
                }
            }
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-dailyWrap{height: 100%;}
/* .m-time{color: #ababab;height: 0.56rem;position: relative;padding-top: 0.18rem;padding-bottom: 0.12rem;padding-left: 0.32rem;box-sizing: border-box; background-color: #f0f4f7;} */
.m-time{color: #000; padding: 0.28rem 0.32rem; font-size: 0.28rem; padding-left: 0;}
.m-time > span{border-left: 0.14rem solid #4f77aa; padding-left: 0.2rem;}
.m-dropdown > .title{color: #ababab;font-size: 0.28rem;height: 0.7rem;cursor: pointer; line-height: 0.7rem;position: relative;width: 100%;border: 0.01rem solid #e4e4e5;border-left: none;border-right: none; background-color: #f0f4f7;}
.m-dropdown > .title > .txt{position: absolute;left: 0.32rem;}
.m-dropdown > .title > .arrow3 i{font-size: 0.32rem;}
/*.m-dropdown > .title img{float: right;padding-top: 0.4rem;height: 0.19rem;padding-right: 0.26rem;}*/
.m-dropdown > .title > .arrow3{position: absolute;right: 0.3rem;transition: all 0.4s ease;}
.m-dropdown > .title > .arrow3.s-trans{
	transform:rotate(0deg);
	-ms-transform:rotate(0deg); /* IE 9 */
	-webkit-transform:rotate(180deg); /* Safari and Chrome */
}

.m-dropdown > .dailyList{box-sizing: border-box;}
.m-dropdown > .dailyList >.list{display: block; font-size: 0.28rem;color: #939393;background-color: #fff;padding-right: 0.26rem;padding-left:0.28rem;position: relative;box-sizing: border-box;border-bottom: 0.02rem solid #f0f4f7;display:block; position: relative;}
.m-dropdown > .dailyList > .list > .member{padding-top: 0.24rem;}
.m-dropdown > .dailyList > .list > .member > .avatar{width: 0.84rem;height: 0.84rem; border-radius: 0.15rem; box-sizing: border-box; display: inline-block; vertical-align: middle;}
.m-dropdown > .dailyList > .list > .member > .txt{font-size: 0.22rem; line-height: 1.6; display: inline-block; vertical-align: middle; margin-left: 0.16rem;}
.m-dropdown > .dailyList > .list > .member > .txt > .big{font-size: 0.32rem;color: #000;}
.m-dropdown > .dailyList > .list > .ct{color: #000;margin-top: 0.26rem;}
.m-dropdown > .dailyList > .list > .ct > .part{display: block;margin-bottom: 0.2rem; padding: 0.04rem 0; padding-right: 0.4rem;}
.m-dropdown > .dailyList > .list .angel{position: absolute; right: 0.26rem; top: 50%; transform: translateY(-50%); font-size: 0.4rem; font-weight: bold; color: #4f77aa;}
.m-dropdown.s-show > .dailyList{display: block;}
.m-dropdown.s-show > .title > .arrow3{
	transform:rotate(0deg);
	-ms-transform:rotate(0deg); /* IE 9 */
	-webkit-transform:rotate(180deg); /* Safari and Chrome */
}


.m-bottom{height: 1.16rem; text-align: center; position: fixed; width: 100%; left: 0; bottom: 0; border-top: 0.01rem solid #c7c7c7; background-color:#fff; z-index: 4;}
.m-bottom > .block{text-align: center; line-height: 1.16rem;}
.m-bottom > .block > .btn{width:2.28rem;height: 0.66rem;text-align: center;line-height: 0.66rem;margin-left:0.46rem;background-color: #4f77aa; color: #fff;font-size: 0.32rem; display: inline-block; border-radius: 0; box-sizing: border-box; border: none; vertical-align: middle;}
.m-bottom > .block > .btn:first-child{margin-left: 0;}

</style>
