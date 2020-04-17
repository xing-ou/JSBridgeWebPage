/** hx js调用native  通用功能 相关的接口 */
class CommonApi {
  /** 拷贝到剪切板
        text : 需要拷贝到手机剪切板的文字
        callback:回调。
     */
  copyToClipBoard(text, callback) {
    this.sendCommonApiMessage("CopyToClipboard", { text: text }, callback);
  }
  /** 修改导航栏的title
     title : 导航栏的title
     callback:回调。
     */
  changeNavigationTitle(title, callback) {
    this.sendCommonApiMessage(
      "ChangeNavigationTitle",
      { title: title },
      callback
    );
  }
  
    getAppVersion(callback){
        this.sendCommonApiMessage("GetAppVersion", {}, callback);
    }

  sendCommonApiMessage(action, param, callback) {
    var msgBody = {};
    msgBody.moduleName = "Common";
    msgBody.actionName = action;
    msgBody.params = param;
    window.hxBridge.Core.sendMessage(msgBody, callback);
  }
}
