/**
 * 
 * @authors kaihao (you@example.org)
 * @date    2017-11-18 11:29:42
 * @dis     放一些常用js方法，用变量F存起来
 */

var F = {}
//Unix时间戳格式化
F['unixFormat'] = function(timestamp){ //这个是Unix时间戳
   //return new Date(parseInt(timestamp) * 1000).toLocaleString().replace(/[\/]/, "-").replace(/上午|下午/,' ').replace(/年|月/g, "-").replace(/日/g, " ");
   //console.log(timestamp);
   //if (!timestamp) {console.log(123); return};
   if (!timestamp) {return};
   timestamp = +timestamp;
   if (!timestamp) {return};
   return new Date(parseInt(timestamp, 10) * 1000).format("yyyy-MM-dd HH:mm:ss");

}
Date.prototype.format = function (e) { //date添加format方法，时间戳格式化
   var a = function (m, l) {
       var n = "",
           k = (m < 0),
           j = String(Math.abs(m));
       if (j.length < l) {
           n = (new Array(l - j.length + 1)).join("0")
       }
       return (k ? "-" : "") + n + j
   };
   if ("string" != typeof e) {
       return this.toString()
   }
   var b = function (k, j) {
       e = e.replace(k, j)
   };
   var f = this.getFullYear(),
       d = this.getMonth() + 1,
       i = this.getDate(),
       g = this.getHours(),
       c = this.getMinutes(),
       h = this.getSeconds();
   b(/yyyy/g, a(f, 4));
   b(/yy/g, a(parseInt(f.toString().slice(2), 10), 2));
   b(/MM/g, a(d, 2));
   b(/M/g, d);
   b(/dd/g, a(i, 2));
   b(/d/g, i);
   b(/HH/g, a(g, 2));
   b(/H/g, g);
   b(/hh/g, a(g % 12, 2));
   b(/h/g, g % 12);
   b(/mm/g, a(c, 2));
   b(/m/g, c);
   b(/ss/g, a(h, 2));
   b(/s/g, h);
   return e
};

//js时间戳格式化
F['dateFormat'] = function(time){
   if (!time) {return};
   time = new Date(time);
   var date = {};
   date.y = time.getFullYear();//年
   date.m = time.getMonth() + 1;//月
   date.d = time.getDate();//日
   date.h = time.getHours();//时
   date.mm = time.getMinutes();//分
   date.s = time.getSeconds();//秒
   for (var i in date) {
       +date[i] < 10? date[i] = '0' + date[i]:date[i];
   }
   return date.y+"-"+date.m+"-"+date.d+" "+date.h+":"+date.mm+":"+date.s;
}

/*
方法名：Verify
作用：数据验证
使用：F['Verify']('数据类型','数据值','提示语');
版本更新：v1.0.0
*/


F['Verify'] = function(type, val,tips) {
    var _back = {
        err: false,
        ct: '正确'
    };
    var type = type || '';
    var val = String(val) || '';
    F['Verify']['rule'][type] = F['Verify']['rule'][type] || [];
    //循环验证
    for (var i = 0; i < F['Verify']['rule'][type].length; i++) {
        if (F['Verify']['rule'][type][i](val)) {
            _back.err = true;
            if (tips) {
                _back.ct = tips;
            }else{
                _back.ct = F['Verify']['tips'][type][i];
            }
            
        }
    }
    return _back;

};
//规则
F['Verify']['rule'] = {
    //手机号码
    'phone': [
        function(val) {
            return (!(/^1[0-9]{10}$/.test(val)));
        },
        function(val) {
            return (val.length != 11);
        }
    ],
    //电子邮箱
    'email': [
        function(val) {
            return (!(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/.test(val)));
        },
        function(val) {
            return (val.length < 6);
        },
        function(val) {
            return (val.length > 320);
        }
    ],
    //中文名
    'cn_name': [
        function(val) {
            return (!(/^[\u4e00-\u9fa5]+$/.test(val)));
        },
        function(val) {
            return (val.length < 2);
        },
        function(val) {
            return (val.length > 32);
        }
    ],
    //身份证
    'idcard': [
        function(val) {
            return (!(/\d{17}[\d|x]|\d{15}/.test(val)));
        }
    ],
    //4位数验证码
    'code_4': [
        function(val) {
            return (val.length != 4);
        }
    ],
    //6位数验证码
    'code_6': [
        function(val) {
            return (val.length != 6);
        }
    ],
    //用户名
    'username': [
        function(val) {
            return (!(/^[A-Za-z0-9_\-\u4e00-\u9fa5]+$/.test(val)));
        },
        function(val) {
            return (val.length < 2);
        },
        function(val) {
            return (val.length > 8);
        }
    ],
    //密码
    'password': [
        function(val) {
            return (!(/^[A-Za-z0-9_-]+$/.test(val)));
        },
        function(val) {
            return (val.length < 6);
        },
        function(val) {
            return (val.length > 32);
        }
    ],
    'noNull':[
        function(val){
            return (val == undefined || val == null || val == '');
        }
    ]
};

