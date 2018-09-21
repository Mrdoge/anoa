<template>
    <div>
		<!--文件循环体-->
		<template v-if="data.file_url.length">
			<a :href="host + '/' + items.file_url" class="m-docList f-clear" v-for="(items,index) in data.file_url" :key="index + 'file'">
				<div class="left">
					<img :src="fileType(items.file_url).icon" alt="">
				</div>
				<div class="right">
					<div class="title f-txtof_3">{{items.file_name}}.{{fileType(items.file_url).filetype}}</div>
					<div class="time"><i class="icon icon-shijian"></i>{{unixFormat(items.created_time)}}</div>
				</div>
			</a>

			<div style="height:0.1rem; background-color:#ececeb;"></div>
		</template>
		<!--文件循环体 end-->


		<!--合同主体信息-->
		<div class="m-contractContent">
			<div class="list f-clear">
				<div class="left">合同编号：</div>
				<div class="right">{{data.contract_number?data.contract_number:'-'}}</div>
			</div>

			<div class="list f-clear">
				<div class="left">合同名称：</div>
				<div class="right">{{data.contract_name?data.contract_name:'-'}}</div>
			</div>

			<div class="list f-clear">
				<div class="left">项目：</div>
				<div class="right">{{data.title?data.title:'-'}}</div>
			</div>

			<div class="list f-clear">
				<div class="left">签订时间：</div>
				<div class="right">{{data.sign_time?data.sign_time:'-'}}</div>
			</div>

			<div class="list f-clear">
				<div class="left">甲方单位：</div>
				<div class="right">{{data.owner?data.owner:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">甲方负责人：</div>
				<div class="right">{{data.owner_man?data.owner_man:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">甲方负责人电话：</div>
				<div class="right">{{data.owner_man_tel?data.owner_man_tel:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">乙方单位：</div>
				<div class="right">{{data.second?data.second:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">乙方负责人：</div>
				<div class="right">{{data.second_man?data.second_man:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">乙方合责人电话：</div>
				<div class="right">{{data.second_man_tel?data.second_man_tel:'-'}}</div>
			</div>

			<div class="list f-clear">
				<div class="left">开始日期：</div>
				<div class="right">{{data.s_time?data.s_time:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">结束日期：</div>
				<div class="right">{{data.e_time?data.e_time:'-'}}</div>
			</div>

			<div class="list f-clear">
				<div class="left">总工期天数：</div>
				<div class="right">{{data.total_periods?data.total_periods:'-'}}</div>
			</div>

			<div class="list f-clear">
				<div class="left">合同总金额：</div>
				<div class="right">{{data.total_price?data.total_price:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">合同预付款：</div>
				<div class="right">{{data.prepay?data.prepay:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">合同尾款：</div>
				<div class="right">{{data.final?data.final:'-'}}</div>
			</div>

			<div class="list f-clear">
				<div class="left">发票类型：</div>
				<div class="right">{{data.invoice_type?data.invoice_type:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">发票税率：</div>
				<div class="right">{{data.invoice_per?data.invoice_per:'-'}}</div>
			</div>

			<div class="list f-clear">
				<div class="left">法人代表：</div>
				<div class="right">{{data.representative?data.representative:'-'}}</div>
			</div>

			<div class="list f-clear">
				<div class="left">联系电话：</div>
				<div class="right">{{data.phone_mob?data.phone_mob:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">邮箱：</div>
				<div class="right">{{data.email?data.email:'-'}}</div>
			</div>

			<div class="list f-clear">
				<div class="left">对方开户银行：</div>
				<div class="right">{{data.deposit_bank?data.deposit_bank:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">对方账户名称：</div>
				<div class="right">{{data.corporate_name?data.corporate_name:'-'}}</div>
			</div>
			<div class="list f-clear">
				<div class="left">对方银行账号：</div>
				<div class="right">{{data.corporate?data.corporate:'-'}}</div>
			</div>

		</div>
		<!--合同主体信息-->

		<div class="m-borderTitle"><span>合同照片</span></div>
		<div class="m-listRow g-mt0">
			<div class="ct">
				<div class="imgList">
					<div class="wrap" v-for="items in data.img_url" :key="items" v-if="data.img_url.length">
						<img :src="host + '/' + items" alt="" preview="0">
					</div>
					<!-- <div class="wrap s-add" :class="{'z-loading':loading.img}">
						<input type="file" @change="imgUpload($event)">
						<span class="add">+</span>
						<img class="loading" :src="temp + '/wap/public/img/loading.gif'" >
					</div> -->
				</div>
			</div>
		</div>

        <div style="height:1.8rem;"></div>
        <div class="m-bottom">
            <div class="block">
                <!-- <router-link to="/project/projectAdd" class="btn" @click="submit">提交</router-link> -->
                <a href="javascript:;" class="btn u-FU_btn" :class="{'z-loading':loading.img}">
					<input type="file" @change="imgUpload($event)">
                	上传图片<span class="p-loading"></span>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
var qs = require('qs');
export default {
  name: 'contractDetails',
  data () {
    return {
		host:this.$store.state.httpUrl.HOST,
	  	temp:this.$store.state.httpUrl.temp,
		data:{
			file_url:[]
		},
		invoice_type:[
			{},
			{
				type:1,
				name:"不开发票"
			},
			{
				type:2,
				name:"增值税专用发票"
			},
			{
				type:3,
				name:"增值税普通发票不开发票"
			},
			{
				type:4,
				name:"其他"
			},
		],
		loading:{
			form:false,
			img:false
		}
    }
  },
  created(){
	var vm = this;

	//document.body.style.backgroundColor = "#fff";
	setTimeout(() => {
		document.body.style.backgroundColor = "#fff";
	},40)

	vm.getData();
  },
  destroyed(){
	  document.body.style.backgroundColor = "";
  },
  methods:{
    getData(){
		var vm = this;
		var cId = vm.$route.params.cId
		var url = vm.$store.state.httpUrl.contract.ContractDetails + '?id=' + cId;

		vm.ajax.post(url)
		.then((res) => {
			var data = res;
			if (data.code >= 1) {
				var _data = data.retval.contractDetailsData;
				for(var i in _data){
					vm.$set(vm.data,i,_data[i])
				}

			}else{
				vm.F['Hint'](vm,{
					ct:data.msg
				})
			}

			setTimeout(() => {
				vm.$previewRefresh();
			},1000);
		})
    },
    unixFormat(timestamp){
		var vm = this;
		return vm.F['unixFormat'](timestamp).split(' ')[0]
	},
	fileType(fileUrl){
		var vm = this;
		return vm.F['fileType'](fileUrl,vm.temp)
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
        vm.loading.img = true
    },
    afterUpload(data){
        //console.log(data)
        var vm = this;
        vm.loading.form = false
		if(data.code !== 1) {
			if (data.code == 1314) {
				if (data.retval.url) {
					location.href = data.retval.url;
				}else{
					window.location.reload();
				}
				
			} else {
				vm.F['Hint'](vm,{
					ct:data.msg
				})
			}

		} else {
			vm.data.img_url.push(data.retval.imgUrl)
			vm.submit()
		}

        vm.loading.img = false
    },
    delImg(index){	//删除图片
        var vm = this;
        vm.data.img_url.splice(index,1)
	},
	submit(){
		var vm = this;
		var postData = {};

		postData.contract_name = vm.data.contract_name;
		postData.contract_number = vm.data.contract_number;
		postData.corporate = vm.data.corporate;
		postData.corporate_name = vm.data.corporate_name;
		postData.deposit_bank = vm.data.deposit_bank;
		postData.e_time = +vm.data.e_time;
		postData.email = vm.data.email;
		postData.final = vm.data.final;
		postData.invoice_per = vm.data.invoice_per;
		postData.invoice_type = vm.data.invoice_type;
		postData.owner = vm.data.owner;
		postData.owner_man = vm.data.owner_man;
		postData.owner_man_tel = vm.data.owner_man_tel;
		postData.phone_mob = vm.data.phone_mob;
		postData.prepay = vm.data.prepay;
		postData.pro_id = vm.data.pro_id;
		postData.pro_id = vm.data.pro_id;
		postData.representative = vm.data.representative;
		postData.s_time = +vm.data.s_time;
		postData.second = vm.data.second;
		postData.second_man = vm.data.second_man;
		postData.second_man_tel = vm.data.second_man_tel;
		postData.sign_time = +vm.data.sign_time;
		postData.total_periods = vm.data.total_periods;
		postData.total_price = vm.data.total_price;
		postData.id = vm.$route.params.cId

		//文件数组重组（字段名与后台不同，需要特殊处理）
		postData.fileUrls = []
		if (vm.data.file_url.length) {
			for (let index = 0; index < vm.data.file_url.length; index++) {
				var _obj = {
					fileName:vm.data.file_url[index].file_name + '.' + vm.data.file_url[index].file_url.split('.')[1],
					fileUrl:vm.data.file_url[index].file_url
				}
				postData.fileUrls.push(_obj)
			}
		}

		//图片重组
		postData.imgUrls = vm.data.img_url;

		vm.loading.img = true
		vm.ajax.post(this.$store.state.httpUrl.contract.contractAdd,postData)
		.then(function (res) {
			//console.log(res.data);
			var data = res;
			if (data.code == 1314) {
				if (data.retval.url) {
					location.href = data.retval.url;
				}else{
					window.location.reload();
				}
				
			} else {
				vm.F['Hint'](vm,{
					type:1,
					ct:data.msg
				})
			}
		})
		.then(() => {
			vm.loading.img = false
			setTimeout(() => {
				vm.$previewRefresh();
			},1000);
		})
		.catch(function (err) {
			console.log(err);
		});

	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 合同详情*/
.m-contractDetails > .txt{position: relative;}
.m-contractDetails > .txt > .title{height: 0.56rem;font-size: 0.26rem;line-height: 0.56rem;padding-left: 0.32rem;border-bottom: 0.01rem solid #e4e4e5;}
.m-contractDetails > .txt > .ct{background-color: #fff; padding: 0.2rem 0; min-height: 0.96rem; box-sizing: border-box; line-height: 1.4;font-size: 0.32rem;color: #000;padding-left: 0.32rem;border-bottom: 0.01rem solid #e4e4e5;}
.m-contractDetails > .txt.photo{height: 2.7rem;box-sizing: border-box;}
.m-contractDetails > .txt.photo > .jpg{background-color: #fff; padding-top: 0.12rem; padding-bottom: 0.22rem;}
.m-contractDetails > .txt.photo img{display: inline-block; height: 2.22rem; width: 2.16rem; margin: auto 0.14rem; margin-top: 0.1rem; border: 0.01rem solid #dbdbdb; box-sizing: border-box;}

/*上传图片按钮*/
.m-bottom .btn{position: relative; font-size: 0.3rem;}
.m-bottom .btn input{position: absolute; width: 100%; height: 100%; box-sizing: border-box; left: 0; top: 0; z-index: 2; background-color: red; opacity: 0;}
</style>
