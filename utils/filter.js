
/* 
	时间搓转化时间
 */
const time = function(source) {
	if(!source) {
		return '';
	}
	var checkTime = function(time) {
		if (time < 10) {
			time = "0" + time;
		};
		return time;
	};
	source = new Date(parseInt(source));
	return source.getFullYear() + '-' +
		checkTime(source.getMonth() + 1) +
		'-' +
		checkTime(source.getDate()) +
		' ' +
		checkTime(source.getHours()) +
		':' +
		checkTime(source.getMinutes());
};
const timeCount = function (now,end) {
	var checkTime = function(time) {
		if (time < 10) {
			time = "0" + time;
		};
		return time;
	};
	var cha = parseInt((end - now)/1000);
	var hour = checkTime(parseInt(cha/3600));
	var fen  = checkTime(parseInt(cha%3600/60));
	var miao  = checkTime(parseInt(cha%3600%60));
	var text =  '';
	if(parseInt(cha/3600) > 0 && now <= end) {
		text = hour+':'+fen+':'+miao;
	}
	if(parseInt(cha/3600) <= 0 && now <= end) {
		text = fen+':'+miao;
	}
	return text
	
};

const time1 = function(source) {
	if(source == ''){return}
	var checkTime = function(time) {
		if (time < 10) {
			time = "0" + time;
		};
		return time;
	};
	source = new Date(parseInt(source));
	return source.getFullYear() + '.' +
		checkTime(source.getMonth() + 1) +
		'.' +
		checkTime(source.getDate());
};
const time2 = function(source) {
	var checkTime = function(time) {
		if (time < 10) {
			time =  time;
		};
		return time;
	};
	source = new Date(parseInt(source));
	return checkTime(source.getMonth() + 1) +
		'.' +
		checkTime(source.getDate());
};
/* 
	替换中间文字*
 */
