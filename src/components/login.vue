<template>
    <div>
        <div class="m-login" v-if="this.$store.state.isLogin === false">
            <div class="top" :style="{backgroundImage:'url('+temp+'/wap/public/img/login_bg.png)'}">
                <!--logo-->
                <img class="logo" :src="temp + '/wap/public/img/logo.png'" alt="">
                <!--logo end-->

                <!--form-->
                <div class="form">
                    <div class="title">
                        <img class="logo" :src="temp + '/wap/public/img/logo_title.png'" alt="">
                    </div>
                    <div class="ct">
                        <div class="list">
                            <i class="icon icon-shouji"></i><input type="number" placeholder="请输入手机号" maxlength="11" v-model.number="form.account" @keyup.13="submit">
                        </div>
                        <div class="list">
                            <i class="icon icon-mima"></i><input type="password" placeholder="请输入密码" v-model="form.passWord" @keyup.13="submit">
                        </div>
                        <div class="remember">
                            <label :class="{'z-cur':remember}">
                                <input type="checkbox" v-model="remember">
                                记住密码
                            </label>
                        </div>                  
                    </div>

                    <a href="javascript:;" class="btn u-FU_btn" :class="{'z-loading':loading}" :style="{backgroundImage:'url('+temp+'/wap/public/img/login_bg.png)'}" @click="submit">
                        登录<span class="p-loading"></span>
                    </a>

                </div>
                <!--form end-->

            </div>
        </div>
    </div>
</template>

<script>
var qs = require('qs');
//console.log(F)
export default {
    name: 'login',
    data () {
        return {
            temp:this.$store.state.httpUrl.temp,
            form:{
                account:"",
                passWord:"",
            },
            loading:false,
            remember:false
        }
    },
    created(){
        var vm = this;
        var loginInfo = JSON.parse(localStorage.getItem('login'));
        //console.log(loginInfo)
        if (loginInfo) {
            vm.remember = true;
            vm.form.account = loginInfo.phone_mob
            vm.form.passWord = loginInfo.password
        }else{
            vm.remember = false;
        }
    },
    methods:{
        submit(){
            var vm = this;
            if (vm.loading) {
                return false
            }
            var postData = vm.form

            var verifyData = [
                {
                    val:postData.account,
                    type:"noNull",
                    tips:"请输入手机号"
                },
                {
                    val:postData.passWord,
                    type:"noNull",
                    tips:"请输入密码"
                },
            ]
            // alert(F);
            // return false
            //console.log(vm.F)
            //return false
            //数据验证
            const verify = vm.F['FormComfirm'](verifyData)
            
            if(verify.err){
                vm.F['Hint'](vm,{
                    ct:verify.ct,
                    type:0
                })
                return false
            }

            vm.loading = true
            this.axios.post(this.$store.state.httpUrl.login.login,qs.stringify(postData))
            .then(function (res) {
                //console.log(res)
                if (res.data.code == 1) {
                    vm.F['Hint'](vm,{
                        ct:res.data.retval.okTip,
                        type:1
                    })

                    //永久储存token
                    var token = res.data.retval.token;
                    localStorage.setItem('token',token)

                    //储存用户信息
                    var userInfo = JSON.stringify(res.data.retval.userInfo)
                    localStorage.setItem('userInfo',userInfo)


                    if (window.location.href.indexOf('info/infoIndex') > -1) {
                        //如果本身是自己，则自己跳自己，触发获取接口数据
                        vm.$store.state.isFooterShow = true; //底部是否显示
                        vm.$store.state.isTopBarShoow = false; //顶部是否显示
                        vm.$router.push({path:'/info/infoIndex'});//跳转到该路由
                    }
                    
                    setTimeout(() => {
                        vm.$store.state.isLogin = true;
                        //localStorage.setItem('userId',res.data.retval.userId)
                    },2000)
                }else{
                    vm.F['Hint'](vm,{
                        ct:res.data.msg,
                        type:0
                    })
                }

                vm.loading = false
            })
            .catch(function (err) {
                console.log(err);
                vm.loading = false
            });
        
        },
        setStorage(){   //记住密码
            var vm = this;
            var obj = {
                phone_mob:vm.form.account,
                password:vm.form.passWord
            }
            if (vm.remember) {
                localStorage.setItem('login', JSON.stringify(obj))
            }else{
                localStorage.removeItem('login')
            }
        }
    },
    watch:{
        remember(){
            var vm = this;
            vm.setStorage();
        },
        'form.account'(){
            var vm = this;
            vm.setStorage();
        },
        'form.passWord'(){
            var vm = this;
            vm.setStorage();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-login{position: fixed; width: 100%; height: 100%; background-color: #fff; z-index: 10; top: 0; left: 0;}
.m-login > .top{position: relative; width: 100%; height: 46%; background-color: #4482d2; background-size: 0.26rem 0.18rem; background-repeat: repeat;}
.m-login > .top > .logo{width: 2.6rem; height: 0.9rem; margin-top: 0.36rem; margin-left: 0.3rem;}
.m-login > .top > .form{display: block; position: absolute; height: 4.1rem; box-sizing: border-box; background-color: #fff; box-shadow: 0 0.04rem 0.06rem 0.02rem rgba(0, 0, 0, 0.2); border-radius: 0.2rem; position: absolute; left: 0.5rem; right: 0.5rem; bottom: -2rem; padding: 0.64rem 0.6rem;}

.m-login > .top > .form .title{position: absolute; width: 100%; top: -1.12rem; left: 0; right: 0;}
.m-login > .top > .form .ct .list{position: relative; margin-top: 0.44rem; border-radius: 0.1rem; background-color: #ebebeb; border-left: 0.06rem solid #4482d2;}
.m-login > .top > .form .ct .list:first-child{margin-top: 0;}
.m-login > .top > .form .ct .list input{height: 0.94rem; display: block; box-sizing: border-box; width: 100%; padding-left: 0.8rem; border: none; color: #4482d2; font-size: 0.28rem; background-color: transparent;}
.m-login > .top > .form .ct .list i{position: absolute; font-size: 0.4rem; color: #4482d2; top: 50%; left: 0.3rem; transform: translateY(-50%);}

.m-login > .top > .form .ct .remember{margin-top: 0.4rem;}
.m-login > .top > .form .ct .remember input{box-sizing: border-box; display: inline-block; width: 0.3rem; height: 0.3rem; vertical-align: middle; position: relative; z-index: 2; cursor: pointer; opacity: 0; margin-right: 0.06rem;}
.m-login > .top > .form .ct .remember label{position: relative; cursor: pointer;}
.m-login > .top > .form .ct .remember label:before{content: ""; display: inline-block; border: 0.01rem solid #dbdbdb; width: 0.3rem; height: 0.3rem; border-radius: 0.04rem; position: absolute; left: 0; top: 0; top: 50%; transform: translateY(-50%);}
.m-login > .top > .form .ct .remember label.z-cur:before{background-color: #4583d4;}

.m-login > .top > .form > .btn{display: block; height: 0.84rem; line-height: 0.84rem; background-color: #4583d4; position: absolute; font-size: 0.3rem; width: 100%; left: 0; box-sizing: border-box; bottom: -1.68rem; background-size: 0.26rem 0.18rem; background-repeat: repeat;}
</style>
