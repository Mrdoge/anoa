<template>
    <div>
        <!-- list f-clear -->
        <div class="m-applyList">
            <div class="list f-clear">
                <div class="left">开始时间</div>
                <div class="right" @click="showPicker(1)">
                    <template v-if="!datePicker.starTime">
                        请输入开始时间<i class="icon-xiangyou icon"></i>
                    </template>
                    <template v-if="datePicker.starTime">
                        {{datePicker.starTime}}
                    </template>
                </div>
            </div>
            <div class="list f-clear">
                <div class="left">结束时间</div>
                <div class="right" @click="showPicker(2)">
                    <template v-if="!datePicker.endTime">
                        请输入开始时间<i class="icon-xiangyou icon"></i>
                    </template>
                    <template v-if="datePicker.endTime">
                        {{datePicker.endTime}}
                    </template>
                </div>
            </div>
            <div class="list f-clear">
                <div class="left">请假时长</div>
                <div class="right">
                    <input type="number" step="0.5" v-model="form.duration" style="width:90%;">天
                </div>
            </div>
            <div class="list f-clear" @click="getLeaverType">
                <div class="left">请假类型</div>
                <div class="right" @click="vacationType.visible = true">
                    <template v-if="!form.leaver_type">
                        请选择请假类型<i class="icon-xiangyou icon"></i>
                    </template>
                    <template v-if="form.leaver_type">
                        {{vacationType.itemName}}
                    </template>
                </div>
            </div>
            <div class="list f-clear reason">
                <div class="title">请假原因</div>
                <textarea name="cause" class="txt" v-model="form.cause" fu-verify="noNull" fu-tips="请输入请假原因" placeholder="请输入请假原因"></textarea>
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

        <!-- 底边 -->
        <div class="m-forbotNav" style="height: 2rem;"></div>
        <div class="m-bottom">
            <div class="block f-clear">
                <a href="javascript:;" class="btn j-submit u-FU_btn" :class="{'z-loading':loading}" @click="submit">提交<span class="p-loading"></span></a>
            </div>
        </div>
        <!-- 底边 end-->

        <!--弹窗-->
        <!--时间输入-->
		<picker class="m-picker" v-model="datePicker.visible" :data-items="datePicker.items" @change="onValuesChange" name="datePicker">
			<div class="top-content btns" slot="top-content">
				<a href="javascript:;" class="btn" @click="datePicker.visible = false">取消</a>
				<a href="javascript:;" class="btn s-r" @click="datePicker.visible = false">确定</a>
			</div>
		</picker>

        <!--请假类型-->
        <picker class="m-picker" v-model="vacationType.visible" :data-items="vacationType.items" @change="vacationChange" name="vacationType">
			<div class="top-content btns" slot="top-content">
				<a href="javascript:;" class="btn" @click="vacationType.visible = false">取消</a>
				<a href="javascript:;" class="btn s-r" @click="vacationType.visible = false">确定</a>
			</div>
		</picker>

        <!--添加联系人-->
        <memberPicker :list="memberPicker.list" v-model="memberPicker.isShow" @toggle="memberPicker.isShow = !memberPicker.isShow" @selectedList="selectedList"></memberPicker>
        <!--弹窗 end-->

    </div>
</template>

<script>
import picker from 'vue-3d-picker';
import memberPicker from '@/components/memberPicker' //联系人选择器

