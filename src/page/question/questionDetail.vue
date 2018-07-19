<template>
    <div>
        <div class="m-normalTitleBar">问题信息</div>
        <!--问题标题-->
		<div class="m-listRow g-mt0">
			<div class="title">问题标题</div>
			<div class="ct">
				<div class="discri">{{data.title}}</div>
			</div>
        </div>
		<!--问题标题 end-->

		<!--问题内容-->
		<div class="m-listRow">
			<div class="title">问题内容</div>
			<div class="ct">
				<div class="discri">{{data.content}}</div>
			</div>
        </div>
		<!--问题内容 end-->

        <!--问题图片-->
        <div class="m-listRow">
			<div class="title">问题图片</div>
			<div class="ct">
				<div class="imgList">
					<div class="wrap" v-for="items in data.qesImgs" :key="items">
						<img :src="host + '/' +items" :key="items" preview="0">
					</div>
				</div>
			</div>
        </div>
        <!--问题图片 end-->

		<div class="m-normalList" style="margin-top:0.28rem;">
			<div class="left">发起人</div>
			<div class="right">
				{{data.nickname}}
			</div>
		</div>

		<div class="m-normalList">
			<div class="left">发起时间</div>
			<div class="right">
				{{data.created_time}}
			</div>
		</div>
		<div class="m-normalList">
			<div class="left">所属项目</div>
			<div class="right">
				{{data.ProjectTitle}}
			</div>
		</div>

        <!--问题结束才有追踪人-->
        <template v-if="data.end_content">
            <div class="m-normalTitleBar">问题追踪</div>
            <div class="m-normalList">
                <div class="left">追踪人</div>
                <div class="right">
                    {{data.endUserName}}
                </div>
            </div>
            <div class="m-listRow g-mt0">
                <div class="title">追踪图片</div>
                <div class="ct">
                    <div class="imgList">
                        <div class="wrap" v-for="items in data.endQesImgs" :key="items">
                            <img :src="host + '/' + items" :key="items" preview="1">
                        </div>
                    </div>
                </div>
            </div>
            <div class="m-listRow g-mt0 s-noborder">
                <div class="title">追踪描述</div>
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
                    <div class="title">记录图片</div>
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
                    <div class="title">反馈描述</div>
                    <div class="ct">
                        <textarea placeholder="请输入反馈描述" v-model="form.endContent" class="s-2"></textarea>
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
    name: 'QuestionDetail',
    data () {
        return {
            temp:this.$store.state.httpUrl.temp,
            host:this.$store.state.httpUrl.HOST,
            qId:this.$route.params.qId,
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
        this.getData();
    },
    destroyed(){
        this.$store.state.isShadeShow = false
    },
    methods:{
        getData(){
            var vm = this;
            this.axios.post(this.$store.state.httpUrl.qst.questionDetail,qs.stringify({
                qId:vm.qId,
                //page_size:5
            }))
            .then(function (res) {
                //console.log(res.data);
                if (res.data.code == 1) {
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
            .catch(function (err) {
                console.log(err);
            });
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
        overSubmit(){   //结束问题提交
            var vm  = this;
            if (vm.loading.form) {
                return false
            }
            var postData = {
                qId:vm.qId,
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
            this.axios.post(this.$store.state.httpUrl.qst.endQuestion,qs.stringify(postData))
            .then(function (res) {
                //console.log(res.data);
                if (res.data.code == 1) {
                    vm.F['Hint'](vm,{
                        ct:res.data.retval.okTip,
                        type:1
                    })
                    vm.$store.state.isShadeShow = false
                    setTimeout(() => {
                        vm.$router.push('/question/questionList')
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
