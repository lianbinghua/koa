import Koa from 'koa'
import Router from 'koa-router'
import {
  runInNewContext
} from 'vm';
const app = new Koa()
const router = new Router()

router.get('/', async ctx => {
  ctx.body = "hello world1111"
})

router.get('/list', async ctx => {
  ctx.body = [1, 2, 300]
})

router.get('/list/:name', async ctx => {
  ctx.body = {
    name: ctx.params.name,
    time: Date.now()
  }
})

router.post('/list2', async ctx => {
  ctx.body = 'list'
})

router.get('/find', async ctx => {
  ctx.redirect('/list')
})

const group = new Router({
  prefix: '/group'
})

group.get('/', async ctx => {
  ctx.body = "group"
})
group.get('/list', async ctx => {
  ctx.body = [4, 5, 6]
})

//多层路由
const sub = new Router({
  prefix: '/sub'
})

sub.get('/forms/:uid', async ctx => {
  ctx.body = {
    code: 0,
    uid: ctx.params.uid,
    time: Date.now()
  }
})

sub.get('/forms', async ctx => {
  ctx.body = {
    code: 0,
    forms: true
  }
})

//嵌套路由 http://localhost:3000/nest/sub/forms/123
const nest = new Router()
nest.use('/nest', sub.routes())
//allowedMethods,1.先处理option请求 2.如果post请求访问的时候用get，会提示只支持post请求。如果没有用allowedMethods将不会有以上两点

//多重路由
const db = new Router()
db.get('/db/:id', async (ctx, next) => {
  ctx.time = Date.now()
  next()
}, async (ctx, next) => {
  ctx.user = "qqqqq"
  next()
}, async ctx => {
  ctx.body = {
    time: ctx.time,
    user: ctx.user
  }
})

app.use(router.routes()).use(router.allowedMethods())
app.use(group.routes())
app.use(sub.routes())
app.use(nest.routes())
app.use(db.routes())
app.listen(3000)