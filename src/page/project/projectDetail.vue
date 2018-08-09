<template>
    <div>
        <div class="m-listTitle">项目信息</div>
        <!--项目名-->
        <div class="m-list f-clear">
			<div class="left">项目名</div>
			<div class="right">
				<div class="f-txtof">{{data.title}}</div>
			</div>
        </div>
        <!--项目名-->

        <!--负责人-->
        <div class="m-list f-clear">
			<div class="left">负责人</div>
			<div class="right">
				<div class="f-txtof">{{data.userName}}</div>
			</div>
        </div>
        <!--负责人-->

        <!--项目地址-->
        <div class="m-list f-clear">
			<div class="left">项目地址</div>
			<div class="right">
				<div class="f-txtof">{{data.address}}</div>
			</div>
        </div>
        <!--项目地址-->

        <div class="m-listTitle">项目记录</div>

        <!--项目记录-->
        <div class="m-projectRecord" v-for="(items,index) in data.recordList" :key="index">
			<div class="time">{{items.nickname}} {{unixFormat(items.prTime)}}</div>
			<div class="ct">
				<div class="title">{{items.content}}</div>
				<div class="ct">
					<img v-for="(items2,index2) in items.imgUrls" :preview="index" :key="index2" v-lazy="host + '/' + items2">
				</div>
			</div>
        </div>
        <!--项目记录 end-->

        <div style="height:1.8rem;"></div>
        <div class="m-bottom">
            <div class="block">
                <router-link :to="'/project/projectAdd/' + pro_id" class="btn">上传记录</router-link>
            </div>
        </div>
    </div>
</template>

<script>
var qs = require('qs');
export default {
	name: 'ProjectDetail',
	data () {
		return {
			temp:this.$store.state.httpUrl.temp,
			host:this.$store.state.httpUrl.HOST,
			pro_id:this.$route.params.pro_id,
			data:{
				title:"",	//项目名
				userName:"",	//负责人
				address:"",	//地址
				recordList:[]	//项目记录
			}
		}
	},
	created(){
    this.getData();
		document.body.style.backgroundColor = "#fff"
	},
	destroyed(){
		document.body.style.backgroundColor = ""
	},
	methods:{
		getData(){
			var vm = this;
			this.ajax.post(this.$store.state.httpUrl.project.projectDetail,{
				proId:vm.pro_id,
			})
			.then(function (res) {
				//console.log(res.data);
				var data = res;
				if (data.code == 1) {
					var _data = data.retval.data
					vm.data.title = _data.title;
					vm.data.userName = _data.userName;
					vm.data.address = _data.address;
					
					for (let i = 0; i < _data.recordList.length; i++) {
						vm.data.recordList.push(_data.recordList[i]);
					}
				}

				setTimeout(() => {
					vm.$previewRefresh()
				},400);
			})
			.catch(function (err) {
				console.log(err);
			});
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
.m-listTitle{position: relative; height: 0.6rem; line-height: 0.6rem; background-color: #f0f4f7; border-bottom: 0.01rem solid #e4e4e5; color: #000; font-size: 0.28rem; padding: 0 0.3rem; font-weight: bold; box-sizing: border-box;}

.m-list{position: relative; height: 0.98rem; line-height: 0.98rem; border-bottom: 0.01rem solid #e9e9e9; padding: 0 0.3rem; background-color: #fff;}
.m-list > .left{float: left; font-size: 0.32rem; color: #000; font-size: 0.26rem;}
.m-list > .right{margin-left: 1.4rem; text-align: right; font-size: 0.28rem; color: #a1a1a1;}


.m-projectRecord{position: relative; padding: 0 0.3rem; text-align: center; margin-top: 0.34rem;}
.m-projectRecord > .time{display: inline-block; background-color: rgba(0, 0, 0, 0.2); color: #fff; height: 0.36rem; line-height: 0.36rem; border-radius: 0.06rem; padding: 0 0.14rem;}
.m-projectRecord > .ct{border: 0.01rem solid #e4e4e5; padding: 0.28rem 0.24rem; background-color: #fff; margin-top: 0.3rem;}
.m-projectRecord > .ct > .title{font-size: 0.3rem; color: #a1a1a1; line-height: 1.4; text-align: left; white-space: pre-line;}
.m-projectRecord > .ct > .ct{text-align: left; font-size: 0; margin-top: 0.24rem;}
.m-projectRecord > .ct > .ct img{display: inline-block; width: 2.04rem; height: 1.64rem; margin-left: 0.06rem; margin-top: 0.06rem;}
</style>
