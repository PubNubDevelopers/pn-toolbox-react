// @mui/icons-material
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';

// app pages
import { ObjectAdminProvider } from "./ObjectAdminProvider";
import ChannelForm from './pages/ChannelForm';
import ChannelMetadataList from './pages/ChannelsList';
import UserForm from './pages/UserForm';
import MembersList from './pages/MembersList';
import ImportChannels from './pages/ImportChannels';
import ImportUsers from './pages/ImportUsers';

var routesObjectAdmin = {
  collapse: true,
  name: "Objects Admin",
  icon: SettingsEthernetIcon,
  iconColor: "Primary",
  state: "objectAdminCollapse",
  views: [
    {
      path: "/objects/channel-form",
      name: "Channel Form",
      component: ChannelForm,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {
      path: "/objects/channels-list",
      name: "Get Channels",
      component: ChannelMetadataList,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {divider: true,},
    {
      path: "/objects/user-form",
      name: "User Form",
      component: UserForm,
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
