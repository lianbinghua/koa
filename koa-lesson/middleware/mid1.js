export default () => {
  return async (ctx, next) => {

    await next()
  }
}
//中间件必须导出一个函数，函数里面必须返回一个异步函数，里面有next方法