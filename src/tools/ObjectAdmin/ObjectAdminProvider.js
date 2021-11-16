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

  // ChannelsSearch State
  const [channelFilter, setChannelFilter] = useState('name LIKE "*"');
  const [maxRows, setMaxRows] = useState(500);
  const [channelMetadataResults, setChannelMetadataResults] = useState([]);

  // UsersSearch State
  const [userFilter, setUserFilter] = useState('name LIKE "*"');
  // share ChannelsList state: const [maxRows, setMaxRows] = useState(500);
  const [userMetadataResults, setUserMetadataResults] = useState([]);

  // ChannelMembersSearch State
  // share UsersSearch state: const [userFilter, setUserFilter] = useState('name LIKE "*"');
  // share ChannelsSearch state: const [maxRows, setMaxRows] = useState(500);
  const [channelMembersResults, setChannelMembersResults] = useState([]);
  const [memberFilter, setMemberFilter] = useState();


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

    // ChannelsSearch State
    channelFilter, setChannelFilter,
    maxRows, setMaxRows,
    channelMetadataResults, setChannelMetadataResults,

    // UsersSearch State
    userFilter, setUserFilter,
    // share ChannelsList state: maxRows, setMaxRows,
    userMetadataResults, setUserMetadataResults,

    // ChannelMembersSearch State
    channelMembersResults, setChannelMembersResults,
    memberFilter, setMemberFilter,
  }

  
  return <Context.Provider value={useObjectAdminData}> {children} </Context.Provider>
}

export const useObjectAdminData = () => {
    return useContext(Context)
}