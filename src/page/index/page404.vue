<template>
    <div>
        <div class="m-page404">
            <img :src="temp + '/' + 'wap/public/img/404.jpg'" alt="">
            <div class="txt">Sorry</div>
            <div class="ct">
                页面报错啦！<br />
                你访问的页面已离开地球
            </div>
            <a href="javascript:;" @click="goback" class="btn">返回上一页</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'page404',
    data () {
        return {
            temp:this.$store.state.httpUrl.temp
        }
    },
    created(){
        document.body.style.backgroundColor = "#fff"
    },
    destroyed(){
        document.body.style.backgroundColor = ""
    },
    methods:{
        goback(){
            window.history.go(-1)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-page404{position: relative; height: 100%; text-align: center; padding-top: 0.4rem;}
.m-page404 img{display: inline-block; width: 4.86rem;}
.m-page404 .txt{font-size: 0.7rem;}
.m-page404 .ct{font-size: 0.42rem; line-height: 1.6; margin-top: 0.56rem;}
.m-page404 .btn{display: block; width: 3.76rem; height: 0.94rem; line-height: 0.94rem; color: #fff; background-color: #f26e56;  border-radius: 0.4rem; margin: 0.9rem auto 0.1rem; font-size: 0.3rem;}
</style>
