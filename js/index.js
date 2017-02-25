window.onload=function(){
//		头部
		var oHead=document.getElementById("head");
		var oDiv=document.getElementById("right");
		var oImg=oHead.getElementsByTagName('img')[0];
		var aImg=oHead.getElementsByTagName('img');
		var docW=document.documentElement.clientWidth;
		var docH=document.documentElement.clientHeight;
		
		if(docW>1000){
			n=docW/5;
		}else{
			n=docW/100;
		}
		move(oImg,{left:n},{
			duration:1500,
			complete:function(){
				move(oImg,{top:50},{
					duration:1000
				})
			}
		});
		
		//天气
		jsonp({
			url:'http://api.asilu.com/weather/',
			data:{
				city:'上海'
			},
			cbKey:'callback',
			success:function(json){
				var arr=json.weather;
				var oWeather=document.getElementById("weather");
				for (var i = 0; i < 4; i++) {
					var oLi=document.createElement('li');
					switch (i){
						case 0:
							oLi.innerHTML=arr[0].date;
							break;
						case 1:
							oLi.innerHTML=arr[0].weather;
							break;
						case 2:
							oLi.innerHTML=arr[0].wind;
							break;
						case 3:
							oLi.innerHTML=arr[0].temp;
							break;
					}
					oWeather.appendChild(oLi);
				}
			}
		});
		
//		主要技能/自我评价
		var oAboutM=document.getElementById("aboutMe_middle");
		var aBtn=oAboutM.getElementsByTagName('span');
		var oAboutT=document.getElementById("aboutMe_top");
		var oAboutFont=document.getElementById("aboutMe_font")
		var aUl=oAboutT.getElementsByTagName('ul');
		var aStrong=oAboutM.getElementsByTagName('strong');
		
		for (var i = 0; i < aBtn.length; i++) {
			(function(index){
				aBtn[i].onclick=function(){
					for (var i = 0; i < aBtn.length; i++) {
						removeClass(aBtn[i],'active');
						removeClass(aStrong[i],'active');
						aUl[i].style.display='none';
					}
					this.className='active';
					aStrong[index].className='active';
					aUl[index].style.display='block';
				};
			})(i);
		}
		
		//打字效果
		var str = '你们好，Welcome to my personal station !';

        for (var i = 0; i < str.length; i++) {
            var oS = document.createElement('span');
            oS.innerHTML = str.charAt(i);
            // 添加
            aboutMe_font.appendChild(oS);
        }
        var aSpan = aboutMe_font.children;
        var i = 0;
        var timer = setInterval(function(){
			move(aSpan[i],{opacity: 1});
            i++;
            if (i == aSpan.length) {
                clearInterval(timer);
            }
        },100);
		
//		上下滚动选项卡
		var oContainR=document.getElementById("contain_right");
		var aBtn2=oContainR.getElementsByTagName('li');
		var oMainCon=document.getElementById("main_contain");
		var aDiv=oMainCon.children;
		for (var i = 0; i < aBtn2.length; i++) {
			(function(index){
				aBtn2[index].onclick=function(){
				for (var i = 0; i < aDiv.length; i++) {
						aBtn2[i].className='';
				};
					this.className='active';
					move(oMainCon,{top:-index*aDiv[0].offsetHeight});
				};
			})(i);
		}
};
	//	技能掌握图解
		function hoverD(obj,ev){
			var w=obj.offsetWidth;
			var h=obj.offsetHeight;
			var x=getPos(obj).left+w/2-ev.clientX;
			var y=getPos(obj).top+h/2-ev.clientY;
			return Math.round((Math.atan2(y,x)*180/Math.PI+180)/90)%4;
		};
		var oUl=document.getElementById("Skill");
		var aLi=oUl.children;
		var aSpan=oUl.getElementsByTagName('span');
		for (var i = 0; i < aLi.length; i++) {
			aLi[i].index=i;
			aLi[i].onmouseenter=function(ev){
				var oEvent=ev||event;
				var n=hoverD(aLi[this.index],oEvent);
				switch (n){
					case 0:
						aSpan[this.index].style.left='200px';
						aSpan[this.index].style.top=0;
						break;
					case 1:
						aSpan[this.index].style.left=0;
						aSpan[this.index].style.top='200px';
						break;
					case 2:
						aSpan[this.index].style.left='-200px';
						aSpan[this.index].style.top=0;
						break;
					case 3:
						aSpan[this.index].style.left=0;
						aSpan[this.index].style.top='-200px';
						break;
				}
				move(aSpan[this.index],{left:0,top:0},{duration:600});
			};
			aLi[i].onmouseleave=function(ev){
				var oEvent=ev||event;
				var n=hoverD(aLi[this.index],oEvent);
				switch (n){
					case 0:
						move(aSpan[this.index],{left:'200',top:0});
						break;
					case 1:
						move(aSpan[this.index],{left:0,top:'200'});
						break;
					case 2:
						move(aSpan[this.index],{left:'-200',top:0});
						break;
					case 3:
						move(aSpan[this.index],{left:0,top:'-200'});
						break;
				}
			}
		}
	
