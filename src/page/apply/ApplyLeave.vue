<template>
	<div>
		<!-- 申请理由 -->
		<div class="m-applyReason">
			<div class="txt">
				<div class="title">离职原因</div>
				<textarea class="reason" name="cause" v-model="form.cause" placeholder="请输入离职原因"></textarea>
			</div>
		</div>
		<!-- 申请理由 end-->

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

		<!--添加审批人-->
        <memberPicker :list="memberPicker.list" v-model="memberPicker.isShow" @toggle="memberPicker.isShow = !memberPicker.isShow" @selectedList="selectedList"></memberPicker>
	</div>
</template>

<script>
import memberPicker from '@/components/memberPicker' //联系人选择器
var qs = require('qs');
export default {
	name: 'ApplyLeave',
	data () {
		return {
			form:{
				cause:"",
				pass_user_id:""	//审批人ID
			},
            loading:false,
            memberPicker:{
                isShow:false,
                list:[],
                selectedList:[] //已选择
            },
		}
	},
	components:{
		memberPicker
	},
	methods:{
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
                    val:vm.form.cause,
                    type:"noNull",
                    tips:"请输入离职原因"
                }
            ]

            var verify = vm.F['FormComfirm'](verifyData);
            if (verify.err) {
                vm.F['Hint'](vm,{
                    ct:verify.ct
                })
                return false
            }

			var postData = vm.form;
            vm.loading = true
            this.ajax.post(this.$store.state.httpUrl.apply.applyLeave,postData)
            .then(function (res) {
                var data = res;
                if (data.code == 1) {
                    vm.F['Hint'](vm,{
                        ct:data.retval.okTip,
                        type:1
                    })
                    // setTimeout(() => {
                    //     vm.$router.push('/myIndex/myApplyList/3/2');   //我的离职申请
                    // },1500)
                    vm.$router.push('/myIndex/myApplyList/3/2');   //我的离职申请

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
