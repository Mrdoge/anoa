<template>
    <div>
      <div class="m-contractList" v-if="data.length" v-for="(items,index) in data" :key="index">
        <router-link :to="'/contract/contractDetails/' + items.c_id" class="list">
          <div class="txt">
            <span class="title">{{items.contract_number}} {{items.contract_name}}</span><br/>
            {{unixFormat(items.created_time)}}<br/>
            甲方单位：{{items.owner}}<br/>
          </div>
        </router-link>
      </div>
      <loading :loadingShow="loadingData.loadingShow" :botLineShow="loadingData.botLineShow" :noDataShow="loadingData.noDataShow"></loading>
    </div>
</template>

<script>
import loading from '@/components/loading'
export default {
  name: 'contractList',
  data () {
    return {
      data:[],
      loadingData:{
          loadingShow:false,  //是否显示加载效果
          botLineShow:false,   //是否显示到达底部,
          noDataShow:false     //是否显示没有数据
      },
      page:1          //当前页码数
    }
  },
  components:{
    loading
  },
  created(){
    var vm = this;
    document.body.style.backgroundColor = "#fff";

    vm.getData();
  },
  destroyed(){ //离开页面
    document.body.style.backgroundColor = "";

    //退出列表销毁
    window.onscroll = function(){}
  },
  methods:{
		init:function(){
			var vm = this;
			//var base_url = "{base_url()}";
			window.onscroll = function(){
				//throttle(lazyload,100,100)
				if (vm.isShowBotLine) { //如果到达底部就阻值下拉刷新
					return false
				}else{
					//throttle(lazyload,100,100)
					vm.F['throttle'](vm.F['botTrigger'](vm.getData),100,100)
				}
			};
		},
    getData(){
      var vm = this;
      if (vm.loadingData.loadingShow || vm.loadingData.botLineShow) {
          return false
      }
      var url = vm.$store.state.httpUrl.contract.contractList;
      vm.loadingData.loadingShow = true
      vm.axios.post(url)
      .then((res) => {
        //console.log(res.data)
        vm.loadingData.loadingShow = false
        if (res.data.code >= 1) {
          var _data = res.data.retval.data;

          if (!_data) { //如果返回空值
            vm.data.splice(0,vm.data.length); //显示暂无数据
            return false
          }

          var count = +_data.count;
          if (vm.data.length >= count && vm.data.length) { //如果已经大于最大值
            vm.loadingData.botLineShow = true
            return false
          }

          if (_data.list.length) {        //返回的数据不为空
            for (let i = 0; i < _data.list.length; i++) {
              vm.data.push(_data.list[i])
            }
            vm.page++            
          }else{
            vm.loadingData.noDataShow = true
          }

        }else{
          vm.F['Hint'](vm,{
            ct:res.data.msg
          })
        }
      })
    },
    unixFormat(timestamp){
      var vm = this;
      return vm.F['unixFormat'](timestamp)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 合同管理 */
.m-contractList > .list{box-sizing: border-box;display: block;}
.m-contractList > .list > .txt{font-size: 0.22rem;color: #b3b3b3;line-height: 0.4rem;margin-top: 0.22rem; margin-left:0.32rem;border-bottom: 0.01rem solid #e9e9e9;padding-bottom: 0.24rem;box-sizing: border-box;}
.m-contractList > .list > .txt > .title{font-size: 0.26rem;color: #3a3a3a;}
</style>
