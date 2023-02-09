// 节流 持续触发事件，每隔一段时间，只执行一次事件
export function throttle(func, wait) {
    var context, args;
    var previous = 0;
    return function () {
      var now = +new Date();
      context = this;
      args = arguments;
      if (now - previous > wait) {
        func.apply(context, args);
        previous = now;
      }
    };
  }