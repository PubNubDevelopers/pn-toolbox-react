// @mui/icons-material
import { AdminPanelSettings } from "@mui/icons-material";
import { PushDebugProvider } from "tools/PushDebug/PushDebugProvider";

// app pages
import ParseToken from "./pages/ParseToken";
// import Page2 from "./pages/Page2.js";

var routesAuthAdmin = {
  collapse: true,
  name: "Auth Admin",
  icon: AdminPanelSettings,
  iconColor: "Primary",
  state: "appNameCollapse",
  views: [
    {
      path: "/parse-token",
      name: "ParseToken",
      component: ParseToken,
      parent: PushDebugProvider,
      layout: "/admin",
    },
    // {
    //   path: "/create-token",
    //   name: "Create Token",
    //   component: CreateToken,
    //   layout: "/admin",
    // },
    // {
    //   path: "/permissions",
    //   name: "Permissions",
    //   component: Permissions,
    //   layout: "/admin",
    // },
  ]
};

export default routesAuthAdmin;
