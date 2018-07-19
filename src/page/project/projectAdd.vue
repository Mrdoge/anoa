<template>
    <div>
        <!--记录图片-->
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
        <!--记录图片 end-->

        <div class="m-listRow">
          <div class="title">记录内容</div>
          <div class="ct">
            <textarea placeholder="请输入记录内容详细" v-model="form.content"></textarea>
          </div>
        </div>

        <div style="height:1.8rem;"></div>
        <div class="m-bottom">
            <div class="block">
                <!-- <router-link to="/project/projectAdd" class="btn" @click="submit">提交</router-link> -->
                <a href="javascript:;" class="btn u-FU_btn" @click="submit" :class="{'z-loading':loading.form}">
                  提交<span class="p-loading"></span>
                </a>
            </div>
        </div>

    </div>
</template>

<script>
var qs = require('qs');
export default {
  name: 'ProjectAdd',
  data () {
    return {
      temp:this.$store.state.httpUrl.temp,
      host:this.$store.state.httpUrl.HOST,
      form:{  //还有一个pro_id
        content:"",
        imgUrls:[]
      },
      loading:{
          form:false,
          //submit:false,
          img:false
      }
    }
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
    delImg(index){	//删除图片
        var vm = this;
        vm.form.imgUrls.splice(index,1)
    },
    submit(){
      var vm = this;
      var postData = {
        proId:vm.$route.params.proId,
        content:vm.form.content,
        imgUrls:vm.form.imgUrls
      }
      if(vm.loading.form){
          return false
      }
    //   if (!postData.imgUrls.length) {
    //       vm.F['Hint'](vm,{
    //           ct:"请至少上传一张图片"
    //       })
    //       return false
    //   }
      if (!postData.content) {
          vm.F['Hint'](vm,{
              ct:"请输入记录内容"
          })
          return false
      }
      //console.log(postData);
      //return false
      vm.loading.form = true
      vm.axios.post(this.$store.state.httpUrl.project.addProjectRecord,qs.stringify(postData))
      .then(function (res) {
          //console.log(res.data);
          if (res.data.code == 1) {
            vm.F['Hint'](vm,{
              ct:res.data.retval.okTip,
              type:1
            })

            var url = '/project/projectDetail/' + vm.$route.params.proId
            vm.$router.push(url);
          }else{
            vm.F['Hint'](vm,{
              ct:data.msg
            })
          }
          vm.loading.form = false
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

</style>
