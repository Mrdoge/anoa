<template>
    <div>
        <div class="m-question">
            <div class="top">
                <router-link class="btn" to="/question/questionAdd">
                    <span class="inner">
                        <span class="txt">发布<br />问题</span>
                    </span>
                </router-link>
            </div>
            <div class="bot">
                <router-link class="list f-clear" :to="'/question/questionDetail/' + items.q_id" v-for="(items,index) in list" :key="items.lastupdatetime">
                    <img class="left" v-lazy="host + '/'+items.img_url">
                    <div class="right">
                        <div class="title f-txtof_2">{{items.title}}</div>
                        <div class="name">{{items.nickname}}</div>
                        <div class="time">{{unixFormat(items.created_time)}}</div>
                    </div>
                    <span class="status" v-if="+items.status == 1">进行中</span>
                    <span class="status" :class="{'s-green': +items.status == 2}" v-if="+items.status == 2">已结束</span>
                </router-link>
            </div>
            <loading :loadingShow="loadingData.loadingShow" :botLineShow="loadingData.botLineShow" :noDataShow="loadingData.noDataShow"></loading>
        </div>
    </div>
</template>

<script>
import loading from '@/components/loading'


var qs = require('qs');
export default {
    name: 'QuestionList',
    data () {
        return {
            host:this.$store.state.httpUrl.HOST,
            list:[],
            loadingData:{
                loadingShow:false,  //是否显示加载效果
                botLineShow:false,   //是否显示到达底部,
                noDataShow:false     //是否显示没有数据
            },
            page:1
        }
    },
    created(){
        this.getData();
    },
    destroyed(){
        //退出列表销毁
        window.onscroll = function(){}
    },
    methods:{
		init:function(){
			var vm = this;
			//var base_url = "{base_url()}";
			window.onscroll = function(){
				//throttle(lazyload,100,100)
				if (vm.isShowBotLine) { //如果到达底部就阻值下拉刷新
					return false
				}else{
					//throttle(lazyload,100,100)
					vm.F['throttle'](vm.F['botTrigger'](vm.getData),100,100)
				}
			};
		},
        getData(){
            var vm = this;
            if (vm.loadingData.loadingShow || vm.loadingData.botLineShow || vm.loadingData.noDataShow) {
                return false
            }
            var postData = {
                page:vm.page
            }
            vm.loadingData.loadingShow = true
            this.ajax.post(this.$store.state.httpUrl.qst.questionList,postData)
            .then(function (res) {
                //console.log(res.data);
                var data = res;
                vm.loadingData.loadingShow = false
                if (data.code == 1) {
                    const _data = data.retval.data.list;

                    if (!_data) { //如果返回空值
                        vm.list.splice(0,vm.list.length); //显示暂无数据
                        vm.loadingData.noDataShow = true
                        return false
                    }

                    var count = +data.retval.data.count;
                    //console.log(vm.list.length,count)
                    if (vm.list.length >= count && vm.list.length) { //如果已经大于最大值
                        vm.loadingData.botLineShow = true
                        return false
                    }

                    if (_data.length) {     //返回的数据不为空
                        for (let i = 0; i < _data.length; i++) {
                            vm.list.push(_data[i])
                        }
                        vm.page++
                    }else{
                        vm.loadingData.noDataShow = true
                    }

                }
                //vm.loadingData.loadingShow = false
                //vm.loadingData.botLineShow = true
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        unixFormat(timestamp){
            var vm = this;
            return vm.F['unixFormat'](timestamp)
        }
    },
    components:{
        loading
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-question{}
.m-question > .top{position: relative; height: 3.2rem; border-bottom: 0.01rem solid #e4e4e5; margin-bottom: 0.28rem; text-align: center; background-color: #fff;}
.m-question > .top > .btn{display: block; width: 1.76rem; height: 1.76rem; background-color: #fff; border-radius: 50%; position: absolute; left: 50%; top: 50%; transform: translate(-50%,-50%); border: 0.22rem solid #4f77aa;}
.m-question > .top > .btn .inner{display: block; width: 1.44rem; height: 1.44rem; border-radius: 50%; border: 0.01rem solid #e6e6e6; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); text-align: center;}
.m-question > .top > .btn .inner .txt{position: absolute; font-size: 0.3rem; color: #4f77aa; top: 50%; left: 50%; transform: translate(-50%,-50%);}
.m-question > .bot{border-top: 0.01rem solid #e4e4e5;}
.m-question > .bot > .list{display: block; background-color: #fff; padding: 0.12rem 0.16rem; font-size: 0; position: relative; border-bottom: 0.01rem solid #e4e4e5;}
.m-question > .bot > .list > .left{display: inline-block; width: 2.06rem; height: 1.5rem; vertical-align: middle;}
.m-question > .bot > .list > .right{display: inline-block; width: 5rem; vertical-align: middle; margin-left: 0.1rem;}
.m-question > .bot > .list > .right > .title{font-size: 0.32rem; color: #272c2f; line-height: 1.2; height: 0.78rem;}
.m-question > .bot > .list > .right > .name{font-size: 0.26rem; color: #b3b3b3; margin-top: 0.06rem;}
.m-question > .bot > .list > .right > .time{font-size: 0.26rem; color: #b3b3b3; margin-top: 0.1rem;}
.m-question > .bot > .list .status{background-color: #aa4f4f; color: #fff; display: inline-block; padding: 0 0.14rem; height: 0.38rem; line-height: 0.38rem; position: absolute; right: 0.16rem; bottom: 0.12rem; font-size: 0.26rem; border-radius: 0.04rem;}
.m-question > .bot > .list .status.s-green{background-color: #48c150;}
</style>
