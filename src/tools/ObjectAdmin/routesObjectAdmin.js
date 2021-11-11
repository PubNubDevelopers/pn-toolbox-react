// @mui/icons-material
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

// app pages
import { ObjectAdminProvider } from "./ObjectAdminProvider";
import ChannelMetadata from './pages/ChannelMetadata';
import ChannelMetadataList from './pages/ChannelMetadataList';
import ImportChannels from './pages/ImportChannels';
import ImportUsers from './pages/ImportUsers';
import UserMetadata from './pages/UserMetadata';
import MembersList from './pages/MembersList';

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
      path: "/objects/members-list",
      name: "Get Members",
      component: MembersList,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {divider: true,},
    {
      path: "/objects/import-channels",
      name: "Import Channels",
      component: ImportChannels,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {
      path: "/objects/import-users",
      name: "Import Users",
      component: ImportUsers,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
  ]
};

export default routesObjectAdmin;
