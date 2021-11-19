// @mui/icons-material
//////////////////////

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// tool components
//////////////////

import {SwissArmyProvider} from "./SwissArmyProvider.js"
import BufferDump from './pages/BufferDump';

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
  ]
};

export default routesSwissArmy;
