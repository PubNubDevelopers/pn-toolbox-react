import { createContext, useContext, useState, useRef } from 'react'

const Context = createContext();

export const PushDebugProvider = ({ children }) => {

  ///////////////////
  // PushTest State
  //////////////////

  const messageDefault = JSON.stringify({
    "pn_debug": true,
    "text": "This is test message from PubNub - #counter#",
    "pn_apns": {
      "aps": {
        "alert": {
          "title": "PN Test Message - #counter#",
          "body": "You have a new message",
        },
      },
      "pn_push":[
        {
          "push_type": "alert",
          "auth_method": "token",
          "targets":[
            {
              "environment":"production",
              "topic":"com.pubnub.app.bundleid"
            }
          ],
          "version":"v2"
        }
      ]
    },
    "pn_gcm": {
      "notification": {
        "title": "PN Test Message - #counter#",
        "body": "You have a new message"
      }
    }
  }, null, 2);

  const [pushChannel, setPushChannel] = useState();
  const [subscribeButtonLabel, setSubscribeButtonLabel] = useState("Subscribe");
  const [message, setMessage] = useState(messageDefault);
  const [testResults, setTestResults] = useState([]);

  const counter = useRef(0);
  const isWarnUnsubscribed = useRef(true);


  //////////////////////
  // ManageDevice State
  //////////////////////

  const [token, setToken] = useState();
  const [registeredChannels, setRegisteredChannels] = useState([]);

  //////////////////////
  // ManageChannel State
  //////////////////////

  const [manageChannel, setManageChannel] = useState();
  const [registeredDevices, setRegisteredDevices] = useState([]);

  // old state - to be removed
  // const [apns2DevUri, setApns2DevUri] = useState(defaultApnsUri);
  // const [apns2PrdUri, setApns2PrdUri] = useState(defaultApns2DevUri);
  // const [apnsUri, setApnsUri] = useState(defaultApns2PrdUri);
  // const [fcmUri, setFcmUri] = useState(defaultFcmUri);
  
  //////////////////////
  // common page state
  //////////////////////
  const [pushType, setPushType] = useState("apns2"); // apns2, apns, gcm
  const [environment, setEnvironment] = useState(true);
  const [topic, setTopic] = useState("com.mycompany.app.abc");
  const [pushRadios, setPushRadios] = useState(0);
  const [environmentRadios, setEnvironmentRadios] = useState(0);
  const [enableEnvironment, setEnableEnvironment] = useState(true);
  const [enableTopic, setEnableTopic] = useState(true);


  // provide data/functions to context users
  //////////////////////////////////////////
  const pushDebugData = {
    // PushTest State
    pushChannel, setPushChannel,
    subscribeButtonLabel, setSubscribeButtonLabel,
    message, setMessage, 
    testResults, setTestResults,
    counter, isWarnUnsubscribed,

    // ManageDevice State
    token, setToken,
    pushType, setPushType,

    // ManageChannel State
    manageChannel, setManageChannel,
    registeredDevices, setRegisteredDevices,

    // common page state
    environment, setEnvironment,
    topic, setTopic,
    registeredChannels, setRegisteredChannels,
    pushRadios, setPushRadios,
    environmentRadios, setEnvironmentRadios,
    enableEnvironment, setEnableEnvironment,
    enableTopic, setEnableTopic,

    // old state - to be removed
    // apns2DevUri, setApns2DevUri,
    // apns2PrdUri, setApns2PrdUri,
    // apnsUri, setApnsUri,
    // fcmUri, setFcmUri,
    // defaultApnsUri, defaultApns2DevUri,
    // defaultApns2PrdUri, defaultFcmUri,
  }

  return <Context.Provider value={pushDebugData}> {children} </Context.Provider>
}

export const usePushDebugData = () => {
    return useContext(Context)
}