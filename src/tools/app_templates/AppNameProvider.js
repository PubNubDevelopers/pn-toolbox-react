// import { createContext, useContext, useState } from 'react'

// const Context = createContext()

// export const AppNameProvider = ({ children }) => {

//   const [stateVar1, setStateVar1] = useState();
//   const [stateVar2, setStateVar2] = useState();

//   // provide data/functions to context users
//   ////////////////////////////////////////
//   const useAuthAdminData = {
//     // ManageDevice State
//     stateVar1, setStateVar1,
//     stateVar2, setStateVar2,
//   }

//   return <Context.Provider value={useAppNameData}> {children} </Context.Provider>
// }

// export const useAppNameData = () => {
//     return useContext(Context)
// }