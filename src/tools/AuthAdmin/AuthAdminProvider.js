import { createContext, useContext, useState } from 'react'

const Context = createContext()

export const AuthAdminProvider = ({ children }) => {

  ///////////////////
  // ParseToken State
  //////////////////

  const [autToken, setAuthToken] = useState();
  const [permissions, setPermissions] = useState();

  // provide data/functions to context users
  //////////////////////////////////////////
  const useAuthAdminData = {
    // ManageDevice State
    autToken, setAuthToken,
    permissions, setPermissions,
  }

  return <Context.Provider value={useAuthAdminData}> {children} </Context.Provider>
}

export const useAuthAdminData = () => {
    return useContext(Context)
}