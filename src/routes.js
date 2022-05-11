import KeySet from "tools/KeySet";
import PnDashboard from "tools/PnDashboard";
import ToolboxApp from "tools/ToolboxApp";

// @mui/icons-material
import { VpnKey, Dashboard } from "@mui/icons-material";

// tool routes
import routesPushDebug from "tools/PushDebug/routesPushDebug";
import routesObjectAdmin from "tools/ObjectAdmin/routesObjectAdmin";
import routesAuthAdmin from "tools/AuthAdmin/routesAuthAdmin"
import routesChannelGroups from "tools/ChannelGroups/routesChannelGroups";
import routesSwissArmy from "tools/SwissArmy/routesSwissArmy";
import routesPresence from "tools/Presence/routesPresence";

var routes = [
  {
    path: "/pndashboard",
    name: "PN Dashboard",
    icon: Dashboard,
    iconColor: "Error",
    component: PnDashboard,
    layout: "/admin",
    parent: ToolboxApp,
    index: 0,
  },
  {
    path: "/key-set",
    name: "Key Set",
    icon: VpnKey,
    iconColor: "Error",
    component: KeySet,
    layout: "/admin",
    parent: ToolboxApp,
    index: 1,
  },

  {divider: true,},
  routesPushDebug,

  {divider: true,},
  routesObjectAdmin,

  {divider: true,},
  routesChannelGroups,

  {divider: true,},
  routesAuthAdmin,

  {divider: true,},
  routesPresence,

  {divider: true,},
  routesSwissArmy,

  // copy/paste these next two items above the "routesSwissArmy" divider and leave this one for the next tools contributor
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
