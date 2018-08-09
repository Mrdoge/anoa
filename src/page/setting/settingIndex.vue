<template>
    <div>
        <div class="m-setting">
            <router-link to="/setting/editPassword" class="m-normalList f-clear g-mt30">
                <div class="left">修改密码</div>
                <div class="right">
                    <i class="icon-xiangyou icon"></i>
                </div>
            </router-link>

            <a href="javascript:;" class="m-loginOutBtn u-FU_btn btn" :class="{'z-loading':loading}" @click="loginOut">
                退出登录<span class="p-loading"></span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'setting',
    data () {
        return {
            loading:false
        }
    },
    methods:{
        loginOut(){
            var vm = this;
            if (vm.loading) {
                return false
            }
            var url = vm.$store.state.httpUrl.loginOut;

            vm.loading = true
            vm.ajax.post(url)
            .then((res) => {
                var data = res;
                if (data.code >= 1) {
                    vm.F['Hint'](vm,{
                        ct:data.retval.okTip,
                        type:1
                    })
                    setTimeout(() => {
                        //window.location.reload();
                        //vm.$router.push('/info/infoIndex')
                        //localStorage.setItem('userId','')   //清空userId
                        //localStorage.setItem('isAdmin','')   //清空isAdmin
                        localStorage.setItem('token','');
                        localStorage.setItem('userInfo','');
                        window.location.href = window.location.protocol + '//' + window.location.host
                    },1000);
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
                    })
                }

                vm.loading = false
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-setting{display: block; position: relative;}
.m-setting .btn{display: block; height: 0.94rem; line-height: 0.94rem; text-align: center; color: #ff0000; font-size: 0.32rem; box-sizing: border-box; border: none; border-top: 0.01rem solid #e4e4e5; border-bottom: 0.01rem solid #e4e4e5; background-color: #fff;  width: 100%; margin-top: 0.3rem;}
.m-setting .u-FU_btn.z-loading > .p-loading:after{border-bottom-color: #b6b6b6;}
.m-normalList{display: block;}
.g-mt30{margin-top: 0.3rem;}
</style>
