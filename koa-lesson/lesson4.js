import Koa from 'koa'
import Router from 'koa-router'
// import bodyParser from 'koa-bodyparser'
import body from 'koa-better-body'
const app = new Koa()
const router = new Router()
app.use(body())
router.get('/from', async ctx => {
  ctx.body = ctx.query
})
router.post('/from', async ctx => {
  ctx.body = ctx.request.fields
})
// app.use(bodyParser())
// router.get('/from', async ctx => {
//   ctx.body = ctx.query
// })
// router.post('/from', async ctx => {
//   ctx.body = ctx.request.body
// })
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)