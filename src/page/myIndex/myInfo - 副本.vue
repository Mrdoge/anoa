<template>
	<div>
		<!-- <div class="m-avartar">
			<div class="wrap" :class="{'z-loading':imgLoading}">
                <input type="file" @change="imgUpload($event)">
                <img class="loading" :src="temp + '/wap/public/img/loading.gif'" >
				<img :src="host + '/' + data.avatar" alt="" >
			</div>
			<div class="name">{{data.nickname?data.nickname:"-"}}</div>
		</div> -->
        <div class="m-avartar">
			<div class="wrap" :class="{'z-loading':imgLoading}">
                <input type="file" id="file">
                <img class="loading" :src="temp + '/wap/public/img/loading.gif'" >
				<img :src="host + '/' + data.avatar" alt="" >
			</div>
			<div class="name">{{data.nickname?data.nickname:"-"}}</div>
		</div>

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

        
        <div class="m-avatarCrop" v-show="isShowCrop">
            <div class="wrap" id="clipArea"></div>

            <a href="javascript:;" class="btn" @click="isShowCrop = false">取消</a>
            <a href="javascript:;" class="btn s-right" id="clipBtn">确定</a>
        </div>
	</div>
</template>

<script>
var qs = require('qs');
var PhotoClip = require('photoclip')
PhotoClip = PhotoClip.default
export default {
	name: 'MyInfo',
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
                cornet:"",			//短号
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
            loading:false,
            imgLoading:false,
            isShowCrop:false,    //是否显示上传头像
            avatarUrl:""        //最后需要提交给服务器的头像链接
		}
	},
    components:{
        
    },
	created(){
        var vm = this;
        
        vm.getData();

	},
    mounted(){
        var vm = this
        
        setTimeout(() => {
            //头像上传
            vm.avatarCrop()
        },1000);
    },
	methods:{
        avatarCrop(){
            var vm = this;
            var pc = new PhotoClip('#clipArea', {
                size: 260,
                outputSize: 640,
                //adaptive: ['60%', '80%'],
                file: '#file',
                view: '#view',
                ok: '#clipBtn',
                //img: 'img/mm.jpg',
                loadStart: function() {
                    //console.log('开始读取照片');
                    vm.imgLoading = true;
                },
                loadComplete: function() {
                    //console.log('照片读取完成');
                    vm.imgLoading = false
                    vm.isShowCrop = true;
                },
                done: function(dataURL) {
                    //console.log(dataURL);
                    vm.cropDone(dataURL)
                },
                fail: function(msg) {
                    alert(msg);
                }
            });

        },
        cropDone(dataURL){
            var vm = this;
            var url = vm.$store.state.httpUrl.imgUpload;
            var postdata = {
                type:'base64',
                key:'anoa',
                imgResour:dataURL
            }
            $.ajax({
                url: url,
                dataType: 'json',
                type: "post",
                data: postdata,
                success: function(data) {
                    if(data.code >= 1){
                        vm.avatarUrl = data.retval.imgUrl
                        vm.isShowCrop = false
                        vm.avatarSubmit()

                    }else{
                        vm.F['Hint'](vm,{
                            ct:data.msg
                        })
                    }
                },
                error:function(err){
                    console.log('连接超时')
                },
                complete:function(){
                    
                }
            })
        },
        avatarSubmit(){
            var vm = this;
            var url = vm.$store.state.httpUrl.editMemberAvatar
            var postData = {
                avatar:vm.avatarUrl
            }

            vm.imgLoading = true;
            vm.axios.post(url,qs.stringify(postData))
            .then((res) => {
                var data = res.data;
                //console.log(data);
                if(data.code >= 1){
                    vm.data.avatar = vm.avatarUrl
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
                    })
                }
                vm.imgLoading = false
            })
        },
		getData(){
			var vm = this;
			var url = vm.$store.state.httpUrl.member.getMemberInfo;
			var userId = localStorage.getItem('userId')
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
        },
        imgUpload(e){
            var vm = this;
            var dom = e.target;
            //console.log(dom)
            var opt = {
                limit:10240,
                url:vm.$store.state.httpUrl.imgUpload,	//上传地址,
                key:"anoa",	//key值
                afterCall:vm.afterUpload,
                beforeCall:vm.beforeUpload,
                errCall:vm.errCall
            }
            vm.F['imgUpload'](vm,dom,opt)	//	图片上传
        },
        beforeUpload(){
            var vm = this;
            vm.imgLoading = true
        },
        afterUpload(data){
            console.log(data)
            var vm = this;
            vm.imgLoading = false
            if (data.code > 0) {
                //vm.form.imgUrls.push(data.retval.imgUrl)
                vm.editMemberAvatar(data.retval.imgUrl)
            }else{
                vm.F['Hint'](vm,{
                    ct:data.msg
                })
            }

            vm.imgLoading = false
        },
        editMemberAvatar(avatar){
            var vm = this;
            var url = vm.$store.state.httpUrl.editMemberAvatar;
            var postData = {
                avatar:avatar
            }
            vm.axios.post(url,qs.stringify(postData))
            .then((res) => {
                var data = res.data
                if (data.code >= 1) {
                    vm.F['Hint'](vm,{
                        ct:"修改成功",
                        type:1
                    })
                    vm.data.avatar = avatar
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
                    })
                }
            })
        }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-avartar{background-color: #fff; padding: 0.3rem 0; text-align: center; border-bottom: 0.01rem solid #e4e4e5;}
.m-avartar > .wrap{display: block; width: 1.66rem; height: 1.66rem; padding: 0.18rem; border: 0.01rem solid #efefef; border-radius: 50%; margin: 0 auto; position: relative;}
.m-avartar > .wrap input{position: absolute; z-index: 2; width: 100%; height: 100%; top: 0; left: 0; box-sizing: border-box; opacity: 0;}
.m-avartar > .wrap img{border-radius: 50%; width: 100%; height: 100%; box-sizing: border-box;}
.m-avartar > .wrap .loading{display: none;}
.m-avartar > .wrap.z-loading img{display: none; position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%);}
.m-avartar > .wrap.z-loading .loading{display: block; width: 0.6rem; height: 0.6rem;}
.m-avartar > .name{font-size: 0.34rem; color: #000; margin-top: 0.2rem; font-weight: bold;}

.m-avatarCrop{position: fixed; height: 100%; width: 100%; top: 0; left: 0; background-color: #000; z-index: 6;}
.m-avatarCrop .btn{color: #fff; font-size: 0.4rem; font-weight: bold; padding: 0.2rem; position: absolute; bottom: 0; left: 0; z-index: 1;}
.m-avatarCrop .btn.s-right{left: auto; right: 0;}
.m-avatarCrop .wrap{position: absolute; height: 6rem; top: 50%; transform: translateY(-50%); width: 100%;}
</style>
