const Database = require("./db/InMemoryVoteDatabase");
const createVoteApp = require("./app");

const https = require('https');
const fs = require('fs');

const port = process.env.SERVER_PORT || 3000;

const privateKey  = fs.readFileSync('.cert/server.key', 'utf8');
const certificate = fs.readFileSync('.cert/server.crt', 'utf8');

const credentials = {key: privateKey, cert: certificate};

Database.create((err, database) => {
  if (err) {
    throw new Error(`Could not create db: ${err}`);
  }

  const app = createVoteApp(database);
  
  https.createServer(credentials, app).listen(port, () => {
    console.log(`  📞    Votes API Server listening on port ${port}`);
  });

});
