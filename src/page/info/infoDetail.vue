<template>
    <div>
        <div class="m-infoDetail">
            <h2 class="title">{{title}}</h2>
            <div class="time">{{unixFormat(date)}}</div>
            <pre class="ct">
{{content}}
            </pre>
        </div>
    </div>
</template>

<script>
export default {
    name: 'infoDetail',
    data () {
        return {
            title:"",
            date:"",
            content:""
        }
    },
    created(){
        var vm = this;
        //console.log(vm)
        vm.getData();
    },
    methods:{
        getData(){
            var vm = this;
            var id = this.$route.params.infoId
            var url = vm.$store.state.httpUrl.info.infoDetail + '?id=' + id
            vm.ajax.post(url)
            .then((res) => {
                var data = res;
                //console.log(data)
                if (data.code >= 1) {
                    var _data = data.retval.data;
                    vm.title = _data.content.title
                    vm.content = _data.content.content
                    vm.date = _data.created_time
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
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
.m-infoDetail{margin: 0.34rem; background-color: #fff; padding: 0.4rem; border: 0.01rem solid #e4e4e5;}
.m-infoDetail > .title{font-size: 0.3rem; color: #3a3a3a; font-weight: bold; display: block;}
.m-infoDetail > .time{font-size: 0.24rem; color: #828282; padding: 0.2rem 0; border-bottom: 0.01rem solid #e9e9e9;}
.m-infoDetail > .ct{min-height: 10rem; line-height: 1.4; font-size: 0.26rem; color: #3b3b3b; word-wrap:break-word; word-break:break-all; white-space:pre-line; padding-top: 0.1rem;}
</style>
