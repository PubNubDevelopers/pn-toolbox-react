// import { createContext, useContext, useState } from 'react'

// const Context = createContext();

// export const _AppName_Provider = ({ children }) => {

//   // Page1 state
//   const [foo, setFoo] = useState();
//   const [bar, setBar] = useState();

//   // Page2 state
//   const [bing, setBing] = useState();

//   // provide data/functions to context users
//   //////////////////////////////////////
//   const use_AppName_Data = {
//     // Page1 State
//     foo, setFoo,
//     bar, setBar,

//     // Page2 State
//     bing, setBing,
//   }

//   return <Context.Provider value={use_AppName_Data}> {children} </Context.Provider>
// }

// export const use_AppName_Data = () => {
//     return useContext(Context)
// }