const Layout = () => import('@/views/layout/index.vue')

export default [
  {
    path: '/goods',
    redict: {
      name: 'GoodsList'
    },
    component: Layout,
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
          code: 'ZH_GOODS_LIST'
        }
      },
      {
        name: 'GoodsBrand',
        path: '/brand',
        redirect: {
          name: 'BrandList'
        },
        component: null,
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
              code: 'ZH_BRAND_LIST'
            }
          },
          {
            name: 'BrandOperation',
            path: '/brand-operation',
            component: () => import('@/views/demo/brand-operation/index.vue'),
            meta: {
              title: '品牌运营',
              code: 'ZH_BRAND_OPERATION'
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
    component: Layout,
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
          code: 'ZH_SALE_ORDER_LIST'
        }
      },
      {
        name: 'PurchaseOrderList',
        path: '/purchase-order-list',
        component: () => import('@/views/demo/purchase-order-list/index.vue'),
        meta: {
          title: '采购订单',
          code: 'ZH_PURCHASE_ORDER_LIST'
        }
      }
    ]
  }
]