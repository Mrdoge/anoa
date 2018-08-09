<template>
    <div>
        <!--tab切换按钮-->
        <div class="m-tabBtn g-flex s-row">
            <div class="btn" :class="{'z-cur':+applyType == 2}" @click="setType(2)">我的申请</div>
            <div class="btn" :class="{'z-cur':+applyType == 1}" @click="setType(1)">待批申请</div>
        </div>
        <!--tab切换按钮 end-->

        <div class="m-list">
            <router-link :to="url(items.status,items.id)" class="list" v-for="(items,index) in dataList" :key="index" v-if="+applyType == 2">
                <div class="title">
                    <span class="status s-red" v-if="+items.status == 1">待审核</span>
                    <span class="status s-green" v-if="+items.status == 2">已批准</span>
                    <span class="status s-red" v-if="+items.status == 3">不批准</span>
                </div>
                <div class="time">{{unixFormat(items.created_time)}}</div>
                
                <a href="javascript:;" class="btn" v-if="+items.status == 1">编辑</a>
                <a href="javascript:;" class="btn" v-if="+items.status != 1">查看</a>
            </router-link>


            <router-link class="m-avatarList f-clear" :to="'/myIndex/MyApplyCheck/' + applyIndex + '/' + items.id" v-for="(items,index) in dataList" :key="index" v-if="+applyType == 1">
                <img :src="host + '/' + items.userAvatar" alt="" class="avatar">
                <div class="right">
                    <div class="name">{{items.userName}}</div>
                    <div class="time">{{unixFormat(items.created_time)}}</div>
                </div>
                <div class="m-label label s-red" v-if="+items.status == 1">待审核</div>
                <div class="m-label label s-green" v-if="+items.status == 2">已批准</div>
                <div class="m-label label s-red" v-if="+items.status == 3">不批准</div>
            </router-link>

        </div>
        <loading :loadingShow="loading" :botLineShow="botLineShow && dataList.length" :noDataShow="!dataList.length"></loading>
    </div>
</template>

<script>
import loading from '@/components/loading' //底部导航
export default {
    name: 'myApplyList',
    data () {
        return {
            applyIcon:this.$store.state.myApplyIndex,
            applyIndex:this.$route.params.index,
            applyType:this.$route.params.type,
            host:this.$store.state.httpUrl.HOST,
            dataList:[],    //数据
            loading:false, //是否加载中
            botLineShow:false,  //是否显示底边
            page:1,          //当前页码数
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


        var ifFromCheck = localStorage.getItem('ifFromCheck');
        if (ifFromCheck) {
            vm.applyType = 1
        }else{
            vm.applyType = 2
        }

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
            var url = "";
            url = +vm.applyType == 2? vm.$store.state.httpUrl.my.applyList : vm.$store.state.httpUrl.my.applyListWait

            vm.loading = true;
			this.ajax.post(url,postData)
			.then(function (res) {
                //console.log(res.data);
                var data = res;
				if (data.code == 1) {
                        vm.loading = false;
                        var _data = data.retval;
                        //console.log(data)
						if (!_data) { //如果返回空值
							vm.dataList.splice(0,vm.dataList.length); //显示暂无数据
							return false
						}
						//console.log(data)
                        var count = +_data.count;
						//console.log(vm.dataList.length,count)
                        if (vm.dataList.length >= count) { //如果已经大于最大值
                            //console.log('已经是最大值')
							vm.botLineShow = true
							return false
						}
						for (var i = 0; i < _data.data.length; i++) {
							vm.dataList.push(_data.data[i])
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
        },
        setType(type){  //点击按钮获取数据
            var vm = this
            if (type == +vm.applyType) {    //同一状态就不去请求数据
                return false
            }
            vm.applyType = type;
            vm.page = 1;
            vm.loading = false;
            vm.botLineShow = false;
            vm.dataList.splice(0,vm.dataList.length)

            if (+type == 1) {
                localStorage.setItem('ifFromCheck',1);
            }else{
                localStorage.setItem('ifFromCheck','');
            }
            vm.getData()
        }
    },
    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //         if (from.path.indexOf('MyApplyCheck') > -1) {
    //             localStorage.setItem('ifFromCheck',1);
    //         }else{
    //             localStorage.setItem('ifFromCheck','');
    //         }
    //     })
    // },
    // beforeRouteLeave (to, from , next) {        //每次离开页面清除isFromCheck
    //     localStorage.setItem('ifFromCheck','')
    //     next();
    // }
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

.m-tabBtn{position: relative; border-bottom: 0.01rem solid #e9e9e9;}
.m-tabBtn .btn{height: 0.9rem; line-height: 0.9rem; text-align: center; font-size: 0.32rem; color: #4f77aa; position: relative; border-left: 0.01rem solid #e9e9e9;}
.m-tabBtn .btn.z-cur:after{content:""; position: absolute; height: 0.04rem; width: 100%; bottom: 0; left: 0; background-color: #4f77aa;}
.m-tabBtn .btn:first-child{border-left: none;}

.m-avatarList{padding: 0 0.3rem; height: 1.16rem; line-height: 1.16rem; border-bottom: 0.01rem solid #e9e9e9; font-size: 0; display: block; position: relative;}
.m-avatarList .avatar{display: inline-block; width: 0.82rem; height: 0.82rem; border-radius: 0.1rem; vertical-align: middle; border: 0.01rem solid #dbdbdb;}
.m-avatarList .right{display: inline-block; max-width: 5rem; vertical-align: middle; margin-left: 0.3rem; font-size: 0.32rem; color: #272c2f; line-height: 1;}
.m-avatarList .right .name{margin-bottom: 0.14rem;}
.m-avatarList .right .time{font-size: 0.22rem; color: #b3b3b3;}
.m-avatarList .label{position: absolute; font-size: 0.26rem; right: 0.3rem; top: 50%; transform: translateY(-50%);}

</style>
