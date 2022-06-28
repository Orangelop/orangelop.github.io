if (top.location != self.location) document.documentElement.style.display='none';

// tongji
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?899df2cdf7f5a83a719fb1bb96982b18";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

function feedback(){
	var feedback_b = document.getElementById('feedback');
	if(!feedback_b){
		feedback_b = document.createElement("span");
		feedback_b.setAttribute("id", "feedback");
		feedback_b.setAttribute("style", "margin-left:1em;cursor:pointer");
		feedback_b.setAttribute("onClick", "feedbackPanel()");
		feedback_b.innerHTML = '\u7528\u6237\u53CD\u9988';
		document.getElementsByClassName('foot').item(0).appendChild(feedback_b)
	}
}
function feedbackPanel(){
	var feedback_p = document.getElementById('feedbackPanel'), z_ = 'i@';
	if(!feedback_p){
		feedback_p = document.createElement("div");
		feedback_p.setAttribute("id", "feedbackPanel");
		feedback_p.setAttribute("style", "width:100%;height:100%;background:rgba(0,0,0,.3);position:fixed;bottom:0;right:0;z-index:99999");
		feedback_p.innerHTML = '<div style="width:300px;height:330px;background:#eee;position:absolute;bottom:0;right:0;padding:0 5px;box-shadow:0 0 3px 1px #ccc"><div><span id="feedbackTip" style="font-size:.86em;line-height:31px">\u7528\u6237\u53CD\u9988</span><span style="float:right;font-size:24px;cursor:pointer;width:24px;text-align:center" onClick="document.getElementById(\'feedbackPanel\').style.display=\'none\'">\u00D7</span></div><textarea id="feedbackContent" style="width:100%;height:150px;border:1px #999 solid;box-sizing:border-box;overflow:auto;float:none;resize:none;font-size:1em;display:block" onfocus="document.getElementById(\'feedbackTip\').innerHTML=\'\u7528\u6237\u53CD\u9988\';document.getElementById(\'feedbackBtn\').disabled=false"></textarea><p align="center"><input type="button" value="\u53D1\u9001" onClick="feedbackSend()" id="feedbackBtn" style="font-size:1em"></p><hr><p style="font-size:.86em">\u82E5\u9700\u53D1\u9001\u56FE\u7247\u6216\u683C\u5F0F\u5316\u6587\u672C\uFF0C\u8BF7\u901A\u8FC7\u7535\u5B50\u90AE\u4EF6\u63D0\u4EA4\u53CD\u9988\uFF1Az'+z_+'qqxiuzi.cn</p></div>';
		document.getElementsByTagName('body').item(0).appendChild(feedback_p)
	}else
	feedback_p.style.display = 'block';
	document.getElementById('feedbackContent').focus()
}
function feedbackSend(){
	var feedbackText=document.getElementById('feedbackContent').value;
	if(feedbackText.replace(/[\r\n ]/g,"")=='')return document.getElementById('feedbackTip').innerHTML='\u8BF7\u8F93\u5165\u53CD\u9988\u5185\u5BB9\uFF01';
	var len = feedbackText.length;
	if (len>500) return document.getElementById('feedbackTip').innerHTML='\u5B57\u6570\u592A\u591A, \u6700\u591A500, \u5F53\u524D'+len;
	document.getElementById('feedbackBtn').disabled=true;
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.onreadystatechange=function(){
		if (xmlhttp.readyState==4){
			if(xmlhttp.status==200){
			document.getElementById('feedbackTip').innerHTML='\u53D1\u9001\u6210\u529F\uFF01';
			}else if(xmlhttp.status==403)
			document.getElementById('feedbackTip').innerHTML='\u4ECA\u65E5\u53CD\u9988\u4FE1\u606F\u8F83\u591A\uFF0C\u8BF7\u660E\u5929\u518D\u63D0\u4EA4\u3002';
			else
			document.getElementById('feedbackTip').innerHTML='\u53D1\u9001\u5931\u8D25\uFF01';
		}else
		document.getElementById('feedbackTip').innerHTML='\u6B63\u5728\u53D1\u9001\u2026\u2026';
	}
	xmlhttp.open("POST","/feedback/",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send('text='+encodeURIComponent(feedbackText));
}
window.addEventListener("load", function(){
	if(document.getElementsByTagName('body').item(0).innerHTML.indexOf('<div class="foot">QQXIUZI.CN\u3000<a href="https://www.qqxiuzi.cn">\u5343\u5343\u79C0\u5B57</a></div>')>=0 || document.getElementsByTagName('body').item(0).innerHTML.indexOf('<div class="foot"><a href="https://www.qqxiuzi.cn/">\u5343\u5343\u79C0\u5B57</a>\uFF0D<a href="https://www.qqxiuzi.cn/daohang.htm">\u7F51\u7AD9\u5BFC\u822A</a></div>')>=0){
		feedback();
	}
	var inss=document.getElementsByTagName('ins');
	for(var insi=0;insi<inss.length;insi++){
		if(inss[insi].style.height=='0px') inss[insi].style.display='none';
	}
}, false);
