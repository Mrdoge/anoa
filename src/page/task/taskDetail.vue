<template>
    <div>
		<div class="m-normalList" style="margin-top:0.28rem;">
			<div class="left">标题</div>
			<div class="right">
				{{data.title}}
			</div>
		</div>
        <div class="m-listRow" style="border-bottom:none; margin-top:0;">
			<div class="title">内容</div>
			<div class="ct">
                <div class="discri">{{data.content}}</div>    
            </div>
        </div>
        <div class="m-normalList">
			<div class="left">发起时间</div>
			<div class="right">
				{{data.created_time}}
			</div>
		</div>
        <div class="m-normalList">
			<div class="left">完成时间</div>
			<div class="right">
				{{data.e_time}}
			</div>
		</div>
        <div class="m-normalList">
			<div class="left">发起人</div>
			<div class="right">
				{{data.nickname}}
			</div>
		</div>
        <div class="m-normalList">
			<div class="left">负责人</div>
			<div class="right">
				{{data.endNickame}}
			</div>
		</div>
        <div class="m-normalList">
			<div class="left">状态</div>
			<div class="right">
				<template v-if="data.status == 1">
					<span class="m-label">进行中</span>
				</template>
				<template v-if="data.status == 2">
					<span class="m-label s-green">已结束</span>
				</template>
			</div>
		</div>

		<!--问题结束才有追踪人-->
        <template v-if="data.end_content">
            <div class="m-normalTitleBar">任务追踪</div>
            <!-- <div class="m-normalList">
                <div class="left">追踪人</div>
                <div class="right">
                    {{data.endNickame}}
                </div>
            </div> -->
            <div class="m-listRow g-mt0">
                <div class="title">反馈图片</div>
                <div class="ct">
                    <div class="imgList">
                        <div class="wrap" v-for="items in data.endTaskImgs" :key="items">
                            <img :src="host + '/' + items" :key="items" preview="1">
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-listRow g-mt0 s-noborder">
                <div class="title">任务反馈</div>
                <div class="ct">
                    <div class="discri">{{data.end_content}}</div>
                </div>
            </div>
        </template>
        <!--问题结束才有追踪人 end-->

		<!--底边-->
        <div class="m-forbotNav" style="height: 1.6rem;" v-if="!data.end_content"></div>
        <div class="m-bottom" v-if="!data.end_content">
            <div class="block ">
                <a href="javascript:;" class="btn" @click="toggleShow">结束</a>
            </div>
        </div>
        <!--底边 end-->


        <!--结束弹窗-->
        <transition name="overModal" enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
            <div class="m-FU_modal s-overModal" v-if="this.$store.state.isShadeShow">
                <div class="m-listRow s-noBorder g-mt0">
                    <div class="title">反馈图片</div>
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

                <div class="m-listRow s-noBorder g-mt0">
                    <div class="title">任务反馈</div>
                    <div class="ct">
                        <textarea placeholder="请输入任务反馈" v-model="form.endContent" class="s-2"></textarea>
                    </div>
                </div>

                <div class="bot">
                    <div class="btn u-FU_btn" @click="overSubmit" :class="{'z-loading':loading.form}">
                        确定<span class="p-loading"></span>
                    </div>
                </div>

            </div>
        </transition>
        <!--结束弹窗end-->

    </div>
</template>

<script>
var qs = require('qs');
export default {
    name: 'myAffairDetail',
    data () {
        return {
			temp:this.$store.state.httpUrl.temp,
			host:this.$store.state.httpUrl.HOST,
			tId:this.$route.params.tId,
			data:{},
			form:{
                imgUrls:[],
                endContent:"",
            },
            loading:{
                form:false,
                img:false
            }
        }
	},
	created(){
		var vm  = this;
		vm.getData();
	},
	methods:{
		getData(){
			var vm = this;
			var id = vm.$route.params.tId;
			var url = vm.$store.state.httpUrl.task.mytaskDetail + '?id=' + id;
			vm.axios.post(url)
			.then((res) => {
				var data = res.data
				//console.log(data);
				if (data.code >= 1) {
					var _data = res.data.retval.data;
                    for(let i in _data){
                        vm.$set(vm.data,i,_data[i])
                    }
				}else{
					vm.F['Hint'](vm,{
						ct:data.msg
					})
                }
                
				setTimeout(() => {
                    vm.$previewRefresh()
                },400);
			})
		},
		toggleShow(){   //显示弹窗
            this.$store.state.isShadeShow = !this.$store.state.isShadeShow
		},
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
        overSubmit(){   //结束任务提交
            var vm  = this;
            if (vm.loading.form) {
                return false
            }
            var postData = {
                tId:vm.tId,
                endContent:vm.form.endContent,
                imgUrls:vm.form.imgUrls,
            }

            // if (!postData.imgUrls.length) {
            //     vm.F['Hint'](vm,{
            //         ct:"请至少上传一张图片"
            //     })
            //     return false
            // }

            if (!postData.endContent) {
                vm.F['Hint'](vm,{
                    ct:"请输入反馈描述"
                })
                return false
            }
            vm.loading.form = true
            this.axios.post(this.$store.state.httpUrl.task.endTask,qs.stringify(postData))
            .then(function (res) {
                //console.log(res.data);
                if (res.data.code == 1) {
                    vm.F['Hint'](vm,{
                        ct:res.data.retval.okTip,
                        type:1
                    })
                    vm.$store.state.isShadeShow = false
                    setTimeout(() => {
                        //vm.$router.push('/myIndex/myTaskList')
                        vm.$router.push('/task/taskIndex')
                    },1500)

                }else{
                    vm.F['Hint'](vm,{
                        ct:res.data.msg
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
/*结束弹窗*/
.m-FU_modal.s-overModal{width: 5.16rem; margin-left: -2.58rem; border-radius: 0;}
.m-FU_modal textarea{box-sizing: border-box; padding: 0.1rem; border: 0.01rem solid #e4e4e5; height: 2.8rem; min-height: auto;}
.m-FU_modal .bot{text-align: center; padding: 0.24rem 0;}
.m-FU_modal .bot .btn{display: inline-block; width: 1.6rem;}
</style>
