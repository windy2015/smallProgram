// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlaying: false
  },

  music: {
    "url": "http://ws.stream.qqmusic.qq.com/C100002I8eGJ28BI17.m4a?fromtag=38",
    "title": "谭咏麟 - 朋友",
    "coverImg": "http://y.gtimg.cn/music/photo_new/T002R150x150M000004eGsCN3SUheO.jpg?max_age=2592000"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //注册监听事件
    this.onAudioState();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 点击播放或者暂停时触发
   */
  onAudioTap: function () {
    if (this.data.isPlaying) {
      wx.pauseBackgroundAudio();
    } else {
      wx.playBackgroundAudio({
        dataUrl: this.music.url
      })
    }
  },

  /**
   * 点击快进10s或后退10s触发
   */
  onPositionTap: function (event) {
    let how = event.target.dataset.how;
    if (this.data.isPlaying) {

      wx.getBackgroundAudioPlayerState({
        success: function (res) {
          let state = res.status;
          console.log(state);
          //1代表音乐播放
          if (state === 1) {
             let dur = res.duration;
             let curpos = res.currentPosition;
              if(how==="0"){
                   //后退处理
                   let cur = curpos-10;
                   if(cur<0){
                     cur = 1;
                   }
                   wx.seekBackgroundAudio({
                     position: cur
                   })
                   wx.showToast({
                     title: '音乐后退10s',
                     duration:800
                   })
              }else if(how==="1"){
                   //前进处理
                let cur = curpos + 10;
                if (cur > dur) {
                  cur = dur-1;
                }
                wx.seekBackgroundAudio({
                  position: cur
                })
                wx.showToast({
                  title: '音乐前进10s',
                  duration: 800
                })

              }else{
                wx.showToast({
                  title: '非法操作，状态码不对',
                  duration: 500
                })
              }
          } else {
            wx.showToast({
              title: '音乐未播放',
              duration: 500
            })
          }
        }
      });
    }else{
      wx.showToast({
        title: '音乐未播放',
        duration: 500
      })
    }
  },

  onAudioState: function () {
    let that = this;
    //监听播放事件
    wx.onBackgroundAudioPlay(function () {
      that.setData({ isPlaying: true });
      console.log("on play");
    });

    //监听暂停事件
    wx.onBackgroundAudioPause(function () {
      that.setData({ isPlaying: false });
      console.log("on pause");
    })
  }


})