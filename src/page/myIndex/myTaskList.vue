<template>
    <div>
        <router-link :to="'/myIndex/myTaskDetail/' + items.t_id" class="m-listStatus" v-for="(items,index) in list" :key="index">
            <div class="wrap">
                <div class="title f-txtof">{{items.title}}</div>
                <div class="time">{{unixFormat(items.created_time)}}</div>
            </div>
            <template v-if="items.status == 1">
                <span class="label s-red">进行中</span>    
            </template>
            <template v-if="items.status == 2">
                <span class="label s-green">已结束</span>    
            </template>
            <template v-if="items.status == 3">
                <span class="label s-blue">已归档</span>    
            </template>
        </router-link>

        <loading :loadingShow="loadingData.loadingShow" :botLineShow="loadingData.botLineShow" :noDataShow="loadingData.noDataShow"></loading>
    </div>
</template>

<script>
import loading from '@/components/loading'
export default {
    name: 'myAffairList',
    data () {
        return {
            temp:this.$store.state.httpUrl.temp,
            list:[],
            loadingData:{
                loadingShow:false,  //是否显示加载效果
                botLineShow:false,   //是否显示到达底部,
                noDataShow:false     //是否显示没有数据
            },
            page:1
        }
    },
    components:{
        loading
    },
    created(){
        var vm = this;
        document.body.style.backgroundColor = "#fff";

        vm.getData();
    },
    destroyed(){
        document.body.style.backgroundColor = "";

        //退出列表销毁
        window.onscroll = function(){}
    },
    methods:{
        init:function(){
			var vm = this;
			window.onscroll = function(){
				if (vm.isShowBotLine) { //如果到达底部就阻值下拉刷新
					return false
				}else{
					vm.F['throttle'](vm.F['botTrigger'](vm.getData),100,100)
				}
			};
		},
        getData(){
            var vm = this;
            if (vm.loadingData.loadingShow || vm.loadingData.botLineShow) {
                return false
            }
            var url = vm.$store.state.httpUrl.task.myTaskList;

            vm.loadingData.loadingShow = true
            vm.ajax.post(url)
            .then((res) => {
                var data = res;
                vm.loadingData.loadingShow = false
                //console.log(data)
                if (data.code >= 1) {
                    //console.log()
                    var _data = data.retval.dbRs;

                    if (!_data) { //如果返回空值
                        vm.list.splice(0,vm.list.length); //显示暂无数据
                        return false
                    }

                    var count = +_data.count;

                    if (vm.list.length >= count && vm.list.length) { //如果已经大于最大值
                        vm.loadingData.botLineShow = true
                        return false
                    }
            
                    if (_data.list.length) {        //返回的数据不为空
                        for (let i = 0; i < _data.list.length; i++) {
                            vm.list.push(_data.list[i])
                        }
                        vm.page++
                    }else{
                        vm.loadingData.noDataShow = true
                    }
                    
                }
            })
        },
        unixFormat(timestamp){
            var vm = this;
            return vm.F['unixFormat'](timestamp)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-listStatus{position: relative; padding: 0.2rem 0.34rem; background-color: #fff; box-sizing: border-box; border-bottom: 0.01rem solid #e9e9e9; display: block;}
.m-listStatus > .wrap{min-height: 0.7rem; width: 5.6rem;}
.m-listStatus > .wrap > .title{font-size: 0.32rem; color: #272c2f;}
.m-listStatus > .wrap > .time{font-size: 0.22rem; color: #b3b3b3; margin-top: 0.22rem;}
.m-listStatus .label{position: absolute; display: block; padding: 0 0.14rem; height: 0.4rem; line-height: 0.4rem; color: #fff; background-color: #aa4f4f; border-radius: 0.06rem; right: 0.2rem; top: 50%; transform: translateY(-50%);}
.m-listStatus .label.s-red{background-color: #aa4f4f;}
.m-listStatus .label.s-green{background-color: #67aa4f;}
.m-listStatus .label.s-blue{background-color: #4f77aa;}
</style>
