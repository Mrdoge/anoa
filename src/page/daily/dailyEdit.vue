<template>
    <div class="m-dailyWrap">
        <!-- 写日报 -->
        <div class="m-write J-FU_form" method="post" fu-call="addDaily">
            <div class="part">
                <div class="title">今日工作:</div><br/>
                <textarea class="today" v-model="form.todayDesc" placeholder="请输入今日工作内容" name="todayDesc"  fu-verify="noNull" fu-tips="请输入今日的工作内容"></textarea>
                <div class="line"></div>
            </div>
            <div class="part">
                <div class="title">明日工作:</div><br/>
                <textarea class="today" v-model="form.tomorrowDesc" placeholder="请输入明日工作内容" name="tomorrowDesc" fu-verify="noNull" fu-tips="请输入明日工作内容"></textarea>
                <div class="line"></div>
            </div>
            <div class="part">
                <div class="title">其他事项:</div><br/>
                <textarea class="today" v-model="form.commentDesc" placeholder="请输入补充内容" name="commentDesc" fu-verify="noNull" fu-tips="请输入补充内容"></textarea>
            </div>
            <!-- 写日报 end-->

            <!-- 底边 -->
            <div class="m-forbotNav" style="height: 2rem;"></div>
            <div class="m-bottom">
                <div class="block f-clear">
                    <div class="btn" @click="toggleShow">查看范文</div>
                    <div class="btn j-submit u-FU_btn" @click="submit(0)" :class="{'z-loading':loading[0]}">保存草稿<span class="p-loading"></span></div>
                    <div class="btn j-submit u-FU_btn" @click="submit(1)" :class="{'z-loading':loading[1]}">提交<span class="p-loading"></span></div>
                </div>
            </div>
            <!-- 底边 end-->

        </div>

        <!--弹窗-->
        <!--查看范文弹窗-->
        <transition class="animated" name="bounceIn" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
            <div class="m-FU_modal s-example j-example" fu-obj="modal" v-if="this.$store.state.isShadeShow">
                <div class="ct">
                    <img :src="this.$store.state.httpUrl.exampleImg"><br/>
                    <div class="radius">
                        <i class="icon-quxiao icon" @click="toggleShow"></i>
                    </div>
                </div>
            </div>
        </transition>
        <!--查看范文弹窗 end-->
        <!--弹窗 end-->
    </div>
</template>

<script>
var qs = require('qs');
export default {
    name: 'dailyDetails',
    data () {
        return {
            daId:this.$route.params.daId,
            form:{
                todayDesc:"",
                tomorrowDesc:"",
                commentDesc:""
            },
            loading:[false,false]
        }
    },
    created(){
        //console.log(this.$store.state.httpUrl.exampleImg)
        this.getData();
    },
    destroyed(){
        this.$store.state.isShadeShow = false
    },
    methods:{
        toggleShow(){
            this.$store.state.isShadeShow = !this.$store.state.isShadeShow
        },
        submit(index){
            var vm = this;
            index = +index;
            if (vm.loading[index]) {
                return false
            }
            var postData = vm.form;

            var verifyData = [
                {
                    val:postData.todayDesc,
                    type:"noNull",
                    tips:"请输入今日工作内容"
                },
                // {
                //     val:postData.tomorrowDesc,
                //     type:"noNull",
                //     tips:"请输入明日工作内容"
                // },
                // {
                //     val:postData.commentDesc,
                //     type:"noNull",
                //     tips:"请输入补充内容"
                // }
            ]

            //数据验证
            const verify = vm.F['FormComfirm'](verifyData)
            if(verify.err){
                vm.F['Hint'](vm,{
                    ct:verify.ct,
                    type:0
                })
                return false
            }

            vm.$set(vm.loading,index,true)
            var url = vm.$store.state.httpUrl.daily.dailyAdd + '?id=' + vm.$route.params.daId
            vm.axios.post(url,qs.stringify(postData))
            .then(function (res) {
                if (res.data.code == 1) {
                    vm.F['Hint'](vm,{
                        ct:res.data.retval.okTip,
                        type:1
                    })

                    vm.$router.push('/myIndex/myDailyList');
                    //vm.$router.push('/daily/dailyIndex');
                    // setTimeout(() => {
                    //     vm.$router.push('/daily/dailyIndex');
                    // },1500)
                }else{
                    vm.F['Hint'](vm,{
                        ct:res.data.msg
                    })
                }

                vm.$set(vm.loading,index,false)
            })
            .catch(function (err) {
                console.log(err);
            });


        },
        getData(){
            var vm = this;
            this.axios.post(this.$store.state.httpUrl.daily.dailyDetalis,qs.stringify({
                daId:vm.daId
            }))
            .then(function (res) {
                if(res.data.code == 1){
                    const _data = res.data.retval.data[0];
                    //console.log(_data);
                    vm.form.todayDesc = _data.today_desc
                    vm.form.tomorrowDesc = _data.tomorrow_desc
                    vm.form.commentDesc = _data.comment_desc
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-dailyWrap{}
.m-write{margin-top:0.24rem; }
.m-write > .part{background-color: #fff;font-size: 0.26rem;padding-top: 0.28rem;padding-left: 0.32rem;color: #000;}
.m-write > .part > .today{box-shadow: none; border:none;outline:none;width:7rem;height: 2.88rem;font-size: 0.26rem;}
.m-write > .part > .line{height: 0.03rem;padding-left: 0.26rem;background-color: #e9e9e9;}

.m-bottom > .block > .btn{width: 2.2rem; font-size: 0.28rem; margin-left: 0.1rem;}

/*查看范文弹窗*/
.m-FU_modal.s-example{width: 5.6rem; margin-left: -2.8rem; border-radius: 0;text-align: center;}
.m-FU_modal.s-example i{color: #fff;font-size: 0.5rem;}
.m-FU_modal.s-example > .ct > .radius{position: absolute;line-height: 0.8rem; bottom: -0.9rem;right:50%; margin-right:-0.4rem;width:0.8rem;height: 0.8rem; border-radius: 0.4rem;border: 0.01rem solid #fff;box-sizing: border-box;}
</style>
