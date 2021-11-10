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