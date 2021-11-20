// @mui/icons-material
//////////////////////

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// tool components
//////////////////

import {SwissArmyProvider} from "./SwissArmyProvider"
import BufferDump from './pages/BufferDump';
import MessageGenerator from './pages/MessageGenerator';

var routesSwissArmy = {
  collapse: true,
  name: "Swiss Army Knife",
  icon: LocalHospitalIcon,
  iconColor: "Danger",
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
  ]
};

export default routesSwissArmy;
