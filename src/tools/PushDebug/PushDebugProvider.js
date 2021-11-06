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


  //////////////////////
  // ManageChannel State
  //////////////////////
  const defaultApnsUri = `curl -s -v storageweb-red1.aws-sjc-1.ps.pn:9000/v1/push/sub-key/SUB_KEY}/audit-devices/CHANNEL_NAME`;
  const defaultApns2DevUri = `curl -s -v "storageweb-red1.aws-sjc-1.ps.pn:9000/v2/admin-push/sub-key/SUB_KEY/channel/CHANNEL_NAME?type=apns2&environment=development&topic=TOPIC`;
  const defaultApns2PrdUri = `curl -s -v "storageweb-red1.aws-sjc-1.ps.pn:9000/v2/admin-push/sub-key/SUB_KEY/channel/CHANNEL_NAME?type=apns2&environment=production&topic=TOPIC`;
  const defaultFcmUri = `curl -s -v "storageweb-red1.aws-sjc-1.ps.pn:9000/v2/admin-push/sub-key/SUB_KEY/channel/CHANNEL_NAME?type=gcm`;

  const [manageChannel, setManageChannel] = useState("CHANNEL_NAME");
  const [apns2DevUri, setApns2DevUri] = useState(defaultApnsUri);
  const [apns2PrdUri, setApns2PrdUri] = useState(defaultApns2DevUri);
  const [apnsUri, setApnsUri] = useState(defaultApns2PrdUri);
  const [fcmUri, setFcmUri] = useState(defaultFcmUri);


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
    environment, setEnvironment,
    topic, setTopic,
    registeredChannels, setRegisteredChannels,
    pushRadios, setPushRadios,
    environmentRadios, setEnvironmentRadios,
    enableEnvironment, setEnableEnvironment,
    enableTopic, setEnableTopic,

    // ManageChannel State
    manageChannel, setManageChannel,
    apns2DevUri, setApns2DevUri,
    apns2PrdUri, setApns2PrdUri,
    apnsUri, setApnsUri,
    fcmUri, setFcmUri,
    defaultApnsUri, defaultApns2DevUri,
    defaultApns2PrdUri, defaultFcmUri,
  }

  return <Context.Provider value={pushDebugData}> {children} </Context.Provider>
}

export const usePushDebugData = () => {
    return useContext(Context)
}