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
        name: 'GoodsBrand',
        path: '/brand',
        redirect: {
          name: 'BrandList'
        },
        meta: {
          title: '品牌管理'
        },
        children: [
          {
            name: 'BrandList',
            path: '/brand-list',
            component: () => import('@/views/demo/brand-list/index.vue'),
            meta: {
              title: '品牌列表',
              code: 'B'
            }
          },
          {
            name: 'BrandOperation',
            path: '/brand-operation',
            component: () => import('@/views/demo/brand-operation/index.vue'),
            meta: {
              title: '品牌运营',
              code: 'C'
            }
          }
        ]
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
          code: 'D'
        }
      },
      {
        name: 'PurchaseOrderList',
        path: '/purchase-order-list',
        component: () => import('@/views/demo/purchase-order-list/index.vue'),
        meta: {
          title: '采购订单',
          code: 'E'
        }
      }
    ]
  }
]
