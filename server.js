const express = require('express');
const request = require('request');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const cors = require('cors');
const Pubnub = require('pubnub');
const { signPamFromParams } = require('pubnub/lib/core/utils');
const CryptoJS = require('pubnub/lib/core/components/cryptography/hmac-sha256');

const app = express();
app.use(cors({ origin: '*' }));

const domain = "internal-admin.pubnub.com";
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/test', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); 

const signRequest = (publishKey, subscribeKey, secretKey, queryParams, targetUrl) => {
  console.log("signRequest", publishKey, subscribeKey, secretKey, queryParams, targetUrl);

  let HMACSHA256 = function (data) {
    console.log("signInput data", data);
    let hash = CryptoJS.HmacSHA256(data, secretKey);
    return hash.toString(CryptoJS.enc.Base64);
  }

  let signInput = subscribeKey + '\n' + publishKey + '\n' + targetUrl + '\n' 
    + signPamFromParams(queryParams);

  let signature = HMACSHA256(signInput);
  console.log("signInput: signature", signature);

  signature = signature.replace(/\+/g, '-');
  signature = signature.replace(/\//g, '_');

  return signature;
}

app.get('/apns-devices', (req, res) => {
  console.log("in get /apns-devices", req.query);

  // curl `/v1/push/sub-key/${subscribeKey}/audit-devices
  //      ?channel=${channel}&timestamp=${timestamp}&type=apns&signature=${signature}`;

  const targetUrl = `/v1/push/sub-key/${req.query.subkey}/audit-devices`
  const timestamp = Math.floor(new Date().getTime() / 1000);

  let queryParams = {
      channel: req.query.channel,
      type: 'apns',
      timestamp: timestamp
  }

  const signature = signRequest(req.query.pubkey, req.query.subkey, req.query.seckey, queryParams, targetUrl);
  console.log("signature", signature);

  const options = {
    'url': `https://ps.pndsn.com${targetUrl}?channel=${req.query.channel}&timestamp=${timestamp}&type=apns&signature=${signature}`,
  };

  console.log(`apns-devices options: ${JSON.stringify(options)}`);

  request.get(options, (err1, res1, body1) => {
    if (err1) {
      return console.log(err1);
    }

    let data = body1;
    console.log("apns-devices", data);
    res.send(data);
  });
});

app.get('/gcm-devices', (req, res) => {
  console.log("in get /gcm-devices", req.query);

  // curl `/v1/push/sub-key/${subscribeKey}/audit-devices
  //      ?channel=${channel}&timestamp=${timestamp}&type=gcm&signature=${signature}`;

  const targetUrl = `/v1/push/sub-key/${req.query.subkey}/audit-devices`
  const timestamp = Math.floor(new Date().getTime() / 1000);

  let queryParams = {
      channel: req.query.channel,
      type: 'gcm',
      timestamp: timestamp
  }

  const signature = signRequest(req.query.pubkey, req.query.subkey, req.query.seckey, queryParams, targetUrl);
  console.log("signature", signature);

  const options = {
    'url': `https://ps.pndsn.com${targetUrl}?channel=${req.query.channel}&timestamp=${timestamp}&type=gcm&signature=${signature}`,
  };

  console.log(`gcm-devices options: ${JSON.stringify(options)}`);

  request.get(options, (err1, res1, body1) => {
    if (err1) {
      return console.log(err1);
    }

    let data = body1;
    console.log("gcm-devices", data);
    res.send(data);
  });
});

app.get('/apns2-devices', (req, res) => {
  console.log("in get /apns2-devices");

  // curl '/v2/push/sub-key/${subscribeKey}/channel/${channel}/audit-devices
  //      ?environment=${environment}&topic=${topic}&timestamp=${timestamp}&signature=${signature}'

  const targetUrl = `/v2/push/sub-key/${req.query.subkey}/channel/${req.query.channel}/audit-devices`
  const timestamp = Math.floor(new Date().getTime() / 1000);

  let queryParams = {
      environment: req.query.env,
      topic: req.query.topic,
      timestamp: timestamp
  };

  const signature = signRequest(req.query.pubkey, req.query.subkey, req.query.seckey, queryParams, targetUrl);

  const options = {
    'url': `https://ps.pndsn.com${targetUrl}?environment=${req.query.env}&topic=${req.query.topic}&timestamp=${timestamp}&signature=${signature}`,
  };

  console.log(`apns2-devices options: ${JSON.stringify(options)}`);

  request.get(options, (err1, res1, body1) => {
    if (err1) {
      return console.log(err1);
    }

    let data = JSON.parse(body1).result;
    console.log("apns2-devices", data);
    res.send(data);
  });
});


app.get('/keys', (req, res) => {
  console.log("in get /keys");

  // curl 'https://internal-admin.pubnub.com/api/app/keys?app_id=1&page=1&limit=1' --header 'X-Session-Token: <token>'

  const options = {
    'url': `https://${domain}/api/app/keys?app_id=${req.query.app_id}&page=1&limit=99`,
    'headers': { 'X-Session-Token': req.query.token }
  };

  console.log(`keys options: ${JSON.stringify(options)}`);

  request.get(options, (err1, res1, body1) => {
    if (err1) {
      return console.log(err1);
    }

    let data = JSON.parse(body1).result;
    console.log("keys", data);
    res.send(data);
  });
});

app.get('/apps', (req, res) => {
  console.log("in get /apps");

  // curl --request GET 'https://admin.pubnub.com/api/apps?owner_id=<account_id>&no_keys=1' 
  // --header 'X-Session-Token: <session_token>'

  const options = {
    url: `https://${domain}/api/apps?owner_id=${req.query.ownerid}&no_keys=1`,
    headers: { 'X-Session-Token': req.query.token }
  };

  console.log("apps options", options);

  request.get(options, (err1, res1, body1) => {
    console.log("in request.get apps");

    if (err1) {
      return console.log(err1);
    }

    let data = JSON.parse(res1.body);
    console.log("apps", data);
    res.send(data);
  });
});

app.get('/search', (req, res) => {
  console.log("in get /search");

  // curl --request GET 'https://admin.pubnub.com/api/users?search=<search>' 
  // --header 'X-Session-Token: <session_token>'

  const options = {
    url: `https://${domain}/api/users?search=${req.query.search}`,
    headers: { 'X-Session-Token': req.query.token }
  };

  console.log("search options", options);

  request.get(options, (err1, res1, body1) => {
    console.log("in request.get search");

    if (err1) {
      return console.log(err1);
    }

    let data = JSON.parse(res1.body);
    console.log("search results", data);
    res.send(data);
  });
});

app.get('/accounts', (req, res) => {
  console.log("in /accounts", req);
  // get accounts //
  //////////////////

  const options = {
    url: `https://${domain}/api/accounts?user_id=${req.query.user_id}`,
    headers: { 'X-Session-Token': req.query.token },
  };

  console.log("account options", options);

  request.get(options, (err1, res1, body1) => {
    // console.log("accounts: res", res1, "\n");
    // console.log("accounts: body", body1, "\n");

    if (err1) return console.log(err1);

    // respond to client with data //
    /////////////////////////////////
    
    // console.log();
    // console.log();
    // console.log();
    // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    // console.log("res.body", res1.body);

    let data = {
      "session": {
        "userid": res1.body.user_id,
        "token": res1.body.token,
        "accountid": res1.body.account_id
      },
      "accounts": JSON.parse(body1).result.accounts
    };

    console.log("accounts", data.accounts);
    res.send(data); 
  });
});


app.get('/login', (req, res) => {
  console.log("in /login");
  // curl --request POST 'https://admin.pubnub.com/api/me' \
  // --header 'Content-Type: application/json' \
  // --data-raw '{"email":"<email>","password":"<password>"}'

  // login //
  ///////////

  const options = {
    url: `https://${domain}/api/me`,
    json: true,
    body: {
      email: req.query.username,
      password: req.query.password
    }
  };

  console.log("login options", options);

  request.post(options, (err, res1, body) => {
    console.log("login post response", JSON.stringify(res1));

    if (err) {
      return console.log(err);
    }

    // get accounts //
    //////////////////

    const options = {
      url: `https://${domain}/api/accounts?user_id=${res1.body.result.user_id}`,
      headers: { 'X-Session-Token': res1.body.result.token },
    };

    console.log("account options", options);

    request.get(options, (err, res2, body2) => {
      // console.log("accounts get response", JSON.stringify(res2));
      if (err) {
        return console.log(err);
      }

      // respond to client with data //
      /////////////////////////////////
      let data = {
        "session": {
          "userid": res1.body.result.user_id,
          "token": res1.body.result.token,
          "accountid": res1.body.result.user.account_id
        }
      };

      data.accounts = JSON.parse(body2).result.accounts;
      console.log("accounts", data.accounts);
      res.send(data); 
    });
  });
});
