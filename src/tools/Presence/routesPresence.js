// app pages
import { Extension } from "@mui/icons-material";
import PresenceACLs from "./pages/PresenceACLs";
import { PresenceProvider } from "./PresenceProvider";


var routesPresence = {
  collapse: true,
  name: "Presence",
  icon: Extension,
  iconColor: "Primary",
  state: "presConfigCollapse",
  views: [
    {
      path: "/presence/acl-config",
      name: "Presence ACLs",
      component: PresenceACLs,
      parent: PresenceProvider,
      layout: "/admin",
    },
  ]
};

export default routesPresence;
