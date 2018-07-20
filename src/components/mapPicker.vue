<template>
    <div class="m-mapPicker">
        <iframe src="https://m.amap.com/picker/?center=116.3972,39.9696&key=608d75903d29ad471362f8c58c550daf" frameborder="0" scrolling="no" name="mainContent" id="iframepage"></iframe>
    </div>
</template>

<script>
export default {
name: 'mapPicker',
    data () {
        return {
            
        }
    },
    created(){
        // (function(){
        //     var iframe = document.getElementById('iframepage').contentWindow;
        //     document.getElementById('iframepage').onload = function(){
        //         iframe.postMessage('hello','https://m.amap.com/picker/');
        //     };
        //     window.addEventListener("message", function(e){
        //         console.log(123)
        //         alert('您选择了:' + e.data.name + ',' + e.data.location)
        //     }, false);
        // }())

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-mapPicker{position: fixed; width: 100%; height: 100%; z-index: 6; background-color: #fff; top: 0; left: 0;}
.m-mapPicker iframe{display: block; position: absolute; width: 100%; height: 100%; top: 0; left: 0;}
</style>
