const express = require('express');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const cors = require('cors');

const app = express();
app.use(cors({origin: '*'}));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
}); 

app.get('/pnconfig', async (req, res) => {
  console.log("req.query", req.query);
  const result = await runPnConfig(req.query);

  console.log("result", result);
  res.send(result);
}); 

const runPnConfig = async (params) => {
  console.log("runPnConfig");

  let pnconfigcmd = `/Users/pubnubcvconover/Developer/pubnub/gits/pnconfig-cli/pnconfig-cli.py --email craig@pubnub.com ${params.subkey}`;

  if (params.prop != null && params.prop !== "") {
    console.log("prop query", params.prop);
    pnconfigcmd = pnconfigcmd + ` ${params.prop}`;
  }
  else if (params.filter !=null && params.filter !== "") {
    console.log("filter query", params.filter);
    pnconfigcmd = pnconfigcmd + ` | egrep '${params.filter}'`
  }

  const { stdout, stderr } = await exec(pnconfigcmd, ["-i"]);

  if (stderr) {
    console.error("error");
    return stderr;
  }
  else {
    console.log("success");
    if (params.prop !=null && params.prop !== "") {
      const data = {"properties": JSON.parse(stdout) };
      console.log("data", data);
      return data;
    }
    else if (params.filter !=null && params.filter !== "") {
      const data = JSON.parse('{"properties":{' + stdout.replace(/\s/g, "").slice(0, -1) + '}}');
      console.log("data", data);
      return data;
    }

    return stdout;
  }
}