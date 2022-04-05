const Layout = () => import('@/layout/index.vue')

export default [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
      auth: false,
      hideMenu: true
    }
  },
  {
    path: '/',
    redirect: {
      name: 'Home'
    },
    component: Layout,
    meta: {
      title: '首页',
      icon: 'home'
    },
    children: [
      {
        name: 'Home',
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        meta: {
          title: '首页',
          affix: true,
          keepAlive: false
        }
      }
    ]
  },
  {
    path: '/redirect',
    redirect: {
      name: 'RedirectTo'
    },
    component: Layout,
    children: [
      {
        path: '/redirect-to',
        name: 'RedirectTo',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: '-',
          hideMenu: true
        }
      }
    ]
  }
]

// 404
export const notFoundRoute = {
  path: '/:path(.*)*',
  name: 'NotFound',
  component: () => import('@/views/error/404.vue'),
  meta: {
    title: '404',
    hideMenu: true
  }
}
