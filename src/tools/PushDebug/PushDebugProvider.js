import { createContext, useContext, useState, useRef } from 'react'

const Context = createContext()

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
          "body": "This is test message from PubNub - ask Mike Comer if you are concerned",
          "content-available": "1"
        },
      },
      "pn_push":[
        {
          "push_type": "alert",
          "auth_method": "token",
          "targets":[
            {
              "environment":"production",
              "topic":"com.everbridge.mobile.iv.Recipient"
            }
          ],
          "version":"v2"
        }
      ]
    },
    "pn_gcm": {
      "notification": {
        "title": "PN Test Message - #counter#",
        "body": "This is test message from PubNub - ask Mike Comer if you are concerned"
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
  const [pushType, setPushType] = useState("apns2"); // apns2, apns, gcm
  const [environment, setEnvironment] = useState(true);
  const [topic, setTopic] = useState("com.mycompany.app.abc");
  const [registeredChannels, setRegisteredChannels] = useState([]);

  const [pushRadios, setPushRadios] = useState(0);
  const [environmentRadios, setEnvironmentRadios] = useState(0);
  const [enableEnvironment, setEnableEnvironment] = useState(true);
  const [enableTopic, setEnableTopic] = useState(true);

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
    environment, setEnvironment,
    topic, setTopic,
    registeredChannels, setRegisteredChannels,
    pushRadios, setPushRadios,
    environmentRadios, setEnvironmentRadios,
    enableEnvironment, setEnableEnvironment,
    enableTopic, setEnableTopic,
  }

  return <Context.Provider value={pushDebugData}> {children} </Context.Provider>
}

export const usePushDebugData = () => {
    return useContext(Context)
}