// @mui/icons-material
import { SendToMobile } from "@mui/icons-material";

// app pages
import PushTest from "./pages/PushTest";
import ManageDevice from "./pages/ManageDevice";
import ManageChannel from "./pages/ManageChannel"
import PushDebugApp from "./PushDebugApp";

var routesPushDebug = {
  collapse: true,
  name: "Push Debug",
  icon: SendToMobile,
  iconColor: "Primary",
  state: "pushDebugCollapse",
  views: [
    {
      path: "/push-test",
      name: "Push Test",
      component: PushTest,
      parent: PushDebugApp,
      layout: "/admin",
    },
    {
      path: "/manage-device",
      name: "Manage Device",
      component: ManageDevice,
      parent: PushDebugApp,
      layout: "/admin",
    },
    {
      path: "/manage-channel",
      name: "Manage Channel",
      component: ManageChannel,
      parent: PushDebugApp,
      layout: "/admin",
    },
  ],
};

export default routesPushDebug;
