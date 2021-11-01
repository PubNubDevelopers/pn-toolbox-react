import KeySet from "./KeySet";

// @mui/icons-material
import { Bolt, VpnKey } from "@mui/icons-material";

// app routes
import routesPushDebug from "apps/PushDebug/routesPushDebug";
import routesAuthControl from "routesAuthControl";

var routes = [
  {
    path: "/index",
    name: "Key Set",
    icon: VpnKey,
    iconColor: "Error",
    component: KeySet,
    layout: "/admin",
    index: 0,
  },
  routesPushDebug,
  routesAuthControl,
  {
    divider: true,
  },
  {
    title: "Documentation",
  },
  {
    href:
      "https://www.creative-tim.com/learning-lab/material-ui/overview/argon-dashboard?ref=admui-admin-sidebar",
    name: "Getting started",
    icon: Bolt,
  },
];

export default routes;
