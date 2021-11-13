// @mui/icons-material
import { SendToMobile } from "@mui/icons-material";

// app pages
import PushTest from "./pages/PushTest";
import ManageDevice from "./pages/ManageDevice";
import ManageChannel from "./pages/ManageChannel"
import { PushDebugProvider } from "./PushDebugProvider";

var routesPushDebug = {
  collapse: true,
  name: "Push Debug",
  icon: SendToMobile,
  iconColor: "Primary",
  state: "pushDebugCollapse",
  views: [
    {
      path: "/push/push-test",
      name: "Push Test",
      component: PushTest,
      parent: PushDebugProvider,
      layout: "/admin",
    },
    {
      path: "/push/manage-device",
      name: "Manage Device",
      component: ManageDevice,
      parent: PushDebugProvider,
      layout: "/admin",
    },
    {
      path: "/push/manage-channel",
      name: "Manage Channel",
      component: ManageChannel,
      parent: PushDebugProvider,
      layout: "/admin",
    },
  ],
};

export default routesPushDebug;
