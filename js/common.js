//removeClass
function removeClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b','g');
	if(reg.test(obj.className)){
		obj.className=obj.className.replace(reg,'').replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
	}
}
//hasClass
function hasClass(obj,sClass){
	var reg=new RegExp('\\b'+sClass+'\\b');
	if(reg.test(obj.className)){
		return true;
	}else{
		return false;
	}
}

//move

function getStyle(obj,name) {
    return (obj.currentStyle || getComputedStyle(obj,false))[name];
}

function move(obj,json,options) {
    options = options || {};
    options.duration = options.duration || 500;
    options.easing = options.easing || 'ease-out';

    // 先关后开
    clearInterval(obj.timer);
    var start = {}; // 起点
    var dis = {}; // 总距离
    for (var name in json) {
        start[name] = parseFloat(getStyle(obj,name));
        dis[name] = json[name] - start[name];
    }
    // 总次数
    var count = Math.floor(options.duration/30);
    var n = 0; // 当前走了多少次了
    obj.timer = setInterval(function(){
        n++;

        for (var name in json) {
            switch(options.easing) {
                case 'linear':
                    var a = n / count;
                    var cur = start[name] + dis[name] * a;
                    break;
                case 'ease-in':
                    var a = n / count;
                    var cur = start[name] + dis[name] * Math.pow(a,3);
                    break;
                case 'ease-out':
                    var a = 1 - n/count;
                    var cur = start[name] + dis[name] * (1 - Math.pow(a,3));
                    break;
            }
            if (name == 'opacity') {
                obj.style.opacity = cur;
                obj.style.filter = 'alpha(opacity'+cur*100+')';
            } else {
                obj.style[name] = cur + 'px';
            }
        }
        // 走的次数和总次数相等 不能继续走
        if (n == count) {
            // 关闭定时器
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    },30);
}
//求绝对距离
function getPos(obj){
	var l=0;
	var t=0;
	while(obj){
		l+=obj.offsetLeft;
		t+=obj.offsetTop;
		obj=obj.offsetParent;
	}
	return {left:l,top:t};
}

//jsonP
function jsonp(options){
    //整理options
    options=options||{};
    options.data=options.data||{};
    options.cbKey=options.cbKey||'cb';
    options.timeout=options.timeout||0;

    options.data[options.cbKey]=('jsonp'+Math.random()).replace('.','');
    window[options.data[options.cbKey]]=function(json){
        clearTimeout(timer);
        options.success && options.success(json);//数据回来了
        //清理操作
        document.body.removeChild(oSc);//用过的script标签，清除
        window[options.data[options.cbKey]]=null;//用过的全局函数清空
    };
    //整理data
    var arr=[];
    for(var key in options.data){
        arr.push(key+'='+encodeURIComponent(options.data[key]));
    }
    var str=arr.join('&');
    //创建script标签,丢到页面
    var oSc=document.createElement('script');
    oSc.src=options.url+'?'+str;
    document.body.appendChild(oSc);
    if(options.timeout){
        var timer=setTimeout(function(){
            options.error && options.error();
            //超时了也要清除用过的标签，和随机函数
            window[options.data[options.cbKey]]=function(json){
                //清理操作
                document.getElementsByTagName('head')[0].removeChild(oSc);//用过的script标签，清除
                window[options.data[options.cbKey]]=null;//用过的全局函数清空
            };
        },options.timeout);
    }
}