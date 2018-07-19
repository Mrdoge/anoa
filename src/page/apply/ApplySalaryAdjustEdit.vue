<template>
	<div>
		<!-- list f-clear -->
		<div class="m-applyList">
			<div class="list f-clear">
				<div class="left">申请薪资</div>
				<div class="right">
					<input type="number" name="salary" class="f-txtof" v-model.number="form.salary" placeholder="请输入薪资">
				</div>
			</div>
			
			<div class="list f-clear reason">
				<div class="title">调薪理由</div>
				<textarea class="txt " name="cause" fu-verify="noNull" v-model="form.cause" placeholder="请输入调薪理由"></textarea>
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

		<!--添加审批人-->
        <memberPicker :list="memberPicker.list" v-model="memberPicker.isShow" @toggle="memberPicker.isShow = !memberPicker.isShow" @selectedList="selectedList"></memberPicker>

	</div>
</template>

<script>
import memberPicker from '@/components/memberPicker' //联系人选择器
var qs = require('qs');
export default {
	name: 'ApplySalaryAdjustEdit',
	data () {
		return {
			form:{
				salary:"",
				cause:"",
				pass_user_id:""	//审批人ID
			},
            loading:false,
            memberPicker:{
                isShow:false,
                list:[],
                selectedList:[] //已选择
            },

			//从我的申请带过来的数据
			applyIndex:this.$route.params.index,
			applyId:this.$route.params.id,
			host:this.$store.state.httpUrl.HOST,
		}
	},
	components:{
		memberPicker
    },
    created(){
        var vm = this;
        vm.getData();
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
                    val:vm.form.salary,
                    type:"noNull",
                    tips:"请输入薪资"
                },
                {
                    val:vm.form.cause,
                    type:"noNull",
                    tips:"请输入调薪理由"
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
            this.axios.post(this.$store.state.httpUrl.apply.applySalaryAdjust + '/?id=' + vm.applyId,qs.stringify(postData))
            .then(function (res) {
                if (res.data.code == 1) {
                    vm.F['Hint'](vm,{
                        ct:res.data.retval.okTip,
                        type:1
                    })
                    setTimeout(() => {
                        vm.$router.push('/myIndex/myApplyList/5');   //我的调薪申请
                    },1500)

                    vm.loading = false
                }else{
                    vm.F['Hint'](vm,{
                        ct:res.data.msg
                    })
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        
		//获取初始数据
		getData(){
			var vm = this;
			var url = vm.host + vm.$store.state.myApplyIndex[vm.applyIndex].detailsUrl + '?id=' + vm.applyId;
			//var url = vm.host + vm.$store.state.myApplyIndex[vm.applyIndex].detailsUrl + '?id=' + 41;
			vm.axios.post(url)
			.then(function (res) {
				//console.log(res.data);
				if (res.data.code == 1) {
					vm.setData(res.data.retval.data)
				}
			})
			.catch(function (err) {
				console.log(err);
			});
        },
        setData(data){
            var vm = this;
            vm.form.salary = data.salary
            vm.form.cause = data.cause
            vm.pass_user_id = data.pass_user_id
            
            //设置审批人选中（似乎有点难）
            var obj = {
                user_id:data.pass_user_id,
                nickname:data.pass_user_name
            }
            vm.memberPicker.selectedList.splice(0,vm.memberPicker.selectedList.length)
            vm.memberPicker.selectedList.push(obj)

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
