<template>
	<div>

		<!-- 时间模块 -->
		<div class="m-time">
			{{getNowdate()}}  打卡{{list.length}}次 迟到{{lateNum}}次
		</div>
		<!-- 时间模块 end-->

		<!--列表-->
		<div class=" m-signList">
			<div class="list" v-for="(items,index) in list" :key="index">
				<div class="txt f-txtof_3">
					{{items.full_addr}}<br/>
					{{unixFormat(items.sign_time)}}
				</div>
				<template v-if="items.status == 1">
					<span class="label s-green">正常</span><!--status == 1-->
				</template>
				<template v-if="items.status == 2">
					<span class="label s-red">迟到</span><!--status == 1-->
				</template>
				
			</div>
		</div>
		<!--列表 end-->
	</div>
</template>

<script>
var qs = require('qs')
export default {
	name: 'MySignList',
	data () {
		return {
			list:[],
			lateNum:0	//迟到次数
		}
	},
	created(){
		var vm = this;
		vm.getData();

		vm.getNowdate()
	},
	methods:{
		getData(){
			var vm = this;
			// var postData= {

			// }
			var url = vm.$store.state.httpUrl.my.mySignList;
			//console.log(url);
			vm.ajax.post(url)
			.then((res) => {
				//console.log(res.data)
				var data = res;
				if (data.code >= 1) {
					var list = data.retval.list
					for (let i = 0; i < list.length; i++) {
						vm.list.push(list[i])
						if (list[i].status == 2) {
							vm.lateNum++
						}
					}
				}
			})
		},
		unixFormat(timestamp){
			var vm = this;
			return vm.F['unixFormat'](timestamp)
		},
		getNowdate(){
			var vm = this;
			var nowTime = new Date().getTime();
			var time = vm.F['dateFormat'](nowTime).split(' ')[0];
			time = time.split('-')[0] + '年' + time.split('-')[1] + '月'
			//console.log(time)
			return time
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-time{color: #000;height: 0.56rem;position: relative;padding-top: 0.18rem;padding-bottom: 0.12rem;padding-left: 0.32rem;box-sizing: border-box; background-color: #f0f4f7; font-weight: bold;}
.m-signList{position: relative;}
.m-signList > .list{height: 1.16rem;background-color: #fff;position: relative;border-bottom: 0.01rem solid #e9e9e9;}
.m-signList > .list >.txt{font-size: 0.26rem;color: #868686;position: absolute;left: 0.32rem;top: 50%; transform: translateY(-50%); line-height: 1.4; width: 5.9rem;}
.m-signList > .list >.txt >.big{font-size: 0.32rem;color: #272c2f;font-weight: bold;}
.m-signList > .list > .label{ width: 0.88rem; height: 0.38rem; border: 0.01rem solid #fff; line-height: 0.38rem; border-radius: 0.1rem; position: absolute;right: 0.24rem;top:0.4rem; background-color: #4f77aa; text-align: center; color: #fff;}
.m-signList > .list > .label.s-red{ width: 0.88rem; height: 0.38rem; border: 0.01rem solid #fff; line-height: 0.38rem; border-radius: 0.1rem; position: absolute;right: 0.24rem;top: 0.4rem; background-color: #aa4f4f; text-align: center; color: #fff;}
</style>
