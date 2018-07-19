<template>
    <div>
        <div class="m-list">
            <router-link :to="url(items.status,items.id)" class="list" v-for="(items,index) in dataList" :key="index">
                <div class="title">
                    <span class="status s-red" v-if="+items.status == 1">待审核</span>
                    <span class="status s-green" v-if="+items.status == 2">已批准</span>
                    <span class="status s-red" v-if="+items.status == 3">不批准</span>
                </div>
                <div class="time">{{unixFormat(items.created_time)}}</div>
                
                <a href="javascript:;" class="btn" v-if="+items.status == 1">编辑</a>
                <a href="javascript:;" class="btn" v-if="+items.status != 1">查看</a>
                
            </router-link>
        </div>
        <loading :loadingShow="loading" :botLineShow="botLineShow && dataList.length" :noDataShow="!dataList.length"></loading>
    </div>
</template>

<script>
import loading from '@/components/loading' //底部导航
var qs = require('qs');
export default {
    name: 'myApplyList',
    data () {
        return {
            applyIcon:this.$store.state.myApplyIndex,
            applyIndex:this.$route.params.index,
            dataList:[],    //数据
            loading:false, //是否加载中
            botLineShow:false,  //是否显示底边
            page:1          //当前页码数
        }
    },
    created(){
        //document.body.style.backgroundColor = "#fff"  //  不知道为啥不生效
        var vm = this;
        this.titleChange();
        setTimeout(() => {
            document.body.style.backgroundColor = "#fff";
        },40)

        //初始化（分页）
        vm.init()

        //一开始先获取数据
        vm.getData();
    },
    destroyed(){
        var vm = this;
        document.body.style.backgroundColor = ""

        //退出列表销毁
        window.onscroll = function(){}
    },
    components:{
        loading
    },
    methods:{
        titleChange(){  //每次进来改变标题
            var vm = this;
            var title = vm.applyIcon[+vm.applyIndex].txt
            this.$store.state.topBarTitle = title
        },
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
            if (vm.loading || vm.botLineShow) {
                return false
            }
            var postData = {
                type:vm.applyIcon[vm.applyIndex].type,
                page:vm.page
            }

            vm.loading = true;
			this.axios.post(this.$store.state.httpUrl.my.applyList,qs.stringify(postData))
			.then(function (res) {
				//console.log(res.data);
				if (res.data.code == 1) {
                        vm.loading = false;
                        var data = res.data.retval;
                        //console.log(data)
						if (!data) { //如果返回空值
							vm.dataList.splice(0,vm.dataList.length); //显示暂无数据
							return false
						}
						//console.log(data)
                        var count = +data.count;
						//console.log(vm.dataList.length,count)
                        if (vm.dataList.length >= count) { //如果已经大于最大值
                            //console.log('已经是最大值')
							vm.botLineShow = true
							return false
						}
						for (var i = 0; i < data.data.length; i++) {
							vm.dataList.push(data.data[i])
						}
						vm.page++
                }
			})
			.catch(function (err) {
				console.log(err);
			})
        },
        unixFormat(timestamp){
            var vm = this;
            return vm.F['unixFormat'](timestamp)
        },
        url(status,id){
            var vm = this;
            var str = '/myIndex/MyApplyDetails/' + vm.applyIndex + '/' + id
            if (+status == 1) {
                //str = '/myIndex/myApplyEdit/' + vm.applyIndex + '/' + id
                str = vm.applyIcon[vm.applyIndex].editUrl + '/' + vm.applyIndex + '/' + id
            }
            //console.log(str)
            return str
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-list{position: relative;}
.m-list > .list{position: relative; padding: 0.2rem 0.42rem; border-bottom: 0.01rem solid #e9e9e9; background-color: #fff; display: block;}
.m-list > .list .title{margin-bottom: 0.2rem;}
.m-list > .list .time{font-size: 0.22rem; color: #b3b3b3;}
.m-list > .list .status{background-color: #f6d437; color: #fff; border-radius: 0.02rem; padding: 0 0.3rem; height: 0.38rem; line-height: 0.38rem;}
.m-list > .list .status.s-red{background-color: #aa4f4f;}
.m-list > .list .status.s-green{background-color: #66b44b;}
.m-list > .list .btn{position: absolute; display: block; padding: 0.2rem 0.3rem; border-radius: 0.06rem; background-color: #4f77aa; color: #fff; right: 0.2rem; top: 50%; transform: translateY(-50%); font-size: 0.26rem; z-index: 1;}
</style>
