/** hx js调用native 微信相关的接口 */

class AppWechatApi {
  /** 微信是否安装， 回调参数的data为"yes"代表安装了,为"no"代表没安装 */
  isWechatInstalled(callback) {
    this.sendWechatApiMessage("IsWechatInstall", {}, callback);
  }
  /** 分享到朋友圈
        contentType: 
            为'image'时,content传入图片的base64字符串
            为'text'时，content传入分享文字
        content: 分享的内容
        callback: 回调参数的data为分享结果code
        下面是微信定义的code错误码：
        WXSuccess           = 0,    < 成功
        WXErrCodeCommon     = -1,   < 普通错误类型
        WXErrCodeUserCancel = -2,   < 用户点击取消并返回
        WXErrCodeSentFail   = -3,   < 发送失败
        WXErrCodeAuthDeny   = -4,   < 授权失败
        WXErrCodeUnsupport  = -5,   < 微信不支持
     */
  shareToTimeLine(content, contentType, callback) {
    this.sendWechatApiMessage(
      "ShareToTimeLine",
      { content: content, contentType: contentType },
      callback
    );
  }

  /** 分享给朋友，contentType为'image'时,content传入图片的base64字符串，contentType为'text'时，content传入分享文字
        回调参数的data字段同shareToTimeLine
     */
  shareToSenceSession(content, contentType, callback) {
    this.sendWechatApiMessage(
      "ShareToSceneSession",
      { content: content, contentType: contentType },
      callback
    );
  }
  /** 微信登录 */
  wechatLogin(callback) {
    this.sendWechatApiMessage("WechatLogin", {}, callback);
  }
  /** 分享小程序
     -- miniProgObj:为分享的小程序对象，如下：
     {
        "webpageUrl":"" //低版本网页链接,长度不能超过1024字节
        "userName":"" //小程序名称
        "path": "" //小程序页面路径
        "hdImageData": "" //小程序新版本的预览图，大小不能超过128k
        "miniProgramType": 0 // 分享小程序的版本, 0 代表正式版， 1开发版， 2 体验版
     }
     -- shareMsgInfo：为分享的小程序消息的相关内容
     {
        "title":"" //分享消息的title
        "description": "" //分享消息的description
        "thumbData": "" //兼容旧版本节点的图片，小于32K，优先使用hdImageData
     }

     -- callback:回调，回调参数的data字段同shareToTimeLine
     */
  shareToMiniProgram(miniProgObj, shareMsgInfo, callback) {
    this.sendWechatApiMessage(
      "ShareToMiniProgram",
      { miniProgObj: miniProgObj, shareMsgInfo: shareMsgInfo },
      callback
    );
  }

  sendWechatApiMessage(action, param, callback) {
    var msgBody = {};
    msgBody.moduleName = "WechatApi";
    msgBody.actionName = action;
    msgBody.params = param;
    window.hxBridge.Core.sendMessage(msgBody, callback);
  }
}
