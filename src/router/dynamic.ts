export default [
  {
    path: '/goods',
    redict: {
      name: 'GoodsList'
    },
    meta: {
      title: '商品管理',
      icon: 'goods'
    },
    children: [
      {
        name: 'GoodsList',
        path: '/goods-list',
        component: () => import('@/views/demo/goods-list/index.vue'),
        meta: {
          title: '商品列表',
          code: 'A'
        }
      },
      {
        name: 'GoodsCategory',
        path: '/goods-category',
        component: () => import('@/views/demo/goods-category/index.vue'),
        meta: {
          title: '商品分类',
          code: 'B'
        }
      }
    ]
  },
  {
    path: '/order',
    redict: {
      name: 'SaleOrderList'
    },
    meta: {
      title: '订单管理',
      icon: 'order'
    },
    children: [
      {
        name: 'SaleOrderList',
        path: '/sale-order-list',
        component: () => import('@/views/demo/sale-order-list/index.vue'),
        meta: {
          title: '销售订单',
          code: 'C'
        }
      },
      {
        name: 'PurchaseOrderList',
        path: '/purchase-order-list',
        component: () => import('@/views/demo/purchase-order-list/index.vue'),
        meta: {
          title: '采购订单',
          code: 'D'
        }
      },
      {
        name: '2',
        path: '/2',
        redirect: {
          name: '31'
        },
        meta: {
          title: '二级菜单'
        },
        children: [
          {
            name: '31',
            path: '/3-1',
            component: () => import('@/views/demo/3-1/index.vue'),
            meta: {
              title: '三级菜单一',
              code: 'E'
            }
          },
          {
            name: '32',
            path: '/3-2',
            component: () => import('@/views/demo/3-2/index.vue'),
            meta: {
              title: '三级菜单二',
              code: 'E'
            }
          }
        ]
      }
    ]
  }
]
