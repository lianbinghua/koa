import Koa from 'koa'
import Router from 'koa-router'
import views from 'koa-views' //模板引擎
import source from 'koa-static' //静态资源处理

const app = new Koa()
const router = new Router()
// app.use(views('./views', {
//   map: {
//     ejs: "ejs",
//     html: "underscore"
//   }
// }))

app.use(source('./static'))
app.use(views('./views', {
  extension: 'ejs'
}))
router.get('/', async ctx => {
  await ctx.render('./index', {
    user: {
      name: "韩磊"
    },
    list: [1, 2, 3]
  })
})

app.use(router.routes()).use(router.allowedMethods())
app.listen(3000)