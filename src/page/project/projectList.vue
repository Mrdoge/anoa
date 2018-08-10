<template>
    <div>
        <div class="m-listImg">
            <router-link :to="'/project/projectDetail/' + items.pro_id" class="list f-clear" v-for="items in data" :key="items.pro_id">
                <img :src="host + '/' + items.img_url" class="cover">
                <div class="right">
                    <div class="title f-txtof_2">{{items.title}}</div>
                    <div class="address f-txtof">{{items.address}}</div>
                </div>
            </router-link>
        </div>
        <loading :loadingShow="loadingData.loadingShow" :botLineShow="loadingData.botLineShow" :noDataShow="loadingData.noDataShow"></loading>
    </div>
</template>

<script>
import loading from '@/components/loading'
export default {
	name: 'ProjectList',
	data () {
		return {
            temp:this.$store.state.httpUrl.temp, //相对路径地址
            host:this.$store.state.httpUrl.HOST,
            data:[],
            loadingData:{
                loadingShow:false,  //是否显示加载效果
                botLineShow:false,   //是否显示到达底部,
                noDataShow:false     //是否显示没有数据
            },
		}
	},
    created(){
        this.getData();
    },
    components:{
        loading
    },
    methods:{
        getData(){
            var vm = this;
            if (vm.loadingData.loadingShow || vm.loadingData.botLineShow || vm.loadingData.noDataShow) {
                return false
            }
            this.ajax.post(this.$store.state.httpUrl.project.projectList)
            .then(function (res) {
                //console.log(res.data);
                var data = res;
                if (data.code == 1) {
                    if (!data.retval.list.length) {
                        vm.data.splice(0,vm.data.length)
                        vm.loadingData.noDataShow = true;
                        return false
                    }
                    for (let i = 0; i < data.retval.list.length; i++) {
                        vm.data.push(data.retval.list[i])
                    }
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
