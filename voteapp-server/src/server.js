const Database = require("./db/InMemoryVoteDatabase");
const createVoteApp = require("./app");
const https = require("https");
const fs = require("fs");

const port = process.env.SERVER_PORT || 3000;
const useHttps = process.env.HTTPS === "true";

Database.create((err, database) => {
  if (err) {
    throw new Error(`Could not create db: ${err}`);
  }

  const app = createVoteApp(database);

  if (useHttps) {
    const privateKey = fs.readFileSync(".cert/server.key", "utf8");
    const certificate = fs.readFileSync(".cert/server.crt", "utf8");

    const credentials = { key: privateKey, cert: certificate };

    https.createServer(credentials, app).listen(port, () => {
      console.log(
        `  📞    Votes API Server listening on https://localhost:${port}/api`
      );
    });
  } else {
    app.listen(port, () => {
      console.log(
        `  📞    Votes API Server listening on http://localhost:${port}/api`
      );
    });
  }
});
