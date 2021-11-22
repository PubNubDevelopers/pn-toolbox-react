// @mui/icons-material
import AccountTreeIcon from '@mui/icons-material/AccountTree';

// app pages
import { ObjectAdminProvider } from "./ObjectAdminProvider";

import ChannelForm from './pages/ChannelForm';
import ChannelsSearch from './pages/ChannelsSearch';

import UserForm from './pages/UserForm';
import UsersSearch from './pages/UsersSearch';

import MembersSearch from './pages/MembersSearch';
import MembershipsSearch from './pages/MembershipsSearch';

import ImportChannels from './pages/ImportChannels';
import ImportUsers from './pages/ImportUsers';


var routesObjectAdmin = {
  collapse: true,
  name: "Objects",
  icon: AccountTreeIcon,
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
      path: "/objects/channels-search",
      name: "Channels Search",
      component: ChannelsSearch,
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
    {
      path: "/objects/users-search",
      name: "Search Users",
      component: UsersSearch,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {divider: true,},
    {
      path: "/objects/members-search",
      name: "Members Search",
      component: MembersSearch,
      parent: ObjectAdminProvider,
      layout: "/admin",
    },
    {
      path: "/objects/memberships-search",
      name: "Memberships Search",
      component: MembershipsSearch,
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
