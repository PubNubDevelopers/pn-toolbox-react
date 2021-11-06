// @mui/icons-material
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

// app pages
import { ObjectAdminProvider } from "./ObjectAdminProvider";
import ChannelMetadata from './pages/ChannelMetadata';

var routesObjectAdmin = {
  collapse: true,
  name: "Object Admin",
  icon: SettingsEthernetIcon,
  iconColor: "Primary",
  state: "objectAdminCollapse",
  views: [
    {
      path: "/channel-metadata",
      name: "Channel Metadata",
      component: ChannelMetadata,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
  ]
};

export default routesObjectAdmin;
