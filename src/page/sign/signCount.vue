<template>
    <div>

		<!-- 选项模块 -->
		<div class="g-flex s-row " style="overflow:visible;">
			<!-- <select class="btn j-change" name="sId">
				<option value="">全部</option>
				<option value="2">技术部</option>
				<option value="2">运营部</option>
			</select>
			<select class="btn j-change" name="status">
				<option value="1">正常</option>
				<option value="2">迟到</option>
			</select> -->
			<div class="m-select" :class="{'s-show':selectShow[0]}" @click="showSeletct(0)">
				<div class="title">{{findNowSection()}}</div>
				<div class="ct aniamted fadeInDown">
					<div class="label" @click="setSelect('s_id','')">全部</div>
					<div class="label" v-for="(items,index) in sectionData" :key="index" @click="setSelect('s_id',items.s_id)">{{items.s_name}}</div>
				</div>
			</div>
			<div class="m-select" :class="{'s-show':selectShow[1]}" @click="showSeletct(1)">
				<div class="title">{{setStatusName()}}</div>
				<div class="ct aniamted fadeInDown">
					<div class="label" @click="setSelect('status','')">全部</div>
					<div class="label" @click="setSelect('status',2)">迟到</div>
					<div class="label" @click="setSelect('status',1)">正常</div>
				</div>
			</div>
		</div>
		<!-- 选项模块 end-->

		<!-- 时间模块 -->
		<div class="m-time">
			{{nowDate}}  &nbsp;{{nowSignNum()}}人打卡
		</div>
		<!-- 时间模块 end-->

		<!-- 成员列表 -->
		<div class="m-memberList">
			<div class="list" v-for="(items,index) in data" :key="index" v-show="isShowList(items.s_id,items.status)">
				<img :src="host + '/' + items.avatar" class="avatar">
				<div class="txt f-txtof">
					<span class="big">{{items.nickname}}</span><br/>
					{{items.full_addr}}
				</div>
				<template v-if="items.status == 1">
					<div class="label">
						<span class="label">正常</span>
					</div>	
				</template>
				<template v-if="items.status == 2">
					<div class="label s-red"><!--s-red表示迟到-->
						<span class="label">迟到</span>
					</div>	
				</template>
				
				<div class="time">{{unixFormat(items.sign_time)}}</div>
			</div>
		</div>
		<!-- 成员列表 end-->

        <!--日历-->
        <transition name="calendar" enter-active-class="animated fadeInDown" leave-active-class="animated fadeOutUp">
            <div class="m-calendarTop" v-if="this.$store.state.isTopCalendarShow">
                <calendar
                    ref="calendar"
                    :events="calendar.events" 
                    :lunar="calendar.lunar" 
                    :value="calendar.value" 
                    :begin="calendar.begin" 
                    :end="calendar.end" 
                    @select="calendarSelect"></calendar>
            </div>
        </transition>
        <!--日历 end-->

    </div><!--最外层-->
</template>

