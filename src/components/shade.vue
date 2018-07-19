<template>
    <div class="m-shade" :class="{'s-show':this.$store.state.isShadeShow}" @click="close">

    </div>
</template>

<script>
export default {
  name: 'shade',
  data () {
    return {
      
    }
  },
  methods:{
      close(){
          this.$store.state.isShadeShow = false
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-shade{background-color:#000;opacity:0.6;filter:alpha(opacity=60);position:fixed;left:0;top:0;width:100%;height:100%;z-index:6;display:none;-webkit-transform:translateZ(0);transform:translateZ(0);-webkit-will-change:transform,opacity;will-change:transform,opacity}
.m-shade.s-show{display: block;}
</style>
