<template>
    <div>
        <!-- 日报详情 -->
        <div class="m-myDailyDetails">
            <div class="part">
                <span class="black">今日工作：</span><br>
                <pre>{{today_desc}}</pre>
            </div>
            <div class="part">
                <span class="black">明日工作：</span><br>
                <pre>{{tomorrow_desc}}</pre>
            </div>
            <div class="part">
                <span class="black">其他事项：</span><br>
                <pre>{{comment_desc}}</pre>
            </div>
        </div>
        <!-- 日报详情 end-->
    </div>
</template>

<script>
var qs = require('qs');

export default {
  name: 'dailyDetalis',
  data () {
    return {
        daId:this.$route.params.daId,
        today_desc:"",
        tomorrow_desc:"",
        comment_desc:""
    }
  },
  created(){
      this.getData();
  },
  methods:{
      getData(){
        var vm = this;
        this.axios.post(this.$store.state.httpUrl.daily.dailyDetalis,qs.stringify({
            daId:vm.daId
        }))
        .then(function (res) {
            if(res.data.code == 1){
                const _data = res.data.retval.data[0];
                //console.log(_data);
                vm.today_desc = _data.today_desc
                vm.tomorrow_desc = _data.tomorrow_desc
                vm.comment_desc = _data.comment_desc
            }
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
