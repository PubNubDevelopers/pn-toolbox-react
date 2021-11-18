import { createContext, useContext, useState } from 'react'
import PubNub from "pubnub";

const Context = createContext()

export const KeySetProvider = ({ children }) => {
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
    keySetName, setKeySetName,
    subKey, setPubKey,
    pubKey, setSubKey,
    secKey, setSecKey,
    uuid, setUuid,
    authToken, setAuthToken,
    keySetProps, setKeySetProps,
    isInitialized, status,
    pubnub, initKeySet, uninitKeySet,
  }

  return <Context.Provider value={keySetData}> {children} </Context.Provider>
}

export const useKeySetData = () => {
    return useContext(Context)
}