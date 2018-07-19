<template>
    <div>
		<div class="m-normalTitleBar">合同编号</div>
		<div class="m-normalList">{{data.contract_number?data.contract_number:'-'}}</div>

		<div class="m-normalTitleBar">合同名称</div>
		<div class="m-normalList">{{data.contract_name?data.contract_name:'-'}}</div>

		<div class="m-normalTitleBar">项目</div>
		<div class="m-normalList">{{data.title?data.title:'-'}}</div>

		<div class="m-normalTitleBar">签订时间</div>
		<div class="m-normalList">{{data.sign_time?unixFormat(data.sign_time):'-'}}</div>

		<div class="m-normalTitleBar">甲方单位</div>
		<div class="m-normalList">{{data.owner?data.owner:'-'}}</div>
		<div class="m-normalTitleBar">甲方合同负责人</div>
		<div class="m-normalList">{{data.owner_man?data.owner_man:'-'}}</div>
		<div class="m-normalTitleBar">甲方合同负责人联系方式</div>
		<div class="m-normalList">{{data.owner_man_tel?data.owner_man_tel:'-'}}</div>

		<div class="m-normalTitleBar">乙方单位</div>
		<div class="m-normalList">{{data.second?data.second:'-'}}</div>
		<div class="m-normalTitleBar">乙方合同负责人</div>
		<div class="m-normalList">{{data.second_man?data.second_man:'-'}}</div>
		<div class="m-normalTitleBar">乙方合同负责人联系方式</div>
		<div class="m-normalList">{{data.second_man_tel?data.second_man_tel:'-'}}</div>

		<div class="m-normalTitleBar">开始日期</div>
		<div class="m-normalList">{{data.s_time?unixFormat(data.s_time):'-'}}</div>
		<div class="m-normalTitleBar">结束日期</div>
		<div class="m-normalList">{{data.e_time?unixFormat(data.e_time):'-'}}</div>

		<div class="m-normalTitleBar">总工期天数</div>
		<div class="m-normalList">{{data.total_periods?data.total_periods:'-'}}</div>
		<div class="m-normalTitleBar">合同总金额</div>
		<div class="m-normalList">{{data.total_price?data.total_price:'-'}}</div>
		<div class="m-normalTitleBar">合同预付款</div>
		<div class="m-normalList">{{data.prepay?data.prepay:'-'}}</div>
		<div class="m-normalTitleBar">合同尾款</div>
		<div class="m-normalList">{{data.final?data.final:'-'}}</div>
		
		
		<div class="m-normalTitleBar">发票类型</div>
		<div class="m-normalList">{{data.invoice_type?invoice_type[+data.invoice_type].name:'-'}}</div>
		<div class="m-normalTitleBar">发票税率</div>
		<div class="m-normalList">{{data.invoice_per?data.invoice_per:'-'}}</div>

	
		<div class="m-normalTitleBar">法人代表</div>
		<div class="m-normalList">{{data.representative?data.representative:'-'}}</div>

		<div class="m-normalTitleBar">联系电话</div>
		<div class="m-normalList">{{data.phone_mob?data.phone_mob:'-'}}</div>
		<div class="m-normalTitleBar">邮箱</div>
		<div class="m-normalList">{{data.email?data.email:'-'}}</div>

		<div class="m-normalTitleBar">对方开户银行</div>
		<div class="m-normalList">{{data.deposit_bank?data.deposit_bank:'-'}}</div>
		<div class="m-normalTitleBar">对方账户名称</div>
		<div class="m-normalList">{{data.corporate_name?data.corporate_name:'-'}}</div>
		<div class="m-normalTitleBar">对方银行账号</div>
		<div class="m-normalList">{{data.corporate?data.corporate:'-'}}</div>

		<div class="m-normalTitleBar">合同照片</div>
		<div class="m-listRow g-mt0">
			<div class="ct">
				<div class="imgList">
					<div class="wrap" v-for="items in data.img_url" :key="items" v-if="data.img_url.length">
						<img :src="host + '/' + items" alt="" preview="0">
					</div>
				</div>
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
		data:{},
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
		]
    }
  },
  created(){
    var vm = this;
    vm.getData()
  },
  methods:{
    getData(){
		var vm = this;
		var cId = vm.$route.params.cId
		var url = vm.$store.state.httpUrl.contract.ContractDetails + '?id=' + cId;

		vm.axios.post(url)
		.then((res) => {
		//console.log(res.data)
		if (res.data.code >= 1) {
			var _data = res.data.retval.contractDetailsData;
			for(var i in _data){
				vm.$set(vm.data,i,_data[i])
			}

		}else{
			vm.F['Hint'](vm,{
				ct:res.data.msg
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
</style>
