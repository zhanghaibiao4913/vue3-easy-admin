export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    title: string
    code?: string
    auth?: boolean
    hideMenu?: boolean
    affix?: boolean
  }
}
