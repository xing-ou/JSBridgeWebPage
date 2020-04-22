/** hx js和native通信相关的东西  */
class Core {
  constructor() {
    this.ua = navigator.userAgent;
    this.isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(this.ua);
    this.isIOS = !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.msgCallbackMap = {};
    this.eventCallMap = {};
  }

  getNextCallbackID() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(
      c
    ) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
  }

  sendMessage(msg, callback) {
    console.log("调用嘞sendMessage")
    var msgObj = msg;
    if (callback && typeof callback === "function") {
      var callbackid = this.getNextCallbackID();
      this.msgCallbackMap[callbackid] = callback;
      msgObj.callbackId = callbackid;
      msgObj.callbackName = "window.hxBridge.Core.callbackDispatcher";
    }

    if (this.isIOS) {
      console.log("进入了isIOS")
      try {
        window.webkit.messageHandlers.WKJSBridge.postMessage(msgObj);
      } catch (error) {
        console.log("error native message");
      }
    } else if (this.isAndroid) {
      console.log("进入了isAndroid")
      try {
        nativeObject.postMessage(JSON.stringify(msgObj));
      } catch (error) {
        console.log("error native message");
      }
    }
    console.log("ua是:" + this.ua)
  }

  callbackDispatcher(callbackId, resultjson) {
    var handler = this.msgCallbackMap[callbackId];
    if (handler && typeof handler === "function") {
      console.log(resultjson);
      var resultObj = resultjson ? JSON.parse(resultjson) : {};
      //执行回调
      handler(resultObj);
      //删除 注册的 callback
      delete this.msgCallbackMap[callbackId];
    }
  }

  eventDispatcher(eventName, params) {
    var handler = this.eventCallMap[eventName];
    if (handler && typeof handler === "function") {
      var param = param ? JSON.parse(params) : {};
      //执行回调
      var value = handler(param);
      return value;
    }
  }
}
