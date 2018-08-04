<template>
    <div class="m-mapPicker" v-show="isShow">
        <!-- <iframe src="https://m.amap.com/picker/?center=116.3972,39.9696&key=608d75903d29ad471362f8c58c550daf" frameborder="0" scrolling="no" name="mainContent" id="iframepage"></iframe> -->
        <iframe id="mapPage" width="100%" height="100%" frameborder=0 src="https://apis.map.qq.com/tools/locpicker?search=0&type=1&mapdraggable=0&radius=300&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=anoa"></iframe>

        <!-- 底边 -->
        <div class="m-forbotNav" style="height: 2rem;"></div>
        <div class="m-bottom">
            <div class="block f-clear">
                <div class="btn j-submit u-FU_btn" @click="setAddress">确定<span class="p-loading"></span></div>
            </div>
        </div>
        <!-- 底边 end-->

    </div>
</template>

<script>
export default {
name: 'mapPicker',
    data () {
        return {
            loc:{}
        }
    },
    props:['isShow','callback'],
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
        var vm = this;
        window.addEventListener('message', function(event) {
            // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
            var loc = event.data;
            if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                //console.log('location', loc);
                //vm.callback(loc);
                for(var i in loc){
                    vm.$set(vm.loc,i,loc[i])
                }
            }
        }, false);

    },
    methods:{
        setAddress(){
            var vm = this;
            var loc = vm.loc;
            vm.callback(loc);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-mapPicker{position: fixed; width: 100%; height: 100%; z-index: 6; background-color: #fff; top: 0; left: 0;}
.m-mapPicker iframe{display: block; position: absolute; width: 100%; height: 100%; top: 0; left: 0;}

.m-btn{background-color: #4f77aa; }
</style>
