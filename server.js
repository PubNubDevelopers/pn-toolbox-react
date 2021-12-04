const express = require('express');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const cors = require('cors');

const app = express();
app.use(cors({
  origin: '*'
}));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res, next) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); 

app.get('/pnconfig', async (req, res, next) => {
  console.log("req.query", req.query);
  const result = await runPnConfig(req.query.subkey, req.query.prop);

  console.log("result", result);
  res.send(result);
}); 

const runPnConfig = async (subKey, prop) => {
  console.log("runPnConfig");

  let pnconfigcmd = `/Users/pubnubcvconover/Developer/pubnub/gits/pnconfig-cli/pnconfig-cli.py --email craig@pubnub.com ${subKey}`;
  if (prop != null) pnconfigcmd = pnconfigcmd + ` ${prop}`;

  const { stdout, stderr } = await exec(pnconfigcmd, ["-i"]);

  if (stderr) {
    console.error("error");
    return stderr;
  }
  else {
    console.log("success");
    return stdout;
  }
}