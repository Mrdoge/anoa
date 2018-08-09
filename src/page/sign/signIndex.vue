<template>
    <div>
        <!-- 签到模块 -->
        <div class="m-sign">
            <div class="position">
                <i class="icon-dingwei icon" @click="showPicker = true"></i><br /><br />
                <!-- <span class="big j-addressDetails">双湖楼</span><br/></br> -->
                <span class="j-address address" @click="showPicker = true">
                    {{addressText()}}<i class="icon icon-xiangyou" v-show="!loading"></i>
                </span>
            </div>
            <div class="sign" @click="sign">
                <div class="txt"><span class="big j-timeCount">{{serverTime}}</span><br/>
                打卡签到</div>
            </div>
        </div>
        <!-- 签到模块 end-->

        <div style="height:100%; display:block;"></div>
        <div id="container" style="display:none;"></div>
        <div id="tip" style="margin-top: 1rem; margin-bottom: 0.2rem; font-size: 0.26rem; display: none;"></div>

        <div id="allmap"></div>
        <mapPicker :isShow="showPicker" :callback="setAddress" :cancel="cancel"></mapPicker>
    </div>
</template>


<script>
import mapPicker from "@/components/mapPicker"

var qs = require('qs');
export default {
    name: 'signIndex',
    data () {
        return {
            nowPlace:"",
            placeErr:false,   //是否定位失败
            province:"",
            city:"",
            district:"",
            serverTime:"",    //服务器时间
            loading:true,      //获取地址中
            showPicker:false
        }
    },
    created(){
        var vm = this
        vm.$store.state.isSign = true

        document.body.style.height = "100%";

        //获取服务器时间
        vm.getServerTime()

        // window.addEventListener("message", function(e){
        //     console.log(e)
        //     //alert('您选择了:' + e.data.name + ',' + e.data.location)
        // }, false);

    },
    mounted(){
        var vm = this;
        setTimeout(() => {
            //vm.getLocationByGaoDe()            //高德地图
            //vm.getLocationByBaiDu()            //百度地图
            vm.getLocationByTencent()           //腾讯地图
        },500);
    },
    destroyed(){
        document.body.style.height = ""
    },
    components:{
        //footerSign
        mapPicker
    },
    methods:{
        getLocationByGaoDe(){
            var vm = this;
            vm.loading = true
            /***************************************
            由于Chrome、IOS10等已不再支持非安全域的浏览器定位请求，为保证定位成功率和精度，请尽快升级您的站点到HTTPS。
            ***************************************/
            //console.log(document.getElementById('container'))
            var map, geolocation;
            //加载地图，调用浏览器定位服务
            map = new AMap.Map('container');
            map.plugin('AMap.Geolocation', function() {
                geolocation = new AMap.Geolocation({
                    enableHighAccuracy: true,//是否使用高精度定位，默认:true
                    timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                    buttonOffset: new AMap.Pixel(0, 0),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                    zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    buttonPosition:'RB',
                    extensions:'all'
                });
                map.addControl(geolocation);
                geolocation.getCurrentPosition();
                AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
                AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
            });


            //解析定位结果
            function onComplete(data) {
                //console.log(data)
                //document.write(data.formattedAddress)
                var nowPlace = data.formattedAddress;
                // vm.F['Hint'](vm,{
                //     ct:nowPlace
                // })
                vm.nowPlace = nowPlace;
                vm.province = data.addressComponent.province
                vm.city = data.addressComponent.city
                vm.district = data.addressComponent.district

                vm.loading = false
                return false
                var str=['定位成功'];
                str.push('经度：' + data.position.getLng());
                str.push('纬度：' + data.position.getLat());
                str.push('当前位置' + nowPlace);
                if(data.accuracy){
                    str.push('精度：' + data.accuracy + ' 米');
                }//如为IP精确定位结果则没有精度信息
                str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
                //document.getElementById('tip').innerHTML = str.join('<br>');

                var _str = ""
                // for(i in data.roads){
                // 	_str += i + ':' + data[i] + _str + '<br>'
                // }
                for (var i = 0; i < data.roads.length; i++) {
                    data.roads[i]
                    _str += data.roads[i] + _str + '<br>'
                }
                vm.nowPlace = _str;
                console.log(nowPlace)
            }
            //解析定位错误信息
            function onError(data) {
                vm.placeErr = true
                vm.F['Hint'](vm,{
                    ct:"定位失败"
                })
                vm.loading = false
                //console.log(data)
                //document.getElementById('tip').innerHTML = '定位失败';
            }
        },
        sign(){
            var vm  = this;
            var postData = {
                wprovince:vm.province,
                city:vm.city,
                district:vm.district,
                address:'',
                fullAddr:vm.nowPlace
            }
            if (!postData.fullAddr) {
                vm.F['Hint'](vm,{
                    ct:"定位失败"
                })
                return false 
            }
            //return false
            // var postData = {
            // 	wprovince:'广东省',
            // 	city:'惠州市',
            // 	district:'惠城区',
            // 	address:'',
            //     fullAddr:"山东分公司的水电费"
            // }
            this.ajax.post(this.$store.state.httpUrl.sign.SignIndex,postData)
            .then(function (res) {
                //console.log(res.data);
                var data = res;
                if (data.code == 1) {
                    //alert(res.data.retval.okTip);
                    vm.F['Hint'](vm,{
                        ct:data.retval.okTip,
                        type:1
                    })
                    // setTimeout(() => {
                    //     vm.$router.push('/sign/SignIndex');
                    // },1500)
                }else{
                    vm.F['Hint'](vm,{
                        ct:data.msg
                    })
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        getServerTime(){
            var vm = this;
            this.ajax.post(this.$store.state.httpUrl.sign.getServerTime)
            .then(function (res) {
                //console.log(res.data);
                var data = res;
                if (data.code == 1) {
                    var nowTime = vm.F['unixFormat'](data.retval.data)
                    nowTime = nowTime.split(' ')[1].split(':')[0] + ':' + nowTime.split(' ')[1].split(':')[1]
                    //console.log(nowTime)
                    vm.serverTime = nowTime
                }
            })
            .catch(function (err) {
                console.log(err);
            });
        },
        addressText(){
            var vm  = this;
            var str = "";
            if (vm.loading && !vm.nowPlace) {
            str = "地址获取中..."
            }
            if (vm.nowPlace && !vm.loading) {
                str = vm.nowPlace
            }
            if (!vm.nowPlace && !vm.loading) {
                str = "定位失败"
            }
            return str
        },
        getLocationByBaiDu(){
            var vm = this;
            var script = document.createElement("script");  
            script.src = "http://api.map.baidu.com/api?v=2.0&ak=YEMwpbjhZlgCXSOv6AjYX2NbRQiIAmIt&callback=initialize";
            document.body.appendChild(script);
            
            script.onload = () => {
                var map = new BMap.Map("allmap");
                //var point = new BMap.Point(116.331398,39.897445);
                //map.centerAndZoom(point,12);

                var geolocation = new BMap.Geolocation();
                // 开启SDK辅助定位
                geolocation.enableSDKLocation();
                geolocation.getCurrentPosition(function(r){
                    console.log(r)
                    vm.F['Hint'](vm,{
                        ct:r.address.street
                    })
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        map.panTo(r.point);
                        //alert('您的位置：'+r.point.lng+','+r.point.lat);
                    }
                    else {
                        alert('failed'+this.getStatus());
                    }        
                });                
            }
        },
        getLocationByTencent(){
            var vm = this;
            var script = document.createElement("script");  
            //script.src = "https://map.qq.com/api/js?v=2.exp&key=URKBZ-BHWKG-M5LQQ-IMA7D-SOZGS-IZBJ4";       //URKBZ-BHWKG-M5LQQ-IMA7D-SOZGS-IZBJ4
            //script.src = "https://apis.map.qq.com/tools/geolocation/min?key=URKBZ-BHWKG-M5LQQ-IMA7D-SOZGS-IZBJ4&referer=myapp"
            script.src = "https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js"
            document.body.appendChild(script);

            script.onload = () => {
                var geolocation = new qq.maps.Geolocation("URKBZ-BHWKG-M5LQQ-IMA7D-SOZGS-IZBJ4", "anoa");
                var positionNum = 0
                var options = {timeout: 8000};
                geolocation.getLocation(showPosition,showErr,options)

                function showPosition(position) {
                    var adCode = position.adCode;//邮政编码
                    var nation = position.nation;//中国
                    var city = position.city; //城市
                    var addr = position.addr; //详细地址
                    var lat = position.lat; //
                    var lng = position.lng; //火星坐标 //TODO 实现业务代码逻辑

                    //var nowPlace = position.addr;
                    // vm.F['Hint'](vm,{
                    //     ct:nowPlace
                    // })
                    vm.province = position.province
                    vm.city = position.city
                    vm.district = position.district


                    vm.nowPlace = position.province + position.city + position.addr;

                    vm.loading = false

                }; 
                function showErr() { 
                    //TODO 如果出错了调用此方法
                    vm.F['Hint'](vm,{
                        ct:123
                    })
                };
            }

        },
        setAddress(data){
            var vm = this;
            vm.showPicker = false
            //console.log(data)
            if(data.poiname.indexOf('我的位置') > -1){
                return false
            }
            vm.nowPlace = data.poiaddress + data.poiname
        },
        cancel(){   //取消选择
            var vm = this;
            vm.showPicker = false
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.m-sign{width: 7rem; position: absolute; left: 50%; transform: translateX(-50%); top:1.2rem; bottom: 1.1rem; text-align:center; border:0.01rem solid #d3d3d3; border-radius:0.15rem; box-shadow: 0.01rem 0.02rem 0.09rem 0.03rem #d3d3d3; background-color: #fff;}

.m-sign > .position{width: 6rem; font-size: 0.27rem;position: absolute; top: 1.1rem; left: 50%; transform: translateX(-50%); -webkit-transform: translateX(-50%); color: #568f0e;}
.m-sign > .position i{font-size: 0.8rem;}
.m-sign > .position >.big{font-size: 0.35rem;color: #568f0e;font-weight: bold;}
.m-sign > .position > .address{max-width: 6rem; line-height: 1.4;}
.m-sign > .position > .address i{font-size: 0.28rem; font-weight: bold;}
.m-sign > .sign{ width: 2.5rem; height: 2.5rem; box-sizing: border-box; border:0.05rem solid #ffc665;border-radius: 50%; position: absolute; top: 4.82rem; left: 50%;margin-left: -1.25rem;cursor: pointer; position: relative;}
.m-sign > .sign > .txt{position: absolute ;top:0.8rem; left: 0.52rem; font-size: 0.27rem; color:#483c16; } 
.m-sign > .sign > .txt > .big{font-size: 0.53rem;color: #483c16;}
</style>
