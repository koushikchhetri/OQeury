/*!
 * OQuery JavaScript Library v1.0
 * http://koushikchhetri.com/
 *
 * Author: Koushik Chhetri
 * Email: care.koushik.chhetri@gmail.com
 *
 * Copyright 20014
 * Released under the MIT license
 * http://koushikchhetri.com/licence
 *
 * Date: 2014-12-17T15:27Z
 */
(function(w){
	"use strict";
	
	var nav=w.navigator;
	var useragent=nav.userAgent.toLowerCase();
	var version=1.0;
	var author='Koushik Chhetri';
	var browser='';
	if(useragent.match(/msie/)){
		browser='ie';
	}else if(useragent.match(/firefox/)){
		browser='firefox';
	}else if(useragent.match(/chrome/)){
		browser='chrome';
	}
	
	var O=function(selector,context){
		try{
		return new KCFramework(selector,context);
		}catch(e){
			
		}
	};
	
	O.version=version;
	O.author=author;
	O.browser=browser;
	
	var KCFramework=function(s,context){
		this.arr_selectors=[];
		var selector=[];
		if(browser!='ie'){
			//As the following statement does not work in IE<9
			selector=document.querySelectorAll(s);
		}else{
			selector=this.browserIE(String.trim(s));
		}
		
		for(var i=0;i<selector.length;i++){
			this.arr_selectors[i]=selector[i];
		}
	};
	KCFramework.prototype={
		browserIE:function(s){
			var selector=[];
			if(s.indexOf(",")>-1){
				var arr=s.split(",");
				for(var i in arr){
					var arr[i]=arr[i].replace(/\s+/g,'');
					arr[i]=this.identifyTag(arr[i]);
				}
			}else if(s.indexOf(" ")==-1){
				var arr=s.split(" ");
				var arr_length=arr.length;
				for(var i=0;i<arr_length;i++){
					arr[i]=this.identifyTag(arr[i]);
				}
				selector.push(eval(arr.join(".")));
			}else{
				selector.push(this.identifyTag(s));
			}
			return selector;
		},
		identifyTag:function(s){
			if(s.indexOf("#")!=-1 && s.indexOf("#")==0){
				return this.selectorID(s);
			}else if(s.indexOf(".")!=-1 && s.indexOf(".")==0){
				return this.selectorClass(s)[0];
			}else if(s.indexOf("#")==-1 && s.indexOf(".")==-1){
				return this.selectorTag(s)[0];
			}
		},
		selectorID:function(s){
			return document.getElementById(s);
		},
		selectorClass:function(s){
			return document.getElementsByClassName(s);
		},
		selectorTag:function(s){
			return document.getElementsByTagName(s);
		}
	}
	
	O.fn=KCFramework.prototype={
		hide:function(){
			var length=this.arr_selectors.length;
			while(length--){
				this.arr_selectors[length].style.display="none";
			}
			return this;
		},
		
		show:function(){
			var length=this.arr_selectors.length;
			while(length--){
				this.arr_selectors[length].style.display="";
			}
			return this;
		},
		
		fadeIn:function(value){
			var timeout=typeof value=='undefined'?50:Number(value);
			if(value=="slow"){
				timeout=50;
			}else if(value=="fast"){
				timeout=15;
			}
			var arr_fadeintimer=[];
			var length=this.arr_selectors.length;
			while(length--){
				var obj=this.arr_selectors[length];
				(function(obj,length,timeout){
					var opacity = 0;
					var gap=1/timeout;
					obj.style.opacity=0;
					obj.style.display="";
					opacity+=gap;
					arr_fadeintimer[length]=setInterval(function(){
						opacity+=gap;
						if(obj.style.opacity<1){
							obj.style.opacity=opacity;
						}else{
							clearInterval(arr_fadeintimer[length]);
						}
					},timeout);
				})(obj,length,timeout);
			}
		},
		
		fadeOut:function(value){
			var timeout=typeof value=='undefined'?50:Number(value);
			if(value=="slow"){
				timeout=50;
			}else if(value=="fast"){
				timeout=15;
			}
			var arr_fadeintimer=[];
			var length=this.arr_selectors.length;
			while(length--){
				var obj=this.arr_selectors[length];
				(function(obj,length,timeout){
					var opacity = 1;
					var gap=1/timeout;
					obj.style.opacity=1;
					opacity-=gap;
					arr_fadeintimer[length]=setInterval(function(){
						opacity-=gap;
						if(obj.style.opacity>0){
							obj.style.opacity=opacity;
						}else{
							obj.style.opacity=0;
							obj.style.display="none";
							clearInterval(arr_fadeintimer[length]);
						}
					},timeout);
				})(obj,length,timeout);
			}
			return this;
		},
		
		/*fadeTo:function(value,newopacity){
			var newopacity=Number(newopacity);
			var timeout=typeof value=='undefined'?50:Number(value);
			if(value=="slow"){
				timeout=50;
			}else if(value=="fast"){
				timeout=15;
			}
			var arr_fadeintimer=[];
			var length=this.arr_selectors.length;
			while(length--){
				var obj=this.arr_selectors[length];
				(function(obj,length,timeout){
					var negative_or_positive=0;
					var opacity=typeof obj.style.opacity=='undefined'?1:Number(obj.style.opacity);
					negative_or_positive=newopacity-opacity>0?1:-1;
					
					var gap=1/timeout;
					if(negative_or_positive==1){
						opacity+=gap;	
					}else{
						opacity-=gap;	
					}
					obj.style.opacity=1;
					
					arr_fadeintimer[length]=setInterval(function(){
						if(negative_or_positive==1){
							opacity+=gap;	
						}else{
							opacity-=gap;	
						}
						if(obj.style.opacity>newopacity){
							obj.style.opacity=opacity;
						}else{
							obj.style.opacity=newopacity;
							obj.style.display="";
							clearInterval(arr_fadeintimer[length]);
						}
					},timeout);
				})(obj,length,timeout);
			}
			return this;
		},*/
		
		hasClass:function(classname){
			return this.arr_selectors[0].className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.arr_selectors[0].className);
		},
		hasId:function(id){
			return this.arr_selectors[0].getAttribute("id") && new RegExp("(^|\\s)" + id + "(\\s|$)").test(this.arr_selectors[0].getAttribute("id"));
		},
		addClass:function(classname){
			var length=this.arr_selectors.length;
			while(length--){
				var arr_class=this.arr_selectors[length].className.split(/\S+/g) || [];
				arr_class.push(classname);
				this.arr_selectors[length].className=arr_class.join(' ');
			}
			return this;
		},
		
		removeClass:function(classname){
			var length=this.arr_selectors.length;
			while(length--){
				var rxp = new RegExp("\\s?\\b" + classname + "\\b", "g");
				this.arr_selectors[length].className = this.arr_selectors[length].className.replace(rxp, '');
			}
			return this;
		},
		
		remove:function(){
			var length=this.arr_selectors.length;
			while(length--){
				this.arr_selectors[length].parentElement.removeChild(this.arr_selectors[length]);
			}
		},
		
		css:function(propertykey,propertyvalue){
			var length=this.arr_selectors.length;
			while(length--){
				var styles=this.arr_selectors[length].getAttribute("style") || "";
				if(typeof propertyvalue=="undefined"){
					if(typeof propertykey=="object"){
						for(var key in propertykey){
							styles+=key+":"+propertykey[key]+"; ";
						}
					}else{
						return document.getComputedStyle(this.arr_selectors[length]).getPropertyValue(propertykey);
					}
				}else{
					styles+=propertykey+":"+propertyvalue+"; ";
				}
				this.arr_selectors[length].setAttribute("style",styles);
			}
		},
		
		attr:function(propertykey,propertyvalue){
			var length=this.arr_selectors.length;
			while(length--){
				if(typeof propertyvalue=="undefined"){
					if(Array.isArray(propertykey)){
						for(var key in propertykey)
							this.arr_selectors[length].setAttribute(key,propertykey[key]);
					}else{
						return this.arr_selectors[length].getAttribute(propertykey);
					}
				}else{
					this.arr_selectors[length].setAttribute(propertykey,propertyvalue);
				}
				return this;
			}
		},
		
		html:function(htmlvalue){
			var length=this.arr_selectors.length;
			while(length--){
				if(typeof htmlvalue=="undefined"){
					return this.arr_selectors[length].innerHTML;
				}else{
					this.arr_selectors[length].innerHTML=htmlvalue;
				}
			}
		}
	};
	
	if(!w.O)
		w.O=O;
})(window);
