<template>
    <div>
		<!-- list f-clear -->
		<div class="m-applyList">
			<div class="list f-clear">
				<div class="left">姓名</div>
				<div class="right">
					<input type="text" name="name" v-model="form.name" placeholder="请输入姓名">
				</div>
			</div>
			<div class="list f-clear" @click="getSection">
				<div class="left">部门</div>
				<div class="right select" @click="sectionPicker.visible = true">
                    <template v-if="!sectionPicker.nowValue">
                        请选择部门<i class="icon-xiangyou icon"></i>
                    </template>
                    <template v-if="sectionPicker.nowValue">
                        {{sectionPicker.nowValue}}
                    </template>
				</div>
			</div>
			<div class="list f-clear">
				<div class="left">职位</div>
				<div class="right" @click="rolePicker.visible = true">
					<template v-if="!rolePicker.nowValue">
                        请选择职位<i class="icon-xiangyou icon"></i>
                    </template>
                    <template v-if="rolePicker.nowValue">
                        {{rolePicker.nowValue}}
                    </template>
				</div>
			</div>
			<div class="list f-clear">
				<div class="left">性别</div>
				<div class="right" @click="sexPicker.visible = true">
					<template v-if="!sexPicker.nowValue">
                        请选择性别<i class="icon-xiangyou icon"></i>
                    </template>
                    <template v-if="sexPicker.nowValue">
                        {{sexPicker.nowValue}}
                    </template>
				</div>
			</div>
			<div class="list f-clear">
				<div class="left">出生日期</div>
				<div class="right" @click="datePicker.visible = true">
					<template v-if="!datePicker.nowValue">
                        请选择出生日期<i class="icon-xiangyou icon"></i>
                    </template>
                    <template v-if="datePicker.nowValue">
                        {{datePicker.nowValue}}
                    </template>
				</div>
			</div>
			<div class="list f-clear">
				<div class="left">籍贯</div>
				<div class="right">
					<input type="text" name="native_place" v-model="form.native_place" placeholder="请输入籍贯">
				</div>
			</div>
			<div class="list f-clear">
				<div class="left">民族</div>
				<div class="right">
				<input type="text" name="nation" v-model="form.nation" placeholder="请输入民族">
				</div>
			</div>
			<div class="list f-clear">
				<div class="left">手机号码</div>
				<div class="right">
					<input type="number" name="phone_mob" v-model.number="form.phone_mob" placeholder="请输入手机号">
				</div>
			</div>
		</div>
		<!-- list end-->

        <!-- 审批人part -->
        <div class="m-addBtn">
            <div class="chosen f-clear" v-show="memberPicker.selectedList.length">
                <div class="left"> 审批人</div>
                <div class="right" v-if="memberPicker.selectedList.length" @click="memberPicker.isShow = true">
                    {{memberPicker.selectedList[0].nickname}}
                    <template v-if="memberPicker.selectedList.length > 1">
                        等{{memberPicker.selectedList.length}}人
                    </template>
                </div>
            </div>
            <div class="add" @click="memberPicker.isShow = true">
                <i class="icon-tianjia1 icon"></i>
                添加审批人
            </div>
        </div>
        <!-- 审批人part end-->



		<!-- 底边提交 -->
		<div class="m-forbotNav" style="height: 2.2rem;"></div>
		<div class="m-bottom" >
			<div class="block">
				<a href="javascript:;" class="btn j-submit u-FU_btn" :class="{'z-loading':loading}" @click="submit">提交<span class="p-loading"></span></a>
			</div>
		</div>
		<!-- 底边提交 end-->

        <!--部门选择-->
		<picker class="m-picker" v-model="sectionPicker.visible" :data-items="sectionPicker.items" @change="sectionChange" name="sectionPicker">
			<div class="top-content btns" slot="top-content">
				<a href="javascript:;" class="btn" @click="sectionPicker.visible = false">取消</a>
				<a href="javascript:;" class="btn s-r" @click="sectionPicker.visible = false">确定</a>
			</div>
		</picker>

		<!--性别选择-->
		<picker class="m-picker" v-model="sexPicker.visible" :data-items="sexPicker.items" @change="sexChange" name="sexPicker">
			<div class="top-content btns" slot="top-content">
				<a href="javascript:;" class="btn" @click="sexPicker.visible = false">取消</a>
				<a href="javascript:;" class="btn s-r" @click="sexPicker.visible = false">确定</a>
			</div>
		</picker>

		<!--职位选择-->
		<picker class="m-picker" v-model="rolePicker.visible" :data-items="rolePicker.items" @change="roleChange" name="rolePicker">
			<div class="top-content btns" slot="top-content">
				<a href="javascript:;" class="btn" @click="rolePicker.visible = false">取消</a>
				<a href="javascript:;" class="btn s-r" @click="rolePicker.visible = false">确定</a>
			</div>
		</picker>

		<!--出生日期选择-->
		<picker class="m-picker" v-model="datePicker.visible" :data-items="datePicker.items" @change="dateChange" name="datePicker">
			<div class="top-content btns" slot="top-content">
				<a href="javascript:;" class="btn" @click="datePicker.visible = false">取消</a>
				<a href="javascript:;" class="btn s-r" @click="datePicker.visible = false">确定</a>
			</div>
		</picker>

		<!--添加审批人-->
        <memberPicker v-model="memberPicker.isShow" @toggle="memberPicker.isShow = !memberPicker.isShow" @selectedList="selectedList"></memberPicker>
    </div>
