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
  const result = await runPnConfig(req.query.subkey);

  console.log("result", result);
  res.send(result);
}); 


// async function main() {
//   const { stdout, stderr } = await exec('find . -type f | wc -l');

//   if (stderr) {
//     console.error(`error: ${stderr}`);
//   }
//   console.log(`Number of files ${JSON.stringify(stdout, null, 2)}`);
//   return stdout;
// }


const runPnConfig = async (subKey) => {
  console.log("runPnConfig");

  const pnconfigcmd = `/Users/pubnubcvconover/Developer/pubnub/gits/pnconfig-cli/pnconfig-cli.py --email craig@pubnub.com ${subKey}`;

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