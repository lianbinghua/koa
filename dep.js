//类vue的响应式如何实现？
//订阅器模式
let Dep = {
  clientList: {},
  //订阅
  listen: function (key, fn) {
    (this.clientList[key] || (this.clientList[key] = [])).push(fn)
  },
  //发布
  trigger: function () {
    let key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }
    for (let i = 0, fn; fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  }
}
//劫持方法
let dataHijack = function ({
  data,
  tag,
  datakey,
  selector
}) {
  let value = '',
    el = document.querySelector(selector);
  Object.defineProperty(data, datakey, {
    get: function () {
      return value;
    },
    set: function (newVal) {
      value = newVal;
      //数据改变通知所有订阅者
      Dep.trigger(tag, newVal);
    }
  });
  //添加订阅者
  Dep.listen(tag, function (text) {
    el.innerText = text;
  })
}