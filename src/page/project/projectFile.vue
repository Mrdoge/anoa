<template>
    <div>
        <a :href="host + '/' + items.file_url" class="m-docList f-clear" v-for="(items,index) in list" :key="index + 'projectFile'" v-if="list.length">
            <div class="left">
                <img :src="fileType(items.file_url).icon" alt="">
            </div>
            <div class="right">
                <div class="title f-txtof_3">{{items.file_name}}.{{fileType(items.file_url).filetype}}</div>
                <div class="time"><i class="icon icon-shijian"></i>{{unixFormat(items.created_time)}}</div>
            </div>
        </a>
        <loading :loadingShow="loadingData.loadingShow" :botLineShow="loadingData.botLineShow && list.length" :noDataShow="!list.length && !loadingData.loadingShow"></loading>
    </div>
</template>

<script>
var qs = require('qs');
import loading from '@/components/loading'
export default {
    name: 'projectClassify',
    data () {
        return {
            host:this.$store.state.httpUrl.HOST,
	  	    temp:this.$store.state.httpUrl.temp,
            pro_id:this.$route.params.pro_id,
			list:[],
			loadingData:{
				loadingShow:false,  //是否显示加载效果
				botLineShow:false,   //是否显示到达底部,
				noDataShow:true     //是否显示没有数据
			},
			page:1          //当前页码数
        }
    },
    components:{
		loading
	},
    created(){
        var vm = this;
        vm.getData();
        document.body.style.backgroundColor = "#fff";
    },
    destroyed(){ //离开页面
		//退出列表销毁
        window.onscroll = function(){}
        document.body.style.backgroundColor = "";
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
			if (vm.loadingData.loadingShow || vm.loadingData.botLineShow) {
				return false
			}
			var postData = {
				page:vm.page
			}
			var url = vm.$store.state.httpUrl.project.projectFileList + '?id=' + vm.pro_id
			vm.loadingData.loadingShow = true
			vm.ajax.post(url,postData)
			.then((res) => {
                var data = res;
				vm.loadingData.loadingShow = false
				if (data.code >= 1) {
					var _data = data.retval.data;
					if (!_data) { //如果返回空值
						vm.list.splice(0,vm.list.length); //显示暂无数据
						vm.loadingData.noDataShow = true
						return false
					}

					var count = +_data.count;
					if (vm.list.length >= count) { //如果已经大于最大值
						vm.loadingData.botLineShow = true
						return false
					}

					for (let i = 0; i < _data.list.length; i++) {
						vm.list.push(_data.list[i])
					}

					vm.page++
				}else{
					vm.F['Hint'](vm,{
						ct:data.msg
					})
				}
			})
        },
        unixFormat(timestamp){
            var vm = this;
            return vm.F['unixFormat'](timestamp)
        },
        fileType(fileUrl){
            var vm = this;
            return vm.F['fileType'](fileUrl,vm.temp)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
