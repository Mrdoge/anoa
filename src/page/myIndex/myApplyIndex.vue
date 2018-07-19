<template>
	<div>
		<div class="m-myApply">
			<router-link :to="items.link + '/' + index" class="wrap" v-for="(items,index) in list" :key="items.txt">
				<div class="ct">
					<i :class="items.class"></i>
					<div class="txt">{{items.txt}}</div>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MyApplyList',
	data () {
	return {
		list:this.$store.state.myApplyIndex
	}
	},
	created(){
		document.body.style.backgroundColor = "#fff";
	},
	destroyed(){
		document.body.style.backgroundColor = "";
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-myApply{position: relative; display: flex; flex-wrap: wrap; border-top: 0.1rem solid #ececeb;}
.m-myApply > .wrap{width: 33.33%; text-align: center; height: 2.26rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: center; background-color: #fff; border-bottom: 0.01rem solid #e1e1e1; border-left: 0.01rem solid #e1e1e1; box-sizing: border-box;}
.m-myApply > .wrap:nth-child(1),.m-myApply > .wrap:nth-child(4),.m-myApply > .wrap:nth-child(7),.m-myApply > .wrap:nth-child(10){border-left: none;}
.m-myApply > .wrap .ct .txt{display: block; font-size: 0.28rem; color: #787878;}
.m-myApply > .wrap .ct i{display: inline-block; width: 0.84rem; height: 0.84rem; text-align: center; line-height: 0.84rem; color: #fff; background-color: #92c17d; border-radius: 50%; font-size: 0.44rem; margin-bottom: 0.2rem;}
.m-myApply > .wrap .ct i.s-pink{background-color: #fe5585;}
.m-myApply > .wrap .ct i.s-blue{background-color: #55b6fe;}
.m-myApply > .wrap .ct i.s-yellow{background-color: #fec055;}
.m-myApply > .wrap .ct i.s-green{background-color: #7dc1bb;}
.m-myApply > .wrap .ct i.s-purpose{background-color: #a47dc1;}
</style>
