// @mui/icons-material
import { AdminPanelSettings, } from "@mui/icons-material";

// app pages
import LockPage from "views/auth/Lock.js";
import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";

var routesAuthControl = {
  collapse: true,
  name: "Auth Admin",
  icon: AdminPanelSettings,
  iconColor: "Warning",
  state: "securityCollapse",
  views: [
    {
      path: "/login",
      name: "Parse Token",
      component: Login,
      layout: "/admin",
    },
    {
      path: "/register",
      name: "Create Token",
      component: Register,
      layout: "/admin",
    },
    {
      path: "/lock",
      name: "Permissions",
      component: LockPage,
      layout: "/admin",
    },
  ]
};

export default routesAuthControl;
