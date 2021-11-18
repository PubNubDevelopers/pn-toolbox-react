import { createContext, useContext, useState } from 'react'

const Context = createContext();

export const ChannelGroupProvider = ({ children }) => {

  // Page1 state
  const [channelGroup, setChannelGroup] = useState();
  const [channelGroupResults, setChannelGroupResults] = useState();
  
  // provide data/functions to context users
  //////////////////////////////////////
  const useChannelGroupData = {
    // Manage Channels State
    channelGroup, setChannelGroup,
    channelGroupResults, setChannelGroupResults,
  }

  return <Context.Provider value={useChannelGroupData}> {children} </Context.Provider>
}

export const useChannelGroupData = () => {
    return useContext(Context)
}