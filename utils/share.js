export default{
    data(){
        return {
           //设置默认的分享参数
           //如果页面不设置share，就触发这个默认的分享
            share:{
                title:'梵指到家',
                path:'/pages/index/index',
                imageUrl:'',
                desc:'',
                content:'',
            },
        }
    },
    onShareAppMessage(res) {
		let info = appjson[this.appRole];
		let config = uni.getStorageSync('config') ? uni.getStorageSync('config') : '';
		let title = config != '' && config.share_invite_title != '#' ? config.share_invite_title : this.share.title;
		let desc = config != '' && config.share_invite_content != '#' ? config.share_invite_content : this.share.desc;
		let img = config != '' && config.share_invite_img != 'NVL' ? config.share_invite_img : this.share.imageUrl;
		let path = this.share.path;
		let user = uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '';
		if(user != '') {
			path = path +'?invite='+user.inviteCode;
		}
        return {
            title: title,
            path:path,
            imageUrl:img,
            desc:desc,
            content:this.share.content,
            success(res){
                
            },
            fail(res){
                
            }
        }
    }
}