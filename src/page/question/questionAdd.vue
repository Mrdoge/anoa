<template>
    <div>
		<!--问题标题-->
		<div class="m-listRow">
			<div class="title">问题标题</div>
			<div class="ct">
				<input type="text" placeholder="请输入问题标题" v-model="form.title">
			</div>
		</div>
		<!--问题标题 end-->

		<!--问题内容-->
		<div class="m-listRow">
			<div class="title">问题内容</div>
			<div class="ct">
				<textarea placeholder="请输入问题内容" v-model="form.content" style="height:1.1rem; min-height:auto;"></textarea>
			</div>
        </div>
		<!--问题内容 end-->

        <!--问题图片-->
        <div class="m-listRow">
			<div class="title">记录图片</div>
			<div class="ct">
				<div class="imgList">
					<div class="wrap" v-for="(items,index) in form.imgUrls" :key="items">
						<img :src="host + '/' + items" :key="items">
						<span class="close" @click="delImg(index)">×</span>
					</div>
					<div class="wrap s-add" :class="{'z-loading':loading.img}">
						<input type="file" @change="imgUpload($event)">
						<span class="add">+</span>
						<img class="loading" :src="temp + '/wap/public/img/loading.gif'" >
					</div>
				</div>
			</div>
        </div>
        <!--问题图片 end-->

		<!-- <div class="m-normalList" style="margin-top:0.28rem;">
			<div class="left">发起时间</div>
			<div class="right">
				<a href="javascript:;">
					选择时间<i class="icon icon-xiangyou"></i>
				</a>
			</div>
		</div> -->
		<div class="m-normalList" style="margin-top:0.28rem;" @click="projectPicker.visible = true">
			<div class="left">所属项目</div>
			<div class="right">
				<a href="javascript:;" v-show="!projectPicker.nowSelect">
					选择项目<i class="icon icon-xiangyou"></i>
				</a>
				<a href="javascript:;" v-show="projectPicker.nowSelect">
					{{projectPicker.nowSelect}}<i class="icon icon-xiangyou"></i>
				</a>
			</div>
		</div>

        <!-- 底边 -->
        <div class="m-forbotNav" style="height: 1.6rem;"></div>
        <div class="m-bottom">
            <div class="block ">
                <a href="javascript:;" class="btn u-FU_btn" :class="{'z-loading':loading.form}" @click="submit">
					发布<span class="p-loading"></span>
				</a>
            </div>
        </div>
        <!-- 底边 end-->


		<!--项目选择-->
		<picker class="m-picker" v-model="projectPicker.visible" :data-items="projectPicker.items" @change="onValuesChange" name="projectPicker">
			<div class="top-content btns" slot="top-content">
				<a href="javascript:;" class="btn" @click="projectPicker.visible = false">取消</a>
				<a href="javascript:;" class="btn s-r" @click="projectPicker.visible = false">确定</a>
			</div>
		</picker>

    </div>
</template>

<script>
import picker from 'vue-3d-picker';
var qs = require('qs');

export default {
  name: 'QuestionAdd',
  data () {
    return {
	  temp:this.$store.state.httpUrl.temp,
	  host:this.$store.state.httpUrl.HOST,
	  form:{
		  title:"",
		  content:"",
		  proId:"",
		  imgUrls:[],
	  },
	  projectList:[],	//项目列表
	  loading:{
		  img:false,
		  form:false
	  },
	  projectPicker:{
		visible: false,
		items: [
			{
				values: []
			}
		],
		nowSelect:""
	  }

    }
  },
  components:{
	  picker
  },
  created(){
	  this.editProjectList();

	  this.getProjectList();	//获取项目列表
  },
  methods:{
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
		  if (data.code > 0) {
				vm.form.imgUrls.push(data.retval.imgUrl)
		  }else{
			  vm.F['Hint'](vm,{
				  ct:data.msg
			  })
		  }

		  vm.loading.img = false
	  },
	  errCall(err){
		  var vm = this;
		  vm.loading.img = false;
		  vm.F['Hint'](vm,{
			  ct:"连接超时"
		  })
	  },
	  delImg(index){	//删除图片
		var vm = this;
		vm.form.imgUrls.splice(index,1)
	  },
	  onValuesChange(result1) {
		  //console.log(result1)
		  var vm  = this;
		  for (let i = 0; i < vm.projectList.length; i++) {
			  if (vm.projectList[i].title == result1) {
				  vm.form.proId = vm.projectList[i].pro_id;
				  break
			  }
		  }
		  vm.projectPicker.nowSelect = result1
	  },
	  editProjectList(){	//修改picker里面的value
		var vm = this;
		//先清空
		vm.projectPicker.items[0].values.splice(0,vm.projectPicker.items[0].values.length)
		for (let i = 0; i < vm.projectList.length; i++) {
			vm.projectPicker.items[0].values.push(vm.projectList[i].title)
		}
	  },
	  submit(){	//发布问题数据提交
		  var vm = this;
		  if (vm.loading.form) {
			  return false
		  }
		var postData = {
			title:vm.form.title,
			content:vm.form.content,
			proId:vm.form.proId,
			imgUrls:vm.form.imgUrls
		}
		
		//数据校验
		var verifyData = [
			{
				type:"noNull",
				val:postData.title,
				tips:"标题不能为空"
			},
			{
				type:"noNull",
				val:postData.content,
				tips:"请输入内容"
			},
			{
				type:"noNull",
				val:postData.proId,
				tips:"请选择所属项目"
			}
		]
		var verify = vm.F['FormComfirm'](verifyData)
		if (verify.err) {
			vm.F['Hint'](vm,{
				ct:verify.ct
			})
			return false
		}

		//图片校验
		if (!postData.imgUrls.length) {
			vm.F['Hint'](vm,{
				ct:"请至少上传一张图片"
			})
			return false
		}
		//console.log(postData);
		//return false
		vm.loading.form = true
		this.axios.post(this.$store.state.httpUrl.qst.addQuestion,qs.stringify(postData))
		.then(function (res) {
			if (res.data.code == 1) {
				vm.F['Hint'](vm,{
					ct:res.data.retval.okTip,
					type:1
				})
				setTimeout(() => {
					vm.$router.push('/question/questionList');
				},1500)
			}else{
				vm.F['Hint'](vm,{
					ct:res.data.msg
				})
			}
			vm.loading.form = false
		})
		.catch(function (err) {
			console.log(err);
		});

	  },
	  getProjectList(){
		var vm  = this;
		this.axios.post(this.$store.state.httpUrl.project.projectList)
		.then(function (res) {
			if (res.data.code == 1) {
				//先清除
				vm.projectList.splice(0,vm.projectList.length)
				for (let i = 0; i < res.data.retval.list.length; i++) {
					vm.projectList.push(res.data.retval.list[i])
				}
			}else{
				F['Hint'](vm,{
					ct:res.data.msg
				})
			}
			//vm.loading.form = false
		})
		.catch(function (err) {
			console.log(err);
		});
	  }
  },
  watch:{
	  'projectList'(){
		  this.editProjectList();
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
