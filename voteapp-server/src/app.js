const express = require("express");
const bodyParser = require("body-parser");

const createApp = votesDatabase => {
  const app = express();

  app.use(bodyParser.json());

  app.use((_req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

  // adding ?slow to a request can 'slow down' the request
  // to simulate long loading times
  app.use((req, _res, next) => {
    if (req.query.slow !== undefined) {
      // no idea why I did this kind of math, but it seems to work 😱
      const timeout = (Math.floor(Math.random() * 4) + 2) * 250;
      setTimeout(next, timeout);
    } else {
      next();
    }
  });

  app.get("/api/votes", (_req, res) => {
    votesDatabase.getAllVotes((err, votes) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: `Loading votes failed!` });
      }
      res.json(votes);
    });
  });

  app.get("/api/votes/:voteId", (req, res) => {
    const voteId = req.params.voteId;
    votesDatabase.getVoteById(voteId, (err, vote) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: `Loading vote failed!` });
      }
      if (vote) {
        res.json(vote);
      } else {
        res.status(404).json({ error: `Vote '${voteId}' not found` });
      }
    });
  });

  app.post("/api/votes", (req, res) => {
    const payload = req.body;
    const newVote = {
      title: payload.title,
      description: payload.description,
      choices: payload.choices.map((c, ix) => ({
        id: `choice_${ix}`,
        count: 0,
        title: c.title
      }))
    };

    votesDatabase.store(newVote, (err, storedVote) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ error: "Saving vote failed" });
      }
      res.json(storedVote);
    });
  });

  app.put("/api/votes/:voteId/choices/:choiceId/vote", (req, res) => {
    const voteId = req.params.voteId;
    const choiceId = req.params.choiceId;
    votesDatabase.getVoteById(voteId, (err, vote) => {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ error: `Loading vote '${voteId}' failed` });
      }
      if (!vote) {
        return res.status(404).json({ error: `Vote '${voteId}' not` });
      }

      const choice = vote.choices.find(c => c.id === choiceId);
      if (!choice) {
        // invalid choice
        return res
          .status(404)
          .json({ error: `Choice '${choiceId}' not found` });
      }

      // increment count
      choice.count = choice.count + 1;

      // save vote
      votesDatabase.store(vote, (err, storedVote) => {
        if (err) {
          console.error(err);
          return res.status(400).json({ error: "Saving vote failed" });
        }
        res.json(storedVote);
      });
    });
  });

  return app;
};

module.exports = createApp;
