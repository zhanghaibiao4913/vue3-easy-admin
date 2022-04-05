<p align="center">
  <img src="https://zhanghaibiao4913.github.io/vue3-easy-admin/assets/logo.29a35495.png" width="250" height="100" />
</p>

<h1 align="center">vue3-easy-admin</h1>

<p align="center">一个<b>简洁、开箱即用</b>的 Vue3 后台管理系统</p>

## 技术栈

* Vue3
* Vite2
* ts
* vue-router
* Pinia.js
* element-plus
* axios
* VueUse

## 预览
[在线预览](https://zhanghaibiao4913.github.io/vue3-easy-admin)

<p align="center">
  <img src="https://s2.loli.net/2022/01/05/G17mxrzQERXWID3.png" />
</p>
<br/>
<p align="center">
  <img src="https://s2.loli.net/2022/01/05/BHG5lfhpcOYZJ16.png" />
</p>

## 开发环境参考
```
node >= v14.18.0
npm >= 6.14.15
vscode
vscode插件：Volar、Elsint、Prettier
```

## 快速开始

### clone 项目
```
git clone https://github.com/zhanghaibiao4913/vue3-easy-admin.git
```

### 下载依赖
```
npm install
```

### 本地开发
```
npm run dev
```

### 构建
```javascript
// 生产
npm run build

// 测试
npm run build:staging

// 预览本地构建的产物
npm run serve
```

## 特点

- 基础布局集成
- 登录逻辑+路由拦截
- 支持菜单权限，动态生成路由菜单，内置权限按钮指令
- 多级路由缓存方案
- Eslint + Prettier + Git Hooks 统一代码规范
- Vue api 自动引入，无需手动import
## 项目说明

### 配置
#### 公共配置文件
.env文件所有环境下都会加载，可以在里面添加一些无需区分环境的配置项。
```javascript
// .env
VITE_TOKEN_KEY="authorization"
```

```javascript
// 获取配置的常量
const tokenKey = import.meta.env.VITE_TOKEN_KEY
```

#### 本地开发配置文件
```javascript
// .env.dev
VITE_BASE_URL="http://localhost:8088"
```

#### 测试环境配置文件
```javascript
// .env.staging
VITE_BASE_URL="http://test.com:8088"
```

#### 生产环境配置文件
```javascript
// .env.production
VITE_BASE_URL="http://prop.com"
```

### 路由

- router
  - constant.ts // 静态路由
  - dynamic.ts // 动态路由

#### 权限路由
页面会缓存接口返回的权限编码`permissionCodes`，如果动态路由里在`meta`定义的`code`不在改数组里，则将其过滤掉，从而生成对应的菜单权限。

![](https://s2.loli.net/2022/01/05/TrzEm41IFqiAjDS.png)

#### 配置项
```javascript
{
  path: '/xxx' // 路由路径，需唯一，且以/开头
  name: '' // 路由名称，需唯一，注意要与.vue文件里的name保持一致，否则keep-alive会不生效
  meta: {
    title: '' // 页面名称
    icon: '' // 菜单icon，与assets/svg下的文件名对应，只在一级菜单上才显示
    hideMenu: false // 是否在菜单隐藏，默认false
    affix: false // 是否固定在页签上，默认false
    code: '' // 路由权限编码，若接口返回的编码数组里存在此code则显示此路由
    keepAlive: true // 是否缓存路由，默认true
    auth: true // 是否需要登录才能进入，默认true
  }
}
```

#### 多级路由（三级或以上）
三级或以上的路由会扁平化处理，用以解决多级路由缓存失效问题。
在配置路由时不需要设置`component`。
```javascript
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
```

### svg图标
在`assets/svg`下新增图标，如demo.svg，接着便可以在页面直接使用了
```html
<svg-icon name="demo" />
```
添加自定义class类名
```html
<svg-icon name="demo" icon-class="" />
```

### 权限指令
```html
<el-button v-auth="'BTN_EDIT'">编辑</el-button>
```
