import Vue from 'vue'
import Router from 'vue-router'
// import Homepage from '@/components/homepage/Homepage'
// import search from '@/components/search/search'
// import school from '@/components/school/school'
// import news from '@/components/news/news'
// import weibo from '@/components/weibo/weibo'
// import zhihu from '@/components/zhihu/zhihu'
// import entry from '@/components/entry/entry'
// import event from '@/components/event/event'
// import about from '@/components/about/about'
// import cases from '@/components/cases/cases'
// import product from '@/components/product/product'
// import VueResource from 'vue-resource'
Vue.use(Router)
// Vue.use(VueResource)
export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect:'/Homepage',
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/Homepage',
      name: 'Homepage',
      // component: Homepage
      component:resolve => require(['@/components/homepage/Homepage'],resolve),
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/search',
      name: 'search',
      // component: search
      component:resolve => require(['@/components/search/search'],resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/school',
      name: 'school',
      // component: school
      component:resolve => require(['@/components/school/school'],resolve),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/entry',
      name: 'entry',
      // component: entry,
      component:resolve => require(['@/components/entry/entry'],resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // component: about
      component:resolve => require(['@/components/about/about'],resolve),
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/cases',
      name: 'cases',
      // component: cases,
      component:resolve => require(['@/components/cases/cases'],resolve),
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/product',
      name: 'product',
      // component: product,
      component:resolve => require(['@/components/product/product'],resolve),
      meta: {
        keepAlive: true,
      }
    },
    {
      path: '/event',
      name: 'event',
      // component:event,
      component:resolve => require(['@/components/event/event'],resolve),
      meta: {
        keepAlive: false
      },
      children:[
        {
          path: '/',
          name: '/',
          meta:{
            index:0,
            keepAlive: false
          },
          redirect:"/event/news",
        },
        {
          path: 'news',
          name: 'news',
          meta:{
            index:0,
            keepAlive: false
          },
          // component: news,
          component:resolve => require(['@/components/news/news'],resolve),
        },
        {
          path: 'weibo',
          name: 'weibo',
          meta:{
            index:1,
            keepAlive: false
          },
          // component:weibo
          component:resolve => require(['@/components/weibo/weibo'],resolve),
        },
        {
          path: 'zhihu',
          name: 'zhihu',
          meta:{
            index:2,
            keepAlive: false
          },
          // component: zhihu,
          component:resolve => require(['@/components/zhihu/zhihu'],resolve),
        },
      ]
    }
  ]
})

