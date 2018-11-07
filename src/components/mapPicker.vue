<template>
    <div class="m-mapPicker" v-show="isShow">
         <!--普通网页版-->
        <template v-if="!lat">
            <iframe id="mapPage" width="100%" height="100%" frameborder=0 src="https://apis.map.qq.com/tools/locpicker?search=0&type=1&mapdraggable=0&radius=300&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=anoa"></iframe>

            <!-- 底边 -->
            <div class="m-forbotNav" style="height: 2rem;"></div>
            <div class="m-bottom">
                <div class="block f-clear">
                    <div class="btn u-FU_btn" @click="goback">取消<span class="p-loading"></span></div>
                    <div class="btn j-submit u-FU_btn" @click="setAddress">确定<span class="p-loading"></span></div>
                </div>
            </div>
            <!-- 底边 end-->
        </template>
         <!--普通网页版 end-->
        
        <!--小程序-->
        <template v-if="lat">
            <!-- <iframe id="mapPage" width="100%" height="100%" frameborder=0 :src="'https://apis.map.qq.com/tools/locpicker?search=0&type=1&mapdraggable=0&radius=300&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=anoa' + '&coord=' + lat + ',' + lng" v-if="lat"></iframe> -->
            <div v-if="lat" class="m-miniMap">
                <!--地图-->
                <div id="miniMap" class="map"></div>
                <!--地图 end-->
                
                <!--列表-->
                <div class="list">
                    <div v-for="(items,index) in poisData" :key="items.id + index" class="wrap" @click="setMapData(index)" :class="{'z-cur':poisCur == index}">
                        <div class="title">{{items.title}}</div>
                        <div class="ct">{{items.address}}</div>
                        <i class="icon-weibiaoti14 iconfont right" v-if="poisCur == index"></i>
                    </div>
                </div>
                <!--列表 end-->
            </div>

            <!-- 底边 -->
            <div class="m-forbotNav" style="height: 2rem;"></div>
            <div class="m-bottom">
                <div class="block f-clear">
                    <div class="btn u-FU_btn" @click="goback">取消<span class="p-loading"></span></div>
                    <div class="btn j-submit u-FU_btn" @click="setAddress">确定<span class="p-loading"></span></div>
                </div>
            </div>
            <!-- 底边 end-->
        </template>
         <!--小程序 end-->
    </div>
</template>

<script>
export default {
name: 'mapPicker',
    data () {
        return {
            loc:{},
            poisData:[],
            poisCur:0,   //当前选中
            maker:{}     //地图覆盖物（中心点）
        }
    },
    props:['isShow','callback','cancel','lat','lng'],
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

        //如果不是小程序
        if (!vm.lat) {
            window.addEventListener('message', function(event) {
                // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
                var loc = event.data;
                //console.log(loc)
                if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
                    //console.log('location', loc);
                    //vm.callback(loc);
                    for(var i in loc){
                        vm.$set(vm.loc,i,loc[i])
                    }
                }
            }, false);            
        }else{  //如果是小程序
            vm.miniMapInit()
        }

    },
    methods:{
        setAddress(){
            var vm = this;
            var loc = vm.loc;
            vm.callback(loc);
        },
        goback(){
            var vm = this;
            vm.cancel()
        },
        miniMapInit(){  //小程序地图初始化
            var vm = this;
            var location = localStorage.getItem('location');
            //console.log(location)
            if (!location || location == "undefined") {
                vm.getLocationByTencent()
                return false
            }
            location = new vm.F['base64']().decode(location);
            location = JSON.parse(location);
            location = location.result;

            //地图实例化
            setTimeout(() => {
                var myOptions = {
                    zoom: 15,
                    draggable:false,    //禁止拖拽
                    scrollwheel:false,  //禁止滚轮
                    disableDoubleClickZoom:false,   //禁止手指缩放地图
                    keyboardShortcuts:false,    //禁止键盘控制
                    disableDefaultUI: true,    //禁止所有控件
                    center: new qq.maps.LatLng(location.location.lat,location.location.lng)
                };
                var map = new qq.maps.Map(document.getElementById("miniMap"), myOptions);

                //创建一个Marker
                vm.marker = new qq.maps.Marker({
                    //设置Marker的位置坐标
                    position: myOptions.center,
                    //设置显示Marker的地图
                    map: map
                });
            },1000)

            //获取周边信息
            var _poisData = location.pois
            //console.log(_poisData)
            for (let i = 0; i < _poisData.length; i++) {
                vm.poisData.push(_poisData[i])
            }
        },
        setMapData(index){
            var vm = this;
            index = index || 0;
            vm.poisCur = index;
            var curData = vm.poisData[index]
            vm.$set(vm.loc,'poiaddress',curData.address)
            vm.$set(vm.loc,'poiname',curData.title)

            var center = new qq.maps.LatLng(curData.location.lat,curData.location.lng)
            //console.log(center)
            //vm.marker.setVisible(false);
            vm.marker.setPosition(center);//更新marker
            //vm.marker.moveTo(center,100)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-mapPicker{position: fixed; width: 100%; height: 100%; z-index: 6; background-color: #fff; top: 0; left: 0;}
.m-mapPicker iframe{display: block; position: absolute; width: 100%; height: 100%; top: 0; left: 0;}

/*小程序地图*/
.m-miniMap{position: absolute; width: 100%; height: 100%; top: 0; left: 0;}
.m-miniMap > .map{position: absolute; width: 100%; display: block; height: 50%; top: 0; left: 0;}
.m-miniMap > .list{position: absolute; width: 100%; height: 50%; top: 50%; box-sizing: border-box; padding-bottom: 1.16rem; overflow-y: scroll;}
.m-miniMap > .list > .wrap{display: block; cursor: pointer; border-bottom: 1px solid #d3d3d3; padding: 0.2rem; position: relative;}
.m-miniMap > .list > .wrap > .title{font-size: 0.24rem;}
.m-miniMap > .list > .wrap > .ct{font-size: 0.2rem; color: #808080; margin-top: 0.2rem;}
.m-miniMap > .list > .wrap > .right{position: absolute; display: block; width: 0.24rem; height: 0.24rem; border-radius: 50%; border: 0.01rem solid #0170eb; color: #0170eb; z-index: 1; right: 0.2rem; top: 50%; margin-top: -0.12rem; font-size: 0.22rem; text-align: center; line-height: 0.22rem;}
/*小程序地图 end*/

.m-btn{background-color: #4f77aa;}
</style>
