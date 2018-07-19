<template>
    <div class="m-memberDetail">
        <div class="m-normalTitleBar">基本信息</div>
        <div class="m-normalList f-clear">
            <div class="left">工号</div>
            <div class="right">
                {{data.user_sn?data.user_sn:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">姓名</div>
            <div class="right">
                {{data.nickname?data.nickname:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">部门</div>
            <div class="right">
                {{data.s_name?data.s_name:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">职位</div>
            <div class="right">
                {{data.sp_name?data.sp_name:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">性别</div>
            <div class="right">
                {{+data.gender == 1?"男":"女"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">出生日期</div>
            <div class="right">
                {{unixFormat(data.birth_time)}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">籍贯</div>
            <div class="right">
                {{data.registered_addr?data.registered_addr:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">民族</div>
            <div class="right">
                {{data.ethnic?data.ethnic:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">手机号码</div>
            <div class="right">
                {{data.phone_mob?data.phone_mob:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">短号</div>
            <div class="right">
                {{data.cornet?data.cornet:"-"}}
            </div>
        </div>


        <div class="m-normalTitleBar">档案信息</div>
        <div class="m-normalList f-clear">
            <div class="left">身份证号</div>
            <div class="right">
                {{data.identity?data.identity:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">户口所在地</div>
            <div class="right">
                {{data.registered_addr?data.registered_addr:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">户口类型</div>
            <div class="right">
                {{data.registered_type?data.registered_type:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">毕业学校</div>
            <div class="right">
                {{data.finish_school?data.finish_school:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">学历</div>
            <div class="right">
                {{data.education?data.education:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">住址</div>
            <div class="right">
                {{data.address?data.address:"-"}}
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">邮箱</div>
            <div class="right">
                {{data.email?data.email:"-"}}
            </div>
        </div>


        <div class="m-normalTitleBar">证件信息</div>
        <div class="m-listRow g-mt0">
            <div class="title">身份证</div>
            <div class="ct">
                <div class="imgList">
                    <div class="wrap" v-for="(items,index) in data.sfImgData" :key="index">
                        <img :src="host + '/' + items" preview="0" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="m-listRow g-mt0 s-noborder">
            <div class="title">专业证书</div>
            <div class="ct">
                <div class="imgList">
                    <div class="wrap" v-for="(items,index) in data.zsImgData" :key="index">
                        <img :src="host + '/' + items" preview="1" alt="">
                    </div>
                </div>
            </div>
        </div>
        <div class="m-listRow g-mt0">
            <div class="title">生活照</div>
            <div class="ct">
                <div class="imgList">
                    <div class="wrap" v-for="(items,index) in data.shImgData" :key="index">
                        <img :src="host + '/' + items" preview="2" alt="">
                    </div>
                </div>
            </div>
        </div>



        <div class="m-normalTitleBar">考勤记录</div>
        <div class="m-normalList f-clear">
            <div class="left">迟到次数</div>
            <div class="right">
                {{data.cdNum}}次
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">罚款次数</div>
            <div class="right">
                {{data.fkNum}}次
            </div>
        </div>
        <div class="m-normalList f-clear">
            <div class="left">请假次数</div>
            <div class="right">
                {{data.qjNum}}次
            </div>
        </div>

    </div>
</template>

<script>
var qs = require('qs');
export default {
    name: 'memberDetail',
    data () {
        return {
			temp:this.$store.state.httpUrl.temp,
			host:this.$store.state.httpUrl.HOST,
			data:{
				/******基本信息*******/
                avatar:"",				//头像
                user_sn:"",             //工号
				user_name:"",			//用户名
				nickname:"",			//姓名
				s_name:"",				//部门名
				sp_name:"",				//职位名
				gender:"",				//性别
				birth_time:"",			//出生日期
				native:"",				//籍贯
				ethnic:"",				//民族
                phone_mob:"",			//手机号
                cornet:"",			    //短号
				/******基本信息 end*******/

				/*********档案信息*********/
				identity:"",		//身份证号码
				registered_addr:"",	//户口所在地
				registered_type:"",	//户口类型
				finish_school:"",	//毕业学校
				education:"",		//学历
				address:"",			//住址
				email:"",			//邮箱
				/*********档案信息 end*********/

				/*********证件信息*********/
				sfImgData:[],		//身份证图片
				zsImgData:[],		//证书图片
				shImgData:[],		//生活照
				/*********证件信息 end*********/

				/*********附加信息*********/
				cdNum:"",			//迟到次数
				fkNum:"",			//罚款次数
				qjNum:"",			//请假次数
				/*********附加信息 end*********/

			},
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
            //var userId = localStorage.getItem('userId')
            var userId = vm.$route.params.userId
			var postData = {
				userId:userId,
				type:[1,2,3,4]
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
			return vm.F['unixFormat'](timestamp).split(' ')[0]
		}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
