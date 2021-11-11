// @mui/icons-material
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';


// app pages
import { ObjectAdminProvider } from "./ObjectAdminProvider";
import ChannelMembersList from './pages/ChannelMembersList';
import ChannelMetadata from './pages/ChannelMetadata';
import ChannelMetadataList from './pages/ChannelMetadataList';
import ImportMetadata from './pages/ImportMetadata';
import UserMetadata from './pages/UserMetadata';

var routesObjectAdmin = {
  collapse: true,
  name: "Objects Admin",
  icon: SettingsEthernetIcon,
  iconColor: "Primary",
  state: "objectAdminCollapse",
  views: [
    {
      path: "/objects/channel-metadata",
      name: "Channel Form",
      component: ChannelMetadata,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {
      path: "/objects/channel-metadata-list",
      name: "Get Channels",
      component: ChannelMetadataList,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {divider: true,},
    {
      path: "/objects/user-metadata",
      name: "User Form",
      component: UserMetadata,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {divider: true,},
    {
      path: "/channel-members-list",
      name: "Get Channel Members",
      component: ChannelMembersList,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {divider: true,},
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
