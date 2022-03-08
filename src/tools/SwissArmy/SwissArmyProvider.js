import { useState, createContext, useContext,  } from 'react'

const Context = createContext();

export const SwissArmyProvider = ({ children }) => {

  // ChannelBrowser
  const [channel, setChannel] = useState();
  const [maxRows, setMaxRows] = useState(500);
  const [channelMessageResults, setChannelMessageResults] = useState(null);


  // provide data/functions to context users
  //////////////////////////////////////
  const useSwissArmyData = {
    // ChannelBrowser
    channel, setChannel,
    maxRows, setMaxRows,
    channelMessageResults, setChannelMessageResults
  }

  return <Context.Provider value={useSwissArmyData}> {children} </Context.Provider>
}

export const useSwissArmyData = () => {
    return useContext(Context)
}