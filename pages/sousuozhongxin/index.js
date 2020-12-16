// pages/n8/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inpValue: "",
    items: null
  },

  /**
   * 生命周期函数--监听页面加载
   */

  handleInput: function(e){
    this.setData({
      inpValue: e.detail.value
    })
  },

  saveImage: function(img_data) {
    var img_src = new Array();
    for (var i = 0; i < img_data.length - 1; i++) {
      img_src[i] = img_data[i].middleURL;
    }
    return img_src;
  },
  
  searchImg: function(keyword) {
    //百度地址
    var pn = 0;
    var url = 'https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&ct=201326592&is=&fp=result&queryWord=' + keyword + '&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=-1&z=&ic=0&word=' + keyword + '&s=&se=&tab=&width=&height=&face=0&istype=2&qc=&nc=1&fr=&pn=' + pn + '&rn=30';
    console.log(url);
    var that = this;
    wx.request({
      url: url, 
      data: {},
      header: {'content-type': 'application/json'},
      success (res) {
        var body = res.data;
        console.log(body);
        that.setData({
          items: that.saveImage(body.data)
        });
        console.log('总共' + body.data.length + '条');
      }
    })
  },
  
  search: function(e){
    this.searchImg(this.data.inpValue);
  },

   //保存图片
   longPress:function(e){
    let that = this;
    let url = e.currentTarget.dataset.url;
    wx.showModal({
      title: '提示',
      content: '确定保存图片？',
      success(res){
        if (res.confirm) {
          wx.downloadFile({
            url: url,
            success: function (res) {
              //图片保存到本地
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success: function (data) {
                  wx.showToast({
                    title: '保存成功!',
                  })
                },
                fail: function (err) {
                  if (err.errMsg === "saveImageToPhotosAlbum:fail cancel") {
                    wx.showToast({
                      title: '保存失败!',
                      icon: 'none'
                    })
                  }
                },
              })
            },
            fail: function (res) {
              wx.showModal({
                title: '文件下载错误',
                content: res.errMsg,
              })
            },
          })
        } else if (res.cancel) {
        }
      }
    })
  },

  onLoad: function (options) {

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

  }
})