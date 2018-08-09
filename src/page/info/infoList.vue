<template>
    <div>
        <div class="m-infoList" v-for="(items,index) in list" :key="index" :class="{'s-red':items.status == 10}" @click="setIsRead(items.info_id)">
            <div class="time">{{items.created_time}}</div>
            <router-link :to="items.link?('/' + items.link):('/info/infoDetail/' + items.info_id)" class="ct">
                <h2 class="title">{{items.title}}</h2>
                <div class="ct f-txtof_2">{{items.content}}</div>
                <div class="link">查看详情</div>
            </router-link>
        </div>
        <loading :loadingShow="loadingData.loadingShow" :botLineShow="loadingData.botLineShow && list.length" :noDataShow="!list.length && !loadingData.loadingShow"></loading>
    </div>
</template>

<script>
var qs = require('qs');
import loading from '@/components/loading'

export default {
    name: 'infoList',
    data () {
        return {
            list:[],
            loadingData:{
                loadingShow:false,  //是否显示加载效果
                botLineShow:false,   //是否显示到达底部,
                noDataShow:true     //是否显示没有数据
            },
            page:1,
            typeList:[
                {
                    num:101,
                    name:"公告通知"
                },
                {
                    num:201,
                    name:"申请通知"
                },
                {
                    num:301,
                    name:"任务通知"
                },
                {
                    num:401,
                    name:"事件通知"
                },
                // {
                //     num:501,
                //     name:"罚款消息"
                // },
                // {
                //     num:601,
                //     name:"公告消息"
                // },
            ]
        }
    },
    components:{
        loading
    },
    created(){
        var vm = this;

        //改变标题
        this.titleChange();

        vm.getData();
    },
    destroyed(){
        //退出列表销毁
        window.onscroll = function(){}
    },
    methods:{
        titleChange(){  //每次进来改变标题
            var vm = this;
            var cateId = vm.$route.params.cateId;
            for (let i = 0; i < vm.typeList.length; i++) {
                if (vm.typeList[i].num == cateId) {
                    this.$store.state.topBarTitle = vm.typeList[i].name
                    break
                }
            }
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
            if (vm.loadingData.loadingShow || vm.loadingData.botLineShow) {
                return false
            }
            var postData = {
                cateId:vm.$route.params.cateId
            }
            vm.loadingData.loadingShow = true
            var url = this.$store.state.httpUrl.info.myInfoList
            vm.ajax.post(url,postData)
            .then((res) => {
                var data = res;
                //console.log(data);
                vm.loadingData.loadingShow = false
                if (data.code >= 1) {
                    const _data = data.retval.data.data;

                    if (!_data) { //如果返回空值
                        vm.loadingData.noDataShow = true
                        vm.list.splice(0,vm.list.length); //显示暂无数据
                        return false
                    }

                    var count = +data.retval.data.total_count;
                    if (vm.list.length >= count) { //如果已经大于最大值
                        vm.loadingData.botLineShow = true
                        return false
                    }

                    for (let i = 0; i < _data.length; i++) {
                        vm.list.push(_data[i])
                    }

                    vm.page++
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
                    })
                }
            })
        },
        setIsRead(id){  //标记已读未读
            var vm = this;
            var url = vm.$store.state.httpUrl.info.editInfoStatus + '?id=' + id
            vm.ajax.post(url)
                .then((res) => {
                    var data = res;
                })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