//提示语
F['Verify']['tips'] = {
    'phone': ['请输入有效手机', '请输入11位手机'],
    'email': ['邮箱格式有误', '邮箱过短', '邮箱过长'],
    'cn_name': ['请输入中文名', '名字过短', '名字过长'],
    'idcard': ['身份证有误'],
    'code_4': ['验证码有误'],
    'code_6': ['验证码有误'],
    'username': ['用户名含非法字符', '用户名过短', '用户名过长'],
    'password': ['请使用英文密码', '密码过短', '密码过长'],
    'noNull': ['数据不齐']
};


/*
方法名：FormComfirm
作用：表单验证
使用：F['方法名：FormComfirm'](数组)
*/

F['FormComfirm'] = function(arr){
    arr = arr || [];
    var result = {};

    for(var i = 0; i < arr.length; i++){
        var type = arr[i].type
        var val = arr[i].val
        var tips = arr[i].tips
        var verify = F['Verify'](type,val,tips);
        if(verify.err){
            result = verify
            break
        }
    }
    return result
}


/*
方法名：getFormData
作用：获取表单数据
使用：F['方法名：getFormData'](e)
*/
F['getFormData'] = function(e){
    var arr = []
    console.log(e)
}


/*
方法名：Hint
作用：提示
使用：F['Hint]()
*/
F['Hint'] = function(vm,opt){
    //console.log(vm.$store.state)
    vm.$store.state.hint.isShow = !vm.$store.state.hint.isShow;
    if(opt.ct){
        vm.$store.state.hint.ct = opt.ct;
    }
    if(opt.type || opt.type === 0){
        vm.$store.state.hint.type = opt.type;
    }
    if(opt.time){
        vm.$store.state.hint.time = opt.time;
    }
}


