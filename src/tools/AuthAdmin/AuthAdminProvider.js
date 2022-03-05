import { createContext, useContext, useState } from 'react'

const Context = createContext();

export const AuthAdminProvider = ({ children }) => {

  ///////////////////
  // ParseToken State
  ///////////////////

  const defaultPermissions = JSON.stringify({
    "ttl": 15,
    "authorized_uuid": "my-authorized-uuid",
    "resources": {
      "channels": {
        "channel-a": {
          "read": true
        },
        "channel-b": {
          "read": true,
          "write": true
        },
        "channel-c": {
          "read": true,
          "write": true
        },
        "channel-d": {
          "read": true,
          "write": true
        }
      },
      "groups": {
        "channel-group-b": {
          "read": true
        }
      },
      "uuids": {
        "uuid-c": {
          "get": true
        },
        "uuid-d": {
          "get": true,
          "update": true
        }
      }
    },
    "patterns": {
      "channels": {
        "^channel-[A-Za-z0-9]$": {
          "read": true
        }
      }
    }
  }, null, 4);

  const [parsedAuthToken, setParsedAuthToken] = useState();
  const [parsedPermissions, setParsedPermissions] = useState();


  ///////////////////
  // GrantToken State
  ///////////////////

  const [grantedAuthToken, setGrantedAuthToken] = useState();
  const [grantedPermissions, setGrantedPermissions] = useState(defaultPermissions);

  ///////////////////
  // PermTest State
  ///////////////////
  const [keySetRead, setKeySetRead] = useState("?");
  const [keySetWrite, setKeySetWrite] = useState("?");

  const [isReadCheck, setIsReadCheck] = useState(true);
  const [isWriteCheck, setIsWriteCheck] = useState(true);



  // provide data/functions to context users
  //////////////////////////////////////////
  const useAuthAdminData = {
    // Parse Token State
    parsedAuthToken, setParsedAuthToken,
    parsedPermissions, setParsedPermissions,

    // Grant Token State
    grantedAuthToken, setGrantedAuthToken,
    grantedPermissions, setGrantedPermissions,
    defaultPermissions,

    // Perm Test State
    keySetRead, setKeySetRead,
    keySetWrite, setKeySetWrite,
    isReadCheck, setIsReadCheck,
    isWriteCheck, setIsWriteCheck,
  }

  return <Context.Provider value={useAuthAdminData}> {children} </Context.Provider>
}

export const useAuthAdminData = () => {
    return useContext(Context)
}