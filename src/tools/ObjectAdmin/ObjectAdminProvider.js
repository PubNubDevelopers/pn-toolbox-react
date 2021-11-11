import { createContext, useContext, useState } from 'react'

const Context = createContext()

export const ObjectAdminProvider = ({ children }) => {

  // ChannelMetadata State
  const [channelId, setChannelId] = useState();
  const [channelName, setChannelName] = useState([]);
  const [channelDesc, setChannelDesc] = useState([]);
  const [channelCustom, setChannelCustom] = useState([]);
  const [channelUpdated, setChannelUpdated] = useState([]);
  const [channelEtag, setChannelEtag] = useState([]);

   // UserMetadata State
   const [userId, setUserId] = useState();
   const [userName, setUserName] = useState([]);
   const [externalId, setUserExternalId] = useState([]);
   const [userProfileUrl, setUserProfileUrl] = useState([]);
   const [userEmail, setUserEmail] = useState([]);
   const [userCustom, setUserCustom] = useState([]);
   const [userUpdated, setUserUpdated] = useState([]);
   const [userEtag, setUserEtag] = useState([]); 

  // ChannelMetadataList State
  const [channelFilter, setChannelFilter] = useState('name LIKE "*"');
  const [maxRows, setMaxRows] = useState(500);
  const [channelMetadataResults, setChannelMetadataResults] = useState([]);

  // expose data/functions to context users
  /////////////////////////////////////////

  const useObjectAdminData = {
    // ChannelMetadata State
    channelId, setChannelId,
    channelName, setChannelName,
    channelDesc, setChannelDesc,
    channelUpdated, setChannelUpdated,
    channelCustom, setChannelCustom,
    channelEtag, setChannelEtag,

    // UserMetadata State
    userId, setUserId,
    userName, setUserName,
    externalId, setUserExternalId,
    userProfileUrl, setUserProfileUrl,
    userEmail, setUserEmail,
    userCustom, setUserCustom,
    userUpdated, setUserUpdated,
    userEtag, setUserEtag,

    // ChannelMetadataList State
    channelFilter, setChannelFilter,
    maxRows, setMaxRows,
    channelMetadataResults, setChannelMetadataResults,
  }

  return <Context.Provider value={useObjectAdminData}> {children} </Context.Provider>
}

export const useObjectAdminData = () => {
    return useContext(Context)
}