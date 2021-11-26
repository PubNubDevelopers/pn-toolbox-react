import { createContext, useContext, useState } from 'react'

const Context = createContext();

export const PresenceProvider = ({ children }) => {

  const [stateVar1, setStateVar1] = useState();
//   const [stateVar2, setStateVar2] = useState();

//   // provide data/functions to context users
//   ////////////////////////////////////////
  const usePresenceData = {
    // ConfigForm State
    stateVar1, setStateVar1,
  }

  return <Context.Provider value={usePresenceData}> {children} </Context.Provider>
}

export const usePresenceData = () => {
    return useContext(Context)
}