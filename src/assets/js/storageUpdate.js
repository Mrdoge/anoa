/*
created by lkh 2018-8-9
更新缓存
*/
import qs from 'qs'
import axios from 'axios'

function storageUpdate(){
    var vm = window.vueApp;
    if (!vm) {
        console.log('找不到vueApp方法')
    }else{
        var loginStorage = JSON.parse(localStorage.getItem('login'));
        if (loginStorage) {
            var postData = {
                account:loginStorage.phone_mob,
                passWord:loginStorage.password
            }
            vm.axios.post(vm.$store.state.httpUrl.login.login,qs.stringify(postData))
            .then(function (res) {
                if (res.data.code == 1) {
                    console.log('登陆成功，把配置写入缓存');

                    //永久储存token
                    var token = res.data.retval.token;
                    localStorage.setItem('token',token)

                    //储存用户信息
                    var userInfo = JSON.stringify(res.data.retval.userInfo)
                    localStorage.setItem('userInfo',userInfo)

                }else{
                    console.log('登陆失败')
                    //写入登陆状态,弹出登陆界面
                    setTimeout(() => {
                        vm.$store.state.isLogin = false
                    },400);
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        }else{
            vm.$store.state.isLogin = false;
            //清除所有缓存
            localStorage.clear();
        }
    }
}


export default storageUpdate