/*
方法名：ImageResizer
作用：base64图片压缩
使用：F['ImageResizer'](配置)
*/
F['ImageResizer'] = function(opts){
	var settings = {
		resizeMode: "auto" //压缩模式，总共有三种  auto,width,height auto表示自动根据最大的宽度及高度等比压缩，width表示只根据宽度来判断是否需要等比例压缩，height类似。
			,
		dataSource: "" //数据源。数据源是指需要压缩的数据源，有三种类型，image图片元素，base64字符串，canvas对象，还有选择文件时候的file对象。。。
			,
		dataSourceType: "image" //image  base64 canvas
			,
		maxWidth: 150 //允许的最大宽度
			,
		maxHeight: 200 //允许的最大高度。
			,
		onTmpImgGenerate: function(img) {} //当中间图片生成时候的执行方法。。这个时候请不要乱修改这图片，否则会打乱压缩后的结果。
			,
		success: function(resizeImgBase64, canvas) {

			} //压缩成功后图片的base64字符串数据。
			,
		debug: false //是否开启调试模式。

	};
	var appData = {};
	$.extend(settings, opts);
	
	var _debug = function(str, styles) {
		if(settings.debug == true) {
			if(styles) {
				console.log(str, styles);
			} else {
				console.log(str);
			}
		}
	};
	
	var innerTools = {
		getBase4FromImgFile: function(file, callBack) {

				var reader = new FileReader();
				reader.onload = function(e) {
					//var $img = $('<img>').attr("src", e.target.result)
					//$('#preview').empty().append($img)
					if(callBack) {
						callBack(base64Img);
					}
				};
				reader.readAsDataURL(file);
			}

			//--处理数据源。。。。将所有数据源都处理成为图片图片对象，方便处理。
			,
		getImgFromDataSource: function(datasource, dataSourceType, callback) {

				var _me = this;
				var img1 = new Image();

				if(dataSourceType == "img" || dataSourceType == "image") {
                    img1.src = $(datasource).attr("src");
					if(callback) {
						callback(img1);
					}
				} else if(dataSourceType == "base64") {
					img1.src = datasource;
					if(callback) {
						callback(img1);
					}
				} else if(dataSourceType == "canvas") {
					img1.src = datasource.toDataURL("image/jpeg");
					if(callback) {
						callback(img1);
					}
				} else if(dataSourceType == "file") {
					_me.getBase4FromImgFile(function(base64str) {
						img1.src = base64str;
						if(callback) {
							callback(img1);
						}
					});
				}

			}
			//计算图片的需要压缩的尺寸。当然，压缩模式，压缩限制直接从setting里面取出来。
			,
		getResizeSizeFromImg: function(img) {
				var _img_info = {
					w: $(img)[0].naturalWidth,
					h: $(img)[0].naturalHeight
				};
				console.log("真实尺寸：");
				console.log(_img_info);
				var _resize_info = {
					w: 0,
					h: 0
				};
				if(_img_info.w <= settings.maxWidth && _img_info.h <= settings.maxHeight) {
					return _img_info;
				}
				if(settings.resizeMode == "auto") {
					var _percent_scale = parseFloat(_img_info.w / _img_info.h);
					var _size1 = {
						w: 0,
						h: 0
					};
					var _size_by_mw = {
						w: settings.maxWidth,
						h: parseInt(settings.maxWidth / _percent_scale)
					};
					var _size_by_mh = {
						w: parseInt(settings.maxHeight * _percent_scale),
						h: settings.maxHeight
					};
					if(_size_by_mw.h <= settings.maxHeight) {
						return _size_by_mw;
					}
					if(_size_by_mh.w <= settings.maxWidth) {
						return _size_by_mh;
					}

					return {
						w: settings.maxWidth,
						h: settings.maxHeight
					};

				}
				if(settings.resizeMode == "width") {
					if(_img_info.w <= settings.maxWidth) {
						return _img_info;
					}
					var _size_by_mw = {
						w: settings.maxWidth,
						h: parseInt(settings.maxWidth / _percent_scale)
					};
					return _size_by_mw;
				}

				if(settings.resizeMode == "height") {
					if(_img_info.h <= settings.maxHeight) {

						return _img_info;
					}
					var _size_by_mh = {
						w: parseInt(settings.maxHeight * _percent_scale),
						h: settings.maxHeight
					};
					return _size_by_mh;
				}

			}
			//--将相关图片对象画到canvas里面去。
			,
		drawToCanvas: function(img, theW, theH, realW, realH, callback) { 
			var canvaFs = document.createElement("canvas");
			canvaFs.width = theW;
			canvaFs.height = theH;
			var ctx = canvaFs.getContext('2d');
			ctx.drawImage(img,
				0, //sourceX,
				0, //sourceY,
				realW, //sourceWidth,
				realH, //sourceHeight,
				0, //destX,
				0, //destY,
				theW, //destWidth,
				theH //destHeight
			);

			//--获取base64字符串及canvas对象传给success函数。
			var base64str = canvaFs.toDataURL("image/png");
			if(callback) {
				callback(base64str, canvaFs);
			}
		}
	};

	//--开始处理。
	(function() {
		innerTools.getImgFromDataSource(settings.dataSource, settings.dataSourceType, function(_tmp_img) {
			var __tmpImg = _tmp_img;

			__tmpImg.onload = function(){
				settings.onTmpImgGenerate(_tmp_img);
				//--计算尺寸。
				var _limitSizeInfo = innerTools.getResizeSizeFromImg(__tmpImg);
				
				console.log('转换后的大小',_limitSizeInfo)
			
				
				var _img_info = {
					w: __tmpImg.naturalWidth,
					h: __tmpImg.naturalHeight
				};
				console.log('原始大小',_img_info)
				innerTools.drawToCanvas(__tmpImg, _limitSizeInfo.w, _limitSizeInfo.h, _img_info.w, _img_info.h, function(base64str, canvas) {
					settings.success(base64str, canvas);
				});
			}
			
			
			

		});
	})();

	var returnObject = {

	};
	
	return returnObject;
}

