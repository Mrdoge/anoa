<template>
    <div>
        <div class="m-channel">
            <router-link :to="'/project/projectbaseInfo/'  + pro_id">
                <i class="icon-caozuorizhi icon s-green"></i><br/>
                基本信息
            </router-link>
            <router-link :to="'/project/projectFile/' + pro_id">
                <i class="icon-wenjian icon s-pink"></i><br/>
                文件管理
            </router-link>
            <router-link :to="'/project/projectDetail/' + pro_id">
                <i class="icon-project-o icon s-blue"></i><br/>
                项目记录
            </router-link>
            <a href="javascript:;" @click="noOpen">
                <i class="icon-jindu icon s-gray"></i><br/>
                项目进度
            </a>
            <a href="javascript:;" @click="noOpen">
                <i class="icon-anquan icon s-gray"></i><br/>
                安全管理
            </a>
            <a href="javascript:;" @click="noOpen">
                <i class="icon-zhiliang icon s-gray"></i><br/>
                质量管理
            </a>
            <!-- <router-link :to="'/sign/signindex'">
                <i class="icon-daqiajilu icon s-gray"></i><br/>
                项目进度
            </router-link>
            <router-link :to="'/sign/signindex'">
                <i class="icon-daqiajilu icon s-gray"></i><br/>
                安全管理
            </router-link>
            <router-link :to="'/sign/signindex'">
                <i class="icon-daqiajilu icon s-gray"></i><br/>
                质量管理
            </router-link> -->
        </div>
    </div>
</template>

<script>
var qs = require('qs');
export default {
    name: 'projectClassify',
    data () {
        return {
            pro_id:this.$route.params.pro_id
        }
    },
    created(){
        var vm = this;
        vm.titleChange()
    },
    methods:{
        titleChange(){  //每次进来改变标题
            var vm = this;
            var title = vm.$route.params.title
            this.$store.state.topBarTitle = title
        },
        noOpen(){
            var vm = this;
            vm.F['Hint'](vm,{
                ct:"敬请期待"
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-channel{position: relative; display: flex; display: -webkit-flex; flex-wrap: wrap; border-top: 0.01rem solid #e1e1e1; border-top: 0.1rem solid #ececeb; border-bottom: 0.1rem solid #ececeb;}
.m-channel > a{flex: 0 0 33.33%; -webkit-flex: 0 0 33.33%; text-align: center; color: #686868; font-size: 0.28rem; line-height: 1.8; padding: 0.4rem 0; box-sizing: border-box; border-bottom: 0.01rem solid #e1e1e1; border-right: 0.01rem solid #e1e1e1; background-color: #fff;}
.m-channel > a:nth-child(3){border-right: none;}
.m-channel > a:nth-child(6){border-right: none;}
.m-channel > a:nth-child(9){border-right: none;}
.m-channel > a > i{font-size: 0.68rem;color:#55b6fe; display: inline-block; width: 0.8rem; height: 0.8rem; text-align: center; line-height: 0.8rem; background-color: a3a3a3; color: #fff; border-radius: 100%; font-size: 0.5rem;}
.m-channel > a > i.s-pink{background-color: #fe5585;}
.m-channel > a > i.s-green{background-color:#92c17d;}
.m-channel > a > i.s-blue{background-color: #5585fe;}
.m-channel > a > i.s-gray{background-color: #a3a3a3;}
</style>
