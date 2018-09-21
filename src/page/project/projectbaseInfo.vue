<template>
    <div>
        <div class="m-contractContent">
			<div class="list f-clear">
				<div class="left">项目名称：<span></span></div>
				<div class="right">{{data.title?data.title:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">工程地址：<span></span></div>
				<div class="right">{{data.address?data.address:"-"}}</div>
			</div>
            
            <div class="list f-clear">
				<div class="left">建筑面积：<span></span></div>
				<div class="right">{{data.area?data.area:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">建筑结构：<span></span></div>
				<div class="right">{{data.structure?data.structure:"-"}}</div>
			</div>

            <div class="list f-clear">
				<div class="left">施工许可号：<span></span></div>
				<div class="right">{{data.construction_code?data.construction_code:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">规划许可号：<span></span></div>
				<div class="right">{{data.plan_code?data.plan_code:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">安全监督号：<span></span></div>
				<div class="right">{{data.safe_code?data.safe_code:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">质量监督号：<span></span></div>
				<div class="right">{{data.quality_code?data.quality_code:"-"}}</div>
			</div>

            <div class="list f-clear">
				<div class="left">工程造价：<span></span></div>
				<div class="right">{{data.money?data.money:"-"}}</div>
			</div>

            <div class="list f-clear">
				<div class="left">建设单位：<span></span></div>
				<div class="right">{{data.build_unit?data.build_unit:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">建设单位法人：<span></span></div>
				<div class="right">{{data.build_man?data.build_man:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">施工单位：<span></span></div>
				<div class="right">{{data.construction_unit?data.construction_unit:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">施工单位法人：<span></span></div>
				<div class="right">{{data.construction_man?data.construction_man:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">项目经理：<span></span></div>
				<div class="right">{{data.project_manger?data.project_manger:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">监理单位：<span></span></div>
				<div class="right">{{data.control_unit?data.control_unit:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">总监理工程师：<span></span></div>
				<div class="right">{{data.control_engineer?data.control_engineer:"-"}}</div>
			</div>

            <div class="list f-clear">
				<div class="left">设计单位：<span></span></div>
				<div class="right">{{data.design_unit?data.design_unit:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">勘察单位：<span></span></div>
				<div class="right">{{data.survey_unit?data.survey_unit:"-"}}</div>
			</div>
            <div class="list f-clear">
				<div class="left">审图单位：<span></span></div>
				<div class="right">{{data.check_unit?data.check_unit:"-"}}</div>
			</div>
        </div>
    </div>
</template>

<script>
var qs = require('qs');
export default {
    name: 'projectClassify',
    data () {
        return {
            data:{},
            pro_id:this.$route.params.pro_id
        }
    },
    created(){
        var vm = this;

        document.body.style.backgroundColor = "#71a2e1";

        vm.getData();
    },
    destroyed(){
        document.body.style.backgroundColor = "";
    },
    methods:{
        getData(){
            var vm = this;
            this.ajax.post(this.$store.state.httpUrl.project.projectDetail,{
				proId:vm.pro_id,
			})
            .then(function (res) {
                var data = res;
				var _data = data.retval.data;
				for(var i in _data){
					vm.$set(vm.data,i,_data[i])
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
.m-contractContent > .list{margin-top: 0.06rem;}
.m-contractContent > .list > .left{width: 1.84rem; text-align: justify;}
.m-contractContent > .list > .left span{display: inline-block; padding-left: 100%;}
.m-contractContent > .list > .right{margin-left: 1.84rem;}
</style>
