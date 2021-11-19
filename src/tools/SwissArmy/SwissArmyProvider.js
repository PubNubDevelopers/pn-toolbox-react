import { createContext, useContext,  } from 'react'

const Context = createContext();

export const SwissArmyProvider = ({ children }) => {

  // Page1 state


  // provide data/functions to context users
  //////////////////////////////////////
  const useSwissArmyData = {
    // Page1 State

  }

  return <Context.Provider value={useSwissArmyData}> {children} </Context.Provider>
}

export const useSwissArmyData = () => {
    return useContext(Context)
}