/*
方法名：lrz
作用：base64图片压缩2
使用：F['lrz'](file,回调)
*/
F['lrz'] = function(file,cb){
    lrz(file,{width: 800})
        .then(function (rst) {
            // 处理成功会执行
            //console.log(rst);
            var postdata = {
                type:'base64',
                key:'anoa',
                imgResour:rst.base64
            }
            //console.log(postdata)
            cb(postdata)
        })
        .catch(function (err) {
            // 处理失败会执行
        })
        .always(function () {
            // 不管是成功失败，都会执行
        });
}

/*
方法名：imgUpload
作用：图片上传
使用：F['ImageResizer'](vue对象,dom元素,配置)
*/
F['imgUpload'] = function(vm,dom,opt){
    var file = dom.files[0]
    //console.log(file)
    //console.log(file.size/1024,opt.limit)
    if ((file.size/1024) > opt.limit) {	//如果超过限制大小(单位kb)
        F['Hint'](vm,{
            ct:"图片不能超过" + (opt.limit/1024).toFixed(2) + "M"
        })
        return false
    }

    var _beforeCall = opt.beforeCall || function(){};
    _beforeCall()
    F['lrz'](file,imgSubmit)
    // var reader = new FileReader();	//这是一个很牛逼的js原生对象
    // reader.readAsDataURL(file);
    // reader.onload = function (e) {
    //     var base64Img = this.result;
    //     var _ir = F['ImageResizer']({
    //         resizeMode: "auto",
    //         dataSource: base64Img,
    //         dataSourceType: "base64",
    //         maxWidth: 850, //允许的最大宽度
    //         maxHeight: 850, //允许的最大高度
    //         onTmpImgGenerate: function(img) {

    //         },
    //         success: function(resizeImgBase64, canvas) {
    //             //document.getElementById('compressionImg').innerText = resizeImgBase64;
    //             //console.log(resizeImgBase64);
    //             var postdata = {
    //                 type:'base64',
    //                 key:opt.key,
    //                 imgResour:resizeImgBase64
    //             }
    //             //console.log(postdata)
    //             imgSubmit(postdata);
    //         },
    //         debug: true
    //     });

    // }

    //图片提交
    var lock = false;
	function imgSubmit(postdata){
        if(lock){
            return false
        }
		var beforeCall = opt.beforeCall || function(){};
        var afterCall = opt.afterCall || function(){};
        var errCall = opt.errCall || function(){};
		postdata = postdata || {imgResour:''};

        //提交到服务器的时候再次执行一次loading
        beforeCall()
        lock = true;
        dom.classList.add("z-loading");
		$.ajax({
			url: opt.url,
			dataType: 'json',
			type: "post",
			data: postdata,
			success: function(data) {
				afterCall(data)
			},
			error:function(err){
                console.log('连接超时')
                errCall(err)
			},
			complete:function(){
                lock = false;
                dom.classList.remove("z-loading");
			}
		})
	}

}


/*
方法名：getScopeDate
作用：获取时间区间
使用：F['getScopeDate'](开始时间,结束时间)
*/
F['getScopeDate'] = function(start,end){
    var st = start.split('-');
    var et = end.split('-');
    var startTime = new Date(st[0],st[1]-1,st[2]).getTime();
    var endTime = new Date(et[0],et[1]-1,et[2]).getTime();
    var today = new Array("日", "一","二", "三", "四", "五", "六");//创建星期数组
    //console.log(startTime,endTime)

    function formatTime(time,spliter = '-'){
        var date = new Date(time);
        var _year = date.getFullYear();
        var _month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1);
        var _date = date.getDate() >= 10 ? date.getDate() : '0' + date.getDate();
        var _day = today[date.getDay()]
        //return `${year}${spliter}${month}${spliter}${day}`
        return _year + '年' + _month + '月' + _date + '日' + '周' + _day
    }

    var res = [];
    for(var i = startTime; i <= endTime;){
        res.push(formatTime(i,''));
        i += 24 * 60 * 60 * 1000;
    }
    //console.log(res)
    return res
}


