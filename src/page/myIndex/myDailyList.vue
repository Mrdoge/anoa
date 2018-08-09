<template>
	<div>
		<div class="m-myDaily">
			<router-link :to="'/daily/dailyEdit/' + items.da_id" class="txt" v-for="(items,index) in list" :key="index">
				<div class="time">{{items.created_time}}</div>
				<div class="ct">
					<div class="part f-txtof">今日工作：{{items.today_desc}}</div>
					<div class="part f-txtof">明日工作：{{items.tomorrow_desc}}</div>
					<div class="part f-txtof">其他事项：{{items.comment_desc}}</div>
				</div>
				<div class="link">查看详情</div>
			</router-link>
		</div>
		<loading :loadingShow="loadingData.loadingShow" :botLineShow="loadingData.botLineShow && list.length" :noDataShow="!list.length && !loadingData.loadingShow"></loading>
	</div>
</template>

<script>
import loading from '@/components/loading'
export default {
	name: 'MyDailyList',
	data () {
		return {
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
		
		//获取数据
		vm.getData();
	},
	destroyed(){ //离开页面
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
			if (vm.loadingData.loadingShow || vm.loadingData.botLineShow) {
				return false
			}
			var postData = {
				page:vm.page
			}
			var url = vm.$store.state.httpUrl.my.myDaily
			vm.loadingData.loadingShow = true
			vm.ajax.post(url,postData)
			.then((res) => {
				var data = res;
				//console.log(data)
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
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
