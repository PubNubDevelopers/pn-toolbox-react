import { createContext, useContext, useState } from 'react'
import PubNub from "pubnub";

const Context = createContext()

export const KeySetProvider = ({ children }) => {
  const [pubnub, setPubNub] = useState(null);
  const [status, setStatus] = useState("not initialized");
  const [keySetName, setKeySetName] = useState("Select Key Set");
  const [pubKey, setPubKey] = useState("");
  const [subKey, setSubKey] = useState("");
  const [secKey, setSecKey] = useState("");
  const [uuid, setUuid] = useState("");
  const [keySetProps, setKeySetProps] = useState();

  const initKeySet = (keySetConfig) => {
    const pn = new PubNub({
      subscribeKey: keySetConfig.subKey,
      publishKey: keySetConfig.pubKey,
      secretKey: keySetConfig.secKey,
      uuid: (keySetConfig.uuid !== null ? keySetConfig.uuid : null),
    });

    setKeySetName(keySetConfig.keySetName);

    pn.time().then((timetoken) => {
      // TODO: reenable this somehow
      // notify("Key Set Initialized");
      
      setStatus(`Initialized at: ${getDateTime(timetoken.timetoken)} UTC`);
      setPubKey(pn._config.publishKey);
      setSubKey(pn._config.subscribeKey);
      setSecKey(pn._config.secretKey);
      setUuid(pn.getUUID());
      setPubNub(pn);
    }).catch((error) => {
        console.log("key set init failed:", error);
    });
  }

  const uninitKeySet = () => {
    pubnub.unsubscribeAll();
    pubnub.removeListener(pubnub.listener);
    setStatus("not initialized");
    setKeySetName("");
    setPubNub(null);
  }

  const getDateTime = (pntt) => {
      return new Date(parseInt((pntt+'').substring(0, 13)))
      .toISOString().replace('T', ' ').replace('Z', ' ');
  }

  const keySetData = {
    keySetName,
    subKey,
    pubKey,
    secKey,
    uuid,
    status,
    pubnub,
    keySetProps,
    setKeySetName,
    setPubKey,
    setSubKey,
    setSecKey,
    setUuid,
    setKeySetProps,
    initKeySet,
    uninitKeySet,
  }

  return <Context.Provider value={keySetData}> {children} </Context.Provider>
}

export const useKeySetData = () => {
    return useContext(Context)
}