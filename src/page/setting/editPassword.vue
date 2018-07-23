<template>
    <div>
		<div class="m-normalList f-clear">
			<div class="left">原密码</div>
			<div class="right s-edit">
				<input type="password" name="oldPwd" placeholder="请输入原密码" v-model="form.oldPwd"><i class="icon-xiangyou icon"></i>
			</div>
		</div>

		<div class="m-normalList f-clear">
			<div class="left">新密码</div>
			<div class="right s-edit">
				<input type="password" name="pwd" placeholder="请输入新密码" v-model="form.pwd"><i class="icon-xiangyou icon"></i>
			</div>
		</div>

		<div class="m-normalList f-clear">
			<div class="left">再次输入密码</div>
			<div class="right s-edit" style="width:4.6rem;">
				<input type="password" placeholder="请再次输入密码" v-model="PwdAgain"><i class="icon-xiangyou icon"></i>
			</div>
		</div>

		<!-- 底边 -->
		<div class="m-forbotNav" style="height: 2rem;"></div>
		<div class="m-bottom">
			<div class="block f-clear">
				<div class="btn j-submit u-FU_btn" @click="submit" :class="{'z-loading':loading}">提交<span class="p-loading"></span></div>
			</div>
		</div>
		<!-- 底边 end-->

    </div>
</template>

<script>
var qs = require('qs');
export default {
	name: 'editPassword',
	data () {
		return {
			form:{
				oldPwd:"",
				pwd:""
			},
			PwdAgain:"",
			loading:false
		}
	},
	methods:{
		submit(){
			var vm = this;
			if(vm.loading){
				return false
			}
			var url = vm.$store.state.httpUrl.seting.editPassword;
			var postData = {
				oldPwd:vm.form.oldPwd,
				pwd:vm.form.pwd
			}

			if (!postData.oldPwd) {
				vm.F['Hint'](vm,{
					ct:"请输入旧密码"
				})
				return false
			}

			if (!postData.pwd) {
				vm.F['Hint'](vm,{
					ct:"请输入新密码"
				})
				return false
			}

			if (postData.pwd != vm.PwdAgain) {
				vm.F['Hint'](vm,{
					ct:"两次密码不一致"
				})
				return false
			}

			vm.loading= true;
			vm.axios.post(url,qs.stringify(postData))
			.then((res) => {
				var data = res.data;
				if (data.code == 1) {
					vm.F['Hint'](vm,{
						ct:data.retval.okTip,
						type:1
					})

					setTimeout(() => {
						vm.$router.push('/setting/settingIndex');
					},1500);
				}else{
					vm.F['Hint'](vm,{
						ct:data.msg
					})
				}
			})
			.then(() => {
				vm.loading = false
			})


		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
