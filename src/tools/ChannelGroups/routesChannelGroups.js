// @mui/icons-material
////////////////////

import ListAltIcon from '@mui/icons-material/ListAlt';

// tool components
//////////////////

import {ChannelGroupProvider} from './ChannelGroupProvider.js';
import ManageChannels from "./pages/ManageChannels.js"

var routesChannelGroups = {
  collapse: true,
  name: "Channel Groups",
  icon: ListAltIcon,
  iconColor: "Primary",
  state: "_appName_Collapse",
  views: [
    {
      path: "/channelgroups/manage-channels",
      name: "Manage Channels",
      component: ManageChannels,
      parent: ChannelGroupProvider,
      layout: "/admin",
    },
  ]
};

export default routesChannelGroups;
