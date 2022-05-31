export default {
	refundStatus: {//	0未退款>>1退款中>>2退款成功>>3退款驳回
		0: {name: '未退款',value: 'wtk',text: '未退款',color: '#FD6C01',},
		1: {name: '退款中',value: 'tkz',text: '退款中',color: '#FD6C01',},
		2: {name: '退款成功',value: 'tkcg',text: '退款成功',color: '#FD6C01',},
		3: {name: '退款驳回',value: 'tkbh',text: '退款驳回',color: '#FD6C01',},
	},
	refundListSatus: {//0申请退款>>1等待买家退货>>2买家已退货>>3商家已拒绝>>4平台介入>>5退款完成>>6退款关闭
		0: {name: '申请退款',value: 'sqtk',text: '申请退款',tip:'等待商家审核',color: '#FD6C01',},
		1: {name: '等待买家退货',value: 'dth',text: '买家退货',tip:'等待买家退货',color: '#FD6C01',},
		2: {name: '买家已退货',value: 'yth',text: '卖家收货',tip:'等待卖家确认',color: '#FD6C01',},
		3: {name: '商家已拒绝',value: 'reject',text: '商家拒绝',tip:'商家已拒绝',color: '#FD6C01',},
		4: {name: '平台介入',value: 'ptjr',text: '平台介入',tip:'等待平台客服介入',color: '#FD6C01',},
		5: {name: '退款完成',value: 'suc',text: '退款成功',tip:'退款成功¥1',color: '#FD6C01',},
		6: {name: '退款关闭',value: 'close',text: '退款关闭',tip:'退款已关闭',color: '#FD6C01',},
	},
	payType: {
		'zfbPay': '支付宝',
		'wxPay': '微信支付',
	},
	orderStatus: {//0待支付>>1待发货>>2待收货>>3已完成>>4已取消
					0: {name: '待支付',value: 'dzf',text: '等待支付',color: '#FD6C01',},
					1: {name: '待发货',value: 'dfh',text: '等待发货',color: '#333',},
					2: {name: '待收货',value: 'dsh',text: '等待收货',color: '#333',},
					3: {name: '已完成',value: 'ywc',text: '订单完成',color: '#78CA73',},
					4: {name: '已取消',value: 'yqx',text: '取消订单',color: '#9B9B9B',},
					6: {name: '退款',value: 'tk',text: '退款',},
				}
}