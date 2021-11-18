import KeySet from "tools/KeySet";
import ToolboxApp from "tools/ToolboxApp";

// @mui/icons-material
import { VpnKey } from "@mui/icons-material";

// tool routes
import routesPushDebug from "tools/PushDebug/routesPushDebug";
import routesObjectAdmin from "tools/ObjectAdmin/routesObjectAdmin";
import routesAuthAdmin from "tools/AuthAdmin/routesAuthAdmin"
import routesChannelGroups from "tools/ChannelGroups/routesChannelGroups";

var routes = [
  {
    path: "/key-set",
    name: "Key Set",
    icon: VpnKey,
    iconColor: "Error",
    component: KeySet,
    layout: "/admin",
    parent: ToolboxApp,
    index: 0,
  },

  {divider: true,},
  routesPushDebug,

  {divider: true,},
  routesObjectAdmin,

  {divider: true,},
  routesChannelGroups,

  {divider: true,},
  routesAuthAdmin,

  // copy/past these next two items and leave one for the next tools contributor
  // {divider: true,},
  // routes_AppName_,

  // ignore this - it's just a placeholder for future stuffs
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
