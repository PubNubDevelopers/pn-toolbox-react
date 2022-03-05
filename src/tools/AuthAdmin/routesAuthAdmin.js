// @mui/icons-material
import { AdminPanelSettings } from "@mui/icons-material";
import { AuthAdminProvider } from "./AuthAdminProvider";

// app pages
import ParseToken from "./pages/ParseToken";
import GrantToken from "./pages/GrantToken";
import PermTest from "./pages/PermTest";

var routesAuthAdmin = {
  collapse: true,
  name: "Access Manager",
  icon: AdminPanelSettings,
  iconColor: "Primary",
  state: "appNameCollapse",
  views: [
    {
      path: "/auth/parse-token",
      name: "ParseToken",
      component: ParseToken,
      parent: AuthAdminProvider,
      layout: "/admin",
    },
    {
      path: "/auth/grant-token",
      name: "Grant Token",
      component: GrantToken,
      parent: AuthAdminProvider,
      layout: "/admin",
    },
    {
      path: "/auth/test-perms",
      name: "Test Permissions - v2",
      component: PermTest,
      parent: AuthAdminProvider,
      layout: "/admin",
    },
  ]
};

export default routesAuthAdmin;
