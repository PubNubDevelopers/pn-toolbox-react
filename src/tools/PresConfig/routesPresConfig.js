// @mui/icons-material
import { AppIconName, } from "@mui/icons-material";

// app pages
import PresConfigProvider from "pages/PresConfigProvider";
import ConfigForm from "pages/ConfigForm";

var routesPresConfig = {
  collapse: true,
  name: "Presence Config",
  icon: AppIconName,
  iconColor: "Primary",
  state: "presConfigCollapse",
  views: [
    {
      path: "/pres-config-form",
      name: "Presence Config Form",
      component: ConfigForm,
      parent: PresConfigProvider,
      layout: "/admin",
    },
  ]
};

export default routesPresConfig;
