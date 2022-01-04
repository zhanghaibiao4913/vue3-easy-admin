/**
 * @description: 模拟登录
 * @param {string} account
 * @param {string} password
 * @return {*}
 */
export function login() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        userInfo: {
          id: '2849028540935234824098',
          name: '张三'
        },
        token: 'OIWEJKDSUIERERJAJFIETRTEPWESJFSK'
      })
    }, 1500)
  })
}

/**
 * @description: 获取用户权限编码
 * @return {*}
 */
export function getPermissionCodes() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        'ZH_GOODS_LIST',
        'ZH_SALE_ORDER_LIST',
        'ZH_PURCHASE_ORDER_LIST',
        'ZH_BRAND_LIST',
        'ZH_BRAND_OPERATION'
      ])
    }, 1500)
  })
}
