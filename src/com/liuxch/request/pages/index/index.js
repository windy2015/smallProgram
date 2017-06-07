//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    data: 'hello'
     
  },  
  onLoad: function () {
    console.log('onLoad')
   
  },
  //请求服务器端
  OnRequest :function(){
      let that = this;

      wx.request({
        url: 'https://localhost:8443/wxsever/test',
        data: {name:'tony'},
        success:function(res){
            console.log(res);
            that.setData({data:res.data});
        }
      })
  }

})
