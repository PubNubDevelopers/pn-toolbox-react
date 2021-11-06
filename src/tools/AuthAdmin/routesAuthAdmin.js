// @mui/icons-material
import { AdminPanelSettings } from "@mui/icons-material";
import { AuthAdminProvider } from "./AuthAdminProvider";

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
      parent: AuthAdminProvider,
      layout: "/admin",
    },
    // {
    //   path: "/create-token",
    //   name: "Create Token",
    //   component: CreateToken,
    //   parent: AuthAdminProvider,
    //   layout: "/admin",
    // },
  ]
};

export default routesAuthAdmin;
