/** HXBridge  是 js 调用原生api的入口， 他封装了所有的api */
class HXBridge {
  constructor() {
    this.Core = new Core();
    this.AppWechatApi = new AppWechatApi();
    this.CommonApi = new CommonApi();
  }

  //监听移动端主动发起的事件
  addEventListener(moduleName, eventName, handler) {
    if (handler && typeof handler === "function") {
      var key = moduleName + eventName;
      this.Core.eventCallMap[key] = handler;
    }
  }
}

window.hxBridge = {};
