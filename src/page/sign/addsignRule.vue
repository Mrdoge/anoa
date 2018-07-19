<template>
    <div>
        <!-- 添加规则-->
        <div class="m-addRule">
            <div class="rule">
                <div class="list j-setVal">
                    <span class="j-name">规则名称</span>
                    <a href="javascript:;" class="right">
                        <span class="j-val">未设置</span><i class="iconfont icon-xiangyou"></i>
                    </a>
                    <input type="hidden" name="ruleName">
                </div>
                <div class="list j-setVal">
                    <span class="j-name">打卡人员</span>
                    <a href="javascript:;" class="right">
                        <span class="j-val">未设置</span><i class="iconfont icon-xiangyou"></i>
                    </a>
                    <input type="hidden" name="member">
                </div>
            </div>
            <div class="rule">
                <div class="list" fu-date="date">
                    <span class="j-name">打卡日期</span>
                    <a href="javascript:;" class="right">
                        <span class="j-val">未设置</span><i class="iconfont icon-xiangyou"></i>
                    </a>
                    <input type="hidden" name="signDate">
                </div>
                <div class="list j-setVal" fu-date="time">
                    <span class="j-name">打卡时间</span>
                    <a href="javascript:;" class="right">
                        <span class="j-val">未设置</span><i class="iconfont icon-xiangyou"></i>
                    </a>
                    <input type="hidden" name="signTime">
                </div>
            </div>
            <div class="rule">
                <div class="list j-setVal">
                    <span class="j-name">打卡位置</span>
                    <a href="javascript:;" class="right">
                        <span class="j-val">未设置</span><i class="iconfont icon-xiangyou"></i>
                    </a>
                    <input type="hidden" name="signPosition">
                </div>
            </div>
            <a href="javascript:;" class="btn" style="display: none;">删除规则</a>
            <a href="javascript:;" class="btn" @click="Hint">保存</a>
        </div>
        <!-- 添加规则 end-->
    </div>
</template>

<script>

export default {
  name: 'signIndex',
  data () {
    return {
      msg: ''
    }
  },
  created(){
       this.$store.state.isSign = true
  },
  components:{
      
  },
  methods:{
      Hint(){
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
.m-addRule > .rule{margin-top:0.44rem;background-color: #fff;font-size: 0.32rem;box-sizing: border-box;}
.m-addRule > .rule > .list{border-bottom: 0.02rem solid #f0f4f7; height: 0.9rem; line-height: 0.9rem; padding-left: 0.34rem; position: relative; cursor:pointer; color: #000;}
.m-addRule > .rule > .list > .right{position: absolute; right: 0.22rem; font-size: 0.28rem; color: #a1a1a1;}
.m-addRule > .rule > .list > .right > i{font-size: 0.26rem; margin-left: 0.22rem;}
.m-addRule > .btn{display: block; margin-top: 0.44rem; height: 0.9rem; line-height: 0.9rem; text-align: center; color: #ff0000; font-size: 0.32rem; border-top: 0.01rem solid #e4e4e5; border-bottom: 0.01rem solid #e4e4e5; background-color: #fff;}
</style>
