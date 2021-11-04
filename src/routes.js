import KeySet from "./KeySet";

// @mui/icons-material
import { VpnKey } from "@mui/icons-material";

// app routes
import routesPushDebug from "apps/PushDebug/routesPushDebug";
import routesAuthAdmin from "apps/AuthAdmin/routesAuthAdmin"
import PushDebugApp from "apps/PushDebug/PushDebugApp";

var routes = [
  {
    path: "/key-set",
    name: "Key Set",
    icon: VpnKey,
    iconColor: "Error",
    component: KeySet,
    layout: "/admin",
    parent: PushDebugApp,
    index: 0,
  },
  routesPushDebug,
  routesAuthAdmin,
  {
    divider: true,
  },
  // {
  //   title: "Documentation",
  // },
  // {
  //   href:
  //     "https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar",
  //   name: "Getting started",
  //   icon: Bolt,
  // },
];

export default routes;
