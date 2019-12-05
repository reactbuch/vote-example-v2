const Database = require("./db/InMemoryVoteDatabase");
const createVoteApp = require("./app");

const port = process.env.SERVER_PORT || 3000;

Database.create((err, database) => {
  if (err) {
    throw new Error(`Could not create db: ${err}`);
  }

  const app = createVoteApp(database);

  app.listen(port, () => {
    console.log(`  📞    Votes API Server listening on port ${port}`);
  });
});
