// @mui/icons-material
import { SendToMobile } from "@mui/icons-material";

// app pages
import PushTest from "./pages/PushTest";
import ManageDevice from "./pages/ManageDevice";
import ManageChannel from "./pages/ManageChannel"

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
      parent: "PushDebug/PushDebugApp",
      layout: "/admin",
    },
    {
      path: "/manage-device",
      name: "Manage Device",
      component: ManageDevice,
      parent: "PushDebug/PushDebugApp",
      layout: "/admin",
    },
    {
      path: "/manage-channel",
      name: "Manage Channel",
      component: ManageChannel,
      parent: "PushDebug/PushDebugApp",
      layout: "/admin",
    },
  ],
};

export default routesPushDebug;
