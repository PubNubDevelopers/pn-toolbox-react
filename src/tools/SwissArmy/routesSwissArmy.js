// @mui/icons-material
//////////////////////

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// tool components
//////////////////

import {SwissArmyProvider} from "./SwissArmyProvider"
import BufferDump from './pages/BufferDump';
import StatsViewer from './pages/StatsViewer';
import MessageGenerator from './pages/MessageGenerator';
import ChannelBrowser from './pages/ChannelBrowser';
import MessageDelete from './pages/MessageDelete';
// import PnConfig from './pages/PnConfig';

var routesSwissArmy = {
  collapse: true,
  name: "Swiss Army Knife",
  icon: LocalHospitalIcon,
  iconColor: "Error",
  state: "swissArmyCollapse",
  views: [
    {
      path: "/swissarmy/buffer-dump",
      name: "Buffer Dump",
      component: BufferDump,
      parent: SwissArmyProvider,
      layout: "/admin",
    },
    {
      path: "/swissarmy/message-generator",
      name: "Message Generator",
      component: MessageGenerator,
      parent: SwissArmyProvider,
      layout: "/admin",
    },
    {
      path: "/swissarmy/stats-viewer",
      name: "Stats Viewer",
      component: StatsViewer,
      parent: SwissArmyProvider,
      layout: "/admin",
    },
    {
      path: "/swissarmy/channel-browser",
      name: "Channel Browser",
      component: ChannelBrowser,
      parent: SwissArmyProvider,
      layout: "/admin",
    },
    {
      path: "/swissarmy/message-delete",
      name: "Message Delete",
      component: MessageDelete,
      parent: SwissArmyProvider,
      layout: "/admin",
    },
    // {
    //   path: "/swissarmy/pnconfig",
    //   name: "pnconfig-cli",
    //   component: PnConfig,
    //   parent: SwissArmyProvider,
    //   layout: "/admin",
    // },
  ]
};

export default routesSwissArmy;
