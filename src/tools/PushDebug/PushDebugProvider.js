import { createContext, useContext, useState } from 'react'

const Context = createContext()

export const PushDebugProvider = ({ children }) => {
  const [pushChannel, setPushChannel] = useState("pinchme");

  const pushDebugData = {
    pushChannel, setPushChannel,

  }

  return <Context.Provider value={pushDebugData}> {children} </Context.Provider>
}

export const usePushDebugData = () => {
    return useContext(Context)
}