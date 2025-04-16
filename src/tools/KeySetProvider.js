import { createContext, useContext, useState } from 'react'
import PubNub from "pubnub";

const Context = createContext()

export const KeySetProvider = ({ children }) => {
  const [serverDomain, setServerDomain] = useState("https://pn-toolbox-react.netlify.app/");

  const [pubnub, setPubNub] = useState(null);
  const [isInitialized, setIsInitialize] = useState(false);
  const [status, setStatus] = useState("not initialized");
  const [keySetName, setKeySetName] = useState("Select Key Set");
  const [pubKey, setPubKey] = useState("");
  const [subKey, setSubKey] = useState("");
  const [secKey, setSecKey] = useState("");
  const [uuid, setUuid] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [keySetProps, setKeySetProps] = useState();

  const [portalUsername, setPortalUsername] = useState();
  const [portalPassword, setPortalPassword] = useState();
  const [portalUserId, setPortalUserId] = useState();
  const [portalToken, setPortalToken] = useState();
  const [portalAccountId, setPortalAccountId] = useState();
  const [portalAccounts, setPortalAccounts] = useState([]);
  const [portalApps, setPortalApps] = useState([]);
  const [portalKeys, setPortalKeys] = useState([]);
  const [searchBy, setSearchBy] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  

  const initKeySet = (keySetConfig) => {
    uninitKeySet();

    const pn = new PubNub({
      subscribeKey: keySetConfig.subKey,
      publishKey: keySetConfig.pubKey, // conditional null check?
      secretKey: keySetConfig.secKey, // conditional null check?
      uuid: (keySetConfig.uuid !== null ? keySetConfig.uuid : null),
      authKey: (keySetConfig.authToken !== null ? keySetConfig.authToken : null),
    });

    setKeySetName(keySetConfig.keySetName);

    pn.time().then((timetoken) => {
      // TODO: reenable this somehow
      // notify("Key Set Initialized");
      
      setIsInitialize(true);
      setStatus(`Initialized at: ${getDateTime(timetoken.timetoken)} UTC`);
      setPubKey(pn._config.publishKey);
      setSubKey(pn._config.subscribeKey);
      setSecKey(pn._config.secretKey);
      setUuid(pn.getUUID());
      // setAuthToken(pn.getToken) no api???
      setPubNub(pn);
    }).catch((error) => {
        console.log("key set init failed:", error);
        setIsInitialize(false);
    });
  }

  const uninitKeySet = () => {
    if (pubnub != null) {
      pubnub.unsubscribeAll();
      pubnub.removeListener(pubnub.listener);
    }

    setIsInitialize(false);
    setStatus("not initialized");
    setKeySetName("");
    setPubKey("");
    setSubKey("");
    setSecKey("");
    setUuid("");
    // setAuthToken(pn.getToken) no api???
    setPubNub(null);
  }

  const getDateTime = (pntt) => {
      return new Date(parseInt((pntt+'').substring(0, 13)))
      .toISOString().replace('T', ' ').replace('Z', ' ');
  }

  const keySetData = {
    serverDomain, setServerDomain,

    // Key Set Initialize
    keySetName, setKeySetName,
    subKey, setSubKey,
    pubKey, setPubKey,
    secKey, setSecKey,
    uuid, setUuid,
    authToken, setAuthToken,
    keySetProps, setKeySetProps,
    isInitialized, status,
    pubnub, initKeySet, uninitKeySet,

    // PN Dashboard Login
    portalUsername, setPortalUsername,
    portalPassword, setPortalPassword,
    portalUserId, setPortalUserId,
    portalToken, setPortalToken,
    portalAccountId, setPortalAccountId,
    portalAccounts, setPortalAccounts,
    portalApps, setPortalApps,
    portalKeys, setPortalKeys,
    searchBy, setSearchBy,
    searchResults, setSearchResults,
  }

  return <Context.Provider value={keySetData}> {children} </Context.Provider>
}

export const useKeySetData = () => {
    return useContext(Context)
}