/*
方法名：betweenDay
作用：计算时间差，返回天数（请假）
使用：F['betweenDay'](开始时间,结束时间)
*/
F['betweenDay'] = function(start,end){
    //console.log(start,end)
    start = start || new Date(end)
    end = end || new Date(end)

    var s_time = Date.parse(new Date(start));
    var e_time = Date.parse(new Date(end))
    //console.log(e_time,s_time)
    var hour = 60 * 60 * 1000;
    var days = 0.0;
    var half = 0.5;
    var allDay = 1.0;

    var n = (new Date(end).getTime() - new Date(start).getTime()) / (hour * 24);

    console.log(n)
    if (n < 0) {   //结束时间大于开始时间
        return false
    }
    //console.log(n)
    //如果是同一天
    if(n < 1){
        if(n <= 0.25){    //半天
            days += half
        }else{          //一天
            days += allDay
        }
    }else{  //如果不是同一天
        //先算开始多出来的值
        //console.log(new Date(start).getHours())
        if (new Date(start).getHours() < 12) {  //上午
            days += allDay
        }else{  //下午
            days += half
        }

        //计算相隔天数
        days += parseInt(n - 1)

        //最后算后面多出来的值
        if (new Date(end).getHours() <= 12) {  //上午
            days += half
        }else{  //下午
            days += allDay
        }

    }

    return days
    //console.log(days)
    //var rest = (e_time - s_time)/(9 * 60 * 60 * 1000);
    //console.log(rest)
}


//节流函数
F['throttle'] = function(method, delay, time){
	var timeout,startTime = new Date();
	var context = this,
	args = arguments,
	curTime = new Date();
	clearTimeout(timeout);
	// 如果达到了规定的触发时间间隔，触发 handler
	//console.log(curTime,startTime,time)
	if (curTime - startTime >= time) {
		method.apply(context, args);
		startTime = curTime;
		// 没达到触发间隔，重新设定定时器
	} else {
		timeout = setTimeout(method, delay);
	}
}

//滚动到底部触发
F['botTrigger'] = function(callback){
	var wScrollY = window.scrollY; // 当前滚动条位置
	var wInnerH = window.innerHeight; // 设备窗口的高度（不会变）
	var bScrollH = document.body.scrollHeight; // 滚动条总高度
	if (wScrollY + wInnerH >= bScrollH) {
		callback()
	}
}

//判断文件类型，返回后缀以及图标路径
F['fileType'] = function(fileUrl,temp){
    if (!fileUrl) {
        console.log('请传入文件地址');
        return false
    }
    var obj = {
        icon:temp + '/wap/public/img/whatFile.png',
        filetype:""
    }
    var url = ""
    if (fileUrl.indexOf('doc') > -1 || fileUrl.indexOf('docx') > -1) {
        obj.icon = temp + '/wap/public/img/word.png'
    }
    if (fileUrl.indexOf('ppt') > -1 || fileUrl.indexOf('pptx') > -1) {
        obj.icon = temp + '/wap/public/img/ppt.png'
    }
    if (fileUrl.indexOf('xls') > -1 || fileUrl.indexOf('xlsx') > -1) {
        obj.icon = temp + '/wap/public/img/xls.png'
    }
    if (fileUrl.indexOf('txt') > -1) {
        obj.icon = temp + '/wap/public/img/txt.png'
    }
    if (fileUrl.indexOf('pdf') > -1) {
        obj.icon = temp + '/wap/public/img/pdf.png'
    }
    if (fileUrl.indexOf('jpg') > -1 || fileUrl.indexOf('jpeg') > -1 || fileUrl.indexOf('png') > -1 || fileUrl.indexOf('bmp') > -1 || fileUrl.indexOf('gif') > -1) {
        obj.icon = temp + '/wap/public/img/img.png'
    }

    obj.filetype = fileUrl.split('.')[1];
    return obj
}

export default F