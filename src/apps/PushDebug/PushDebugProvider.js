import { createContext, useContext, useState } from 'react'

const Context = createContext()

export const PushDebugProvider = ({ children }) => {
  const [pubnub, setPubNub] = useState(null);
  const [status, setStatus] = useState("not initialized");
  const [keySetName, setKeySetName] = useState("");

  const pushDebugData = {
    
  }

  return <Context.Provider value={pushDebugData}> {children} </Context.Provider>
}

export const usePushDebugData = () => {
    return useContext(Context)
}