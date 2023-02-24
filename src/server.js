const express = require('express');
const request = require('request');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));

const domain = "internal-admin.pubnub.com";
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/test', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); 


app.get('/keys', (req, res) => {
  console.log("in get /keys");

  // curl 'https://internal-admin.pubnub.com/api/app/keys?app_id=1&page=1&limit=1' --header 'X-Session-Token: <token>'

  const options = {
    'url': `https://admin.pubnub.com/api/app/keys?app_id=${req.query.app_id}&page=1&limit=99`,
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
