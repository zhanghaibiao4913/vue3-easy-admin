const Layout = () => import('@/views/layout/index.vue')

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
          affix: true
        }
      }
    ]
  },
  {
    path: '/redirect',
    redirect: {
      name: 'Redirects'
    },
    component: Layout,
    children: [
      {
        path: '/redirects',
        name: 'Redirects',
        component: () => import('@/views/redirect/index.vue'),
        meta: {
          title: '-',
          hideMenu: true
        }
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '404',
      hideMenu: true
    }
  }
]