export default {
    name: 'ApplyVacationEdit',
    data () {
        return {
            temp:this.$store.state.httpUrl.temp,
            host:this.$store.state.httpUrl.HOST,
            //时间选择
            datePicker:{
                visible: false,
                items: [
                    {
                        values: [],
                        width:'70%'
                    },
                    {
                        values: ["上午","下午"]
                    }
                ],
                starTime:"",
                endTime:"",
                type:1  //1开始时间，2结束时间
            },
            //请假类型选择
            vacationType:{
                visible:false,
                items:[
                    {
                        values:[]
                    }
                ],
                itemName:"",
                itemsValue:""
            },
            //表单信息
            form:{
                s_time:"",      //开始时间
                e_time:"",      //结束时间
                duration:"",    //请假时长
                leaver_type:"", //请假类型
                cause:"",       //请假原因
                pass_user_id:""    //审批人
            },
            loading:false,
            memberPicker:{
                isShow:false,
                list:[],
                selectedList:[] //已选择
            },
            vacationTypeData:[], //请假类型数据

            //从我的申请带过来的数据
			applyIndex:this.$route.params.index,
			applyId:this.$route.params.id,
			host:this.$store.state.httpUrl.HOST,
        }
    },
    components:{
        picker,
        memberPicker
    },
    created(){
        var vm = this;
        //vm.getLeaverType()

        vm.getData();
    },
    methods:{
        onValuesChange(result1,result2){
            //console.log(result1,result2)
            var vm  = this;
            if (result1) {
               result1 = result1.replace('年','/').replace('月','/').replace('日','') //处理年月日
               result1 = result1.slice(0,result1.indexOf('周'))  //处理周几
            }
            if (vm.datePicker.type == 1) {
                vm.datePicker.starTime = result1 + result2
            }
            if (vm.datePicker.type == 2) {
                vm.datePicker.endTime = result1 + result2
            }

            //设置到表单数据（先写死）
            if (vm.datePicker.type == 1) { //开始时间
                var s_time = ""
                result2 == "上午"? s_time = result1 + " " + "09:00:00" : s_time = result1 + " " + "12:00:00"
                console.log(s_time)
                vm.form.s_time = parseInt(Date.parse(new Date(s_time))/1000)    //(除以1000转化成unix时间戳)
            }
            if (vm.datePicker.type == 2) { //结束时间
                var e_time = ""
                result2 == "上午"? e_time = result1 + " " + "12:00:00" : e_time = result1 + " " + "18:00:00"
                vm.form.e_time = parseInt(Date.parse(new Date(e_time))/1000)    //(除以1000转化成unix时间戳)
            }

            vm.form.duration = vm.F['betweenDay'](vm.form.s_time*1000,vm.form.e_time*1000);
            // if (!vm.form.duration) {
            //     vm.F['Hint'](vm,{
            //         ct:vm.form.duration
            //     })
            // }

        },
        showPicker(type){
            var vm  = this;
            
            if (!vm.datePicker.items[0].values.length) { //如果没有数据
                var date = new Date();
                var _y = date.getFullYear();
                var _m = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
                var _d = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
                var nowDate = _y + '-' + _m + '-' + _d
                var endDate = (_y + 1) + '-01-31'

                var arr = vm.F['getScopeDate'](nowDate,endDate);
                //先清空picker
                vm.datePicker.items[0].values.splice(0,vm.datePicker.items[0].values.length)
                //vm.datePicker.items[1].values.splice(0,vm.datePicker.items[1].values.length)
                for (let i = 0; i < arr.length; i++) {
                    vm.datePicker.items[0].values.push(arr[i])
                }
            }
            vm.datePicker.items[0].index = 0;
            vm.datePicker.visible = true;
            vm.datePicker.type = type
        },
        vacationChange(result1){
            //console.log(result1)
            var vm = this;
            for (let i = 0; i < vm.vacationTypeData.length; i++) {
                if (vm.vacationTypeData[i].name == result1) {
                    vm.form.leaver_type = vm.vacationTypeData[i].id
                }
            }
            vm.vacationType.itemName = result1;

            //vm.form.leaver_type = result1;
        },
        submit(){
            var vm = this;
            if (vm.loading) {
                return false
            }
            var verifyData = [
                {
                    val:vm.form.s_time,
                    type:"noNull",
                    tips:"请选择开始时间"
                },
                {
                    val:vm.form.e_time,
                    type:"noNull",
                    tips:"请选择结束时间"
                },
                {
                    val:vm.form.duration,
                    type:"noNull",
                    tips:"请填写请假时长"
                },
                {
                    val:vm.form.vacationType,
                    type:"noNull",
                    tips:"请选择请假类型"
                },
                {
                    val:vm.form.cause,
                    type:"noNull",
                    tips:"请输入请假原因"
                }
            ]

            var verify = vm.F['FormComfirm'](verifyData);
            if (verify.err) {
                vm.F['Hint'](vm,{
                    ct:verify.ct
                })
                return false
            }

            //校验审批人
            // if(!vm.form.pass_user_id.length){
            //     vm.F['Hint'](vm,{
            //         ct:"请至少选择一个审批人"
            //     });
            //     return false
            // }

            var postData = vm.form;

            vm.loading = true
            this.ajax.post(this.$store.state.httpUrl.apply.applyVacation + '/?id=' + vm.applyId,postData)
            .then(function (res) {
                var data = res;
                if (data.code == 1) {
                    vm.F['Hint'](vm,{
                        ct:data.retval.okTip,
                        type:1
                    })
                    setTimeout(() => {
                        vm.$router.push('/myIndex/myApplyList/2/2');   //我的请假申请
                    },1500)

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
        selectedList(data){ //把选中的推入数组
            var vm = this;
            //先清空
            vm.memberPicker.selectedList.splice(0,vm.memberPicker.selectedList.length);
            for (let i = 0; i < data.length; i++) {
                vm.memberPicker.selectedList.push(data[i])
            }
        },
        getLeaverType(){
            var vm = this;
            if (vm.vacationTypeData.length) {
                return false
            }
            vm.ajax.post(vm.$store.state.httpUrl.apply.getLeaverType)
            .then(function (res) {
                //console.log(res.data)
                var data = res;
                if (data.code == 1) {
                    //先清空
                    vm.vacationType.items[0].values.splice(0,vm.vacationType.items[0].values.length)
                    vm.vacationTypeData.splice(0,vm.vacationTypeData.length)
                    for (let i = 0; i < data.retval.data.length; i++) {
                        vm.vacationTypeData.push(data.retval.data[i])
                        vm.vacationType.items[0].values.push(data.retval.data[i].name)
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
        },

		//获取初始数据
		getData(){
			var vm = this;
			var url = vm.host + vm.$store.state.myApplyIndex[vm.applyIndex].detailsUrl + '?id=' + vm.applyId;
			//var url = vm.host + vm.$store.state.myApplyIndex[vm.applyIndex].detailsUrl + '?id=' + 41;
			vm.ajax.post(url)
			.then(function (res) {
				var data = res;
				if (data.code == 1) {
					vm.setData(data.retval.data)
				}
			})
			.catch(function (err) {
				console.log(err);
			});
        },
        setData(data){
            var vm = this;
            vm.form.s_time = data.s_time
            vm.form.e_time = data.e_time
            vm.form.duration = data.duration
            vm.form.leaver_type = data.leaver_type
            vm.form.cause = data.cause
            
            //设置审批人选中（似乎有点难）
            var obj = {
                user_id:data.pass_user_id,
                nickname:data.pass_user_name
            }
            vm.memberPicker.selectedList.splice(0,vm.memberPicker.selectedList.length)
            vm.memberPicker.selectedList.push(obj)

            //设置开始时间
            var s_time = vm.F['unixFormat'](data.s_time)
            var s_time_f = s_time.split(' ')[0].replace(/-/g,'/')
            var s_time_a = s_time.split(' ')[1].indexOf('09:00') > -1?"上午":"下午"
            vm.datePicker.starTime = s_time_f + s_time_a

            //设置结束时间
            var e_time = vm.F['unixFormat'](data.e_time)
            var e_time_f = e_time.split(' ')[0].replace(/-/g,'/')
            var e_time_a = e_time.split(' ')[1].indexOf('09:00') > -1?"上午":"下午"
            vm.datePicker.endTime = e_time_f + e_time_a

            //设置请假类型
            vm.vacationType.itemName = data.leaver_name

        }

    },
    watch:{
        'memberPicker.selectedList'(){  //根据选择审批人的变化自动推入form
            var vm = this;
            /***单选版本***/
			vm.form.pass_user_id = vm.memberPicker.selectedList[0].user_id
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
