import loadable from "@loadable/component"
import { RouteConfig } from "react-router-config"

import options from "config/@loadable__component"

const routes: Array<RouteConfig> = [
  {
    path: "/",
    exact: true,
    component: loadable(() => import("pages/home"), options),
  },
  {
    path: "/charts/keyboard",
    component: loadable(() => import("pages/charts/keyboard"), options),
  },
  {
    path: "/charts/line",
    component: loadable(() => import("pages/charts/line"), options),
  },
  {
    path: "/charts/mix-chart",
    component: loadable(() => import("pages/charts/mix-chart"), options),
  },
  {
    path: "/icons",
    component: loadable(() => import("pages/icons"), options),
  },
  {
    path: "/pdf",
    component: loadable(() => import("pages/pdf"), options),
  },
  {
    path: "/clipboard",
    component: loadable(() => import("pages/clipboard"), options),
  },
  {
    path: "/excel/export-excel",
    component: loadable(() => import("pages/excel/export-excel"), options),
  },
  {
    path: "/excel/export-selected-excel",
    component: loadable(() => import("pages/excel/selected-excel"), options),
  },
  {
    path: "/excel/export-merge-header",
    component: loadable(() => import("pages/excel/merge-header"), options),
  },
  {
    path: "/excel/upload-excel",
    component: loadable(() => import("pages/excel/upload-excel"), options),
  },
  {
    path: "/hello-world",
    component: loadable(() => import("pages/hello-world"), options),
  },
  {
    path: "/version/:version",
    component: loadable(() => import("pages/version"), options),
  },
]

export default routes
