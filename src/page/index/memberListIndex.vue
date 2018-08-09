<template>
    <div>
        <div class="m-memberListIndex">
            <div class="wrap s-show" v-for="(items,index) in memberData" :key="index">
                <div class="title">{{items.sName}}（{{items.sUserList.length}}）</div>
                <div class="ct">
                    <router-link :to="'/member/memberDetail/' + items2.user_id" class="list" v-for="(items2,index2) in items.sUserList" :key="index2">
                        <img v-lazy="host + '/' + items2.avatar" class="avatar">
                        <div class="right">{{items2.nickname}}</div>
                    </router-link>
                </div>
            </div>
        </div>
        <loading :loadingShow="loadingData.loadingShow" :botLineShow="false" :noDataShow="false"></loading>
    </div>
</template>

<script>
import loading from '@/components/loading'
export default {
  name: 'MemberListIndex',
  data () {
    return {
        temp:this.$store.state.httpUrl.temp,
        host:this.$store.state.httpUrl.HOST,
        memberData:[],
        loadingData:{
            loadingShow:false,  //是否显示加载效果
            //botLineShow:false,   //是否显示到达底部,
            //noDataShow:false     //是否显示没有数据
        },
    }
  },
  components:{
      loading
  },
  created(){
        var vm = this;
        document.body.style.backgroundColor = "#fff";

        //解决闪屏
        setTimeout(() => {
            vm.getUserOrganization()
        },500);
  },
  destroyed(){
        document.body.style.backgroundColor = ""
  },
  methods:{
        getUserOrganization(){
            var vm = this;

            vm.loadingData.loadingShow = true
            vm.ajax.post(vm.$store.state.httpUrl.member.getUserOrganization)
            .then(function (res) {
                vm.loadingData.loadingShow = false;
				var data = res
                if (data.code == 1) {
                    for (let i = 0; i < data.retval.data.length; i++) {
                        data.retval.data[i].isShow = true   //  默认全部展开
                        vm.memberData.push(data.retval.data[i])
					}
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
                    })
                }
            })
            .catch(function (err) {
                console.log(err);
            });
		},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