</template>

<script>
import picker from 'vue-3d-picker';
import memberPicker from '@/components/memberPicker' //联系人选择器
var qs = require('qs');

export default {
	name: 'ApplyEntry',
	data () {
		return {
			form:{
				name:"",
				s_id:"",	//技术部ID
				gender:"",	//性别
				sp_id:"",	//职位ID
				data_birth:"",	//出生日期
				native_place:"",	//籍贯
				nation:"",			//民族
				phone_mob:"",	//手机号
				pass_user_id:""	//审批人ID
			},
			sectionPicker:{	//部门选择器数据
				visible:false,
				items:[
					{
						values:[]
					}
				],
				nowValue:""
			},
			sexPicker:{	//性别选择器
				visible:false,
				items:[
					{
						values:["男","女"]
					}
				],
				nowValue:""
			},
			rolePicker:{ //职位选择器
				visible:false,
				items:[
					{
						values:[]
					}
				],
				nowValue:""
			},
			datePicker:{ //时间选择器
				visible:false,
				items:[
					{
						values:[]
					},
					{
						values:[]
					},
					{
						values:[]
					}
				],
				nowValue:""
			},
            loading:false,
            memberPicker:{
                isShow:false,
                selectedList:[] //已选择
			},
			
			//picker后台数据
			sectionData:[],
			roleData:[]
		}
	},
	components:{
		picker,
		memberPicker
	},
	created(){
		var vm = this;

		//初始化时间
		vm.datePickerInit();
	},
	methods:{
		sectionChange(result){	//部门选择器回调
			//console.log(result)
			var vm = this;
			vm.sectionPicker.nowValue = result;

			for (let i = 0; i < vm.sectionData.length; i++) {
				if (vm.sectionData[i].s_name == result) {
					//写入表单
					vm.form.s_id = vm.sectionData[i].s_id

					//写入角色数据
					vm.roleData.splice(0,vm.roleData.length)
					vm.rolePicker.items[0].values.splice(0,vm.rolePicker.items[0].values.length)
					for (let j = 0; j < vm.sectionData[i].sp_data.length; j++) {
						//vm.roleData.push(vm.sectionData[i].sp_data[j])
						vm.rolePicker.items[0].values.push(vm.sectionData[i].sp_data[j].sp_name)
					}
					break
				}
			}
			//先写死，后面接口出来后再补上选择逻辑
			//vm.form.s_id = 1
		},
		sexChange(result){	//性别选择器回调
			//console.log(result)
			var vm = this;
			vm.sexPicker.nowValue = result;

			result == '男'?vm.form.gender = 1:vm.form.gender = 0;
			
		},
		roleChange(result){	//职位选择器回调
			//console.log(result)
			var vm = this;
			vm.rolePicker.nowValue = result;
			for (let i = 0; i < vm.sectionData.length; i++) {
				for (let j = 0; j < vm.sectionData[i].sp_data.length; j++) {
					if (vm.sectionData[i].sp_data[j].sp_name == result) {
						vm.form.sp_id = vm.sectionData[i].sp_data[j].sp_id
						return false
					}
				}
			}
			//先写死，后面接口出来后再补上选择逻辑
			//vm.form.sp_id = 1
		},
		dateChange(result1,result2,result3){	//出生日期选择器回调
			//console.log(result1,result2,result3)
			var vm = this;
			var value = result1 + '/' + result2 + '/' + result3
			vm.datePicker.nowValue = value;

			var date = parseInt((Date.parse(new Date(value)))/1000)	//
			//console.log(vm.F['dateFormat'](Date.parse(date)))
			vm.form.data_birth = date;
		},
		datePickerInit(){	//时间选择初始化
			var vm = this;
			//年处理
			var _y = new Date().getFullYear();
			var form = _y - 150	//取两百年
			for (let i = form; i < _y; i++) {
				vm.datePicker.items[0].values.push(i + 1)
				vm.$set(vm.datePicker.items[0],'index',149-26)
				//vm.$set(vm.datePicker.items[0],'index',0)
			}

			//月份
			for (let i = 0; i < 12; i++) {
				vm.datePicker.items[1].values.push(i + 1)
			}

			//日
			for (let i = 0; i < 31; i++) {
				vm.datePicker.items[2].values.push(i + 1)
			}
			//console.log(_y)
			//vm.datePicker.items[0]
		},
        selectedList(data){ //把选中的推入数组
            var vm = this;
            //先清空
            vm.memberPicker.selectedList.splice(0,vm.memberPicker.selectedList.length);
            for (let i = 0; i < data.length; i++) {
                vm.memberPicker.selectedList.push(data[i])
            }
		},
		submit(){
            var vm = this;
            if (vm.loading) {
                return false
            }
            var verifyData = [
                {
                    val:vm.form.name,
                    type:"noNull",
                    tips:"请输入姓名"
                },
                {
                    val:vm.form.s_id,
                    type:"noNull",
                    tips:"请选择部门"
                },
                {
                    val:vm.form.gender,
                    type:"noNull",
                    tips:"请选择性别"
                },
                {
                    val:vm.form.sp_id,
                    type:"noNull",
                    tips:"请选择职位"
				},
				{
                    val:vm.form.data_birth,
                    type:"noNull",
                    tips:"请选择出生日期"
				},
				{
                    val:vm.form.native_place,
                    type:"noNull",
                    tips:"输入籍贯"
				},
				{
                    val:vm.form.nation,
                    type:"noNull",
                    tips:"输入民族"
				},
				{
                    val:vm.form.phone_mob,
                    type:"phone",
                    //tips:"输入手机号"
                },
            ]

            var verify = vm.F['FormComfirm'](verifyData);
            if (verify.err) {
                vm.F['Hint'](vm,{
                    ct:verify.ct
                })
                return false
            }

			var postData = vm.form;
			//console.log(postData)
			//console.log('请求被我阻止了')
			//return false
            vm.loading = true
            this.axios.post(this.$store.state.httpUrl.apply.applyEntry,qs.stringify(postData))
            .then(function (res) {
                if (res.data.code == 1) {
                    vm.F['Hint'](vm,{
                        ct:res.data.retval.okTip,
                        type:1
                    })
                    // setTimeout(() => {
                    //     vm.$router.push('/myIndex/myApplyList/0/2');   //我的请假申请
					// },1500)
					vm.$router.push('/myIndex/myApplyList/0/2');   //我的请假申请

                }else{
                    vm.F['Hint'](vm,{
                        ct:res.data.msg
                    })
				}
				vm.loading = false
            })
            .catch(function (err) {
                console.log(err);
            });
		},
		getSection(){
			var vm = this;
			if (vm.sectionData.length) {
				return false
			}
            vm.axios.post(vm.$store.state.httpUrl.section.getAllSectionModel)
            .then(function (res) {
				var data = res.data
                if (data.code == 1) {
                    for (let i = 0; i < data.retval.data.length; i++) {
						vm.sectionData.push(data.retval.data[i])
						vm.sectionPicker.items[0].values.push(data.retval.data[i].s_name)
					}
                }else{
                    vm.F['Hint'](vm,{
                        ct:res.data.msg
                    })
                }
            })
            .catch(function (err) {
                console.log(err);
            });
		}
	},
	watch:{
        'memberPicker.selectedList'(){  //根据选择审批人的变化自动推入form
			var vm = this;
			
			/****多选版本****/
            //先清空
            // vm.form.pass_user_id.splice(0,vm.form.pass_user_id.length);
            // for (let i = 0; i < vm.memberPicker.selectedList.length; i++) {
            //     vm.form.pass_user_id.push(vm.memberPicker.selectedList[i].user_id)
			// }
			/****多选版本 end****/

			/***单选版本***/
			vm.form.pass_user_id = vm.memberPicker.selectedList[0].user_id
        }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
