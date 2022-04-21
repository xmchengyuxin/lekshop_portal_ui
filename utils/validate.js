function validate (options){
	let flag = true;
	for(var i=0;i<options.length;i++){
		let type = options[i].rules ? options[i].rules : '';
		let value = options[i].value;
		let text = options[i].text;
		if(options[i].method){//自定义放法
			flag = options[i].method();
			return false
		}
		if(type == 'idcard' && !/^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value)) {
			wx.showToast({
				title: text ? text : '请输入正确的身份证号码',
				icon: 'none',
				duration: 2000
			})
			flag = false;
			return false
		}
		if(type == 'number' && !/^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value)) {
			wx.showToast({
				title: text ? text : '请输入正确的正整数',
				icon: 'none',
				duration: 2000
			})
			flag = false;
			return false
		}
		if(type == 'email' && !/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value)) {
			wx.showToast({
				title: text ? text : '请输入正确的电子邮箱',
				icon: 'none',
				duration: 2000
			})
			flag = false;
			return false
		}
		if(type == 'phone' && !/^1\d{10}$/.test(value)) {
			wx.showToast({
				title: text ? text : '请输入正确的手机号码',
				icon: 'none',
				duration: 2000
			})
			flag = false;
			return false
		}
		if(type == '' && value == '') {
			wx.showToast({
				title: text ? text : '参数不能为空',
				icon: 'none',
				duration: 2000
			})
			flag = false;
			return false
		}
	}
	return flag
}
module.exports = {
	validate
}