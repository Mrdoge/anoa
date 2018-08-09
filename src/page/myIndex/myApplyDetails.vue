<template>
	<div>
		<!-- list f-clear -->
		<div v-for="(items,key) in data[applyIndex]" :key="key" v-if="lexicon[key]">

			<!--单行布局-->
			<div class="m-normalList" v-if="key != 'cause'" :class="{'s-bt0':key == 'pass_user_name'}">
				<div class="left">{{lexicon[key]}}</div>
				<div class="right">
					{{items}}
				</div>
			</div>

			<!--两行布局-->
			<div class="m-listRow g-mt0" v-if="key == 'cause'">
				<div class="title">{{lexicon[key]}}</div>
				<div class="ct">{{items}}</div>
			</div>

		</div>
	</div>
</template>

<script>
var qs = require('qs');
export default {
	name: 'MyApplyDetails',
	data () {
		return {
			applyIndex:this.$route.params.index,
			applyId:this.$route.params.id,
			host:this.$store.state.httpUrl.HOST,
			data:[
				/****入职申请****/
				{
					name:"qwe",
					s_id:"",	//部门ID
					s_name:"",	//部门名称
					gender:"",	//性别
					sp_id:"",	//职位ID
					sp_name:"",	//职位名称
					data_birth:"",	//出生日期
					native_place:"",	//籍贯
					nation:"",			//民族
					phone_mob:"",	//手机号
					pass_user_id:"",	//审批人ID
					pass_user_name:""			//审批人姓名
				},
				/****入职申请 end****/

				/****转正申请****/
				{
					cause:"",		//原因
					pass_user_id:"",	//审批人ID		
					pass_user_name:""			//审批人姓名
				},
				/****转正申请 end****/

				/****请假申请****/
				{
					s_time:"",      //开始时间
					e_time:"",      //结束时间
					duration:"",    //请假时长
					leaver_name:"", //请假类型
					cause:"",       //请假原因
					pass_user_id:"",    //审批人
					pass_user_name:""			//审批人姓名
				},
				/****请假申请 end****/

				/****离职申请****/
				{
					cause:"",		//原因
					pass_user_id:"",	//审批人ID
					pass_user_name:""			//审批人姓名
				},
				/****离职申请 end****/

				/****调动申请****/
				{
					cause:"",	//原因
					s_id:"",	//部门ID
					s_name:"",	//部门名称
					sp_id:"",	//职位ID
					sp_name:"",	//职位名称
					pass_user_id:""	//审批人ID		
				},
				/****调动申请 end****/

				/****调薪申请****/
				{
					salary:"",		//调整薪资
					cause:"",		//原因
					pass_user_id:"",	//审批人ID
					pass_user_name:""			//审批人姓名
				}
				/****调薪申请 end****/

			],
			lexicon:{	//词库
				s_time:"开始时间",
				e_time:"结束时间",
				duration:"请假时长",
				leaver_name:"请假类型",
				cause:"请假原因",
				pass_user_id:"",	//审批人ID
				pass_user_name:"审批人",	//审批人姓名
				name:"姓名",
				s_id:"",	//部门ID
				s_name:"",	//部门名称
				gender:"性别",
				sp_id:"",	//职位ID
				sp_name:"职位名称",
				data_birth:"出生日期",
				native_place:"籍贯",
				nation:"民族",
				phone_mob:"手机号",
				cause:"原因",
				salary:"调整薪资"
			}
		}
	},
	created(){
		var vm = this;

		//获取数据
		vm.getData();
		//console.log(vm.data[vm.applyIndex]);
	},
	methods:{
		getData(){
			var vm = this;
			var url = vm.host + vm.$store.state.myApplyIndex[vm.applyIndex].detailsUrl + '?id=' + vm.applyId;
			//var url = vm.host + vm.$store.state.myApplyIndex[vm.applyIndex].detailsUrl + '?id=' + 41;
			vm.ajax.post(url)
			.then(function (res) {
				//console.log(res.data);
				var data = res;
				if (data.code == 1) {
					for(var items in data.retval.data){
						//console.log(vm.data[applyIndex][items])
						//性别特殊处理
						if (items == "gender") {
							data.retval.data[items] = data.retval.data[items] == 1?'男':'女'
						}
						//时间特殊处理
						if (items == 's_time' || items == 'e_time' || items == 'created_time') {
							data.retval.data[items] = vm.F['unixFormat'](data.retval.data[items])
						}
						//出生日期特殊处理
						if (items == 'data_birth') {
							data.retval.data[items] = vm.F['unixFormat'](data.retval.data[items]).split(' ')[0]
						}

						vm.data[vm.applyIndex][items] = data.retval.data[items]
					}
					//vm.data[applyIndex]
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

</style>
