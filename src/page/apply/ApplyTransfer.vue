<template>
	<div>
		<!-- list f-clear -->
		<div class="m-applyList">
			<div class="list f-clear" @click="getSection">
				<div class="left">申请部门</div>
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
				<div class="left">申请职位</div>
				<div class="right" @click="rolePicker.visible = true">
					<template v-if="!rolePicker.nowValue">
                        请选择职位<i class="icon-xiangyou icon"></i>
                    </template>
                    <template v-if="rolePicker.nowValue">
                        {{rolePicker.nowValue}}
                    </template>
				</div>
			</div>
			
			<div class="list f-clear reason" style="height:auto;">
				<div class="title">调动理由</div>
				<textarea class="txt" name="cause" v-model="form.cause" placeholder="请输入调动理由" style="height:3.3rem;"></textarea>
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

		<!--职位选择-->
		<picker class="m-picker" v-model="rolePicker.visible" :data-items="rolePicker.items" @change="roleChange" name="rolePicker">
			<div class="top-content btns" slot="top-content">
				<a href="javascript:;" class="btn" @click="rolePicker.visible = false">取消</a>
				<a href="javascript:;" class="btn s-r" @click="rolePicker.visible = false">确定</a>
			</div>
		</picker>

		<!--添加审批人-->
        <memberPicker :list="memberPicker.list" v-model="memberPicker.isShow" @toggle="memberPicker.isShow = !memberPicker.isShow" @selectedList="selectedList"></memberPicker>
	</div>
</template>

<script>
import picker from 'vue-3d-picker';
import memberPicker from '@/components/memberPicker' //联系人选择器
var qs = require('qs');
export default {
	name: 'ApplyTransfer',
	data () {
		return {
			form:{
				cause:"",
				s_id:"",	//技术部ID
				sp_id:"",	//职位ID
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
            rolePicker:{ //职位选择器
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
            loading:false,
            memberPicker:{
                isShow:false,
                list:[],
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
                    val:vm.form.s_id,
                    type:"noNull",
                    tips:"请选择部门"
                },
                {
                    val:vm.form.sp_id,
                    type:"noNull",
                    tips:"请选择职位"
				},
                {
                    val:vm.form.cause,
                    type:"noNull",
                    tips:"请输入调动理由"
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
            vm.loading = true
            this.ajax.post(this.$store.state.httpUrl.apply.applyTransfer,postData)
            .then(function (res) {
				var data = res;
                if (data.code == 1) {
                    vm.F['Hint'](vm,{
                        ct:data.retval.okTip,
                        type:1
                    })
                    // setTimeout(() => {
                    //     vm.$router.push('/myIndex/myApplyList/4/2');   //我的调动申请
					// },1500)
					vm.$router.push('/myIndex/myApplyList/4/2');   //我的调动申请

                    vm.loading = false
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
                    })
                }
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
            vm.ajax.post(vm.$store.state.httpUrl.section.getAllSectionModel)
            .then(function (res) {
				var data = res
                if (data.code == 1) {
                    for (let i = 0; i < data.retval.data.length; i++) {
						vm.sectionData.push(data.retval.data[i])
						vm.sectionPicker.items[0].values.push(data.retval.data[i].s_name)
					}
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
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
            /***单选版本***/
			vm.form.pass_user_id = vm.memberPicker.selectedList[0].user_id
        }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
