<template>
    <div>
		<!--任务标题-->
		<div class="m-listRow">
			<div class="title">任务标题</div>
			<div class="ct">
				<input type="text" placeholder="请输入任务标题" v-model="form.title">
			</div>
		</div>
		<!--任务标题 end-->

		<!--任务内容-->
		<div class="m-listRow">
			<div class="title">任务内容</div>
			<div class="ct">
				<textarea placeholder="请输入任务内容" v-model="form.content" style="height:1.1rem; min-height:auto;"></textarea>
			</div>
        </div>
		<!--任务内容 end-->

		<div class="m-normalList" style="margin-top:0.28rem;" @click="datePicker.visible = true">
			<div class="left">完成时间</div>
			<div class="right">
                <template v-if="!datePicker.nowValue">
                    请选择完成时间<i class="icon-xiangyou icon"></i>
                </template>
                <template v-if="datePicker.nowValue">
                    {{datePicker.nowValue}}
                </template>
			</div>
		</div>

        <!-- 审批人part -->
        <div class="m-addBtn">
            <div class="chosen f-clear" v-show="memberPicker.selectedList.length">
                <div class="left">负责人</div>
                <div class="right" v-if="memberPicker.selectedList.length" @click="memberPicker.isShow = true">
                    {{memberPicker.selectedList[0].nickname}}
                    <template v-if="memberPicker.selectedList.length > 1">
                        等{{memberPicker.selectedList.length}}人
                    </template>
                </div>
            </div>
            <div class="add" @click="memberPicker.isShow = true">
                <i class="icon-tianjia1 icon"></i>
                添加负责人
            </div>
        </div>
        <!-- 审批人part end-->

        <!-- 底边 -->
        <div class="m-forbotNav" style="height: 1.6rem;"></div>
        <div class="m-bottom">
            <div class="block ">
                <a href="javascript:;" class="btn u-FU_btn" :class="{'z-loading':loading.form}" @click="submit">
					发布<span class="p-loading"></span>
				</a>
            </div>
        </div>
        <!-- 底边 end-->


		<!--日期选择-->
		<picker class="m-picker" v-model="datePicker.visible" :data-items="datePicker.items" @change="dateChange" name="datePicker">
			<div class="top-content btns" slot="top-content">
				<a href="javascript:;" class="btn" @click="datePicker.visible = false">取消</a>
				<a href="javascript:;" class="btn s-r" @click="datePicker.visible = false">确定</a>
			</div>
		</picker>

        <!--添加审批人-->
        <memberPicker v-model="memberPicker.isShow" title="选择负责人" @toggle="memberPicker.isShow = !memberPicker.isShow" @selectedList="selectedList"></memberPicker>

    </div>
</template>

<script>
import picker from 'vue-3d-picker';
var qs = require('qs');
import memberPicker from '@/components/memberPicker' //联系人选择器
export default {
    name: 'taskAdd',
    data () {
        return {
            temp:this.$store.state.httpUrl.temp,
            host:this.$store.state.httpUrl.HOST,
            form:{
                title:"",
                content:"",
                fromUserId:"",
                eTime:""
            },
            loading:{
                img:false,
                form:false
            },
            datePicker:{
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
            memberPicker:{
                isShow:false,
                selectedList:[] //已选择
			},
        }
    },
    components:{
        picker,
        memberPicker
    },
    created(){
        var vm = this

        //初始化时间
        vm.datePickerInit();
    },
    methods:{
		datePickerInit(){	//时间选择初始化
			var vm = this;
			//年处理
			var _y = new Date().getFullYear();
			var form = _y - 10
			for (let i = form; i < (form + 100); i++) {
				vm.datePicker.items[0].values.push(i + 1)
				vm.$set(vm.datePicker.items[0],'index',9)
			}

			//月份
			for (let i = 0; i < 12; i++) {
                vm.datePicker.items[1].values.push(i + 1)
                vm.$set(vm.datePicker.items[1],'index',new Date().getMonth())
			}

			//日
			for (let i = 0; i < 31; i++) {
                vm.datePicker.items[2].values.push(i + 1)
                vm.$set(vm.datePicker.items[2],'index',new Date().getDate() - 1)
			}
			//console.log(_y)
			//vm.datePicker.items[0]
        },
		dateChange(result1,result2,result3){	//出生日期选择器回调
			//console.log(result1,result2,result3)
			var vm = this;
			var value = result1 + '/' + result2 + '/' + result3
			vm.datePicker.nowValue = value;

			var date = parseInt((Date.parse(new Date(value)))/1000)	//
			//console.log(vm.F['dateFormat'](Date.parse(date)))
			vm.form.eTime = date;
		},
        selectedList(data){ //把选中的推入数组
            var vm = this;
            //先清空
            vm.memberPicker.selectedList.splice(0,vm.memberPicker.selectedList.length);
            for (let i = 0; i < data.length; i++) {
                vm.memberPicker.selectedList.push(data[i])
            }

            //设置form的数据
            vm.form.fromUserId = vm.memberPicker.selectedList[0].user_id
		},
        submit(){	//发布任务数据提交
            var vm = this;
            if (vm.loading.form) {
                return false
            }
            var postData = {
                title:vm.form.title,
                content:vm.form.content,
                fromUserId:vm.form.fromUserId,
                eTime:vm.form.eTime,
            }

            //数据校验
            var verifyData = [
                {
                    type:"noNull",
                    val:postData.title,
                    tips:"标题不能为空"
                },
                {
                    type:"noNull",
                    val:postData.content,
                    tips:"请输入内容"
                },
                {
                    type:"noNull",
                    val:postData.eTime,
                    tips:"请选择完成时间"
                },
                {
                    type:"noNull",
                    val:postData.fromUserId,
                    tips:"请选择负责人"
                }
            ]
            var verify = vm.F['FormComfirm'](verifyData)
            if (verify.err) {
                vm.F['Hint'](vm,{
                    ct:verify.ct
                })
                return false
            }

            // console.log(postData);
            // return false
            vm.loading.form = true
            this.ajax.post(this.$store.state.httpUrl.task.addTask,postData)
            .then(function (res) {
                var data = res;
                if (data.code == 1) {
                    vm.F['Hint'](vm,{
                        ct:data.retval.okTip,
                        type:1
                    })
                    setTimeout(() => {
                        //vm.$router.push('/question/questionList');
                        vm.$router.push('/task/taskIndex');
                    },1500)
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
                    })
                }
                vm.loading.form = false
            })
            .catch(function (err) {
                console.log(err);
            });

        },
    },
    watch:{

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