const hideCenterText = function(name) {
		if(!name){return ''}
		var realName = "";
		var list = String(name).split("");
		var length = list.length;
		var len = 1;
		if(length <= 7) {len=1}else{len=3}
		if (length == 1) {
			realName = name;
		} else if (length == 2) {
			realName = list[0] + "*";
		} else {
			list.forEach(function(element, index) {
				if (index < Number(len) || index >= length - Number(len)) {
					realName += element;
				} else {
					realName += "*";
				}
			});
		}
		return realName;
	};
		const hideCenterText2 = function(name) {
				var realName = "";
				var list = String(name).split("");
				var length = list.length;
				if (length == 1) {
					realName = name;
				} else {
					list.forEach(function(element, index) {
						if ( index%2 == 1) {
							realName += "*";
						} else {
							realName += element;
						}
					});
				}
				return realName;
			};
	const price = function(num) {
		if(!num){return ''};
		return Number(num).toFixed(2);
	};
	const time3 = function(source) {
		 let time = '';
		let nowtime = Math.ceil((new Date()).getTime());
		let oldtime = new Date(parseInt(source)).getTime();
		let cha = parseInt((Number(nowtime) - Number(oldtime))/1000);
		if(cha > 24*60*60 ){
			time = parseInt(cha/(24*60*60))+'天前';
		}else if(cha < 24*60*60 && cha >= 3600){
			time = parseInt(cha/(60*60))+'小时前';
		}else if(cha < 3600 && cha > 60){
			time = parseInt(cha/60)+'分钟前';
		}else{
			time = '1分钟前';
		}
		return time
	};
	const hours = function(time) {
		let hour = (new Date(time)).getHours();
		let fen = (new Date(time)).getMinutes();
		let hour1 =  parseInt(hour) <= 9 ? '0' + hour : hour;
		let fen1 =  parseInt(fen) <= 9 ? '0' + fen : fen;
		return hour1 + ':' + fen1
	};
	const time4 = function(source) {
		var checkTime = function(time) {
			if (time < 10) {
				time = "0" + time;
			};
			return time;
		};
		source = new Date(parseInt(source));
		var nowMonth = checkTime((new Date()).getMonth()+1);
		var nowday = checkTime((new Date()).getDate());
		var time;
		if(nowMonth == checkTime(source.getMonth() + 1) && nowday == checkTime(source.getDate())){
			//判断同一天
			time = checkTime(source.getHours()) +
			':' +
			checkTime(source.getMinutes());
		}else{
			time = checkTime(source.getMonth() + 1) +
			'-' +
			checkTime(source.getDate()) +
			' ' +
			checkTime(source.getHours()) +
			':' +
			checkTime(source.getMinutes());
		}
		return time
	};
	const img = function(url,width) {
		if(!url){return ''};
		if(url.indexOf('chengyuwb') >= 0) {
			url = url.replace(/https:/g, 'http:');
		}
		if(url.indexOf('?') >= 0){
			url = url.slice(0,url.indexOf('?'))
		}
		if(url.indexOf('http') <= -1){
			url = 'http:' + url
		}
		if(width){
			url = url + '?imageView2/2/w/'+width;
		}else{
			url = url + '?imageView2/2/w/600';
		}
		return url
	};
	const bgimg = function(url,width) {
		if(!url){return ''};
		if(url.indexOf('?') >= 0){
			url = url.slice(0,url.indexOf('?'))
		}
		if(url.indexOf('http') <= -1){
			url = 'http:' + url
		}
		if(width){
			url = url + '?imageView2/2/w/'+width;
		}else{
			url = url + '?imageView2/2/w/600';
		}
		return 'background-image:url('+url+')';
	};
	const videobgimg = function(url,width) {
		if(!url){return ''};
		if(url.indexOf('?') >= 0){
			url = url.slice(0,url.indexOf('?'))
		}
		if(url.indexOf('http') <= -1){
			url = 'http:' + url
		}
		if(width){
			url = url + '?vframe/jpg/offset/0/w/'+width;
		}else{
			url = url + '?vframe/jpg/offset/0/w/600';
		}
		return 'background-image:url('+url+')';
	};
	
	var html = function(dom) {
		if(!dom){return;}
		dom = dom.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ');
		dom = dom.replace(/\/section>/g, '\div>');
		dom = dom.replace(/<section/g, '<div');
		return dom;
	};
	const price1 = function(num) {
		let text = String(Number(num).toFixed(2)).split('.');
		let html = '<span class=" f18-size">'+text[0]+'</span><span class=" f12-size" style="position: relative;top: 0px;">.' +text[1]+'</span>';
		return html;
	};
	const week = function(source) {
		if(!source) {return}
		var week = (new Date(parseInt(source))).getDay();
		let weekArr= ['周日','周一','周二','周三','周四','周五','周六'];
		return weekArr[week]
	};
	var km = function(km) {
		if(!km) {return 0 + 'm'}
		km = Number(km);
		if (km >= 1000) {
			km = (km / 1000).toFixed(2) + 'km'
		} else {
			km = km.toFixed(2) + 'm'
		}
		return km
	};
	var filterMiao = function(time) {
		if(!time){return;}
		return time.slice(0,time.lastIndexOf(':'))
	}
	
	var i18n = function(text,num,fc) {
		if(!text){return;}
		let first = text.indexOf('/');
		let last = text.lastIndexOf('/');
		if(fc && fc == 'time2') {
			num = time2(num);
		}
		if(fc && fc == 'time1') {
			num = time1(num);
		}
		text = text.slice(0,first)+num+text.slice(last+1,text.length);
		return text;
	}
	const timeDay = function(source) {
		if(!source) {
			return '';
		}
		source = new Date(parseInt(source));
		return source.getDate()
	};
	const timeMonth = function(source) {
		if(!source) {
			return '';
		}
		source = new Date(parseInt(source));
		return source.getMonth() + 1
	};
export default {
	time,
	hideCenterText,
	hideCenterText2,
	time1,
	time2,
	time3,
	time4,
	hours,
	price,
	img,
	bgimg,
	html,
	timeCount,
	price1,
	week,
	km,
	filterMiao,
	i18n,
	timeMonth,
	timeDay,
	videobgimg
};
