import { createContext, useContext, useState } from 'react'

const Context = createContext()

export const PushDebugProvider = ({ children }) => {
  const [pushChannel, setPushChannel] = useState();

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

  const [message, setMessage] = useState(messageDefault);

  const [testResults, setTestResults] = useState([]);

  const pushDebugData = {
    pushChannel, setPushChannel,
    message, setMessage, 
    testResults, setTestResults,
  }

  return <Context.Provider value={pushDebugData}> {children} </Context.Provider>
}

export const usePushDebugData = () => {
    return useContext(Context)
}