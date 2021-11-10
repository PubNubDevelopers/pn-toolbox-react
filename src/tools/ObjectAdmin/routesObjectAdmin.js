// @mui/icons-material
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

// app pages
import { ObjectAdminProvider } from "./ObjectAdminProvider";
import ChannelMembersList from './pages/ChannelMembersList';
import ChannelMetadata from './pages/ChannelMetadata';
import ChannelMetadataList from './pages/ChannelMetadataList';
import ImportMetadata from './pages/ImportMetadata';

var routesObjectAdmin = {
  collapse: true,
  name: "Objects Admin",
  icon: SettingsEthernetIcon,
  iconColor: "Primary",
  state: "objectAdminCollapse",
  views: [
    {
      path: "/channel-metadata",
      name: "Channel Form",
      component: ChannelMetadata,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {
      path: "/channel-metadata-list",
      name: "Get Channels",
      component: ChannelMetadataList,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {
      path: "/channel-members-list",
      name: "Get Channel Members",
      component: ChannelMembersList,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {
      path: "/import-metadata",
      name: "Import Metadata",
      component: ImportMetadata,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
  ]
};

export default routesObjectAdmin;
