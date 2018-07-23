<template>
    <div class="m-myIndex">

        <!-- 个人信息 -->
        <router-link to="/myIndex/myinfo" class="m-info">
            
            <div class="big">
                <img :src="host + '/' + data.avatar" class="avatar">
                    安顺建设工程<br/><br/><br/>
                <span class="name">{{data.nickname}}</span><br/>
                <span class="phone">{{data.phone_mob}}</span>

            </div>
            <div class="small">
                    我的资料
                <i class="icon-xiangyou icon"></i>
            </div>
        </router-link>
        <!-- 个人信息 end-->

        <!--列表-->
        <div class="ct">
            <router-link to="/myIndex/myApplyIndex"  class="list">
                <div class="wrap">
                    <i class="icon-shenqing icon"></i>
                </div>
                申请管理
            </router-link>
            <router-link to="/myIndex/mySignList" class="list">
                <div class="wrap s-red">
                    <i class="icon-dingwei1 icon"></i>
                </div>
                我的打卡
            </router-link>
            <router-link to="/myIndex/myDailyList" class="list">
                <div class="wrap">
                    <i class="icon-ai-edit icon"></i>
                </div>
                我的日报
            </router-link>
            <!-- <router-link to="/myIndex/myTaskList" class="list">
                <div class="wrap s-red">
                    <i class="icon-daibanshiwu icon"></i>
                </div>
                待办任务
            </router-link> -->
            <router-link to="/myIndex/mySchedule" class="list g-mt30">
                <div class="wrap s-red">
                    <i class="icon-wodehangcheng icon"></i>
                </div>
                我的行程
            </router-link>

            <router-link to="/setting/settingIndex" class="list g-mt30">
                <div class="wrap s-gray">
                    <i class="icon-shezhi1 icon"></i>
                </div>
                设置
            </router-link>
        </div>
        <!--列表 end-->

        <!-- <a href="javascript:;" class="m-loginOutBtn u-FU_btn" :class="{'z-loading':loading}" @click="loginOut">
            退出登陆<span class="p-loading"></span>
        </a> -->

    </div>
</template>

<script>
var qs = require('qs');
export default {
    name: 'myIndex',
    data () {
        return {
            temp:this.$store.state.httpUrl.temp,
            host:this.$store.state.httpUrl.HOST,
            data:{
				/******基本信息*******/
				avatar:"",				//头像
				user_name:"",			//用户名
				nickname:"",			//姓名
				s_name:"",				//部门名
				sp_name:"",				//职位名
				gender:"",				//性别
				birth_time:"",			//出生日期
				native:"",				//籍贯
				ethnic:"",				//民族
				phone_mob:"",			//手机号
				/******基本信息 end*******/
            },
            loading:false
        }
    },
    created(){
        var vm = this;
        vm.getData();
    },
	methods:{
		getData(){
			var vm = this;
			var url = vm.$store.state.httpUrl.member.getMemberInfo;
			var userId = localStorage.getItem('userId')
			var postData = {
				userId:userId,
				type:[1]
			}
			//console.log(postData)
			vm.axios.post(url,qs.stringify(postData))
			.then((res) => {
				var data = res.data;
				if (data.code >= 1) {
					var _data = data.retval.data
					for (var i in _data){
						for (var j in vm.data){
							if (i == j) {
								vm.data[j] = _data[i]
							}
						}
					}
				}else{
					vm.F['Hint'](vm,{
						ct:data.msg
					})
				}

				setTimeout(() => {
					vm.$previewRefresh()
				},1000);
			})
		},
		unixFormat(timestamp){
            var vm = this;
			if (!timestamp) {
				return "-"
			}
			return vm.F['unixFormat'](timestamp)
        },
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-info{width: 6.92rem;height: 3.96rem;background-color: #fff;margin-top: 0.26rem;margin-left: 0.3rem;border-radius: 0.15rem;border: 0.01rem solid #d3d3d3; display: block;}
.m-info > .big{font-size: 0.3rem;color: #afafaf;line-height: 1.4;padding-left: 0.42rem;margin-top: 0.42rem;padding-bottom: 0.28rem; border-bottom: 0.01rem solid #eff3f6;position: relative;}
.m-info > .big > .name{font-size: 0.4rem;color: #4f77aa;}
.m-info > .big > .phone{color: #9e9e9e;}
.m-info > .big > .avatar{width: 1.12rem;height: 1.12rem;border-radius: 0.15rem;position: absolute;right: 0.44rem; box-sizing: border-box;}
.m-info > .small{padding-left: 0.44rem;line-height: 1.1rem; font-size: 0.28rem;color: #afafaf;position: relative;}
.m-info > .small i{position:absolute;right: 0.44rem;}

.m-myIndex > .ct{margin-top: 0.36rem;}
.m-myIndex > .ct > .list{background-color: #fff;height: 0.92rem;width:100%;line-height: 0.92rem;position: relative;padding-left: 0.32rem; display: block; box-sizing: border-box;color:#000;font-size: 0.3rem;border-top: 0.01rem solid #e9e9e9;}
.m-myIndex > .ct > .list > .wrap{width: 0.52rem;height: 0.52rem; background-color: #f2b521; text-align: center;line-height: 0.52rem;display: inline-block;margin-right: 0.36rem;}
.m-myIndex > .ct > .list > .wrap i{color: #fff;font-size:0.35rem; }
.m-myIndex > .ct > .list > .wrap.s-red{background-color: #fd7558;}
.m-myIndex > .ct > .list > .wrap.s-gray{background-color: #c1c1c1;}
.m-myIndex > .ct > .list.g-mt30{margin-top: 0.3rem;border-top: 0.01rem solid #e9e9e9;}

.m-loginOutBtn{position: relative; display: block; width: 5rem; height: 0.8rem; line-height: 0.8rem; font-size: 0.3rem; border-radius: 0.1rem; color: #fff; background-color: #d62020; text-align: center; margin: 0 auto; margin-top: 0.4rem; border: none;}
</style>
