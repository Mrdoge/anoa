<template>
    <div class="m-infoIndex">
        <router-link :to="'/info/infoList/' + typeList[0].cate_id" class="list f-clear">
            <div class="left" :class="{'s-red':+typeList[0].count}"><!--s-red表示有新消息-->
                <i class="iconfont icon-gonggaotongzhi"></i>
            </div>
            <div class="right">
                <h2 class="title">公告通知</h2>
                <div class="tips f-txtof_2">{{typeList[0].title}}</div>
            </div>
            <div class="time" v-if="typeList[0].title">{{unixFormat(typeList[0].created_time)}}</div>
        </router-link>
        <router-link :to="'/info/infoList/' + typeList[1].cate_id" class="list s-purple f-clear">
            <div class="left" :class="{'s-red':+typeList[1].count}">
                <i class="iconfont icon-renwuguanli"></i>
            </div>
            <div class="right">
                <h2 class="title">申请通知</h2>
                <div class="tips">{{typeList[1].title}}</div>
            </div>
            <div class="time" v-if="typeList[1].title">{{unixFormat(typeList[1].created_time)}}</div>
        </router-link>
        <router-link :to="'/info/infoList/' + typeList[2].cate_id" class="list s-yellow f-clear">
            <div class="left" :class="{'s-red':+typeList[2].count}">
                <i class="iconfont icon-renwutixing"></i>
            </div>
            <div class="right">
                <h2 class="title">任务通知</h2>
                <div class="tips">{{typeList[2].title}}</div>
            </div>
            <div class="time" v-if="typeList[2].title">{{unixFormat(typeList[2].created_time)}}</div>
        </router-link>
        <router-link :to="'/info/infoList/' + typeList[3].cate_id"  class="list s-pink f-clear">
            <div class="left" :class="{'s-red':+typeList[3].count}">
                <i class="iconfont icon-daibanshiwu"></i>
            </div>
            <div class="right">
                <h2 class="title">事件通知</h2>
                <div class="tips">{{typeList[3].title}}</div>
            </div>
            <div class="time" v-if="typeList[3].title">{{unixFormat(typeList[3].created_time)}}</div>
        </router-link>
        
        <!-- <router-link to="/myIndex/myTaskList"  class="list s-pink f-clear">
            <div class="left">
                <i class="iconfont icon-daibanshiwu"></i>
            </div>
            <div class="right">
                <h2 class="title">待办任务</h2>
                <div class="tips">全新2.0版本已上线，请及时更新</div>
            </div>
        </router-link> -->
        
        <!-- <router-link to="/myIndex/myApplyIndex" class="list s-purple f-clear">
            <div class="left" :class="{'s-red':typeList[1].count}">
                <i class="iconfont icon-wodeshenqing"></i>
            </div>
            <div class="right">
                <h2 class="title">我的申请</h2>
            </div>
        </router-link> -->
        
        
        <router-link to="/myIndex/mySchedule" class="list f-clear">
            <div class="left">
                <i class="iconfont icon-wodehangcheng"></i>
            </div>
            <div class="right">
                <h2 class="title" style="padding-top:0.2rem;">我的行程</h2>
                <!-- <div class="tips">全新2.0版本已上线，请及时更新</div> -->
            </div>
        </router-link>

    </div>
</template>

<script>
var qs = require('qs');
export default {
    name: 'infoIndex',
    data () {
        return {
            typeList:[
                {
                    cate_id:101,     //公告
                    count:0,
                    title:""
                },
                {
                    cate_id:201,      //申请
                    count:0,
                    title:""
                },
                {
                    cate_id:301,      //任务
                    count:0,
                    title:""
                },
                {
                    cate_id:401,      //事件
                    count:0,
                    title:""
                }
            ],
            //typeList:[],    //后台返回的数据
            total:0
        }
    },
    created(){
        var vm = this;

        if (localStorage.getItem('token')) {
            vm.getData();
        }
    },
    methods:{
        getData(){
            var vm = this;
            var url = vm.$store.state.httpUrl.info.infoIndex;

            vm.ajax.post(url)
            .then((res) => {
                var data = res

                if (data.code == 1) {
                    //vm.typeList[i].count = +data.retval.count
                    for (let i = 0; i < data.retval.data.length; i++) {
                        //vm.typeList.push(data.retval.data[i])
                        for (let j = 0; j < vm.typeList.length; j++) {
                            //const element = vm.typeList[i];
                            if (vm.typeList[j].cate_id == data.retval.data[i].cate_id) {
                                vm.$set(vm.typeList[j],'count',data.retval.data[i].count)
                                vm.$set(vm.typeList[j],'title',data.retval.data[i].title)
                                vm.$set(vm.typeList[j],'created_time',data.retval.data[i].created_time)
                                vm.$set(vm.typeList[j],'name',data.retval.data[i].name)
                                vm.$set(vm.typeList[j],'info_id',data.retval.data[i].info_id)
                                break
                            }
                        }
                    }
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
                    })
                }
            })
        },
        unixFormat(timestamp){
            if (!timestamp) {
                return ''
            }
            var vm = this;
            var time = vm.F['unixFormat'](timestamp);
            //console.log(time)
            var md = time.split(' ')[0].split('-')[1] + '-' + time.split(' ')[0].split('-')[2]
            var hm = time.split(' ')[1].split(':')[0] + ':' + time.split(' ')[1].split(':')[1]
            time = md + ' ' + hm
            return time
        }
    },
    computed:{
        isLogin(){
            var vm = this
            return vm.$store.state.isLogin
        }
    },
    watch:{
        'isLogin'(){
            var vm = this;
            setTimeout(()=> {
                vm.getData();
            },400);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-infoIndex{height: 100%;}
.m-infoIndex > .list{display: block; padding: 0.16rem 0.3rem; background-color: #fff; border-bottom: 0.01rem solid #e9e9e9; position: relative;}
.m-infoIndex > .list > .left{display: block; width: 1rem; height: 1rem; text-align: center; line-height: 1rem; color: #fff; background-color: #55b6fe; border-radius: 0.1rem; vertical-align: middle; position: relative; float: left;}
.m-infoIndex > .list > .left.s-red:after{content: ""; display: block; width: 0.24rem; height: 0.24rem; background-color: #ff1b06; border-radius: 50%; position: absolute; right: -0.06rem; top: -0.06rem;}
.m-infoIndex > .list > .left > i{font-size: 0.56rem;}
.m-infoIndex > .list > .right{display: block; margin-left: 1.2rem; max-width: 5.52rem; padding-top: 0.14rem;}
.m-infoIndex > .list > .right > .title{font-size: 0.3rem; color: #272c2f; font-weight: normal; padding-bottom: 0.04rem; max-width: 5rem;}
.m-infoIndex > .list > .right > .tips{color: #959a98; font-size: 0.24rem; margin-top: 0.02rem; padding: 0.02rem 0; line-height: 1.2; padding-top: 0.1rem;}
.m-infoIndex > .list.s-pink > .left{background-color: #fe5585;}
.m-infoIndex > .list.s-purple > .left{background-color: #cc55fe;}
.m-infoIndex > .list.s-yellow > .left{background-color: #fec055;}

.m-infoIndex > .list .time{display: block; position: absolute; right: 0.1rem; bottom: 0.32rem; font-size: 0.24rem; color: #bcbcbc;}
</style>
