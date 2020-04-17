/** hx js调用native  跳转功能 相关的接口 */
class RouterApi {
  /** 跳转到订单列表 */
  goToOrderList(callback) {
    this.sendRouterApiMessage("GoToOrderList", {}, callback);
  }
    
  /** 跳转课程页面 */
    goToCourseList(callback) {
        this.sendRouterApiMessage("GoToCourseList", {}, callback);
    }

  sendRouterApiMessage(action, param, callback) {
    var msgBody = {};
    msgBody.moduleName = "NativeRouter";
    msgBody.actionName = action;
    msgBody.params = param;
    window.hxBridgeCore.sendMessage(msgBody, callback);
  }
}

window.hxBridgeRouterApi = new RouterApi();
