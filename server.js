const express = require('express');
const request = require('request');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/test', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); 


app.get('/keys', (req, res) => {
  console.log("in get /keys");

  // curl 'https://internal-admin.pubnub.com/api/app/keys?app_id=1&page=1&limit=1' --header 'X-Session-Token: <token>'

  const options = {
    'url': `https://internal-admin.pubnub.com/api/app/keys?app_id=${req.query.app_id}&page=1&limit=99`,
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

  // curl --request GET 'https://internal-admin.pubnub.com/api/apps?owner_id=<account_id>&no_keys=1' 
  // --header 'X-Session-Token: <session_token>'

  const options = {
    url: `https://internal-admin.pubnub.com/api/apps?owner_id=${req.query.ownerid}&no_keys=1`,
    headers: { 'X-Session-Token': req.query.token }
  };

  console.log(`apps options: ${JSON.stringify(options)}`);

  request.get(options, (err1, res1, body1) => {
    if (err1) {
      return console.log(err1);
    }

    let data = JSON.parse(body1).result;
    res.send(data);
  });
});

app.get('/login', (req, res) => {
  console.log("in /login");
  // curl --request POST 'https://internal-admin.pubnub.com/api/me' \
  // --header 'Content-Type: application/json' \
  // --data-raw '{"email":"<email>","password":"<password>"}'

  // login //
  ///////////

  const options = {
    url: 'https://internal-admin.pubnub.com/api/me',
    json: true,
    body: {
      email: req.query.username,
      password: req.query.password
    }
  };

  request.post(options, (err, res1, body) => {
    if (err) {
      return console.log(err);
    }

    // get accounts //
    //////////////////

    const options = {
      url: `https://internal-admin.pubnub.com/api/accounts?user_id= + ${res1.body.result.user_id}`,
      headers: { 'X-Session-Token': res1.body.result.token },
      // json: true
    };

    request.get(options, (err, res2, body2) => {
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
      res.send(data);
    });
  });
});
