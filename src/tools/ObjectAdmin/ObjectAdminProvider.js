import { createContext, useContext, useState } from 'react'

const Context = createContext();

export const ObjectAdminProvider = ({ children }) => {

  // ChannelForm State
  const [channelId, setChannelId] = useState();
  const [channelName, setChannelName] = useState([]);
  const [channelDesc, setChannelDesc] = useState([]);
  const [channelCustom, setChannelCustom] = useState([]);
  const [channelUpdated, setChannelUpdated] = useState([]);
  const [channelEtag, setChannelEtag] = useState([]);

   // UserForm State
   const [userId, setUserId] = useState();
   const [userName, setUserName] = useState([]);
   const [userExternalId, setUserExternalId] = useState([]);
   const [userProfileUrl, setUserProfileUrl] = useState([]);
   const [userEmail, setUserEmail] = useState([]);
   const [userCustom, setUserCustom] = useState([]);
   const [userUpdated, setUserUpdated] = useState([]);
   const [userEtag, setUserEtag] = useState([]); 

   const [maxRows, setMaxRows] = useState(500);

  // ChannelsSearch State
  const [channelFilter, setChannelFilter] = useState('name LIKE "*"');
  const [channelMetadataResults, setChannelMetadataResults] = useState([]);
  const [totalChannels, setTotalChannels] = useState(0);

  // UsersSearch State
  const [userFilter, setUserFilter] = useState('name LIKE "*"');
  const [userMetadataResults, setUserMetadataResults] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);

  // ChannelMembersSearch State
  const [channelMembersResults, setChannelMembersResults] = useState([]);
  const [memberFilter, setMemberFilter] = useState();
  const [totalMembers, setTotalMembers] = useState(0);

  // ChannelMembershipsSearch State
  const [channelMembershipsResults, setChannelMembershipsResults] = useState([]);
  const [membershipFilter, setMembershipFilter] = useState();
  const [totalMemberships, setTotalMemberships] = useState(0);

  // expose data/functions to context users
  /////////////////////////////////////////

  const useObjectAdminData = {
    // ChannelForm State
    channelId, setChannelId,
    channelName, setChannelName,
    channelDesc, setChannelDesc,
    channelUpdated, setChannelUpdated,
    channelCustom, setChannelCustom,
    channelEtag, setChannelEtag,

    // UserForm State
    userId, setUserId,
    userName, setUserName,
    userExternalId, setUserExternalId,
    userProfileUrl, setUserProfileUrl,
    userEmail, setUserEmail,
    userCustom, setUserCustom,
    userUpdated, setUserUpdated,
    userEtag, setUserEtag,

    maxRows, setMaxRows,

    // ChannelsSearch State
    channelFilter, setChannelFilter,
    channelMetadataResults, setChannelMetadataResults,
    totalChannels, setTotalChannels,

    // UsersSearch State
    userFilter, setUserFilter,
    userMetadataResults, setUserMetadataResults,
    totalUsers, setTotalUsers,

    // ChannelMembersSearch State
    channelMembersResults, setChannelMembersResults,
    memberFilter, setMemberFilter,
    totalMembers, setTotalMembers,

    // ChannelMembersSearch State
    channelMembershipsResults, setChannelMembershipsResults,
    membershipFilter, setMembershipFilter,
    totalMemberships, setTotalMemberships,
  }

  
  return <Context.Provider value={useObjectAdminData}> {children} </Context.Provider>
}

export const useObjectAdminData = () => {
    return useContext(Context)
}