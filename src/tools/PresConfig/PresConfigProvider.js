import { createContext, useContext, useState } from 'react'

const Context = createContext();

export const AppNameProvider = ({ children }) => {

  const [stateVar1, setStateVar1] = useState();
//   const [stateVar2, setStateVar2] = useState();

//   // provide data/functions to context users
//   ////////////////////////////////////////
  const usePresConfigData = {
    // ConfigForm State
    stateVar1, setStateVar1,
  }

  return <Context.Provider value={usePresConfigData}> {children} </Context.Provider>
}

export const usePresConfigData = () => {
    return useContext(Context)
}