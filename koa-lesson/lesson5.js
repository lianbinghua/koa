import Koa from 'koa'
import Router from 'koa-router'
import mid1 from './middleware/mid1'
const app = new Koa()
const router = new Router()

app.use(mid1())

router.get('/', async ctx => {
  ctx.body = '1111'
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)