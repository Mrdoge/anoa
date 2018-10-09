<template>
	<div>
		<!-- list f-clear -->
		<div v-for="(items,key) in data[applyIndex]" :key="key" v-if="lexicon[key]">

			<!--单行布局-->
			<div class="m-normalList" v-if="key != 'cause'" :class="{'s-bt0':key == 'pass_user_name'}">
				<div class="left">{{lexicon[key]}}</div>
				<div class="right" v-if="key != 'status'">
					{{items}}
				</div>
				<div class="right" v-if="key == 'status'">
					<span class="m-label" :class="{'s-green':+items == 2}">{{findStatus(items)}}</span>
				</div>
			</div>

			<!--两行布局-->
			<div class="m-listRow g-mt0" v-if="key == 'cause'">
				<div class="title">{{lexicon[key]}}</div>
				<div class="ct">{{items}}</div>
			</div>
		</div>


		<!-- 底边 -->
		<div class="m-forbotNav" style="height: 2rem;"></div>
		<div class="m-bottom" v-if="+data[applyIndex].status == 1">
			<div class="block f-clear">
			<div class="btn u-FU_btn" @click="submit(2)" :class="{'z-loading':loading[2]}">批准<span class="p-loading"></span></div>
			<div class="btn u-FU_btn" @click="submit(3)" :class="{'z-loading':loading[3]}">不批准<span class="p-loading"></span></div>
			</div>
		</div>
		<!-- 底边 end-->

	</div>
</template>

<script>
var qs = require('qs');
export default {
	name: 'myApplyCheck',
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
					pass_user_name:"",			//审批人姓名
					status:""					//审批状态
				},
				/****入职申请 end****/

				/****转正申请****/
				{
					cause:"",		//原因
					pass_user_id:"",	//审批人ID		
					pass_user_name:"",			//审批人姓名
					status:""					//审批状态
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
					pass_user_name:"",			//审批人姓名
					status:""					//审批状态
				},
				/****请假申请 end****/

				/****离职申请****/
				{
					cause:"",		//原因
					pass_user_id:"",	//审批人ID
					pass_user_name:"",			//审批人姓名
					status:""					//审批状态
				},
				/****离职申请 end****/

				/****调动申请****/
				{
					cause:"",	//原因
					s_id:"",	//部门ID
					s_name:"",	//部门名称
					sp_id:"",	//职位ID
					sp_name:"",	//职位名称
					pass_user_id:"",	//审批人ID		
					status:""					//审批状态
				},
				/****调动申请 end****/

				/****调薪申请****/
				{
					salary:"",		//调整薪资
					cause:"",		//原因
					pass_user_id:"",	//审批人ID
					pass_user_name:"",			//审批人姓名
					status:""					//审批状态
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
				s_name:"部门名称",	//部门名称
				gender:"性别",
				sp_id:"",	//职位ID
				sp_name:"职位名称",
				data_birth:"出生日期",
				native_place:"籍贯",
				nation:"民族",
				phone_mob:"手机号",
				cause:"原因",
				salary:"调整薪资",
				status:"审批状态"
			},
			loading:['','',false,false],
			status:[
				{
					value:1,
					name:"待审核"
				},
				{
					value:2,
					name:"已批准"
				},
				{
					value:3,
					name:"不批准"
				}
			]
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
		},
		submit(status){
			status = +status
			var vm = this;
			if (vm.loading[status]) {
				return false
			}
			var url = vm.$store.state.httpUrl.apply.applyStatusEdit;
			var type = vm.$store.state.myApplyIndex[vm.applyIndex].type;
			var postData = {
				type:type,
				status:status,
				id:vm.applyId
			}

			//vm.loading[status] = true;
			vm.$set(vm.loading,status,true);
			vm.ajax.post(url,postData)
			.then((res) => {
				var data = res;
				//console.log(data)
				if (data.code == 1) {
					vm.F['Hint'](vm,{
						ct:data.retval.okTip,
						type:1
					})

					var returnUrl = '/myIndex/myApplyList/'+vm.applyIndex+'/1';
					setTimeout(() => {
						vm.$router.push(returnUrl)
					},1500);

				}else{
					vm.F['Hint'](vm,{
						ct:data.msg
					})
				}
			})
			.then(() => {
				vm.$set(vm.loading,status,false);
			})
		},
		findStatus(status){
			var vm = this;
			var str = ""
			for (let index = 0; index < vm.status.length; index++) {
				if (+vm.status[index].value == +status) {
					str = vm.status[index].name
					break
				}
			}

			return str
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
