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
    </div>
</template>

<script>
export default {
	name: 'ProjectList',
	data () {
		return {
            temp:this.$store.state.httpUrl.temp, //相对路径地址
            host:this.$store.state.httpUrl.HOST,
            data:[]
		}
	},
    created(){
        this.getData();
    },
    methods:{
        getData(){
            var vm = this;
            this.ajax.post(this.$store.state.httpUrl.project.projectList)
            .then(function (res) {
                //console.log(res.data);
                var data = res;
                if (data.code == 1) {
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