<script>
import calendar from '@/components/calendar/calendar.vue' //日历组件
var qs = require('qs');
export default {
	name: 'signIndex',
	data () {
		return {
			temp:this.$store.state.httpUrl.temp,
			host:this.$store.state.httpUrl.HOST,
			data:[],	//列表数据
			sectionData:[],	//下拉部门数据数据
            calendar:{
                //value:[2017,7,20], //默认日期
                // lunar:true, //显示农历
                timestamp:Date.now()
			},
			nowDate:"",
			selectShow:[false,false],	//第一个是左边按钮，第二个是右边按钮
			nowSelect:{
				s_id:"",
				status:""
			}
		}
	},
	created(){
		this.$store.state.isSign = true
	},
	components:{
		calendar
	},
	methods:{
		getData(){
			var vm = this;
			var day = (new Date(vm.nowDate).getTime())/1000
			day = day || ''
			var postData = {
				day:day,
				sId:"",
				status:""
			}
			this.axios.post(this.$store.state.httpUrl.sign.signList,qs.stringify(postData))
			.then(function (res) {
				//console.log(res.data);
				if (res.data.code == 1) {
					//先清空
					vm.data.splice(0,vm.data.length)
					for (let i = 0; i < res.data.retval.list.length; i++) {	//打卡人员数据
						vm.data.push(res.data.retval.list[i])
					}
					if (!vm.sectionData.length) {
						for (let i = 0; i < res.data.retval.secList.length; i++) {
							vm.sectionData.push(res.data.retval.secList[i])
						}						
					}

				}else{
					vm.F['Hint']({
						ct:res.data.msg
					})
				}
			})
			.catch(function (err) {
				console.log(err);
			});
		},
        calendarSelect(date){
			var vm = this;
			//console.log(date)
			vm.nowDate = date.toString().replace(/,/g,'/');
			vm.getData();
			vm.$set(vm.calendar,'value',date);
            vm.$store.state.isTopCalendarShow = false
		},
		unixFormat(timestamp){
			var vm = this;
			return vm.F['unixFormat'](timestamp)
		},
		dateFomate(timestamp){	//格式化到年月日
			var vm = this;
			return vm.F['unixFormat']((timestamp/1000)).split(' ')[0]
		},
		showSeletct(index){
			var vm = this;
			vm.$set(vm.selectShow,index,!vm.selectShow[index])
			//vm.selectShow[index] = !vm.selectShow[index]
		},
		isShowList(s_id,status){
			var vm = this;
			var isShow = false;
			if ((vm.nowSelect.s_id == s_id && vm.nowSelect.status == status) || (vm.nowSelect.s_id === '' && vm.nowSelect.status == status) || (vm.nowSelect.s_id == s_id && vm.nowSelect.status === '') || (vm.nowSelect.s_id === '' && vm.nowSelect.status === '')) {
				isShow = true
			}
			return isShow
		},
		setSelect(type,value){
			var vm = this;
			vm.nowSelect[type] = value
		},
		findNowSection(){	//找当前选中的部门名
			var vm = this;
			var str = ""
			for (let i = 0; i < vm.sectionData.length; i++) {
				//console.log(vm.sectionData[i].s_id,vm.nowSelect.s_id)
				if (vm.nowSelect.s_id === "") {
					str = "全部"
				}
				if (vm.sectionData[i].s_id == vm.nowSelect.s_id) {
					str = vm.sectionData[i].s_name
				}
			}
			return str
		},
		setStatusName(){	//设置当前部门名称
			var vm = this;
			var str = "";
			if (vm.nowSelect.status === "") {
				str = "全部"
			}
			if (vm.nowSelect.status == 2) {
				str = "迟到"
			}
			if (vm.nowSelect.status == 1) {
				str = "正常"
			}

			return str
		},
		nowSignNum(){
			var vm = this;
			//var status = vm.nowSelect.status
			//var s_id = vm.nowSelect.s_id
			var count = 0;
			for (let i = 0; i < vm.data.length; i++) {
				//vm.sectionData[i]
				//console.log(vm.data[i].s_id)
				if ((vm.nowSelect.s_id == vm.data[i].s_id && vm.nowSelect.status == vm.data[i].status) || (vm.nowSelect.s_id === '' && vm.nowSelect.status == vm.data[i].status) || (vm.nowSelect.s_id == vm.data[i].s_id && vm.nowSelect.status === '') || (vm.nowSelect.s_id === '' && vm.nowSelect.status === '')) {
					count ++
				}
			}
			return count
		}
	},
	created(){
		var vm = this;
		//vm.getData();
		var date = [];
		var nowDate = new Date();
		date[0] = nowDate.getFullYear();
		date[1] = nowDate.getMonth() + 1;
		date[2] = nowDate.getDate();
		vm.calendarSelect(date);
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-select{background-color: #fff; font-size:0.32rem; color:#4f77aa; height: 0.88rem; line-height: 0.88rem; text-align: center; left: 0; bottom: 0; border-bottom: 0.01rem solid #e4e4e5; box-sizing: border-box; position: relative; overflow: visible;}
.m-select > .title{position: relative; cursor: pointer;}
.m-select > .title:after{content:""; display: inline-block; border-top: 0.16rem solid #4f77aa; border-left: 0.08rem solid transparent; border-right: 0.08rem solid transparent; margin-left: 0.16rem; transition: all 0.4s ease;}
.m-select > .ct{position: absolute; width: 100%; top: 0.88rem; left: 0; z-index: 3; background-color: #fff; border-bottom: 0.01rem solid #e4e4e5; display: none;}
.m-select.s-show > .ct{display: block; max-height: 4rem; overflow-y: scroll; box-shadow: 0.04rem 0.04rem 0.06rem 0.02rem rgba(0,0,0,0.4);}
.m-select.s-show > .ct .label{box-sizing: border-box; display: block; border-bottom: 0.01rem solid #dbdbdb;}
.m-select.s-show > .title:after{transform: rotate(180deg);}


/* .m-select select{margin:0 0.1rem; }  */



.m-time{color: #ababab;height: 0.56rem;position: relative;padding-top: 0.18rem;padding-bottom: 0.12rem;padding-left: 0.32rem;box-sizing: border-box; background-color: #f0f4f7;}

/*打卡统计*/
.m-memberList{position: relative;}
.m-memberList > .list{height: 1.16rem;background-color: #fff;position: relative;margin-bottom: 0.03rem;}
.m-memberList > .list > .avatar{width: 0.84rem;height: 0.84rem;border-radius: 0.15rem;position: absolute;top: 0.16rem;box-sizing: border-box;left: 0.32rem;}
.m-memberList > .list > .txt{font-size: 0.26rem;color: #c9c9c9;position: absolute;left: 1.46rem;top: 0.2rem;line-height: 1.4;width: 3.4rem;}
.m-memberList > .list > .txt > .big{font-size: 0.32rem;color: #272c2f;}
.m-memberList > .list > .label{ width: 0.88rem; height: 0.38rem; border: 0.01rem solid #fff; line-height: 0.38rem; border-radius: 0.1rem; position: absolute;right: 0.24rem;top: 0.2rem; background-color: #4f77aa; text-align: center; color: #fff;}
.m-memberList > .list > .label.s-red{background-color: #aa4f4f;}
.m-memberList > .list > .time{ position: absolute; right: 0.26rem; font-size: 0.24rem; bottom:0.22rem; }
</style>
