import type { RouteMeta, RouteLocationNormalized } from 'vue-router'

export interface RouteItem extends RouteLocationNormalized {
  name: string
  meta: RouteMeta
  component?: any
  children?: RouteItem[]
}
