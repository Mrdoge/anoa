<template>
    <div>
        <transition name="memberListIndex" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
            <div class="m-memberPickerWrap" v-if="value">
                <!--头部-->
                <div class="m-nav">
                    <a href="javascript:;" class="back" @click="close">
                        <i class="icon-flow icon"></i>
                    </a>
                    <span class="txt">选择审批人</span>
                </div>
                <!--头部 end-->
                <div class="m-forNav"></div>

                <div class="m-memberListIndex">
                    <div class="wrap s-show">
                        <div class="title">常用选择</div>
                        <div class="ct">
                            <div class="history">
                                <a href="javascript:;" class="label" v-for="(items,index) in memberHistoryData" :key="items.sName" @click="historySelect(index)" :class="{'z-cur':index === historyIndex}">{{items.nickname}}</a>
                            </div>
                        </div>
                    </div>
                    <div class="wrap" :class="{'s-show':items.isShow}" v-for="(items,index) in memberData" :key="items.sName"><!--z-show-->
                        <div class="title" @click="toggleShow(index)">
                            {{items.sName}}（{{items.sUserList.length}}）<i class="icon icon-zhankai angel"></i>
                        </div>
                        <transition name="ct" enter-active-class="animated fadeInLeft" leave-active-class="animated fadeOutRight">
                            <div class="ct" v-show="items.isShow">
                                <a href="javascript:;" class="list" v-for="(items2,index2) in items.sUserList" :key="items2.user_id" :class="{'z-cur':items2.isCheck}" @click="selectedList(index,index2)">
                                    <img :src="host + '/' + items2.avatar" class="avatar">
                                    <div class="right">{{items2.nickname}}</div>
                                    <i class="icon icon-weibiaoti14 selected"></i>
                                </a>
                            </div>
                        </transition>
                    </div>
                </div>
                
                <div style="height:1.2rem;"></div>
                <a href="javascript:;" class="m-botBtn" @click="close">确定</a>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'memberPicker',
    data () {
        return {
            temp:this.$store.state.httpUrl.temp,
            host:this.$store.state.httpUrl.HOST,
            selectedData:[], //选中的值
            memberData:[],   //部门数据
            memberHistoryData:[],
            historyIndex:"",
        }
    },
    props:{
        value:{
            type: Boolean
        }
    },
    created(){
        var vm = this;

        vm.getAllData();
    },
    methods:{
        close(){
            this.$emit('toggle')
        },
        selectedList(index,index2){
            var vm = this;
            var data = []
            vm.selectedData.splice(0,vm.selectedData.length);
            vm.historyIndex = "";
            /**********多选*********/
            //先清空
            // for (let i = 0; i < vm.memberData.length; i++) {
            //     for (let j = 0; j < vm.memberData[i].sUserList.length; j++) {
            //         if (vm.memberData[i].sUserList[j].isCheck) {
            //             vm.selectedData.push(vm.memberData[i].sUserList[j])
            //         }
            //     }
            // }
            /**********多选*********/

            /****单选****/
            for (let i = 0; i < vm.memberData.length; i++) {
                for (let j = 0; j < vm.memberData[i].sUserList.length; j++) {
                    vm.$set(vm.memberData[i].sUserList[j],'isCheck',false)
                }
            }
            vm.$set(vm.memberData[index].sUserList[index2],'isCheck',true)
            vm.selectedData.push(vm.memberData[index].sUserList[index2])
            /****单选****/
    
            //触发父组件的selectedList方法
            this.$emit('selectedList',vm.selectedData)
        },
        toggleShow(index){   //列表展开
            var vm = this;
            vm.$set(vm.memberData[index],'isShow',!vm.memberData[index].isShow)
        },
        getAllData(){
            var vm = this;
			vm.getUserOrganization();
			vm.getUserHistorySelect();
        },
        getUserOrganization(){
			var vm = this;
            vm.axios.post(vm.$store.state.httpUrl.member.getUserOrganization)
            .then(function (res) {
				var data = res.data
				//console.log(data)
                if (data.code == 1) {
                    for (let i = 0; i < data.retval.data.length; i++) {
                        data.retval.data[i].isShow = true   //  默认全部展开
                        vm.memberData.push(data.retval.data[i])
                        //vm.$set(vm.memberData[i],'isShow',true)
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
		},
		getUserHistorySelect(){
			var vm = this;
            vm.axios.post(vm.$store.state.httpUrl.apply.getUserHistorySelect)
            .then(function (res) {
				var data = res.data
				//console.log(data)
                if (data.code == 1) {
                    for (let i = 0; i < data.retval.data.length; i++) {
						vm.memberHistoryData.push(data.retval.data[i])
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
        },
        historySelect(index){
            var vm = this;
            vm.historyIndex = index
            vm.selectedData.splice(0,vm.selectedData.length);
            for (let i = 0; i < vm.memberData.length; i++) {
                for (let j = 0; j < vm.memberData[i].sUserList.length; j++) {
                    vm.$set(vm.memberData[i].sUserList[j],'isCheck',false)
                    // if (vm.memberData[i].sUserList[j].user_id == user_id) {
                    //     vm.selectedData.push((vm.memberData[i].sUserList[j]))
                    //     this.$emit('selectedList',vm.selectedData)
                    //     return false
                    // }
                }
            }

            var obj = {
                user_id:vm.memberHistoryData[index].user_id,
                nickname:vm.memberHistoryData[index].nickname,
            }
            this.$emit('selectedList',[obj])
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-memberPickerWrap{position: fixed; top: 0; left: 0; height: 100%; width: 100%; overflow: scroll; background-color: #fff; z-index: 5;}

.m-nav{height:1.1rem; background-color: #4f77aa; position: fixed; top:0; left: 0; color: #fff; font-size: 0.38rem; line-height: 1.18rem; box-sizing: border-box; width: 100%;z-index: 4; transition: all 0.4s ease;}
.m-nav > .back {color: #fff; position: absolute; left: 0.17rem;cursor: pointer;}
.m-nav > .back i{font-size: 0.42rem;}
.m-nav > .txt{position: absolute; left: 50%; transform: translateX(-50%);}
.m-forNav{height: 1.1rem; position: relative;}

/*底部*/
.m-botBtn{position: fixed; width: 100%; height: 1rem; bottom: 0; left: 0; border-top: 0.01rem solid #dbdbdb; padding: 0 0.1rem; background-color: #4f77aa; color: #fff; overflow-x: scroll;; text-align: center; font-size: 0.36rem; line-height: 1rem; z-index: 2;}
</style>
