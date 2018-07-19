<template>
    <div>
        <!--我的行程-->
        <div class="m-schedule" style="padding-bottom: 1.2rem;">
            <div class="m-calendar">
                <Calendar @choseDay="clickDay"></Calendar>
            </div>

            <div class="block"></div>

            <div class="ct j-list">
                <!--循环体-->
                <div class="list f-clear" v-if="list.length" v-for="(items,index) in list" :key="items.mg_id">
                    <span class="left">{{index + 1}}、</span>
                    <pre @click="edit(items.plan_content,items.mg_id)">{{items.plan_content}}</pre>
                    <i class="icon icon-quxiao close" @click="del(items.mg_id,index)"></i>
                </div>
                <!--循环体 end-->
            </div>

            <div class="m-forbotNav" style="height: 1.6rem;"></div>
            <div class="btn" @click="showModal">
                <i class="iconfont icon-tianjia1"></i>新建计划
            </div>

        </div>
        <!--我的行程 end-->

        <!--弹窗-->
        <div class="m-FU_modal s-botInput" :class="{'s-show':isModalShow}">
            <div class="top f-clear">
                <a href="javascript:;" class="btn" @click="isModalShow = !isModalShow">取消</a>
                <a href="javascript:;" class="btn" @click="addDaily">确定</a>
            </div>
            <div class="ct">
                <textarea v-model="planContent" name="planContent" placeholder="日程内容"></textarea>
            </div>
        </div>
        <!--弹窗 end-->

    </div>
</template>

<script>
var qs = require('qs');
import Calendar from 'vue-calendar-component'   //引入日历插件

export default {
    name: 'mySchedule',
    data () {
        return {
            isModalShow:false,
            list:[],
            loading:false,   //防止重复提交
            planContent:"",
            nowDate:this.F['dateFormat'](Date.parse(new Date())).split(' ')[0],  //当前日期
            nowMgId:"",
        }
    },
    components:{
        Calendar
    },
    created(){
        this.clickDay()
        //this.nowDate = vm.F['dateFormat'](Date.parse(new Date())).split(' ')[0]
    },
    methods:{
        clickDay(date){
            var vm = this;
            date = date?date:vm.nowDate
            date = date.replace(/\//g,'-') //把斜杠替换成横杠

            //修改当前时间
            vm.nowDate = date

            this.axios.post(this.$store.state.httpUrl.mySchedule.mySchedule,qs.stringify({
                planTime:date
            }))
            .then(function (res) {
                //console.log(res.data);
                if(res.data.code == 1){
                    vm.list.splice(0,vm.list.length);
                    var _data = res.data.retval.list;
                    for (let i = 0; i < _data.length; i++) {
                        vm.list.push(_data[i]);
                    }

                    //清空planContent
                    vm.planContent = ""

                }
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        addDaily(){
            var vm = this;
            if (vm.loading) {
                return false
            }
            var postData = {
                planContent:vm.planContent,
                planTime:vm.nowDate
            }
            if (vm.nowMgId) {
                postData.mgId = vm.nowMgId
            }
            if (!postData.planContent) {
                //alert("请输入日程内容")
                vm.F['Hint'](vm,{
                    ct:"请输入日程内容"
                })
                return false
            }

            vm.loading = true
            this.axios.post(this.$store.state.httpUrl.mySchedule.myScheduleAdd,qs.stringify(postData))
            .then(function (res) {
                if(res.data.code == 1){
                    //alert(res.data.retval.okTip)
                    vm.F['Hint'](vm,{
                        ct:res.data.retval.okTip,
                        type:1
                    })
                    vm.isModalShow = false;
                    setTimeout(() => {
                        vm.clickDay()
                    },1500);
                    vm.clickDay()
                    // setTimeout(() => {
                    //     window.location.reload()
                    //     //vm.$router.push('/myIndex/mySchedule');   //我的请假申请
                    // },1500);
                }
                vm.loading = false
            })
            .catch(function (err) {
                console.log(err);
            });

        },
        showModal(){
            var vm = this;
            vm.planContent = "";
            vm.isModalShow = !vm.isModalShow;
            vm.nowMgId = "";
        },
        del(id,index){
            var vm = this;
            var url = vm.$store.state.httpUrl.mySchedule.delSchedule + '?id=' + id;
            vm.axios.get(url)
            .then((res) => {
                var data = res.data;
                if (data.code >= 1) {
                    vm.F['Hint'](vm,{
                        ct:data.retval.okTip,
                        type:1
                    })
                    vm.list.splice(index,1)
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
                    })
                }
            }) 
        },
        edit(ct,id){
            var vm = this;
            vm.planContent = ct;
            vm.isModalShow = !vm.isModalShow;
            vm.nowMgId = id;
            //vm.addDaily(id)
        }
    },
    computed:{
        getShadeState(){
            return this.$store.state.isShadeShow
        }
    },
    watch:{
        'isModalShow'(){
            this.$store.state.isShadeShow = this.isModalShow;
        },
        getShadeState(val){   //点击阴影关闭弹窗
            this.isModalShow = this.$store.state.isShadeShow;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*我的行程*/
.m-schedule{position: relative; display: block;}
.m-schedule > .calendar{height: 5.54rem; border-bottom: 0.01rem solid #e4e4e5; background-color: #fff;}
.m-schedule > .block{height: 0.44rem; background-color: #f0f4f7;}
.m-schedule > .ct{border-top: 0.01rem solid #e4e4e5; background-color: #fff;}
.m-schedule > .ct > .list{padding:0.4rem 0.42rem; border-bottom: 0.01rem solid #e4e4e5; font-size: 0.3rem; color: #292929; position: relative;}
.m-schedule > .ct > .list > .left{float: left; line-height: 1.4;}
.m-schedule > .ct > .list > pre{margin-left: 0.7rem; line-height: 1.4; white-space: pre-line;}
.m-schedule > .ct > .list .close{position: absolute; font-size: 0.28rem; right: 0.3rem; top: 50%; transform: translateY(-50%); cursor: pointer;}
.m-schedule > .btn{display: block; position: fixed; width: 100%; height: 1.08rem; line-height: 1.08rem; text-align: center; font-size: 0.3rem; color: #4f77aa; bottom: 0; left: 0; box-sizing: border-box; border-top: 0.01rem solid #e4e4e5; cursor: pointer; background-color: #fff;}
.m-schedule > .btn > i{font-size: 0.34rem; color: #4f77aa; margin-right: 0.08rem;}
</style>
